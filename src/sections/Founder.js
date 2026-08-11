import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Founder.css";

/* ————————————————————————————————————————————————
   FOUNDER — editorial, understated.
   No stock portrait, no social row. A statement, a name,
   and the work behind it.
   ———————————————————————————————————————————————— */

const FOCUS = ["Infrastructure", "Validator operations", "Staking systems", "Web3 products"];

export default function Founder() {
  const rise = useRiseGroup(0.08);

  return (
    <section className="fdr theme-dark" data-theme="dark" ref={rise}>
      <div className="fdr__inner">
        <span className="fdr__mark" data-rise aria-hidden="true">
          MA
        </span>

        <div className="fdr__body">
          <Lines
            className="fdr__statement"
            lines={[
              <>
                <em className="serif">Operated first.</em>
              </>,
              <>Built second.</>,
            ]}
          />
          <p className="fdr__bio" data-rise>
            Mohak Agarwal leads WolfEdge Labs with experience across blockchain
            infrastructure, validator operations, staking systems and Web3
            product development.
          </p>
          <p className="fdr__sig" data-rise>
            <span className="fdr__name">Mohak Agarwal</span>
            <span className="fdr__role mono">Founder, WolfEdge Labs</span>
          </p>
          <p className="fdr__focus mono" data-rise>
            {FOCUS.join("  /  ")}
          </p>
        </div>
      </div>
    </section>
  );
}
