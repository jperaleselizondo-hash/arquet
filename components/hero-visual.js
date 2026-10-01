"use client";

import { useState } from "react";

const iconPaths = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  chart: "M4 20h16M7 16v-5M12 16V7M17 16v-8",
  inbox: "M4 13l2.5-8h11L20 13v6H4zM4 13h5l1 2h4l1-2h5",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6",
  folder: "M3 7h6l2 2h10v10H3z",
  invoice: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  team: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  plug: "M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  billing: "M3 6h18v12H3zM3 10h18",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4",
  panel: "M4 5h16v14H4zM9 5v14",
  chevron: "M7 10l5 5 5-5",
  updown: "M8 9l4-4 4 4M8 15l4 4 4-4",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4 12H2M22 12h-2",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
  plus: "M12 5v14M5 12h14",
};

function Icon({ name }) {
  return (
    <svg
      className="mockIcon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

const navGroups = [
  {
    items: [
      { id: "overview", label: "Overview", icon: "grid" },
      { id: "analytics", label: "Analytics", icon: "chart" },
      { id: "inbox", label: "Inbox", icon: "inbox", count: 3 },
    ],
  },
  {
    title: "Workspace",
    items: [
      { id: "customers", label: "Customers", icon: "users", children: ["All customers", "Segments"] },
      { id: "projects", label: "Projects", icon: "folder", children: ["Active", "Archived"] },
      { id: "invoices", label: "Invoices", icon: "invoice" },
    ],
  },
  {
    title: "Organization",
    items: [
      { id: "team", label: "Team", icon: "team" },
      { id: "integrations", label: "Integrations", icon: "plug" },
      { id: "settings", label: "Settings", icon: "settings" },
      { id: "billing", label: "Billing", icon: "billing" },
    ],
  },
];

const allItems = navGroups.flatMap((group) =>
  group.items.flatMap((item) => [
    item,
    ...(item.children || []).map((child) => ({ id: `${item.id}-${child}`, label: child, parent: item.label })),
  ]),
);

const chartBars = [38, 52, 44, 61, 48, 70, 58, 76, 64, 82, 72, 90];

function Bar({ w, h = 8, className = "" }) {
  return <span className={`skel ${className}`} style={{ width: w, height: h }} />;
}

function Sidebar({ active, onSelect, open, setOpen }) {
  return (
    <aside className="mockSidebar">
      <button type="button" className="mockWorkspace">
        <span className="mockBrandMark" />
        <span className="mockWorkspaceText">
          <Bar w="64px" h={8} className="skelStrong" />
          <Bar w="40px" h={6} />
        </span>
        <Icon name="updown" />
      </button>

      <div className="mockSearch">
        <Icon name="search" />
        <Bar w="50%" h={6} />
        <kbd>/</kbd>
      </div>

      <nav className="mockNav" aria-label="Demo app navigation">
        {navGroups.map((group, gi) => (
          <div className="mockNavGroup" key={gi}>
            {group.title && <span className="mockNavTitle">{group.title}</span>}
            {group.items.map((item) => {
              const expanded = open[item.id];
              const isActive = active === item.id || active.startsWith(`${item.id}-`);
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    className={`mockNavItem${isActive ? " isActive" : ""}`}
                    aria-expanded={item.children ? !!expanded : undefined}
                    onClick={() =>
                      item.children
                        ? setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))
                        : onSelect(item.id)
                    }
                  >
                    <Icon name={item.icon} />
                    <span className="mockNavLabel">{item.label}</span>
                    {item.count && <span className="mockCount">{item.count}</span>}
                    {item.children && (
                      <span className={`mockChevron${expanded ? " isOpen" : ""}`}>
                        <Icon name="chevron" />
                      </span>
                    )}
                  </button>
                  {item.children && (
                    <div className={`mockSub${expanded ? " isOpen" : ""}`}>
                      <div>
                        {item.children.map((child) => {
                          const id = `${item.id}-${child}`;
                          return (
                            <button
                              type="button"
                              key={id}
                              tabIndex={expanded ? 0 : -1}
                              className={`mockSubItem${active === id ? " isActive" : ""}`}
                              onClick={() => onSelect(id)}
                            >
                              {child}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mockUser">
        <span className="mockAvatar" />
        <span className="mockWorkspaceText">
          <Bar w="70px" h={7} className="skelStrong" />
          <Bar w="90px" h={6} />
        </span>
      </div>
    </aside>
  );
}

function DashboardContent({ pageKey, title }) {
  return (
    <div className="mockContent" key={pageKey}>
      <div className="mockPageHead">
        <div className="mockPageTitle">
          <h3>{title}</h3>
          <Bar w="180px" h={7} />
        </div>
        <span className="mockPill">
          <Icon name="plus" />
          <Bar w="44px" h={6} />
        </span>
      </div>

      <div className="mockStats">
        {[0, 1, 2, 3].map((i) => (
          <div className="mockCard mockStat" key={i} style={{ "--i": i }}>
            <Bar w="52%" h={7} />
            <div className="mockStatRow">
              <Bar w="40%" h={14} className="skelStrong" />
              <span className={`mockDelta${i === 2 ? " isDown" : ""}`}>{i === 2 ? "-2.1%" : `+${(i + 1) * 4.2}%`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mockLower">
        <div className="mockCard mockChart" style={{ "--i": 4 }}>
          <div className="mockRowHead">
            <Bar w="96px" h={9} className="skelStrong" />
            <span className="mockSegment">
              <span className="isOn">12m</span>
              <span>30d</span>
              <span>7d</span>
            </span>
          </div>
          <div className="mockBars">
            {chartBars.map((h, i) => (
              <span key={i} style={{ "--h": `${h}%`, "--b": i }} />
            ))}
          </div>
        </div>

        <div className="mockCard mockActivity" style={{ "--i": 5 }}>
          <Bar w="80px" h={9} className="skelStrong" />
          {[0, 1, 2, 3].map((i) => (
            <div className="mockListRow" key={i}>
              <span className="mockAvatarSm" />
              <span className="mockWorkspaceText">
                <Bar w={`${70 - i * 8}%`} h={7} />
                <Bar w="40%" h={5} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mockCard mockTable" style={{ "--i": 6 }}>
        <div className="mockTableRow isHead">
          <Bar w="50px" h={6} />
          <Bar w="40px" h={6} />
          <Bar w="36px" h={6} />
          <Bar w="30px" h={6} />
        </div>
        {[0, 1, 2].map((i) => (
          <div className="mockTableRow" key={i}>
            <span className="mockCell">
              <span className="mockAvatarSm" />
              <Bar w={`${90 - i * 14}px`} h={7} className="skelStrong" />
            </span>
            <Bar w="60px" h={6} />
            <span className={`mockStatus${i === 1 ? " isPending" : ""}`}>{i === 1 ? "Pending" : "Active"}</span>
            <Bar w="38px" h={6} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState({ customers: false, projects: false });
  const [light, setLight] = useState(false);

  const current = allItems.find((item) => item.id === active);

  return (
    <div className="heroVisual">
      <div className={`appWindow mockApp${light ? " isLight" : ""}`}>
        <div className="windowBar">
          <span className="windowDots">
            <i />
            <i />
            <i />
          </span>
          <span className="windowTitle">app.yourcompany.com</span>
          <span className="windowLive">
            <span className="liveDot" /> interactive
          </span>
        </div>

        <div className={`mockBody${sidebarOpen ? "" : " isCollapsed"}`}>
          <Sidebar active={active} onSelect={setActive} open={open} setOpen={setOpen} />

          <div className="mockMain">
            <header className="mockTopbar">
              <button
                type="button"
                className="mockToggle"
                aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                aria-pressed={!sidebarOpen}
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <Icon name="panel" />
              </button>
              <span className="mockCrumbs">
                <span>Workspace</span>
                <span aria-hidden="true">/</span>
                {current?.parent && (
                  <>
                    <span>{current.parent}</span>
                    <span aria-hidden="true">/</span>
                  </>
                )}
                <strong>{current?.label}</strong>
              </span>
              <span className="mockTopRight">
                <button
                  type="button"
                  className={`mockSwitch${light ? " isOn" : ""}`}
                  aria-label="Toggle demo theme"
                  aria-pressed={light}
                  onClick={() => setLight((v) => !v)}
                >
                  <span />
                </button>
                <Icon name={light ? "sun" : "moon"} />
                <span className="mockDivider" />
                <Icon name="bell" />
              </span>
            </header>

            <DashboardContent pageKey={active} title={current?.label} />
          </div>
        </div>
      </div>
    </div>
  );
}
