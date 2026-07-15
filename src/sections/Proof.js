import { useCountUp, useRiseGroup } from "../hooks/useInView";
import "./Proof.css";

const FACTS = [
  ["Operations", "24/7, multi-region, production-only"],
  ["Access", "Role-based, audited, least-privilege"],
  ["Record", "Multi-network operational history"],
];

export default function Proof() {
  const rise = useRiseGroup();
  const [ref, uptime] = useCountUp(99.98, { decimals: 2, duration: 2200 });

  return (
    <section className="proof" ref={rise}>
      <div className="proof__inner">
        <p className="dex" data-rise>
          <span className="dex__n">( 06 )</span> Proof
        </p>

        <div className="proof__figure" ref={ref} data-rise>
          <span className="proof__big">{uptime}</span>
          <span className="proof__pct serif">%</span>
          <span className="proof__label">
            uptime,
            <br />
            <em className="serif">measured.</em>
          </span>
        </div>

        <div className="proof__facts" data-rise>
          {FACTS.map(([k, v]) => (
            <div className="proof__fact" key={k}>
              <span className="mono">{k}</span>
              <p>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
