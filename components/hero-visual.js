const navItems = ["Requests", "Quotations", "Suppliers", "Approvals", "Reports"];

const stats = [
  { label: "Open requests", value: "128" },
  { label: "Awaiting approval", value: "14" },
  { label: "Avg. response", value: "1.8d" },
];

const rows = [
  {
    id: "RFQ-1042",
    account: "Norfield Industrial",
    stage: "Supplier quotes",
    status: "In review",
    tone: "pending",
  },
  {
    id: "RFQ-1041",
    account: "Halden Engineering",
    stage: "Manager approval",
    status: "Approved",
    tone: "done",
  },
  {
    id: "RFQ-1040",
    account: "Corvant Supply Co.",
    stage: "Documents",
    status: "Missing info",
    tone: "alert",
  },
  {
    id: "RFQ-1039",
    account: "Meridian Fabrication",
    stage: "Quotation sent",
    status: "Approved",
    tone: "done",
  },
];

const logLines = [
  "rfq.1042  supplier_quote.received  → route: pricing",
  "rfq.1041  approval.granted         → notify: customer",
  "rfq.1040  validation.failed        → request: drawings",
  "rfq.1039  quotation.sent           → follow_up: 3d",
  "rfq.1038  status.updated           → stage: closed_won",
];

export default function HeroVisual() {
  return (
    <div className="heroVisual" aria-hidden="true">
      <div className="appWindow">
        <div className="windowBar">
          <span className="windowDots">
            <i />
            <i />
            <i />
          </span>
          <span className="windowTitle">arquet / rfq-workflow</span>
          <span className="windowLive">
            <span className="liveDot" /> live
          </span>
        </div>

        <div className="windowBody">
          <aside className="appSidebar">
            {navItems.map((item, index) => (
              <span
                key={item}
                className={index === 0 ? "sideItem sideItemActive" : "sideItem"}
              >
                {item}
              </span>
            ))}
          </aside>

          <div className="appMain">
            <div className="appStats">
              {stats.map((stat, index) => (
                <div
                  className="statCard"
                  key={stat.label}
                  style={{ animationDelay: `${600 + index * 120}ms` }}
                >
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <span className="statBar">
                    <span style={{ animationDelay: `${900 + index * 150}ms` }} />
                  </span>
                </div>
              ))}
            </div>

            <div className="appTable">
              <div className="tableHead">
                <span>ID</span>
                <span>Account</span>
                <span className="hideSm">Stage</span>
                <span>Status</span>
              </div>

              {rows.map((row, index) => (
                <div
                  className={index === 0 ? "tableRow tableRowScan" : "tableRow"}
                  key={row.id}
                  style={{ animationDelay: `${1000 + index * 140}ms` }}
                >
                  <span className="rowId">{row.id}</span>
                  <span>{row.account}</span>
                  <span className="hideSm">{row.stage}</span>
                  <span className={`statusChip status-${row.tone}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="appLog">
              <div className="logTrack">
                {[...logLines, ...logLines].map((line, index) => (
                  <span key={index}>
                    <em>$</em> {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
