import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Vault.css";

/* ———— Diagrams: each explains the product ———— */

function CaldenFlow() {
  const stations = [
    [40, "Request"],
    [150, "Policy"],
    [260, "Approve 2/3"],
    [370, "Sign"],
    [472, "Audit"],
  ];
  return (
    <svg viewBox="0 0 512 190" fill="none" className="dg dg-calden" aria-hidden="true">
      <line x1="40" y1="60" x2="472" y2="60" className="dg__rail" />
      {stations.map(([x, label], i) => (
        <g key={label}>
          <circle cx={x} cy="60" r="5" className={i === 3 ? "dg__node dg__node--hot" : "dg__node"} />
          <text x={x} y="34" textAnchor="middle">{label}</text>
        </g>
      ))}
      {[196, 260, 324].map((x, i) => (
        <g key={x} className="dg__key">
          <line x1={x} y1="128" x2="260" y2="66" />
          <rect x={x - 22} y="128" width="44" height="20" rx="4" />
          <text x={x} y="141.5" textAnchor="middle">KEY {i + 1}</text>
        </g>
      ))}
      <text x="256" y="180" textAnchor="middle" className="dg__cap">
        EVERY SIGNATURE PASSES POLICY · QUORUM · AUDIT
      </text>
      <circle r="3" className="dg__pulse">
        <animateMotion dur="4s" repeatCount="indefinite" path="M40 60 L472 60" />
      </circle>
    </svg>
  );
}

function CardivBook() {
  const asks = [
    ["102.58", 58],
    ["102.54", 34],
    ["102.51", 82],
  ];
  const bids = [
    ["102.46", 76],
    ["102.43", 48],
    ["102.39", 90],
  ];
  return (
    <div className="dg-book" aria-hidden="true">
      <div className="dg-book__head mono">
        <span>Price</span>
        <span>Depth</span>
      </div>
      {asks.map(([p, d]) => (
        <div className="dg-book__row is-ask" key={p}>
          <i style={{ width: `${d}%` }} />
          <span>{p}</span>
        </div>
      ))}
      <div className="dg-book__mid mono">
        <span>102.48</span>
        <span>DETERMINISTIC SETTLEMENT</span>
      </div>
      {bids.map(([p, d]) => (
        <div className="dg-book__row is-bid" key={p}>
          <i style={{ width: `${d}%` }} />
          <span>{p}</span>
        </div>
      ))}
    </div>
  );
}

function NexusLoop() {
  const loop = "M60 80 C 130 14, 330 14, 400 80 C 330 146, 130 146, 60 80 Z";
  const st = [
    [60, 80, "STAKE", 108],
    [230, 30, "LIQUID TOKEN", 14],
    [400, 80, "ACTIVE CAPITAL", 108],
    [230, 130, "REWARDS", 156],
  ];
  return (
    <svg viewBox="0 0 460 168" fill="none" className="dg dg-nexus" aria-hidden="true">
      <path d={loop} className="dg__loop" />
      {st.map(([x, y, label, ty]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="4.5" className="dg__node dg__node--hot" />
          <text x={x} y={ty} textAnchor="middle">{label}</text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <circle key={i} r="3" className="dg__pulse">
          <animateMotion dur="8s" begin={`${i * 4}s`} repeatCount="indefinite" path={loop} />
        </circle>
      ))}
    </svg>
  );
}

/* ———— Plates ———— */

const PLATES = [
  {
    id: "calden",
    n: "01",
    system: "Custody",
    name: "Calden",
    tag: <>Self-custody, <em className="serif">without the risk.</em></>,
    body: "Institutional wallet infrastructure. Enterprise authentication, permission management, complete audit trails — institutions hold their own keys, safely, at scale.",
    caps: ["Transaction signing", "Enterprise access control", "Audit trails"],
    Diagram: CaldenFlow,
    flip: false,
  },
  {
    id: "cardiv",
    n: "02",
    system: "Markets",
    name: "Cardiv",
    tag: <>An order book that <em className="serif">lives on-chain.</em></>,
    body: "Professional trading infrastructure. Transparent execution, deterministic settlement, non-custodial by construction — the market structure is the code.",
    caps: ["On-chain limit order book", "Deterministic settlement", "Non-custodial"],
    Diagram: CardivBook,
    flip: true,
  },
  {
    id: "nexus",
    n: "03",
    system: "Staking",
    name: "Nexus",
    tag: <>Staked capital that <em className="serif">never sleeps.</em></>,
    body: "Liquid staking infrastructure. Delegate to network security, keep capital active, let rewards close the loop — integrated as a Canton Featured App.",
    caps: ["Liquid staking", "Capital activation", "Featured App"],
    Diagram: NexusLoop,
    flip: false,
    wide: true,
  },
];

export default function Vault() {
  const rise = useRiseGroup();

  return (
    <section className="vault sheet" id="products" ref={rise}>
      <div className="vault__intro">
        <p className="dex vault__dex" data-rise>
          <span className="dex__n">( 02 )</span> Product systems
        </p>
        <Lines
          className="vault__title"
          lines={[
            <>Three products,</>,
            <>
              <em className="serif vault__em">one</em> connected system.
            </>,
          ]}
        />
        <p className="vault__sub" data-rise>
          Custody, markets and staking — built by one team, on one
          infrastructure, for one ecosystem.
        </p>
      </div>

      <div className="vault__stack">
        {PLATES.map(({ id, n, system, name, tag, body, caps, Diagram, flip, wide }) => (
          <div className="vault__slot" key={id}>
            <article className={`plate ${flip ? "plate--flip" : ""} ${wide ? "plate--wide" : ""}`} id={id}>
              <header className="plate__bar">
                <span className="mono plate__sys">
                  {n} — {system}
                </span>
                <span className="mono plate__brand">WolfEdge Product</span>
              </header>
              <div className="plate__body">
                <div className="plate__text">
                  <h3 className="plate__name">{name}</h3>
                  <p className="plate__tag">{tag}</p>
                  <p className="plate__desc">{body}</p>
                  <ul className="plate__caps">
                    {caps.map((c) => (
                      <li key={c}>
                        <span aria-hidden="true">→</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="plate__visual">
                  <Diagram />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
