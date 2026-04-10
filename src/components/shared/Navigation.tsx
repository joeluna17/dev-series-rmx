import Link from "next/link";
import React from "react";

const navLinks = [
  {
    group: "Docs",
    links: [
      {
        href: "/suspense-overview",
        label: "⚡ Suspense Overview",
        color: "#1e1b4b",
        text: "#a5b4fc",
        border: "#3730a3",
      },
      {
        href: "/industry-data",
        label: "📊 Industry Data",
        color: "#1a2e1a",
        text: "#86efac",
        border: "#166534",
      },
    ],
  },
  {
    group: "Demos",
    links: [
      {
        href: "/pokemon-spinner",
        label: "🔴 Pokémon Spinner",
        color: "#2a1a1a",
        text: "#fca5a5",
        border: "#7f1d1d",
      },
      {
        href: "/pokemon",
        label: "🔴 Pokémon",
        color: "#2a1a1a",
        text: "#fca5a5",
        border: "#7f1d1d",
      },
      {
        href: "/pokemon/innerpage",
        label: "🔴 Pokémon Inner Page",
        color: "#2a1a1a",
        text: "#fca5a5",
        border: "#7f1d1d",
      },
      {
        href: "/pokemon-cl",
        label: "🟡 Pokémon Client List",
        color: "#2a2a1a",
        text: "#fde68a",
        border: "#78350f",
      },
      {
        href: "/pokemon-multi-cl",
        label: "🟣 Pokémon Multi Client",
        color: "#1e1a2e",
        text: "#c4b5fd",
        border: "#4c1d95",
      },
    ],
  },
];

const Navigation = () => {
  return (
    <nav
      style={{
        backgroundColor: "#111",
        borderBottom: "1px solid #2a2a2a",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          color: "#555",
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Dev Series Demo
      </span>

      {navLinks.map(({ group, links }) => (
        <div
          key={group}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              color: "#444",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {group}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {links.map(({ href, label, color, text, border }) => (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "6px 14px",
                  backgroundColor: color,
                  color: text,
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: `1px solid ${border}`,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
