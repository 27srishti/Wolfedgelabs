import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Systems.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Calden",
    index: "01",
    role: "Institutional wallet",
    title: "Control every signature.",
    body: "Enterprise authentication and programmable permissions, with custody kept exactly where it belongs.",
    metric: "SELF-CUSTODY",
    visual: "calden",
  },
  {
    name: "Cardiv",
    index: "02",
    role: "Canton-native market",
    title: "Trade and settle as one.",
    body: "Professional order flow meets deterministic, non-custodial settlement on Canton.",
    metric: "ATOMIC / D+0",
    visual: "cardiv",
  },
  {
    name: "Nexus",
    index: "03",
    role: "Liquid staking",
    title: "Capital stays in motion.",
    body: "Participate in network security while retaining a liquid, productive position.",
    metric: "UTILITY / 24:7",
    visual: "nexus",
  },
];

export default function Systems() {
  const root = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current;
        const track = section.querySelector(".sys-track");
        const travel = () => track.scrollWidth - window.innerWidth;
        // LEAD holds the "Three products. One economy." intro still on screen
        // once the section pins, so it reads before the track starts moving.
        // HOLD does the same for the last panel, and absorbs the scrub lag so
        // it doesn't slide away the instant the section unpins.
        const LEAD = 0.3;
        const HOLD = 0.22;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${travel() * (LEAD + 1 + HOLD)}`,
            pin: section,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to({}, { duration: LEAD })
          .to(track, { x: () => -travel(), ease: "none", duration: 1 })
          .to({}, { duration: HOLD });
      });
    }, root);

    // Web fonts change the measured track width; re-measure once they land.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section id="products" className="sys-scroll" ref={root}>
      <div className="sys-track">
        <div className="sys-intro">
          <span className="sys-intro__kicker">[ SYSTEMS WE BUILD ]</span>
          <h2 className="sys-intro__title">
            Three products.
            <br />
            One economy.
          </h2>
          <p className="sys-intro__sub">
            Purpose-built products for custody, markets and capital formation on Canton.
          </p>
        </div>
        {products.map((product) => (
          <article className="sys-panel" key={product.name}>
            <div className="sys-panel__meta">
              <span>{product.index} / 03</span>
              <span>{product.role}</span>
            </div>
            <div className="sys-panel__content">
              <p className="sys-panel__metric">{product.metric}</p>
              <h3 className="sys-panel__title">{product.title}</h3>
              <p className="sys-panel__body">{product.body}</p>
              <a className="sys-panel__link" href="mailto:contact@wolfedgelabs.com">
                Explore {product.name} <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
