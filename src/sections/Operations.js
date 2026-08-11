import {
  Stack,
  Broadcast,
  Graph,
  Pulse,
  ArrowsClockwise,
  ShieldCheck,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Operations.css";

/* ————————————————————————————————————————————————
   OPERATIONS — the engine room.
   Not a table, not cards: six systems scattered like stations
   on a floor plan, each activating as it enters the viewport.
   The sticky left rail holds the argument; the right side
   holds the machinery.
   ———————————————————————————————————————————————— */

const SYSTEMS = [
  {
    icon: Stack,
    name: "Validators",
    detail: "Consensus operations across Proof-of-Stake networks, run as production systems.",
    readout: "multi-network",
  },
  {
    icon: Broadcast,
    name: "RPC",
    detail: "One reliable RPC service: dedicated and shared endpoints engineered for production load.",
    readout: "low latency / isolated capacity",
  },
  {
    icon: Graph,
    name: "Nodes",
    detail: "Deployment, configuration and lifecycle across regions, upgrades included.",
    readout: "multi-region",
  },
  {
    icon: Pulse,
    name: "Monitoring",
    detail: "Full-stack observability and network operations, staffed around the clock.",
    readout: "24:7",
  },
  {
    icon: ArrowsClockwise,
    name: "Automation",
    detail: "Infrastructure as code with self-healing recovery paths.",
    readout: "self-healing",
  },
  {
    icon: ShieldCheck,
    name: "Security",
    detail: "Role-based access, least privilege and hardened operational practice.",
    readout: "least-privilege",
  },
];

export default function Operations() {
  const rise = useRiseGroup(0.05);

  return (
    <section className="ops sheet" id="infrastructure" ref={rise}>
      <div className="ops__inner">
        <div className="ops__rail">
          <p className="dex" data-rise>
            Infrastructure
          </p>
          <Lines
            className="ops__title"
            lines={[
              <>Reliable enough</>,
              <>
                to be <em className="serif ops__em">boring.</em>
              </>,
            ]}
          />
          <p className="ops__note" data-rise>
            The operational backbone beneath every product we ship. Engineered
            so nothing here is ever the story.
          </p>

          <div className="ops__services" data-rise>
            <p>
              The same capability runs for ecosystem teams: dedicated RPC,
              managed nodes, validator infrastructure and technical
              assessments.
            </p>
            <a href="mailto:hello@wolfedgelabs.com" className="ops__services-link">
              Build with WolfEdge <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>

        <div className="ops__floor">
          {SYSTEMS.map(({ icon: Icon, name, detail, readout }) => (
            <div className="ops__station" data-rise key={name}>
              <span className="ops__station-glyph" aria-hidden="true">
                <Icon size={22} weight="light" />
              </span>
              <h3 className="ops__station-name">{name}</h3>
              <p className="ops__station-detail">{detail}</p>
              <span className="ops__station-readout mono">{readout}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
