"use client";

import { useEffect, useRef, useState } from "react";

const NODE_W = 164;
const NODE_H = 56;

const nodes = {
  request: { x: 110, y: 170, label: "Request received", type: "trigger", kind: "terminal" },
  validate: { x: 310, y: 170, label: "Validate information", type: "rule" },
  missing: { x: 310, y: 300, label: "Request details", type: "status", minor: true },
  assign: { x: 510, y: 170, label: "Assign owner", type: "role" },
  review: { x: 710, y: 170, label: "Review requirements", type: "rule" },
  decision: { x: 890, y: 170, label: "Approval?", type: "rule", kind: "decision" },
  manager: { x: 1090, y: 170, label: "Manager approval", type: "role" },
  task: { x: 1090, y: 440, label: "Create task", type: "action" },
  notify: { x: 890, y: 440, label: "Notify client", type: "action" },
  progress: { x: 690, y: 440, label: "In progress", type: "status" },
  completed: { x: 490, y: 440, label: "Completed", type: "status", kind: "terminal" },
  followup: { x: 290, y: 440, label: "Follow-up", type: "action", minor: true },
};

const edges = {
  e1: { points: [[192, 170], [228, 170]] },
  e2: { points: [[392, 170], [428, 170]] },
  e2b: { points: [[310, 198], [310, 272]], dashed: true, label: "incomplete", lx: 320, ly: 240, anchor: "start" },
  e2c: { points: [[228, 300], [110, 300], [110, 198]], dashed: true },
  e3: { points: [[592, 170], [628, 170]] },
  e4: { points: [[792, 170], [850, 170]] },
  e5: { points: [[930, 170], [1008, 170]], label: "yes", lx: 969, ly: 160 },
  e6: { points: [[890, 210], [890, 330], [1090, 330], [1090, 412]], label: "no", lx: 900, ly: 275, anchor: "start" },
  e7: { points: [[1090, 198], [1090, 412]] },
  e8: { points: [[1008, 440], [972, 440]] },
  e9: { points: [[808, 440], [772, 440]] },
  e10: { points: [[608, 440], [572, 440]] },
  e11: { points: [[408, 440], [372, 440]], dashed: true, label: "+7d", lx: 390, ly: 428 },
};

const toPath = (points) =>
  points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

const fulfilment = (id, approved) => [
  ...(approved
    ? [
        { edge: "e5", node: "manager", status: "awaiting sign-off", log: "approval.requested  ops.manager" },
        { edge: "e7", node: "task", status: `TASK-${id + 1006} created`, log: `task.created  TASK-${id + 1006}` },
      ]
    : [{ edge: "e6", node: "task", status: `TASK-${id + 1006} created`, log: `task.created  TASK-${id + 1006} · auto` }]),
  { edge: "e8", node: "notify", status: "email sent", log: "client.notified  order confirmation" },
  { edge: "e9", node: "progress", status: "status: active", log: "status.changed  in_progress" },
  { edge: "e10", node: "completed", status: "closed · 2.4h", log: `request.completed  RQ-${id}` },
  { edge: "e11", node: "followup", status: "scheduled", log: "followup.scheduled  +7d" },
];

const intake = (id, client) => [
  { node: "request", status: `RQ-${id}`, log: `request.received  RQ-${id} · ${client}` },
  { edge: "e1", node: "validate", status: "fields ok", log: "rule.passed  required_fields" },
];

const routing = (owner, approval) => [
  { edge: "e2", node: "assign", status: `owner: ${owner}`, log: `owner.assigned  ${owner}` },
  { edge: "e3", node: "review", status: "specs checked", log: "rule.passed  requirements" },
  {
    edge: "e4",
    node: "decision",
    status: approval ? "amount > 25k" : "within limits",
    log: approval ? "rule.branch  approval_required" : "rule.branch  auto_approved",
  },
];

const scenarios = [
  [...intake(1042, "Norte Distribución"), ...routing("M. Salinas", true), ...fulfilment(1042, true)],
  [...intake(1043, "Grupo Alcan"), ...routing("R. Ortega", false), ...fulfilment(1043, false)],
  [
    { node: "request", status: "RQ-1044", log: "request.received  RQ-1044 · Constructora Vela" },
    { edge: "e1", node: "validate", status: "missing: PO number", log: "rule.failed  po_number required" },
    { edge: "e2b", node: "missing", status: "client asked", log: "status.changed  awaiting_details" },
    { edge: "e2c", node: "request", status: "RQ-1044 · updated", log: "request.updated  RQ-1044" },
    { edge: "e1", node: "validate", status: "fields ok", log: "rule.passed  required_fields" },
    ...routing("L. Treviño", false),
    ...fulfilment(1044, false),
  ],
];

const legend = ["trigger", "rule", "role", "status", "action"];

const STEP_MS = 1100;
const HOLD_MS = 2200;

const formatClock = (tick) => {
  const total = 9 * 3600 + 41 * 60 + tick * 3;
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

function useProcessLoop(rootRef) {
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const tickRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(scenarios[0].length - 1);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef]);

  useEffect(() => {
    if (!running) return;
    const steps = scenarios[scenario];
    const current = steps[step];
    tickRef.current += 1;
    const entry = { id: tickRef.current, time: formatClock(tickRef.current), type: nodes[current.node].type, text: current.log };
    setLog((prev) => [entry, ...prev].slice(0, 5));

    const isLast = step === steps.length - 1;
    const timer = setTimeout(
      () => {
        if (isLast) {
          setScenario((s) => (s + 1) % scenarios.length);
          setStep(0);
        } else {
          setStep((s) => s + 1);
        }
      },
      isLast ? HOLD_MS : STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [running, scenario, step]);

  const steps = scenarios[scenario];
  const done = steps.slice(0, step + 1);
  return {
    scenario,
    step,
    log,
    running,
    active: steps[step],
    visitedNodes: new Set(done.map((s) => s.node)),
    visitedEdges: new Set(done.filter((s) => s.edge).map((s) => s.edge)),
  };
}

function BoardNode({ id, node, state, status }) {
  const { x, y, label, type, kind, minor } = node;
  const className = `bNode ${state}${minor ? " minor" : ""}`;

  return (
    <g className={className} data-type={type}>
      {kind === "decision" ? (
        <polygon
          className="bShape"
          points={`${x},${y - 40} ${x + 40},${y} ${x},${y + 40} ${x - 40},${y}`}
        />
      ) : (
        <rect
          className="bShape"
          x={x - NODE_W / 2}
          y={y - NODE_H / 2}
          width={NODE_W}
          height={NODE_H}
          rx={kind === "terminal" ? NODE_H / 2 : 6}
        />
      )}

      {kind === "decision" ? (
        <>
          <text className="bTag" x={x} y={y - 52} textAnchor="middle">
            {type}
          </text>
          <text className="bLabel" x={x} y={y + 4} textAnchor="middle">
            {label}
          </text>
        </>
      ) : (
        <>
          <text className="bTag" x={x} y={y - 6} textAnchor="middle">
            {type}
          </text>
          <text className="bLabel" x={x} y={y + 13} textAnchor="middle">
            {label}
          </text>
        </>
      )}

      {state === "active" && status ? (
        <g className="bStatus" key={`${id}-${status}`}>
          <rect
            x={x - (status.length * 6.6 + 24) / 2}
            y={y - (kind === "decision" ? 92 : 62)}
            width={status.length * 6.6 + 24}
            height={22}
            rx={3}
          />
          <circle cx={x - (status.length * 6.6 + 24) / 2 + 10} cy={y - (kind === "decision" ? 81 : 51)} r={2.5} />
          <text x={x + 5} y={y - (kind === "decision" ? 77 : 47)} textAnchor="middle">
            {status}
          </text>
        </g>
      ) : null}
    </g>
  );
}

const mobileOrder = ["request", "validate", "assign", "review", "decision", "manager", "task", "notify", "progress", "completed"];

export default function ProcessBoard() {
  const rootRef = useRef(null);
  const { scenario, step, log, running, active, visitedNodes, visitedEdges } = useProcessLoop(rootRef);

  const nodeState = (id) => {
    if (active.node === id) return "active";
    if (visitedNodes.has(id)) return "visited";
    return "idle";
  };

  return (
    <div className="board" ref={rootRef}>
      <div className="boardCanvas">
        <div className="boardFrameLabel" aria-hidden="true">
          <span>flow / request-to-completion</span>
          <span>v3 · {String(scenario + 1).padStart(2, "0")}/03</span>
        </div>

        <svg
          className="boardSvg"
          viewBox="0 0 1200 520"
          role="img"
          aria-labelledby="board-title board-desc"
        >
          <title id="board-title">Business workflow modeled as software</title>
          <desc id="board-desc">
            A request is received, validated, assigned to an owner and reviewed. If approval is needed a manager signs off, then a task is created, the client is notified, the work moves to in progress, is completed and a follow-up is scheduled. Incomplete requests loop back to ask the client for details.
          </desc>

          <g className="bFrames" aria-hidden="true">
            <rect x="16" y="96" width="1168" height="140" rx="10" />
            <text x="30" y="86">01 — intake &amp; routing</text>
            <rect x="196" y="384" width="988" height="112" rx="10" />
            <text x="210" y="374">02 — fulfilment</text>
          </g>

          <g aria-hidden="true">
            {Object.entries(edges).map(([id, edge]) => (
              <g key={id} className={`bEdge${edge.dashed ? " dashed" : ""}${visitedEdges.has(id) ? " visited" : ""}`}>
                <path d={toPath(edge.points)} />
                {edge.label ? (
                  <text x={edge.lx} y={edge.ly} textAnchor={edge.anchor || "middle"}>
                    {edge.label}
                  </text>
                ) : null}
              </g>
            ))}

            {active.edge ? (
              <g className="bSignal" key={`${scenario}-${step}`}>
                <path className="bTrail" d={toPath(edges[active.edge].points)} pathLength="100" />
                <path className="bComet" d={toPath(edges[active.edge].points)} pathLength="100" />
              </g>
            ) : null}
          </g>

          <g aria-hidden="true">
            {Object.entries(nodes).map(([id, node]) => (
              <BoardNode
                key={id}
                id={id}
                node={node}
                state={nodeState(id)}
                status={active.node === id ? active.status : null}
              />
            ))}
          </g>
        </svg>
      </div>

      <ol className="boardMobile" aria-hidden="true">
        {mobileOrder.map((id) => {
          const node = nodes[id];
          const state = nodeState(id);
          const skipped = id === "manager" && visitedNodes.has("task") && !visitedNodes.has("manager");
          return (
            <li key={id} className={`mNode ${state}${skipped ? " skipped" : ""}`}>
              <span className="mMarker" />
              <span className="mLabel">{node.label}</span>
              <span className="mTag">{skipped ? "skipped" : state === "active" ? active.status : node.type}</span>
            </li>
          );
        })}
      </ol>

      <div className="boardFooter">
        <div className="boardLog" aria-live="off">
          <div className="boardLogHead">
            <span className={`liveDot${running ? " on" : ""}`} />
            <span>event log</span>
            <span className="boardLogMeta">{running ? "running" : "idle"}</span>
          </div>
          <ul>
            {log.map((entry) => (
              <li key={entry.id}>
                <span className="logTime">{entry.time}</span>
                <span className="logType">{entry.type}</span>
                <span className="logText">{entry.text}</span>
              </li>
            ))}
            {log.length === 0 ? (
              <li>
                <span className="logTime">--:--:--</span>
                <span className="logType">idle</span>
                <span className="logText">waiting for trigger</span>
                <span className="cursor" />
              </li>
            ) : null}
          </ul>
        </div>

        <div className="boardLegend">
          {legend.map((type) => (
            <span key={type} className={active && nodes[active.node].type === type ? "on" : ""}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
