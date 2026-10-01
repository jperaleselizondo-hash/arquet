"use client";

import { useEffect, useState } from "react";

const tables = [
  {
    id: 2,
    name: "accounts",
    fields: [
      ["id", "integer"],
      ["created_at", "timestamp"],
      ["name", "text"],
      ["plan", "enum"],
      ["approval_limit", "decimal"],
    ],
  },
  {
    id: 4,
    name: "users",
    fields: [
      ["id", "integer"],
      ["created_at", "timestamp"],
      ["account_id", "integer"],
      ["email", "email"],
      ["role", "enum"],
    ],
  },
  {
    id: 7,
    name: "requests",
    fields: [
      ["id", "integer"],
      ["created_at", "timestamp"],
      ["account_id", "integer"],
      ["title", "text"],
      ["status", "enum"],
      ["created_by", "integer"],
    ],
  },
  {
    id: 9,
    name: "offers",
    fields: [
      ["id", "integer"],
      ["created_at", "timestamp"],
      ["request_id", "integer"],
      ["supplier_id", "integer"],
      ["amount", "decimal"],
      ["status", "enum"],
    ],
  },
  {
    id: 12,
    name: "approvals",
    fields: [
      ["id", "integer"],
      ["created_at", "timestamp"],
      ["request_id", "integer"],
      ["approver_id", "integer"],
      ["decision", "enum"],
    ],
  },
  {
    id: 15,
    name: "documents",
    fields: [
      ["id", "integer"],
      ["created_at", "timestamp"],
      ["request_id", "integer"],
      ["file", "attachment"],
      ["visibility", "enum"],
    ],
  },
];

const endpoints = [
  {
    method: "POST",
    path: "/offers",
    touches: ["offers", "requests", "users"],
    stack: [
      {
        icon: "input",
        title: "Inputs",
        inputs: [
          ["request_id", "integer"],
          ["amount", "decimal"],
          ["notes", "text"],
        ],
      },
      {
        icon: "lock",
        title: "Validate offer",
        rows: [
          ["lock", "Precondition", "amount > 0"],
          ["lock", "Precondition", "supplier.role"],
        ],
      },
      {
        icon: "table",
        title: "Get Record",
        chip: "requests",
        returns: "request",
      },
      {
        icon: "db",
        title: "Database Transaction",
        rows: [
          ["table", "Add Record", "offers"],
          ["table", "Edit Record", "requests"],
        ],
        returns: "offer",
      },
      { icon: "out", title: "Response", chip: "offer", status: "201" },
    ],
  },
  {
    method: "GET",
    path: "/requests",
    touches: ["requests", "accounts", "users"],
    stack: [
      {
        icon: "input",
        title: "Inputs",
        inputs: [
          ["status", "enum"],
          ["page", "integer"],
        ],
      },
      {
        icon: "lock",
        title: "Authenticate",
        rows: [["lock", "Precondition", "auth.user"]],
        returns: "user",
      },
      {
        icon: "table",
        title: "Query All Records",
        chip: "requests",
        returns: "items",
      },
      {
        icon: "layers",
        title: "Add-on",
        rows: [["table", "Join", "accounts"]],
        returns: "account",
      },
      { icon: "out", title: "Response", chip: "items", status: "200" },
    ],
  },
  {
    method: "PATCH",
    path: "/requests/:id",
    touches: ["requests", "approvals", "accounts"],
    stack: [
      {
        icon: "input",
        title: "Inputs",
        inputs: [
          ["id", "integer"],
          ["decision", "enum"],
        ],
      },
      {
        icon: "table",
        title: "Get Record",
        chip: "requests",
        returns: "request",
      },
      {
        icon: "lock",
        title: "Business rule",
        rows: [
          ["lock", "Precondition", "approver.role"],
          ["lock", "If", "amount > limit"],
        ],
      },
      {
        icon: "db",
        title: "Database Transaction",
        rows: [
          ["table", "Add Record", "approvals"],
          ["table", "Edit Record", "requests"],
        ],
        returns: "request",
      },
      { icon: "out", title: "Response", chip: "request", status: "200" },
    ],
  },
];

const STEP_MS = 1100;

function Icon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "input":
      return (
        <svg {...common}>
          <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "table":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M12 10v10" />
        </svg>
      );
    case "db":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
  }
}

function StackNode({ node, state }) {
  return (
    <div className={`dmNode is-${state}`}>
      <div className="dmNodeHead">
        <Icon name={node.icon} />
        <span>{node.title}</span>
      </div>

      <div className="dmNodeBody">
        {node.inputs && (
          <ul className="dmNodeInputs">
            {node.inputs.map(([field, type]) => (
              <li key={field}>
                <span>{field}</span>
                <em>{type}</em>
              </li>
            ))}
          </ul>
        )}

        {node.rows && (
          <ul className="dmNodeRows">
            {node.rows.map(([icon, label, value]) => (
              <li key={label + value}>
                <Icon name={icon} />
                <span>{label}</span>
                <code>{value}</code>
              </li>
            ))}
          </ul>
        )}

        {node.chip && <code className="dmNodeChip">{node.chip}</code>}

        {node.returns && (
          <div className="dmReturn">
            <span>Return as</span>
            <code>{node.returns}</code>
          </div>
        )}

        {node.status && (
          <div className="dmReturn">
            <span>Status</span>
            <code>{node.status}</code>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DataModelBoard() {
  const [run, setRun] = useState({ endpoint: 0, step: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      setRun(({ endpoint, step }) => {
        const length = endpoints[endpoint].stack.length;
        if (step < length + 1) return { endpoint, step: step + 1 };
        return { endpoint: (endpoint + 1) % endpoints.length, step: 0 };
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  const current = endpoints[run.endpoint];

  return (
    <div className="dmBoard">
      <div className="dmChrome">
        <div className="dmChromeTitle">
          <span className="dmDots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>arquet / backend</span>
        </div>
        <span className="dmChromeMeta">workspace · procurement</span>
      </div>

      <div className="dmTables">
        <div className="dmSectionHead">
          <span>Database Tables ({tables.length})</span>
          <span className="dmSectionMeta">schema</span>
        </div>

        <div className="dmTableGrid">
          {tables.map((table, index) => {
            const isTouched = current.touches.includes(table.name);
            return (
              <article
                key={table.name}
                className={`dmTable${isTouched ? " isTouched" : ""}`}
                style={{ "--i": index }}
              >
                <header className="dmTableHead">
                  <span className="dmTableName">
                    <Icon name="table" />
                    {table.name}
                  </span>
                  <span className="dmTableId">#{table.id}</span>
                </header>
                <div className="dmSchema">
                  <span className="dmBrace">{"{"}</span>
                  <ul>
                    {table.fields.map(([field, type]) => (
                      <li key={field}>
                        <b>{field}</b>
                        <span>: {type}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="dmBrace">{"}"}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="dmStack">
        <div className="dmSectionHead">
          <span className="dmEndpointTitle" aria-live="polite">
            <span className="dmMethod">{current.method}</span>
            <span>{current.path}</span>
          </span>
          <ol className="dmEndpointList" aria-label="Endpoints">
            {endpoints.map((endpoint, index) => (
              <li
                key={endpoint.method + endpoint.path}
                className={index === run.endpoint ? "isActive" : undefined}
              >
                {endpoint.method} {endpoint.path}
              </li>
            ))}
          </ol>
        </div>

        <div className="dmCanvas">
          <div className="dmFlow" key={run.endpoint}>
            {current.stack.map((node, index) => {
              const state =
                index < run.step - 1 ? "done" : index === run.step - 1 ? "active" : "idle";
              return (
                <div className="dmFlowItem" key={node.title + index} style={{ "--i": index }}>
                  {index > 0 && (
                    <svg
                      className={`dmWire${index < run.step ? " isLive" : ""}`}
                      viewBox="0 0 40 40"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M0 14 C 20 14, 20 26, 40 26" vectorEffect="non-scaling-stroke" />
                    </svg>
                  )}
                  <StackNode node={node} state={state} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
