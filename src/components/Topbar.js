import { useEffect, useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { Dot } from "./Kit";
import "./Topbar.css";

const LINKS = [
  ["Products", "/#products"],
  ["Infrastructure", "/#infrastructure"],
  ["Engineering", "/#engineering"],
  ["About", "/about"],
];

export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The bar is fixed, so "which section am I over" is a hit test at the
    // bar's own height against whatever sections declare themselves dark.
    const PROBE_Y = 34;
    const covers = (el) => {
      const r = el.getBoundingClientRect();
      return r.top <= PROBE_Y && r.bottom >= PROBE_Y;
    };
    const on = () => {
      setScrolled(window.scrollY > 10);
      setOnDark([...document.querySelectorAll('[data-theme="dark"]')].some(covers));
      // Defense ships its own header, so avoid stacking two nav bars.
      const ownNav = document.querySelector(".hero--defense");
      setHidden(!!ownNav && covers(ownNav));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    // The hero swaps variants (and with them its theme + own-header
    // status) via a button click, which fires neither scroll nor resize —
    // watch its attributes directly so every swap re-runs the hit tests.
    const hero = document.getElementById("hero");
    const mo = new MutationObserver(on);
    if (hero) {
      mo.observe(hero, { attributes: true, attributeFilter: ["class", "data-theme"] });
    }
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      mo.disconnect();
    };
  }, []);

  return (
    <header
      className={`topbar ${scrolled ? "topbar--solid" : ""} ${onDark ? "topbar--on-dark" : ""} ${hidden ? "topbar--hidden" : ""}`}
    >
      <Link to="/#hero" className="topbar__brand mono">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 4 L9 20 L12 11 L15 20 L21 4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        WolfEdge Labs
      </Link>

      <nav className="topbar__nav" aria-label="Primary">
        {LINKS.map(([label, href]) => (
          <Link key={href} to={href} className="topbar__link">
            {label}
          </Link>
        ))}
      </nav>

      <div className="topbar__right">
        <span className="topbar__status mono">
          <Dot /> 99.98% uptime
        </span>
        <Link to="/#contact" className="topbar__cta mono">
          Contact
        </Link>
      </div>

      <button
        className={`topbar__burger ${open ? "on" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>

      <div className={`topbar__sheet ${open ? "on" : ""}`}>
        {[...LINKS, ["Contact", "/#contact"]].map(([label, href], i) => (
          <Link
            key={href}
            to={href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${0.04 * i}s` }}
          >
            <span className="mono">0{i + 1}</span>
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
