import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Identity.css";

gsap.registerPlugin(ScrollTrigger);

/* ————————————————————————————————————————————————
   IDENTITY — the two sides of the company, told spatially.

   Beat 1  "We operate the infrastructure."  (alone, huge)
   Beat 2  "We build the products."          (the counterpart arrives,
            the two statements separate to opposite corners)
   Beat 3  The architecture map draws itself between them:
            Validators / RPC / Nodes / DevOps → WolfEdge → Calden / Cardiv / Nexus
   One scene, pinned. The map is the reconnection.
   ———————————————————————————————————————————————— */

const INFRA = ["Validators", "RPC", "Nodes", "DevOps"];
const PRODUCTS = ["Calden", "Cardiv", "Nexus"];

/* Map geometry (viewBox 1000 × 520). Left rail x=150, core x=500, right rail x=850. */
const LY = [80, 200, 320, 440]; // infra node y
const RY = [130, 260, 390]; // product node y
const CY = 260; // core y

function edge(x1, y1, x2, y2) {
  // gentle S-curve between columns
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export default function Identity() {
  const root = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const q = gsap.utils.selector(root);
          const paths = q(".idmap__edge");
          paths.forEach((p) => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          });
          // Rail titles enter with their own rails, never ahead of them.
          gsap.set(q(".idmap__rail-title"), { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=2600",
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
            defaults: { ease: "none" },
          });

          tl
            // Beat 1 → 2: first statement yields the stage
            .fromTo(
              q(".identity__a"),
              { yPercent: 0, opacity: 1 },
              { yPercent: -46, opacity: 1, duration: 0.9 },
              0.35
            )
            .to(q(".identity__a .identity__big"), { scale: 0.62, transformOrigin: "left top", duration: 0.9 }, 0.35)
            .fromTo(
              q(".identity__b"),
              { yPercent: 60, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.9 },
              0.5
            )
            // Beat 3: clean hand-off. Each statement exits toward its rail
            // and is REPLACED by that rail's title: nothing lingers behind
            // the map, so nothing can overlap it.
            .to(q(".identity__a"), { yPercent: -70, xPercent: -4, opacity: 0, duration: 0.55 }, 1.6)
            .to(q(".identity__b"), { yPercent: -46, xPercent: 4, opacity: 0, duration: 0.55 }, 1.75)
            .fromTo(q(".idmap"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6 }, 2.05)
            .fromTo(
              q(".idmap__rail--infra .idmap__rail-title"),
              { opacity: 0, x: -14 },
              { opacity: 1, x: 0, duration: 0.3 },
              2.1
            )
            .fromTo(
              q(".idmap__rail--infra .idmap__node"),
              { opacity: 0, x: -18 },
              { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 },
              2.2
            )
            // The core exists before the wires reach it: infrastructure
            // flows INTO WolfEdge, not into empty space.
            .fromTo(q(".idmap__core"), { opacity: 0, scale: 0.85, transformOrigin: "center" }, { opacity: 1, scale: 1, duration: 0.35 }, 2.4)
            .to(q(".idmap__edge--in"), { strokeDashoffset: 0, stagger: 0.07, duration: 0.7 }, 2.5)
            .to(q(".idmap__edge--out"), { strokeDashoffset: 0, stagger: 0.09, duration: 0.7 }, 3.1)
            .fromTo(
              q(".idmap__rail--products .idmap__rail-title"),
              { opacity: 0, x: 14 },
              { opacity: 1, x: 0, duration: 0.3 },
              3.3
            )
            .fromTo(
              q(".idmap__rail--products .idmap__node"),
              { opacity: 0, x: 18 },
              { opacity: 1, x: 0, stagger: 0.1, duration: 0.4 },
              3.45
            )
            .fromTo(q(".idmap__lesson"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 3.75)
            .to({}, { duration: 0.5 }); // hold the finished map
        }
      );

      // Small screens / reduced motion: static stacked reveal
      media.add(
        "(max-width: 899px), (prefers-reduced-motion: reduce)",
        () => {
          const q = gsap.utils.selector(root);
          gsap.set(q(".identity__a, .identity__b, .idmap"), { clearProps: "all", opacity: 1 });
          gsap.set(q(".idmap__node, .idmap__core, .idmap__lesson, .idmap__rail-title"), { opacity: 1 });
          q(".idmap__edge").forEach((p) => gsap.set(p, { strokeDasharray: "none", strokeDashoffset: 0 }));
        }
      );
    }, root);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="identity theme-dark" id="who" data-theme="dark" ref={root}>
      <div className="identity__stage">
        <div className="identity__a">
          <h2 className="identity__big">
            We operate <br />
            the <em className="serif">infrastructure.</em>
          </h2>
          <p className="identity__side">
            Validators, RPC and nodes, run in production since 2018. No hype,
            no prototypes: uptime.
          </p>
        </div>

        <div className="identity__b">
          <h2 className="identity__big identity__big--right">
            We build <br />
            the <em className="serif">products.</em>
          </h2>
          <p className="identity__side identity__side--right">
            A product lab shipping Canton-native financial systems on top of
            that operational experience.
          </p>
        </div>

        <figure className="idmap" aria-label="WolfEdge architecture: validators, RPC, nodes and DevOps feed one operational core, which powers Calden, Cardiv and Nexus.">
          <div className="idmap__rail idmap__rail--infra">
            <span className="idmap__rail-title mono">Infrastructure</span>
            {INFRA.map((n) => (
              <span className="idmap__node" key={n}>
                {n}
              </span>
            ))}
          </div>

          <svg className="idmap__wires" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            {LY.map((y, i) => (
              <path key={`in${i}`} className="idmap__edge idmap__edge--in" d={edge(30, y, 468, CY)} />
            ))}
            {RY.map((y, i) => (
              <path key={`out${i}`} className="idmap__edge idmap__edge--out" d={edge(532, CY, 970, y)} />
            ))}
          </svg>

          <div className="idmap__core" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 4 L9 20 L12 11 L15 20 L21 4"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mono">WolfEdge</span>
          </div>

          <div className="idmap__rail idmap__rail--products">
            <span className="idmap__rail-title mono">Product lab</span>
            {PRODUCTS.map((n) => (
              <span className="idmap__node" key={n}>
                {n}
              </span>
            ))}
          </div>

          <figcaption className="idmap__lesson">
            Operational experience becomes product. That is the company.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
