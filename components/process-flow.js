const GRID = [16, 32, 48];
const SCATTERED = [
  [12, 18], [41, 9], [54, 27], [22, 36], [35, 30],
  [9, 52], [47, 49], [28, 56], [57, 58],
];
const ALIGNED = GRID.flatMap((y) => GRID.map((x) => [x, y]));

function Dots({ points, filled }) {
  return points.map(([cx, cy]) => (
    <circle
      key={`${cx}-${cy}`}
      cx={cx}
      cy={cy}
      r="3.2"
      className={filled ? "flowDot isFilled" : "flowDot"}
    />
  ));
}

function Glyph({ stage }) {
  return (
    <svg viewBox="0 0 64 64" className="flowGlyph" aria-hidden="true">
      {stage === 0 && <Dots points={SCATTERED} />}
      {stage === 1 && <Dots points={ALIGNED} />}
      {stage === 2 && (
        <>
          {GRID.map((p) => (
            <g key={p} className="flowWire">
              <line x1="16" y1={p} x2="48" y2={p} />
              <line x1={p} y1="16" x2={p} y2="48" />
            </g>
          ))}
          <Dots points={ALIGNED} filled />
        </>
      )}
      {stage === 3 && <rect x="12" y="12" width="40" height="40" className="flowSolid" />}
    </svg>
  );
}

export default function ProcessFlow({ steps }) {
  return (
    <ol className="flow">
      {steps.map((step, index) => (
        <li
          className="flowStep"
          key={step.number}
          data-reveal
          style={{ "--flow-delay": `${index * 140}ms` }}
        >
          <div className="flowVisual">
            <Glyph stage={index} />
            {index < steps.length - 1 && <span className="flowArrow" aria-hidden="true" />}
          </div>
          <span className="flowState">{step.state}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
