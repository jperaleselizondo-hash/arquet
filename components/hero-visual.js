"use client";

import { useState } from "react";

const iconPaths = {
  live: "M5 12a7 7 0 0 1 2-5M19 12a7 7 0 0 0-2-5M8.5 12a3.5 3.5 0 0 1 1-2.5M15.5 12a3.5 3.5 0 0 0-1-2.5M12 12h.01",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  vault: "M5 8h14v12H5zM9 8V5h6v3",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 12l2.5 2.5 4.5-5",
  buyer: "M3 12l5-5h6l7 7-5 5-7-7zM10 10h.01",
  supplier: "M4 20V9l8-5 8 5v11M9 20v-6h6v6",
  accounts: "M4 20h16M6 20V10M10 20V6M14 20v-8M18 20V4",
  members: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6",
  user: "M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 20a6 6 0 0 1 10-4.5M17 14v6M14 17h6",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  billing: "M3 6h18v12H3zM3 10h18",
  signout: "M10 4H5v16h5M14 8l4 4-4 4M18 12H9",
  panel: "M4 5h16v14H4zM9 5v14",
  chevron: "M7 10l5 5 5-5",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4 12H2M22 12h-2",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
  arrow: "M7 17L17 7M9 7h8v8",
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
  [{ id: "live", label: "Live Feed", icon: "live" }],
  [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "vault", label: "Document Vault", icon: "vault" },
    { id: "verification", label: "Verification", icon: "check" },
  ],
  [
    { id: "buyer", label: "Buyer", icon: "buyer", children: ["Solicitations", "Offers"] },
    { id: "supplier", label: "Supplier", icon: "supplier", children: ["Catalog", "Submitted"] },
  ],
  [
    { id: "accounts", label: "Accounts", icon: "accounts" },
    { id: "members", label: "Account Members", icon: "members" },
  ],
  [
    { id: "userSettings", label: "User Settings", icon: "user" },
    { id: "accountSettings", label: "Account Settings", icon: "settings" },
    { id: "billing", label: "Billing", icon: "billing" },
  ],
];

const allItems = navGroups.flat().flatMap((item) => [
  item,
  ...(item.children || []).map((child) => ({ id: `${item.id}-${child}`, label: child, parent: item.label })),
]);

function Bar({ w, h = 8, className = "" }) {
  return <span className={`skel ${className}`} style={{ width: w, height: h }} />;
}

function Sidebar({ active, onSelect, open, setOpen }) {
  return (
    <aside className="mockSidebar">
      <div className="mockBrand">
        <span className="mockBrandMark" />
        <Bar w="56px" h={9} />
      </div>

      <nav className="mockNav" aria-label="Demo app navigation">
        {navGroups.map((group, gi) => (
          <div className="mockNavGroup" key={gi}>
            {group.map((item) => {
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

      <button type="button" className="mockSignOut">
        <Icon name="signout" />
        <span className="mockNavLabel">Sign Out</span>
      </button>
    </aside>
  );
}

function DashboardContent({ pageKey }) {
  return (
    <div className="mockContent" key={pageKey}>
      <span className="mockBadge">
        <Bar w="44px" h={6} />
      </span>
      <Bar w="62%" h={16} className="skelStrong" />
      <Bar w="22%" h={11} />

      <div className="mockStats">
        {[0, 1, 2, 3].map((i) => (
          <div className="mockCard mockStat" key={i} style={{ "--i": i }}>
            <Bar w="58%" h={7} />
            <Bar w="34%" h={14} className="skelStrong" />
            <Bar w="46%" h={6} />
          </div>
        ))}
      </div>

      <div className="mockLower">
        <div className="mockLowerMain">
          <div className="mockRowHead">
            <Bar w="120px" h={10} className="skelStrong" />
            <span className="mockPill"><Bar w="70px" h={6} /></span>
          </div>
          <div className="mockTiles">
            {[0, 1, 2].map((i) => (
              <div className="mockCard mockTile" key={i} style={{ "--i": i + 4 }}>
                <span className="mockMedia" />
                <span className="mockTag"><Bar w="22px" h={5} /></span>
                <Bar w="72%" h={8} />
                <div className="mockTileFoot">
                  <span className="mockLiveDot" />
                  <Bar w="40%" h={6} />
                  <Icon name="arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mockLowerSide">
          <div className="mockRowHead">
            <Bar w="110px" h={10} className="skelStrong" />
            <span className="mockPill"><Bar w="60px" h={6} /></span>
          </div>
          <div className="mockCard mockProfile" style={{ "--i": 7 }}>
            <span className="mockMedia mockCover" />
            <span className="mockAvatarBadge" />
            <Bar w="62%" h={9} className="skelStrong" />
            <Bar w="80%" h={6} />
            <div className="mockTileFoot">
              <span className="mockLiveDot" />
              <Bar w="34%" h={6} />
              <Bar w="28%" h={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState({ buyer: false, supplier: false });
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
                <span>Home</span>
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
                <span className="mockAvatar" />
              </span>
            </header>

            <DashboardContent pageKey={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
