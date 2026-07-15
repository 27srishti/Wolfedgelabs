import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Canton.css";

const REASONS = [
  {
    lead: "Private,",
    rest: "by architecture — each party sees only its slice of a transaction. Enforced by the protocol, not by convention.",
  },
  {
    lead: "Deterministic,",
    rest: "where finance needs finality. Atomic settlement across applications, with verifiable outcomes.",
  },
  {
    lead: "Permissioned,",
    rest: "natively. Assets carry their own rules for who can hold, transfer or observe — the model institutions already run.",
  },
  {
    lead: "Adopted,",
    rest: "in production. Canton is where regulated finance is actually deploying — and we build the layer it runs on.",
  },
];

function PrivacyInk() {
  const parties = ["A", "B", "C"];
  return (
    <figure className="canton__fig" aria-hidden="true">
      <figcaption className="mono">One transaction</figcaption>
      <div className="canton__tx">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
      </div>
      {parties.map((p, k) => (
        <div className="canton__view" key={p}>
          <span className="mono">Party {p}</span>
          <div className="canton__tx canton__tx--s">
            {[0, 1, 2].map((s) => (
              <span key={s} className={s === k ? `s${s + 1}` : "void"} />
            ))}
          </div>
        </div>
      ))}
      <figcaption className="mono canton__cap">
        Sub-transaction privacy
      </figcaption>
    </figure>
  );
}

export default function Canton() {
  const rise = useRiseGroup(0.07);

  return (
    <section className="canton sheet" id="canton" ref={rise}>
      <div className="canton__inner">
        <div className="canton__left">
          <p className="dex" data-rise>
            <span className="dex__n">( 05 )</span> Why Canton
          </p>
          <Lines
            className="canton__title"
            lines={[
              <>Where institutional</>,
              <>
                finance <em className="serif canton__em">actually</em>
              </>,
              <>settles.</>,
            ]}
          />
          <div data-rise>
            <PrivacyInk />
          </div>
        </div>

        <ol className="canton__reasons">
          {REASONS.map((r, i) => (
            <li className="canton__reason" data-rise key={r.lead}>
              <span className="mono canton__reason-n">0{i + 1}</span>
              <p>
                <em className="serif canton__lead">{r.lead}</em> {r.rest}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
