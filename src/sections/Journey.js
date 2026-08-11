import { useEffect, useRef, useState } from "react";
import { Lines } from "../components/Kit";
import { useRiseGroup, reducedMotion } from "../hooks/useInView";
import "./Journey.css";

/* ————————————————————————————————————————————————
   EVOLUTION — a vertical journey.
   The same glyph grows with the company: one validator node,
   then a staking cluster, then products, then the full rail
   network. Complexity earned, not claimed.
   ———————————————————————————————————————————————— */

const CHAPTERS = [
  {
    era: "2018",
    title: "Validator infrastructure",
    body: "First validators deployed across networks including Ethereum and Cosmos.",
  },
  {
    era: "2020+",
    title: "Staking at scale",
    body: "Multi-network staking operations, with $200M+ secured at peak.",
  },
  {
    era: "2025",
    title: "Canton product suite",
    body: "Calden, Cardiv and Nexus enter development on infrastructure already running.",
  },
  {
    era: "Now",
    title: "Institutional rails",
    body: "Infrastructure and products for the Canton economy, operated in production.",
  },
];

/* The growing system: cluster nodes, product satellites, orbit rail. */
const CLUSTER = [
  [100, 100],
  [58, 74],
  [148, 66],
  [64, 142],
  [138, 148],
];
const SATELLITES = [
  [100, 22],
  [178, 122],
  [30, 140],
];

function SystemGlyph({ stage }) {
  return (
    <svg
      className={`jny__glyph jny__glyph--s${stage}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle className="jny__rail" cx="100" cy="100" r="88" />
      {CLUSTER.slice(1).map(([x, y], i) => (
        <line key={`e${i}`} className="jny__edge" x1="100" y1="100" x2={x} y2={y} />
      ))}
      {SATELLITES.map(([x, y], i) => (
        <line key={`p${i}`} className="jny__spoke" x1="100" y1="100" x2={x} y2={y} />
      ))}
      {CLUSTER.map(([x, y], i) => (
        <circle
          key={`n${i}`}
          className={`jny__node ${i === 0 ? "jny__node--core" : ""}`}
          cx={x}
          cy={y}
          r={i === 0 ? 7 : 4.5}
        />
      ))}
      {SATELLITES.map(([x, y], i) => (
        <rect
          key={`s${i}`}
          className="jny__sat"
          x={x - 5}
          y={y - 5}
          width="10"
          height="10"
          rx="2.5"
        />
      ))}
    </svg>
  );
}

export default function Journey() {
  const rise = useRiseGroup(0.06);
  const listRef = useRef(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const chapters = Array.from(root.querySelectorAll(".jny__chapter"));
    if (reducedMotion()) {
      setStage(CHAPTERS.length - 1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStage(Number(e.target.dataset.stage));
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    chapters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="jny theme-dark" data-theme="dark" ref={rise}>
      <div className="jny__inner">
        <Lines
          className="jny__title"
          lines={[
            <>Seven years of</>,
            <>
              earned <em className="serif jny__em">complexity.</em>
            </>,
          ]}
        />

        <div className="jny__grid">
          <div className="jny__stagewrap">
            <SystemGlyph stage={stage} />
            <span className="jny__stage-era mono">{CHAPTERS[stage].era}</span>
          </div>

          <div className="jny__chapters" ref={listRef}>
            {CHAPTERS.map((c, i) => (
              <article
                className={`jny__chapter ${stage === i ? "on" : ""}`}
                data-stage={i}
                key={c.era}
              >
                <span className="jny__era mono">{c.era}</span>
                <h3 className="jny__chapter-title">{c.title}</h3>
                <p className="jny__chapter-body">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
