import { Lines, Marquee } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Cobalt.css";

const TERMS_A = [
  "Canton",
  "DAML",
  "Distributed systems",
  "Smart contracts",
];
const TERMS_B = [
  "Validator engineering",
  "Security architecture",
  "Protocol integration",
  "Infrastructure automation",
];

export default function Cobalt() {
  const rise = useRiseGroup();

  return (
    <section className="cob sheet" id="engineering" ref={rise}>
      <div className="cob__inner">
        <p className="dex cob__dex" data-rise>
          <span className="cob__dex-n">( 04 )</span> Engineering
        </p>

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
          be correct — because institutions run on it.
        </p>
      </div>

      <div className="cob__belt" data-rise>
        <Marquee speed={26} className="cob__mq cob__mq--solid">
          {TERMS_A.map((t) => (
            <span key={t}>
              {t} <i aria-hidden="true">✦</i>
            </span>
          ))}
        </Marquee>
        <Marquee speed={30} reverse className="cob__mq cob__mq--ghost">
          {TERMS_B.map((t) => (
            <span key={t}>
              {t} <i aria-hidden="true">✦</i>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
