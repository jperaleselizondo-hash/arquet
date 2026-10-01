const nodes = [
  { label: "Request received", meta: "trigger" },
  { label: "Validate information", meta: "rule" },
  { label: "Route to approver", meta: "role" },
  { label: "Decision recorded", meta: "status" },
  { label: "Customer notified", meta: "action" },
];

export default function FlowDiagram() {
  return (
    <div className="flowDiagram" aria-hidden="true">
      {nodes.map((node, index) => (
        <div
          className="flowNode"
          key={node.label}
          style={{ "--i": index }}
        >
          <span className="flowMarker" />
          <span className="flowLabel">{node.label}</span>
          <span className="flowMeta">{node.meta}</span>
        </div>
      ))}
    </div>
  );
}
