"use client";

import { useEffect, useState } from "react";

const VIEW_W = 1000;
const VIEW_H = 540;

const tables = [
  {
    name: "accounts",
    x: 20,
    y: 40,
    fields: [
      ["id", "pk"],
      ["name", ""],
      ["plan", ""],
      ["created_at", ""],
    ],
  },
  {
    name: "requests",
    x: 360,
    y: 40,
    fields: [
      ["id", "pk"],
      ["title", ""],
      ["status", "enum"],
      ["created_by", "fk"],
      ["account_id", "fk"],
    ],
  },
  {
    name: "offers",
    x: 700,
    y: 40,
    fields: [
      ["id", "pk"],
      ["request_id", "fk"],
      ["supplier_id", "fk"],
      ["amount", ""],
      ["status", "enum"],
    ],
  },
  {
    name: "users",
    x: 20,
    y: 330,
    fields: [
      ["id", "pk"],
      ["first_name", ""],
      ["email", ""],
      ["role", "enum"],
      ["account_id", "fk"],
    ],
  },
  {
    name: "approvals",
    x: 360,
    y: 330,
    fields: [
      ["id", "pk"],
      ["request_id", "fk"],
      ["approver_id", "fk"],
      ["decision", "enum"],
    ],
  },
  {
    name: "documents",
    x: 700,
    y: 330,
    fields: [
      ["id", "pk"],
      ["request_id", "fk"],
      ["file_url", ""],
      ["visibility", "enum"],
    ],
  },
];

const relations = [
  { id: "acc-req", d: "M 160 58 H 500", label: "1 : N", lx: 330, ly: 58, pulse: true },
  { id: "req-off", d: "M 500 58 H 840", label: "1 : N", lx: 670, ly: 58, pulse: true },
  { id: "acc-usr", d: "M 100 120 V 400", label: "1 : N", lx: 100, ly: 285 },
  { id: "req-apr", d: "M 500 120 V 400", label: "1 : 1", lx: 500, ly: 285, pulse: true },
  { id: "req-doc", d: "M 600 220 H 670 V 348 H 840", label: "1 : N", lx: 670, ly: 285 },
  { id: "usr-apr", d: "M 160 348 H 500", label: "approver", lx: 330, ly: 348 },
];

const endpoints = [
  { method: "GET", path: "/requests", touches: ["requests", "accounts"], status: "200" },
  { method: "POST", path: "/requests", touches: ["requests", "users"], status: "201" },
  { method: "PATCH", path: "/requests/:id", touches: ["requests", "approvals"], status: "200" },
  { method: "GET", path: "/accounts/:id", touches: ["accounts", "users"], status: "200" },
  { method: "POST", path: "/offers", touches: ["offers", "requests"], status: "201" },
  { method: "PATCH", path: "/offers/:id/status", touches: ["offers", "documents"], status: "200" },
];

const rules = [
  ["RULE", "Offers above 10,000 require an approval"],
  ["STATUS", "draft → submitted → approved → closed"],
  ["PERMISSION", "documents.visibility follows users.role"],
];

const chips = ["ENTITY", "RELATION", "RULE", "ENDPOINT", "STATUS", "PERMISSION"];

const pct = (value, total) => `${(value / total) * 100}%`;

export default function DataModelBoard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % endpoints.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const touched = endpoints[active].touches;

  return (
    <div className="dmBoard">
      <div className="dmChrome">
        <div className="dmChromeTitle">
          <span className="dmDots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>arquet / backend.schema</span>
        </div>
        <ul className="dmChips" aria-label="Board legend">
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>

      <div className="dmBody">
        <div className="dmCanvas">
          <div className="dmCanvasLabel">
            <span>ENTITY MAP</span>
            <span>6 entities · 6 relations</span>
          </div>

          <div className="dmStage">
            <svg
              className="dmLinks"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {relations.map((relation, index) => (
                <g key={relation.id}>
                  <path
                    id={`dm-${relation.id}`}
                    d={relation.d}
                    className="dmLink"
                    style={{ "--i": index }}
                    vectorEffect="non-scaling-stroke"
                  />
                  {relation.pulse && (
                    <circle r="3.5" className="dmPulse">
                      <animateMotion
                        dur="3.6s"
                        begin={`${index * 0.9}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href={`#dm-${relation.id}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            {relations.map((relation) => (
              <span
                key={`${relation.id}-label`}
                className="dmRelLabel"
                style={{ left: pct(relation.lx, VIEW_W), top: pct(relation.ly, VIEW_H) }}
                aria-hidden="true"
              >
                {relation.label}
              </span>
            ))}

            {tables.map((table, index) => {
              const isTouched = touched.includes(table.name);
              return (
                <div
                  key={table.name}
                  className={`dmTable${isTouched ? " isTouched" : ""}`}
                  style={{
                    left: pct(table.x, VIEW_W),
                    top: pct(table.y, VIEW_H),
                    "--i": index,
                  }}
                >
                  <div className="dmTableHead">
                    <span>{table.name}</span>
                    <span className="dmTableTag">ENTITY</span>
                  </div>
                  <ul>
                    {table.fields.map(([field, kind]) => (
                      <li key={field}>
                        <span>{field}</span>
                        {kind && <em className={`dmKind dmKind-${kind}`}>{kind}</em>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="dmSide">
          <div className="dmPanel">
            <div className="dmPanelHead">
              <span>ENDPOINTS</span>
              <span className="dmLive">
                <i aria-hidden="true" />
                live
              </span>
            </div>
            <ul className="dmEndpoints">
              {endpoints.map((endpoint, index) => (
                <li
                  key={endpoint.method + endpoint.path}
                  className={index === active ? "isActive" : undefined}
                >
                  <span className={`dmMethod dmMethod-${endpoint.method}`}>
                    {endpoint.method}
                  </span>
                  <span className="dmPath">{endpoint.path}</span>
                  <span className="dmStatus">{endpoint.status}</span>
                </li>
              ))}
            </ul>
            <div className="dmQuery" aria-live="polite">
              <span className="dmQueryLabel">touches</span>
              <span>{touched.join(" · ")}</span>
            </div>
          </div>

          <div className="dmPanel">
            <div className="dmPanelHead">
              <span>BUSINESS RULES</span>
            </div>
            <ul className="dmRules">
              {rules.map(([kind, text]) => (
                <li key={text}>
                  <span className="dmRuleKind">{kind}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <ol className="dmPipeline" aria-label="How business logic becomes software">
        {["Business logic", "Entities", "Relationships", "Rules", "Software"].map(
          (step) => (
            <li key={step}>{step}</li>
          ),
        )}
      </ol>
    </div>
  );
}
