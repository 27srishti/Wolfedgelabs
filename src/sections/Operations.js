import {
  Stack,
  Broadcast,
  Graph,
  Pulse,
  ArrowsClockwise,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useRiseGroup } from "../hooks/useInView";
import "./Operations.css";

const SYSTEMS = [
  { id: "validators", icon: Stack, name: "Validators", detail: "Consensus operations across Proof-of-Stake networks, run as production systems.", readout: "multi-network" },
  { id: "rpc", icon: Broadcast, name: "RPC", detail: "One reliable RPC service: dedicated and shared endpoints engineered for production load.", readout: "low latency" },
  { id: "nodes", icon: Graph, name: "Nodes", detail: "Deployment, configuration and lifecycle across regions, upgrades included.", readout: "multi-region" },
  { id: "monitoring", icon: Pulse, name: "Monitoring", detail: "Full-stack observability and network operations, staffed around the clock.", readout: "24:7" },
  { id: "automation", icon: ArrowsClockwise, name: "Automation", detail: "Infrastructure as code with self-healing recovery paths.", readout: "self-healing" },
  { id: "security", icon: ShieldCheck, name: "Security", detail: "Role-based access, least privilege and hardened operational practice.", readout: "least-privilege" },
];

export default function Operations() {
  const rise = useRiseGroup(0.05);

  const handleMouseMove = (e) => {
    for (const card of document.querySelectorAll(".bento-card")) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section className="ops theme-dark" id="infrastructure" data-theme="dark" ref={rise}>
      <div className="ops__header" data-rise>
        <p className="dex">Infrastructure</p>
        <h2 className="ops__title">
          Reliable enough to be <em className="serif ops__em">boring.</em>
        </h2>
        <p className="ops__note">
          The operational backbone beneath every product we ship. Engineered so nothing here is ever the story.
        </p>
      </div>

      <div className="bento-grid" onMouseMove={handleMouseMove} data-rise>
        {SYSTEMS.map(({ id, icon: Icon, name, detail, readout }) => (
          <div className={`bento-card bento-card--${id}`} key={id}>
            <div className="bento-card__content">
              <span className="bento-card__icon" aria-hidden="true">
                <Icon size={32} weight="light" />
              </span>
              <div className="bento-card__text">
                <h3 className="bento-card__name">{name}</h3>
                <p className="bento-card__detail">{detail}</p>
              </div>
              <span className="bento-card__readout mono">[ {readout} ]</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
