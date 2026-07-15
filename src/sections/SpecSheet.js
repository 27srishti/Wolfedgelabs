import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./SpecSheet.css";

const ROWS = [
  ["Validators", "Consensus operations across Proof-of-Stake networks", "Online"],
  ["RPC", "Dedicated & shared endpoints, engineered for production load", "Online"],
  ["Nodes", "Multi-region deployment, lifecycle & upgrades managed", "Online"],
  ["Monitoring", "Full-stack observability, 24/7 network operations", "Active"],
  ["Automation", "Infrastructure as code, self-healing recovery", "Active"],
  ["Security", "Role-based access, hardened operations, audited", "Armed"],
];

export default function SpecSheet() {
  const rise = useRiseGroup(0.06);

  return (
    <section className="spec sheet" id="infrastructure" ref={rise}>
      <div className="spec__inner">
        <p className="dex" data-rise>
          <span className="dex__n">( 03 )</span> Infrastructure
        </p>

        <div className="spec__head">
          <Lines
            className="spec__title"
            lines={[
              <>
                Reliable enough to be{" "}
                <em className="serif spec__em">boring.</em>
              </>,
            ]}
          />
          <p className="spec__note" data-rise>
            The operational backbone beneath every product we ship and every
            workload we host. Engineered so nothing here is ever the story.
          </p>
        </div>

        <div className="spec__table" data-rise>
          {ROWS.map(([name, desc, status], i) => (
            <div className="spec__row" key={name}>
              <span className="spec__cell-n mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="spec__cell-name">{name}</span>
              <span className="spec__cell-desc">{desc}</span>
              <span className="spec__cell-status mono">
                <i aria-hidden="true" /> {status}
              </span>
            </div>
          ))}
        </div>

        <p className="spec__foot mono" data-rise>
          Also available to ecosystem participants — dedicated RPC, managed
          nodes, validator infrastructure. Production capability, not
          consulting.
        </p>
      </div>
    </section>
  );
}
