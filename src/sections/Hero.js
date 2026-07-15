import { Lines, Marquee, Seal } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Hero.css";

const TICKER = [
  ["VALIDATORS", "ONLINE"],
  ["UPTIME", "99.98%"],
  ["RPC MESH", "ACTIVE"],
  ["CANTON", "MAINNET"],
  ["REGIONS", "MULTI"],
  ["MONITORING", "24/7"],
  ["SECURITY", "ARMED"],
  ["OPERATIONS", "PRODUCTION"],
];

export default function Hero() {
  const rise = useRiseGroup(0.1);

  return (
    <section className="hero" id="hero" ref={rise}>
      <div className="hero__grid">
        <p className="hero__meta mono" data-rise>
          Blockchain infrastructure &amp; product engineering
        </p>
        <div className="hero__seal" data-rise>
          <Seal size={150} />
        </div>

        <h1 className="hero__title">
          <Lines
            as="span"
            delay={0.1}
            lines={[
              "Critical",
              <>
                infrastructure <em className="serif hero__amp">for</em>
              </>,
              <>
                <em className="serif hero__it">institutional</em>
              </>,
              "blockchain.",
            ]}
          />
        </h1>

        <div className="hero__foot">
          <p className="hero__brief" data-rise>
            WolfEdge Labs operates validators, RPC and node infrastructure —
            and builds the products institutions use on Canton.
            <strong> In production. Right now.</strong>
          </p>
          <dl className="hero__facts" data-rise>
            <div>
              <dt className="mono">Uptime</dt>
              <dd>99.98%</dd>
            </div>
            <div>
              <dt className="mono">Operation</dt>
              <dd>24 / 7</dd>
            </div>
            <div>
              <dt className="mono">Products</dt>
              <dd>Three</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="hero__ticker" data-rise>
        <Marquee speed={34}>
          {TICKER.map(([k, v]) => (
            <span className="hero__tick mono" key={k}>
              {k} <b>{v}</b>
              <i aria-hidden="true">✦</i>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
