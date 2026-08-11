import { useCountUp, useRiseGroup } from "../hooks/useInView";
import "./Telemetry.css";

/* ————————————————————————————————————————————————
   TELEMETRY — operational proof, instrument-styled.
   One dominant figure, three flanking readouts, and the
   security disciplines beneath. Clearly labeled as
   company-level figures, not a live feed.
   ———————————————————————————————————————————————— */

const READOUTS = [
  ["8+", "data centers", "North America / Europe / Asia"],
  ["10+", "networks", "operated across Proof-of-Stake"],
  ["24:7", "monitoring", "staffed network operations"],
];

const DISCIPLINES = [
  "Self-custody",
  "HSM-backed keys",
  "Role-based access",
  "Automated failover",
  "Deterministic settlement",
  "Verifiable activity",
];

export default function Telemetry() {
  const rise = useRiseGroup(0.06);
  const [ref, uptime] = useCountUp(99.98, { decimals: 2, duration: 2200 });

  return (
    <section className="tel theme-dark" data-theme="dark" ref={rise}>
      <div className="tel__inner">
        <div className="tel__main" ref={ref} data-rise>
          <span className="tel__scale" aria-hidden="true">
            {Array.from({ length: 21 }, (_, i) => (
              <i key={i} className={i % 5 === 0 ? "maj" : ""} />
            ))}
          </span>
          <div className="tel__figure">
            <span className="tel__big">{uptime}</span>
            <span className="tel__pct serif">%</span>
          </div>
          <span className="tel__figure-label">
            validator uptime, <em className="serif">measured.</em>
          </span>
        </div>

        <div className="tel__readouts">
          {READOUTS.map(([value, unit, note]) => (
            <div className="tel__readout" data-rise key={unit}>
              <span className="tel__readout-value">{value}</span>
              <span className="tel__readout-unit">{unit}</span>
              <span className="tel__readout-note mono">{note}</span>
            </div>
          ))}
        </div>

        <div className="tel__disciplines" data-rise>
          {DISCIPLINES.map((d) => (
            <span className="tel__disc" key={d}>
              {d}
            </span>
          ))}
        </div>

        <p className="tel__foot mono" data-rise>
          Company-level operating figures. Not live telemetry.
        </p>
      </div>
    </section>
  );
}
