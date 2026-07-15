import { useInView } from "../hooks/useInView";
import "./Kit.css";

/**
 * Headline whose lines rise out of masks — the signature reveal.
 * `lines` is an array of strings/JSX; each becomes one masked line.
 */
export function Lines({ as: Tag = "h2", lines, className = "", delay = 0 }) {
  const ref = useInView(0.3);
  return (
    <Tag ref={ref} className={`lines ${className}`}>
      {lines.map((l, i) => (
        <span className="lines__mask" key={i}>
          <span
            className="lines__line"
            style={{ transitionDelay: `${delay + i * 0.1}s` }}
          >
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Infinite marquee. Children are rendered twice for the loop. */
export function Marquee({ children, speed = 30, reverse = false, className = "" }) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className="marquee__track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  );
}

/** Rotating certification seal. */
export function Seal({ size = 150, dark = false }) {
  return (
    <div
      className={`seal ${dark ? "seal--dark" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="seal__ring">
        <defs>
          <path
            id="seal-circ"
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <text className="seal__text">
          <textPath
            href="#seal-circ"
            textLength="500"
            lengthAdjust="spacingAndGlyphs"
          >
            WOLFEDGE LABS · INSTITUTIONAL INFRASTRUCTURE · EST. CANTON ·
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="seal__glyph" fill="none">
        <path
          d="M3 4 L9 20 L12 11 L15 20 L21 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Live status dot. */
export function Dot({ className = "" }) {
  return <i className={`dot ${className}`} aria-hidden="true" />;
}
