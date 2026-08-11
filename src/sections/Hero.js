import { useEffect, useRef, useState } from "react";
import { Lines, Dot } from "../components/Kit";
import { NetworkMarquee } from "../components/Networks";
import HeroDefense from "./HeroDefense";
import { useRiseGroup, reducedMotion } from "../hooks/useInView";
import "./Hero.css";

const WAVE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

/* Two hero versions, switchable + persisted:
   "wave"   — cinematic light-ribbon video behind the editorial statement.
   "defense" — faithful recreation of the dark DeFi "Asset Defense"
              hero: rounded black panel, vast white glow, circuit
              traces + asset chips, glass nav, logo strip. */

const VARIANTS = [
  ["wave", "Wave"],
  ["defense", "Defence"],
];

export default function Hero() {
  const rise = useRiseGroup(0.12);
  const videoRef = useRef(null);
  const [variant, setVariant] = useState(() => {
    try {
      const stored = localStorage.getItem("wolfedge-hero-bg");
      return VARIANTS.some(([id]) => id === stored) ? stored : "wave";
    } catch {
      return "wave";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wolfedge-hero-bg", variant);
    } catch {
      /* private mode */
    }
    // Topbar observes this section's class/data-theme mutations directly,
    // so a variant swap needs no further signalling from here.
  }, [variant]);

  // slow the wave to a drift; still frame for reduced-motion users
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reducedMotion()) v.pause();
    else v.playbackRate = 0.6;
  }, [variant]);

  // Defense styles itself end-to-end, so it opts out of the shared tokens.
  const selfContained = variant === "defense";

  return (
    <section
      className={`hero hero--${variant} ${selfContained ? "" : "theme-dark"}`}
      id="hero"
      data-theme="dark"
      ref={rise}
    >
      {variant === "defense" ? (
        <HeroDefense />
      ) : (
        <>
          <video
            className="hero__video"
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src={WAVE_VIDEO}
            aria-hidden="true"
          />
          <span className="hero__glow" aria-hidden="true" />
          <span className="hero__mesh" aria-hidden="true" />
          <span className="hero__veil" aria-hidden="true" />

          <div className="hero__inner">
            <p className="hero__eyebrow mono" data-rise>
              <Dot /> Live on Canton mainnet
            </p>

            <h1 className="hero__title">
              <Lines
                as="span"
                delay={0.12}
                lines={[
                  "Built beneath",
                  <>
                    the <span className="hero__shine">market.</span>
                  </>,
                ]}
              />
            </h1>

            <p className="hero__sub" data-rise>
              WolfEdge runs the validators, RPC and node infrastructure behind
              Canton — and builds the products institutions use on it.
            </p>

            <div className="hero__cta" data-rise>
              <a className="hero__btn" href="#products">
                Explore systems <span aria-hidden="true">↓</span>
              </a>
              <a className="hero__ghost" href="#contact">
                Talk to us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero__foot">
            <div className="hero__marquee" data-rise>
              <span className="hero__marquee-label mono">Networks we secure</span>
              <NetworkMarquee speed={46} />
            </div>
          </div>
        </>
      )}

      <div className="hero__switch mono" role="group" aria-label="Hero style">
        {VARIANTS.map(([id, label]) => (
          <button
            key={id}
            className={`hero__switch-seg ${variant === id ? "on" : ""}`}
            onClick={() => setVariant(id)}
            aria-pressed={variant === id}
          >
            <i className="hero__switch-dot" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
