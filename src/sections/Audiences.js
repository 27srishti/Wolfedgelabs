import { useState } from "react";
import { useRiseGroup } from "../hooks/useInView";
import "./Audiences.css";

/* ————————————————————————————————————————————————
   BUILT FOR — a typographic switchboard.
   Seven audiences as oversized type; pointing at one
   swaps the statement. All information, no cards.
   ———————————————————————————————————————————————— */

const AUDIENCES = [
  ["Institutions", "Infrastructure for serious participation in blockchain networks."],
  ["Asset managers", "Custody-aware access and reliable infrastructure for managed assets."],
  ["Market makers", "Professional trading infrastructure with deterministic settlement."],
  ["Builders", "Infrastructure primitives and technical systems to build against."],
  ["Validators", "Multi-network validator operations experience, shared."],
  ["CC holders", "Liquid staking through Nexus. Rewards variable, never guaranteed."],
  ["Featured Apps", "Committed capital and activity, connected to your application."],
];

export default function Audiences() {
  const rise = useRiseGroup(0.05);
  const [active, setActive] = useState(0);

  return (
    <section className="aud theme-dark sheet" data-theme="dark" ref={rise}>
      <div className="aud__inner">
        <p className="aud__kicker mono" data-rise>
          Built for
        </p>

        <div className="aud__board">
          <ul className="aud__list">
            {AUDIENCES.map(([name], i) => (
              <li key={name}>
                <button
                  className={`aud__name ${active === i ? "on" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  data-rise
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>

          <p className="aud__reading" aria-live="polite" data-rise>
            <span className="aud__reading-n mono">
              {String(active + 1).padStart(2, "0")}
            </span>
            {AUDIENCES[active][1]}
          </p>
        </div>
      </div>
    </section>
  );
}
