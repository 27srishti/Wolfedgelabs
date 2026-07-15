import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Manifesto.css";

const PILLARS = [
  "Infrastructure",
  "Product studio",
  "Infrastructure platform",
  "Engineering",
];

export default function Manifesto() {
  const rise = useRiseGroup();

  return (
    <section className="mani" id="who" ref={rise}>
      <div className="mani__inner">
        <p className="dex" data-rise>
          <span className="dex__n">( 01 )</span> Who we are
        </p>

        <Lines
          className="mani__statement"
          lines={[
            <>
              No hype. No prototypes.{" "}
              <em className="serif mani__em">No promises.</em>
            </>,
            <>We run production systems —</>,
            <>
              and have the <em className="serif mani__em">uptime</em> to prove
              it.
            </>,
          ]}
        />

        <div className="mani__pillars" data-rise>
          {PILLARS.map((p, i) => (
            <span className="mani__pillar" key={p}>
              <span className="mono mani__pillar-n">0{i + 1}</span>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
