import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRiseGroup } from "../hooks/useInView";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { 
    id: "01",
    year: "2018", 
    title: "First Validators", 
    text: "Launched our first validator nodes on Ethereum and Cosmos networks."
  },
  { 
    id: "02",
    year: "2020", 
    title: "Expansion", 
    text: "Securing more than $200M worth of assets."
  },
  { 
    id: "03",
    year: "2021", 
    title: "RPC Services", 
    text: "Introduced dedicated RPC services for enterprise clients seeking reliable blockchain access."
  },
  { 
    id: "04",
    year: "2022", 
    title: "Global Infrastructure", 
    text: "Established a global infrastructure network with nodes across multiple continents."
  },
  { 
    id: "05",
    year: "2024", 
    title: "Consultation Services", 
    text: "Launched blockchain consultation services to help organizations navigate the Web3 ecosystem."
  },
];

const MISSION_TEXT = "To provide secure, reliable, and accessible blockchain infrastructure that empowers the decentralized future.";

export default function About() {
  const rise = useRiseGroup(0.05);
  const stageRef = useRef(null);
  const journeyRef = useRef(null);

  // 1. Massive GSAP Spatial Scroll Sequence
  useEffect(() => {
    if (!stageRef.current) return;
    
    const heroText = stageRef.current.querySelector(".about__hero-sentence");
    const missionBlock = stageRef.current.querySelector(".about__mission-block");
    const missionWords = stageRef.current.querySelectorAll(".about__mission-word");
    const splitLeft = stageRef.current.querySelector(".about__split--left");
    const splitCenter = stageRef.current.querySelector(".about__split--center");
    const splitRight = stageRef.current.querySelector(".about__split--right");

    // Below 900px the stage is plain stacked content (see About.css),
    // so the pinned timeline only exists on wider screens.
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(min-width: 900px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=400%", // Pin for 4 full screen heights
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });
      
      // Hold hero briefly
      tl.to({}, { duration: 0.5 });

      // Phase 1: Hero Sentence fades out and sinks back
      tl.to(heroText, { opacity: 0, scale: 0.8, duration: 1 });
      
      // Phase 2: Mission Block slams in from above/scaled
      tl.fromTo(missionBlock, 
        { opacity: 0, scale: 1.2, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1 }
      );
      
      // Phase 3: Mission words light up progressively
      tl.to(missionWords, {
        color: "#F5F7FA",
        stagger: 0.1,
        duration: 2
      });
      
      // Phase 4: Mission Block fades out and lifts up
      tl.to(missionBlock, { opacity: 0, y: -100, scale: 0.9, duration: 1 });
      
      // Phase 5: Spatial Split (Information explodes into 3 columns)
      tl.fromTo(splitLeft, 
        { opacity: 0, x: -150, z: -100, rotationY: 15 }, 
        { opacity: 1, x: 0, z: 0, rotationY: 0, duration: 1.5, ease: "power2.out" },
        "-=0.5"
      );
      tl.fromTo(splitCenter, 
        { opacity: 0, y: 150, z: -200, scale: 0.9 }, 
        { opacity: 1, y: 0, z: 0, scale: 1, duration: 1.5, ease: "power2.out" },
        "<" // play at same time
      );
      tl.fromTo(splitRight, 
        { opacity: 0, x: 150, z: -100, rotationY: -15 }, 
        { opacity: 1, x: 0, z: 0, rotationY: 0, duration: 1.5, ease: "power2.out" },
        "<"
      );
      
      // Hold at the end to allow user to read the split before unpinning
      tl.to({}, { duration: 1 });
      });

    });

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  // 2. Data Terminal Continuous Beam
  useEffect(() => {
    if (!journeyRef.current) return;
    
    const beamGlow = journeyRef.current.querySelector(".about__beam-glow");

    const ctx = gsap.context(() => {
      const length = beamGlow.getTotalLength();
      const cometLength = 40; 
      
      gsap.set(beamGlow, { 
        strokeDasharray: `${cometLength} ${length}`, 
        strokeDashoffset: length 
      });

      gsap.to(beamGlow, {
        strokeDashoffset: -cometLength,
        ease: "none",
        duration: 2.5,
        repeat: -1,
      });
    }, journeyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about sheet theme-dark" id="about" data-theme="dark">
      
      {/* 1. Massive Spatial GSAP Stage */}
      <div className="about__spatial-stage" ref={stageRef}>
        
        {/* Layer 1: Hero Sentence */}
        <div className="about__spatial-layer about__hero-sentence">
          <p className="about__mono-label about__mono-label--center">{"// ABOUT WOLFEDGE LABS"}</p>
          <h1 className="about__massive-title">
            Pioneering secure<br />
            and reliable blockchain<br />
            infrastructure <span className="about__em">since 2018.</span>
          </h1>
        </div>

        {/* Layer 2: Mission Block */}
        <div className="about__spatial-layer about__mission-block">
          <p className="about__mono-label about__mono-label--center">{"// OUR MISSION"}</p>
          <h2 className="about__cinematic-text">
            {MISSION_TEXT.split(" ").map((word, i) => (
              <span key={i} className="about__mission-word">
                {word}{" "}
              </span>
            ))}
          </h2>
        </div>

        {/* Layer 3: The Spatial Split (Who We Are, Team, Ops) */}
        <div className="about__spatial-layer about__spatial-split-container">
          
          <div className="about__split-card about__split--left">
            <span className="about__split-num">01</span>
            <h3 className="about__split-title">Who We Are</h3>
            <p className="about__split-text">
              WolfEdge Labs is a leading provider of Proof of Stake validation services and blockchain infrastructure. With over 6 years of experience, we've established ourselves as a trusted partner for securing major networks.
            </p>
          </div>

          <div className="about__split-card about__split--center">
            <span className="about__split-num">02</span>
            <h3 className="about__split-title">Our Team</h3>
            <p className="about__split-text">
              Our team consists of blockchain experts, security professionals, and infrastructure specialists who are passionate about building the future of decentralized technology.
            </p>
          </div>

          <div className="about__split-card about__split--right">
            <span className="about__split-num">03</span>
            <h3 className="about__split-title">Operations</h3>
            <p className="about__split-text">
              We operate validator nodes across multiple Proof of Stake networks, providing high-availability infrastructure with enterprise-grade security and 24/7 monitoring.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Data Terminal Journey Pathway */}
      <div className="about__terminal-journey" ref={journeyRef} data-rise={rise}>
        
        <div className="about__terminal-header">
          <p className="about__mono-label">{"// OUR JOURNEY"}</p>
          <h2 className="about__terminal-title">Infrastructure History</h2>
          <p className="about__terminal-note">
            From our founding to the present day, we've been at the forefront of blockchain infrastructure.
          </p>
        </div>

        <div className="about__terminal-floor">
          <svg className="about__beam" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="about__beam-track"
              d="M 50 0 C 50 5, 10 10, 10 20 S 90 30, 90 40 S 10 50, 10 60 S 90 70, 90 80 S 10 90, 10 100"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="about__beam-glow"
              d="M 50 0 C 50 5, 10 10, 10 20 S 90 30, 90 40 S 10 50, 10 60 S 90 70, 90 80 S 10 90, 10 100"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {TIMELINE.map((item, i) => (
            <div className={`about__terminal-card-wrapper ${i % 2 === 0 ? "about__terminal-card--left" : "about__terminal-card--right"}`} key={item.id}>
              <div className="about__terminal-card">
                <div className="about__terminal-card-top">
                  <div className="about__terminal-inset-num mono">{item.year}</div>
                  <div className="about__terminal-content">
                    <h3 className="about__terminal-card-title">{item.title}</h3>
                    <p className="about__terminal-card-text">{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
