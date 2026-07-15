import { useEffect, useState } from "react";
import { Dot } from "./Kit";
import "./Topbar.css";

const LINKS = [
  ["Products", "#products"],
  ["Infrastructure", "#infrastructure"],
  ["Engineering", "#engineering"],
  ["Canton", "#canton"],
];

export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`topbar ${scrolled ? "topbar--solid" : ""}`}>
      <a href="#hero" className="topbar__brand mono">
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
      </a>

      <nav className="topbar__nav" aria-label="Primary">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} className="topbar__link">
            {label}
          </a>
        ))}
      </nav>

      <div className="topbar__right">
        <span className="topbar__status mono">
          <Dot /> 99.98% uptime
        </span>
        <a href="#contact" className="topbar__cta mono">
          Contact
        </a>
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
        {[...LINKS, ["Contact", "#contact"]].map(([label, href], i) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${0.04 * i}s` }}
          >
            <span className="mono">0{i + 1}</span>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}
