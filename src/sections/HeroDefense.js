import { NETWORKS } from "../components/Networks";
import "./HeroDefense.css";

/* HERO — "Defense" (v5) — the dark "Asset Defense" design carrying
   WolfEdge content: rounded near-black panel, vast white glow, circuit
   traces with light beams flowing inward, network chips with live ops
   metrics, glass pill nav, and a network strip below. `dfx`-scoped. */

const byName = Object.fromEntries(NETWORKS.map((n) => [n.name, n]));

const NAV = [
  ["Products", "#products"],
  ["Infrastructure", "#infrastructure"],
  ["Engineering", "#engineering"],
  ["Canton", "#canton"],
];

/* four networks on the traces, each with an ops metric. Positions are
   derived from the trace junction nodes (viewBox % minus half the 36px
   icon) so each icon sits exactly on its node. */
const CHIPS = [
  { name: "Canton", val: "99.98% uptime", style: { left: "calc(10.25% - 18px)", top: "calc(28.3% - 18px)" } },
  { name: "Core", val: "24/7 ops", style: { right: "calc(10.25% - 18px)", top: "calc(28.3% - 18px)" }, align: "right" },
  { name: "SKALE", val: "1.2k peers", style: { left: "calc(7.25% - 18px)", top: "calc(62.4% - 18px)" } },
  { name: "Lava", val: "140ms p95", style: { right: "calc(7.25% - 18px)", top: "calc(62.4% - 18px)" }, align: "right" },
];

const STRIP = ["Canton", "Core", "Oasis", "SKALE", "Casper", "Fuse", "deBridge"];

function Chip({ c }) {
  const n = byName[c.name];
  return (
    <div className={`dfx-chip ${c.align === "right" ? "dfx-chip--right" : ""}`} style={c.style}>
      <span className="dfx-chip-ic">
        <svg viewBox="0 0 24 24" aria-hidden="true">{n.mark}</svg>
      </span>
      <span className="dfx-chip-name">
        <i className="dfx-chip-dot" /> {n.name}
      </span>
      <span className="dfx-chip-val">{c.val}</span>
    </div>
  );
}

export default function HeroDefense() {
  return (
    <div className="dfx">
      <div className="dfx-panel">
        <span className="dfx-glow" aria-hidden="true" />
        <span className="dfx-glow dfx-glow--soft" aria-hidden="true" />

        {/* circuit traces + light beams flowing inward. Rounded bends,
           junction nodes seated on the chips, and a gradient fade so
           each line dissolves toward the center instead of stopping. */}
        <svg
          className="dfx-traces"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="dfxGradL" x1="0" y1="0" x2="470" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dfxGradR" x1="1200" y1="0" x2="730" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            {/* the lower traces stop short of the text column */}
            <linearGradient id="dfxGradLb" x1="0" y1="0" x2="315" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dfxGradRb" x1="1200" y1="0" x2="885" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            {/* the lower beams dim out before they reach the text */}
            <linearGradient id="dfxBeamLb" x1="0" y1="0" x2="315" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="0.75" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dfxBeamRb" x1="1200" y1="0" x2="885" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="0.75" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="dfx-trace--l" d="M-10 198 H196 Q208 198 216 206 L252 242 Q260 250 272 250 H470" />
          <path className="dfx-trace--r" d="M1210 198 H1004 Q992 198 984 206 L948 242 Q940 250 928 250 H730" />
          <path className="dfx-trace--lb" d="M-10 437 H150 Q162 437 170 429 L206 393 Q214 385 226 385 H315" />
          <path className="dfx-trace--rb" d="M1210 437 H1050 Q1038 437 1030 429 L994 393 Q986 385 974 385 H885" />
          <circle cx="123" cy="198" r="3" />
          <circle cx="1077" cy="198" r="3" />
          <circle cx="87" cy="437" r="3" />
          <circle cx="1113" cy="437" r="3" />
          <g className="dfx-beams">
            <path d="M-10 198 H196 Q208 198 216 206 L252 242 Q260 250 272 250 H470" />
            <path d="M1210 198 H1004 Q992 198 984 206 L948 242 Q940 250 928 250 H730" />
            <path className="dfx-beam--lb" d="M-10 437 H150 Q162 437 170 429 L206 393 Q214 385 226 385 H315" />
            <path className="dfx-beam--rb" d="M1210 437 H1050 Q1038 437 1030 429 L994 393 Q986 385 974 385 H885" />
          </g>
        </svg>

        {/* light streaks */}
        <span className="dfx-streaks" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>

        {/* ── nav ── */}
        <header className="dfx-nav">
          <a className="dfx-brand" href="#hero">
            WolfEdge Labs
          </a>

          <nav className="dfx-menu" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <a key={href} className="dfx-menu-link" href={href}>
                {label}
              </a>
            ))}
            <a className="dfx-protect" href="#infrastructure">
              99.98% Uptime <span aria-hidden="true">↗</span>
            </a>
            <span className="dfx-shield" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 3l7 3v5c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V6z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </nav>

          <a className="dfx-account" href="#contact">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M5.5 19.5c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Talk to us
          </a>
        </header>

        {/* network chips */}
        {CHIPS.map((c) => (
          <Chip key={c.name} c={c} />
        ))}

        {/* ── center ── */}
        <div className="dfx-center">
          <a className="dfx-spark" href="#canton">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            Live on Canton mainnet <span aria-hidden="true">→</span>
          </a>

          <h1 className="dfx-title">
            Built beneath the <span className="dfx-title-fade">market.</span>
          </h1>

          <p className="dfx-sub">
            WolfEdge runs the validators, RPC and node infrastructure behind
            Canton — and builds the products institutions use on it.
          </p>

          <div className="dfx-cta">
            <a className="dfx-open" href="#products">
              Explore systems <span aria-hidden="true">↗</span>
            </a>
            <a className="dfx-discover" href="#contact">
              Talk to us
            </a>
          </div>
        </div>

        {/* ── bottom rail ── */}
        <div className="dfx-scroll">
          <span className="dfx-scroll-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 5v13M6.5 12.5L12 18l5.5-5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          01/08 . Scroll down
        </div>

        <div className="dfx-horizons">
          <span className="dfx-horizons-label">Canton mainnet</span>
          <span className="dfx-horizons-bar" aria-hidden="true">
            <i className="on" />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>

      {/* ── networks we secure ── */}
      <div className="dfx-logos" aria-hidden="true">
        {STRIP.map((name) => (
          <span key={name} className="dfx-logo">
            <svg viewBox="0 0 24 24" className="dfx-logo-glyph">{byName[name].mark}</svg>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
