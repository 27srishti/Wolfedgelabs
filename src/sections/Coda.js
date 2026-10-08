import { HashLink as Link } from 'react-router-hash-link';
import { Lines } from "../components/Kit";
import { useRiseGroup } from "../hooks/useInView";
import "./Coda.css";

const COLS = [
  ["Products", [["Calden", "/#products"], ["Cardiv", "/#products"], ["Nexus", "/#products"]]],
  [
    "Services",
    [
      ["Validators", "/#infrastructure"],
      ["RPC", "/#infrastructure"],
      ["Nodes", "/#infrastructure"],
      ["DevOps", "/#engineering"],
      ["Technical assessments", "/#infrastructure"],
    ],
  ],
  ["Company", [["About", "/about"], ["Contact", "/#contact"]]],
];

export default function Coda() {
  const rise = useRiseGroup(0.09);

  return (
    <section className="coda sheet" id="contact" data-theme="dark" ref={rise}>
      <div className="coda__inner">
        <p className="mono coda__hail" data-rise>
          Accepting institutional workloads
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

        <a href="mailto:hello@wolfedgelabs.com" className="coda__mail" data-rise>
          hello@wolfedgelabs.com
          <span className="coda__mail-arrow" aria-hidden="true">
            ↗
          </span>
        </a>

        <p className="coda__meta mono" data-rise>
          Singapore · Replies within 24 to 48 hours
        </p>
      </div>

      <footer className="coda__footer" data-rise>
        <div className="coda__footer-grid">
          <div className="coda__footer-brand">
            <span className="mono">WolfEdge Labs</span>
            <p>
              An infrastructure and product lab building blockchain systems
              and Canton-native financial products.
            </p>
          </div>
          {COLS.map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <span className="mono coda__col-title">{title}</span>
              <ul className="coda__list">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="coda__link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="coda__legal mono">
          <span>© 2026 Liquid Labs FZCO. WolfEdge Labs.</span>
          <a href="#hero">Back to top ↑</a>
        </div>
      </footer>
    </section>
  );
}
