import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Coda.css";

const COLS = [
  ["Products", [["Calden", "#calden"], ["Cardiv", "#cardiv"], ["Nexus", "#nexus"]]],
  ["Company", [["Infrastructure", "#infrastructure"], ["Engineering", "#engineering"], ["Why Canton", "#canton"]]],
  ["Legal", [["Privacy Policy", "#hero"], ["Terms of Service", "#hero"]]],
];

export default function Coda() {
  const rise = useRiseGroup(0.09);

  return (
    <section className="coda sheet" id="contact" ref={rise}>
      <div className="coda__inner">
        <p className="mono coda__hail" data-rise>
          <i className="coda__dot" aria-hidden="true" /> Accepting institutional
          workloads
        </p>

        <Lines
          className="coda__title"
          lines={[
            <>Ready when</>,
            <>
              <em className="serif coda__em">you</em> are.
            </>,
          ]}
        />

        <a
          href="mailto:contact@wolfedgelabs.com"
          className="coda__mail"
          data-rise
        >
          contact@wolfedgelabs.com
          <span className="coda__mail-arrow" aria-hidden="true">
            ↗
          </span>
        </a>

        <p className="coda__founder" data-rise>
          <span className="mono">Founder</span>
          Mohak Agarwal — validators, staking systems and institutional
          infrastructure, operated across networks for years.
        </p>
      </div>

      <footer className="coda__footer" data-rise>
        <div className="coda__footer-grid">
          <div className="coda__footer-brand">
            <span className="mono">WolfEdge Labs</span>
            <p>
              Critical infrastructure for institutional blockchain. Building
              on Canton, operating in production.
            </p>
          </div>
          {COLS.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <span className="mono coda__col-title">{title}</span>
              <ul>
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="coda__legal mono">
          <span>© 2026 WolfEdge Labs</span>
          <a href="#hero">Back to top ↑</a>
        </div>
      </footer>
    </section>
  );
}
