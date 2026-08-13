import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "../hooks/useInView";
import "./Systems.css";

gsap.registerPlugin(ScrollTrigger);

/* ————————————————————————————————————————————————
   THE PRODUCT LAB — pinned horizontal gallery.
   Each product carries one working diagram of its core idea:
   Calden  = a signature passing through permission layers
   Cardiv  = order flow converging to a match, then settling
   Nexus   = idle CC transformed into productive weCC
   ———————————————————————————————————————————————— */

function CaldenViz() {
  const steps = ["User", "Identity", "Permission", "Signing", "Canton"];
  return (
    <figure className="viz viz--calden" aria-label="A transaction request passing through identity, permission and signing layers before reaching Canton.">
      <div className="viz-chain">
        {steps.map((s, i) => (
          <div className="viz-chain__step" key={s} style={{ "--i": i }}>
            <span className="viz-chain__cell">{s}</span>
            {i < steps.length - 1 && <span className="viz-chain__wire" aria-hidden="true" />}
          </div>
        ))}
        <span className="viz-chain__token" aria-hidden="true" />
      </div>
      <figcaption className="viz__cap">One signature, four checkpoints</figcaption>
    </figure>
  );
}

function CardivViz() {
  const bids = [82, 64, 47, 31];
  const asks = [78, 58, 42, 26];
  return (
    <figure className="viz viz--cardiv" aria-label="Buy and sell orders converging on a match price, settling atomically.">
      <div className="viz-book">
        <div className="viz-book__side viz-book__side--bid" aria-hidden="true">
          {bids.map((w, i) => (
            <span key={i} style={{ "--w": `${w}%`, "--i": i }} />
          ))}
        </div>
        <span className="viz-book__spine" aria-hidden="true">
          <i className="viz-book__match" />
        </span>
        <div className="viz-book__side viz-book__side--ask" aria-hidden="true">
          {asks.map((w, i) => (
            <span key={i} style={{ "--w": `${w}%`, "--i": i }} />
          ))}
        </div>
      </div>
      <figcaption className="viz__cap">
        <span>Bids</span>
        <span className="viz__cap-mid">Matched on-chain</span>
        <span>Asks</span>
      </figcaption>
    </figure>
  );
}

function NexusViz() {
  return (
    <figure className="viz viz--nexus" aria-label="Canton Coin deposited into Nexus becomes weCC and flows out to Featured Apps.">
      <svg viewBox="0 0 560 240" className="viz-flow" aria-hidden="true">
        {/* idle CC entering */}
        <path className="viz-flow__in" d="M 20 120 H 210" />
        {/* the three outbound streams */}
        <path className="viz-flow__out" d="M 350 120 C 430 120, 460 48, 540 48" />
        <path className="viz-flow__out" d="M 350 120 H 540" />
        <path className="viz-flow__out" d="M 350 120 C 430 120, 460 192, 540 192" />
        {/* travelling particles */}
        <circle className="viz-flow__dot viz-flow__dot--in" r="4" />
        <circle className="viz-flow__dot viz-flow__dot--a" r="4" />
        <circle className="viz-flow__dot viz-flow__dot--b" r="4" />
        <circle className="viz-flow__dot viz-flow__dot--c" r="4" />
      </svg>
      <span className="viz-flow__label viz-flow__label--cc mono">CC</span>
      <span className="viz-flow__gate mono">Nexus</span>
      <span className="viz-flow__label viz-flow__label--wecc mono">weCC</span>
      <span className="viz-flow__label viz-flow__label--apps mono">Featured Apps</span>
      <figcaption className="viz__cap">Idle capital, put to work</figcaption>
    </figure>
  );
}

const VIZ = { calden: CaldenViz, cardiv: CardivViz, nexus: NexusViz };

const products = [
  {
    name: "Calden",
    role: "Institutional wallet",
    title: "The First MetaMask ",
    accent: "Canton Wallet",
    body: "Enterprise authentication and programmable permissions, with custody kept exactly where it belongs.",
    visual: "calden",
  },
  {
    name: "Cardiv",
    role: "Canton-native market",
    title: "On-chain ",
    accent: "limit order book",
    body: "A fully on-chain limit order book: professional order flow with deterministic, non-custodial settlement.",
    visual: "cardiv",
  },
  {
    name: "Nexus",
    role: "Liquid staking",
    title: "Liquid Staking ",
    accent: "for Canton",
    body: "Deposit CC, receive weCC, participate across Featured Apps. Rewards are variable, never guaranteed.",
    visual: "nexus",
  },
];

function Panel({ product, index }) {
  const ref = useInView(0.4);
  const Viz = VIZ[product.visual];
  const numString = String(index + 1).padStart(2, "0");
  return (
    <article className="sys-panel" ref={ref}>
      <span className="sys-panel__watermark" aria-hidden="true">{numString}</span>
      <div className="sys-panel__meta">
        <span>
          {numString} / 03
        </span>
        <span>{product.role}</span>
      </div>
      <div className="sys-panel__content">
        <h3 className="sys-panel__title">
          {product.title}
          <span className="sys-accent">{product.accent}</span>
        </h3>
        <p className="sys-panel__body">{product.body}</p>
        <a className="sys-panel__link" href="mailto:hello@wolfedgelabs.com">
          Explore {product.name} <ArrowUpRight size={15} weight="bold" />
        </a>
      </div>
    </article>
  );
}

export default function Systems() {
  const root = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current;
        const track = section.querySelector(".sys-track");
        const travel = () => track.scrollWidth - window.innerWidth;
        // LEAD holds the intro still once pinned so it reads before the track
        // moves; HOLD keeps the last panel from sliding away at unpin.
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

        // Add internal parallax inside each panel as it scrolls
        const panels = gsap.utils.toArray(".sys-panel");
        panels.forEach((panel) => {
          const watermark = panel.querySelector(".sys-panel__watermark");
          const content = panel.querySelector(".sys-panel__content");
          const viz = panel.querySelector(".viz");
          
          gsap.to(watermark, {
            x: () => 150,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          });

          gsap.to(content, {
            x: () => 60,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          });
        });
      });
    }, root);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section id="products" className="sys-scroll" data-theme="dark" ref={root}>
      <div className="sys-track">
        <div className="sys-intro">
          <span className="sys-intro__kicker">[ THE PRODUCT LAB ]</span>
          <h2 className="sys-intro__title">
            Three products.
            <br />
            <span className="sys-accent">One economy.</span>
          </h2>
          <p className="sys-intro__sub">
            Purpose-built systems for custody, markets and capital formation on
            Canton. Built and operated by WolfEdge.
          </p>
        </div>
        {products.map((product, i) => (
          <Panel product={product} index={i} key={product.name} />
        ))}
      </div>
    </section>
  );
}
