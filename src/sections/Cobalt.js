import { Lines, Marquee } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Cobalt.css";

/* ————————————————————————————————————————————————
   COBALT — the engineering statement. One saturated block.
   Protocol-layer claim up top, then the operating loop:
   BUILD → DEPLOY → MONITOR → OPERATE, drawn as a sequence,
   closing on the only promise that matters.
   ———————————————————————————————————————————————— */

const TERMS = [
  "Canton",
  "DAML",
  "Distributed systems",
  "Validator engineering",
  "Security architecture",
  "Protocol integration",
];

const LOOP = [
  ["Build", "Architecture designed for the failure cases first."],
  ["Deploy", "Infrastructure as code, shipped to multi-region production."],
  ["Monitor", "Full-stack observability before anything carries value."],
  ["Operate", "Around-the-clock network operations, year after year."],
];

export default function Cobalt() {
  const rise = useRiseGroup(0.09);

  return (
    <section className="cob sheet" id="engineering" ref={rise}>
      <div className="cob__inner">
        <Lines
          className="cob__title"
          lines={[
            <>We build at the</>,
            <>
              <em className="serif cob__em">protocol</em> layer.
            </>,
          ]}
        />

        <p className="cob__note" data-rise>
          Deep systems, not app software. The kind of engineering that has to
          be correct, because institutions run on it.
        </p>

        <ol className="cob__loop">
          {LOOP.map(([verb, line], i) => (
            <li className="cob__step" data-rise key={verb}>
              <span className="cob__step-track" aria-hidden="true">
                <i className="cob__step-fill" style={{ transitionDelay: `${0.25 + i * 0.35}s` }} />
              </span>
              <span className="cob__step-verb">{verb}</span>
              <span className="cob__step-line">{line}</span>
            </li>
          ))}
        </ol>

        <p className="cob__close" data-rise>
          <em className="serif">Production-ready</em> is the only spec.
        </p>
      </div>

      <div className="cob__belt" data-rise>
        <Marquee speed={30} className="cob__mq cob__mq--ghost">
          {TERMS.map((t) => (
            <span key={t}>
              {t} <i aria-hidden="true">✦</i>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
