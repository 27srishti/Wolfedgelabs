import { Marquee } from "./Kit";
import "./Networks.css";

/* Networks WolfEdge secures. Each mark is a clean geometric glyph in
   the site's own hand, carried on the network's own accent colour.
   Swap `mark` for a real brand SVG to replace any one. */

export const NETWORKS = [
  {
    name: "Canton",
    color: "#6b8cff",
    mark: <path d="M12 3l7 4v10l-7 4-7-4V7z" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  },
  {
    name: "Core",
    color: "#ff8a3d",
    mark: (
      <>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Oasis",
    color: "#2fd3a5",
    mark: (
      <>
        <circle cx="8" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    name: "SKALE",
    color: "#9b6bff",
    mark: (
      <path
        d="M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 3v18 M4 7.5l16 9 M20 7.5l-16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Casper",
    color: "#ff5c7a",
    mark: (
      <path
        d="M6 20v-8a6 6 0 0 1 12 0v8l-2-1.6-2 1.6-2-1.6-2 1.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Fuse",
    color: "#b4f34d",
    mark: <path d="M13 3L5 13.5h5l-1 7.5 8-11h-5z" fill="currentColor" />,
  },
  {
    name: "deBridge",
    color: "#f5c451",
    mark: (
      <>
        <path d="M3 15c0-4.4 4-8 9-8s9 3.6 9 8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 17h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 15v2M16 15v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    name: "Starknet",
    color: "#ff7a5c",
    mark: (
      <path
        d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    name: "Agoric",
    color: "#ff4d4d",
    mark: (
      <>
        <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          transform="rotate(-28 12 12)"
        />
      </>
    ),
  },
  {
    name: "DIA",
    color: "#d879ff",
    mark: (
      <path
        d="M12 3l7 6-7 12-7-12z M5 9h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Lava",
    color: "#ff9e2c",
    mark: (
      <path
        d="M12 3c2.8 4 5 6 5 9a5 5 0 0 1-10 0c0-1.6.8-3 1.8-3.9C10 9.6 12 8 12 3z"
        fill="currentColor"
      />
    ),
  },
];

function Logo({ name, mark }) {
  return (
    <span className="net__item">
      <svg viewBox="0 0 24 24" className="net__mark" aria-hidden="true">
        {mark}
      </svg>
      <span className="net__name">{name}</span>
    </span>
  );
}

/* One infinite marquee row of every network, coloured. */
export function NetworkMarquee({ speed = 44, reverse = false, className = "" }) {
  return (
    <div className={`net ${className}`}>
      <Marquee className="net__row" speed={speed} reverse={reverse}>
        {NETWORKS.map((n) => (
          <Logo key={n.name} {...n} />
        ))}
      </Marquee>
      <ul className="net__sr">
        {NETWORKS.map((n) => (
          <li key={n.name}>{n.name}</li>
        ))}
      </ul>
    </div>
  );
}
