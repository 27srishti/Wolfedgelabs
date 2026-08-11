import { useState } from "react";
import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Canton.css";

/* ————————————————————————————————————————————————
   WHY CANTON — an interactive editorial argument.
   Six reasons as a typographic index; choosing one re-lights
   the same transaction diagram to demonstrate the idea.
   One diagram, six behaviours: the network itself explained.
   ———————————————————————————————————————————————— */

const THEMES = [
  {
    key: "privacy",
    name: "Privacy",
    line: "Each party sees only its slice of a transaction. Enforced by the protocol, not by convention.",
  },
  {
    key: "settlement",
    name: "Settlement",
    line: "Atomic, deterministic settlement across applications. Finality exactly where finance needs it.",
  },
  {
    key: "workflows",
    name: "Financial workflows",
    line: "Multi-party workflows modeled directly on-chain, the way institutions already operate.",
  },
  {
    key: "assets",
    name: "Asset operations",
    line: "Assets carry their own rules. Who can hold, transfer or observe is native to the asset itself.",
  },
  {
    key: "verifiability",
    name: "Verifiability",
    line: "Activity is provable on-chain without exposing counterparties or positions.",
  },
  {
    key: "capital",
    name: "Capital coordination",
    line: "Committed capital coordinates across Featured Apps and settles on shared rails.",
  },
];

/* One transaction, three segments, three parties.
   The active theme decides how the segments behave. */
function TxDiagram({ theme }) {
  const parties = ["A", "B", "C"];
  return (
    <figure className={`canton__fig canton__fig--${theme}`} aria-hidden="true">
      <figcaption className="mono">One transaction</figcaption>
      <div className="canton__tx">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
        <i className="canton__tx-flash" />
      </div>
      {parties.map((p, k) => (
        <div className="canton__view" key={p}>
          <span className="mono">Party {p}</span>
          <div className="canton__tx canton__tx--s">
            {[0, 1, 2].map((s) => (
              <span key={s} className={`seg s${s + 1} ${s === k ? "own" : "other"}`} />
            ))}
          </div>
        </div>
      ))}
      <figcaption className="mono canton__cap">
        {
          {
            privacy: "Sub-transaction privacy",
            settlement: "Atomic across all parties",
            workflows: "Sequenced obligations",
            assets: "Permissions travel with the asset",
            verifiability: "Provable, not exposed",
            capital: "Shared rails, coordinated capital",
          }[theme]
        }
      </figcaption>
    </figure>
  );
}

export default function Canton() {
  const rise = useRiseGroup(0.07);
  const [active, setActive] = useState("privacy");
  const current = THEMES.find((t) => t.key === active);

  return (
    <section className="canton sheet" id="canton" ref={rise}>
      <div className="canton__inner">
        <div className="canton__left">
          <p className="dex" data-rise>
            Why Canton
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

          <div className="canton__index" data-rise role="tablist" aria-label="Why Canton">
            {THEMES.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={active === t.key}
                className={`canton__idx ${active === t.key ? "on" : ""}`}
                onClick={() => setActive(t.key)}
              >
                <span className="canton__idx-name">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="canton__right" data-rise>
          <TxDiagram theme={active} key={active} />
          <p className="canton__reading">
            <em className="serif canton__lead">{current.name}.</em> {current.line}
          </p>
        </div>
      </div>
    </section>
  );
}
