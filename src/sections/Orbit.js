import { useState } from "react";
import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Orbit.css";

/* ————————————————————————————————————————————————
   ECOSYSTEM — an interactive orbit.
   WolfEdge at the centre; the things it builds and secures
   in orbit around it. Touch one and its relationship to the
   core lights up. The system explains itself.
   ———————————————————————————————————————————————— */

const R = 42; // orbit radius in % of the stage
const BODIES = [
  {
    key: "canton",
    name: "Canton",
    angle: -90,
    line: "The settlement layer everything here runs on. WolfEdge operates an active Canton validator.",
  },
  {
    key: "calden",
    name: "Calden",
    angle: -18,
    line: "Secure access to the assets the infrastructure underneath already protects.",
  },
  {
    key: "cardiv",
    name: "Cardiv",
    angle: 54,
    line: "Markets running on the same rails our validators help settle.",
  },
  {
    key: "nexus",
    name: "Nexus",
    angle: 126,
    line: "Routes committed capital from CC holders into Featured App participation.",
  },
  {
    key: "apps",
    name: "Featured Apps",
    angle: 198,
    line: "Receive committed capital and activity through Nexus and the wider stack.",
  },
];

const DEFAULT_LINE =
  "Products, infrastructure and the network reinforce one another. One connected system, compounding.";

const pos = (angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + R * Math.cos(rad),
    y: 50 + R * Math.sin(rad),
  };
};

export default function Orbit() {
  const rise = useRiseGroup(0.08);
  const [active, setActive] = useState(null);
  const current = BODIES.find((b) => b.key === active);

  return (
    <section className="orbit sheet" ref={rise}>
      <div className="orbit__inner">
        <div className="orbit__copy">
          <Lines
            className="orbit__title"
            lines={[
              <>Nothing here</>,
              <>
                works <em className="serif orbit__em">alone.</em>
              </>,
            ]}
          />
          <p
            className={`orbit__reading ${current ? "orbit__reading--lit" : ""}`}
            aria-live="polite"
          >
            {current ? (
              <>
                <em className="serif orbit__lead">{current.name}.</em>{" "}
                {current.line}
              </>
            ) : (
              DEFAULT_LINE
            )}
          </p>
        </div>

        <div
          className="orbit__stage"
          data-rise
          onMouseLeave={() => setActive(null)}
        >
          <svg className="orbit__wires" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle className="orbit__ring" cx="50" cy="50" r={R} />
            {BODIES.map((b) => {
              const { x, y } = pos(b.angle);
              return (
                <line
                  key={b.key}
                  className={`orbit__wire ${active === b.key ? "lit" : ""}`}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                />
              );
            })}
          </svg>

          <span className="orbit__core">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 4 L9 20 L12 11 L15 20 L21 4"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            WolfEdge
          </span>

          {BODIES.map((b) => {
            const { x, y } = pos(b.angle);
            return (
              <button
                key={b.key}
                className={`orbit__body ${active === b.key ? "on" : ""}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setActive(b.key)}
                onFocus={() => setActive(b.key)}
                onClick={() => setActive(active === b.key ? null : b.key)}
                aria-pressed={active === b.key}
              >
                {b.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
