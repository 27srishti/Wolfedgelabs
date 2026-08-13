/* ————————————————————————————————————————————————
   THE WOLFEDGE FLOW
   One persistent field of light behind the whole page:
   lanes (infrastructure paths), streams (signals moving
   along them), nodes (systems), atmosphere (depth).

   Nothing is ever swapped and nothing ever resets. Each
   section only re-tunes the same parameters, and every
   drawn value eases toward its target, so the field
   EVOLVES as the visitor travels:

   hero        sparse signal, waking up
   identity    the flow begins to branch: two sides
   products    three distinct streams
   operations  the network densifies, nodes appear
   engineering ordered, brighter: the machine at work
   canton      the camera pulls back, one wide field
   ecosystem   nodes exchange energy
   audiences   lanes fan out to the participants
   telemetry   everything aligns, calm and measured
   journey     quiet, receding
   founder     near stillness
   coda        one converging signal, then dark
   ———————————————————————————————————————————————— */

const SCENES = {
  hero:        { density: 0.28, branch: 0,    converge: 0,    order: 0.35, energy: 0.42, nodes: 0.08, spread: 0.62, scale: 1,    groups: 4, tint: 0 },
  identity:    { density: 0.42, branch: 0.6,  converge: 0,    order: 0.5,  energy: 0.5,  nodes: 0.12, spread: 0.7,  scale: 1,    groups: 2, tint: 0 },
  products:    { density: 0.58, branch: 1,    converge: 0,    order: 0.72, energy: 0.68, nodes: 0.22, spread: 0.74, scale: 1,    groups: 3, tint: 0 },
  operations:  { density: 0.9,  branch: 0.5,  converge: 0,    order: 0.5,  energy: 0.62, nodes: 0.75, spread: 0.88, scale: 1,    groups: 4, tint: 0 },
  engineering: { density: 0.62, branch: 0.3,  converge: 0,    order: 0.95, energy: 0.75, nodes: 0.3,  spread: 0.8,  scale: 1,    groups: 4, tint: 1 },
  canton:      { density: 0.6,  branch: 0.25, converge: 0.45, order: 0.62, energy: 0.5,  nodes: 0.4,  spread: 1.02, scale: 0.93, groups: 4, tint: 0 },
  ecosystem:   { density: 0.78, branch: 0.45, converge: 0.3,  order: 0.5,  energy: 1,    nodes: 1,    spread: 0.9,  scale: 0.97, groups: 5, tint: 0 },
  audiences:   { density: 0.6,  branch: 0.7,  converge: 0,    order: 0.55, energy: 0.6,  nodes: 0.35, spread: 1.18, scale: 1,    groups: 6, tint: 0 },
  telemetry:   { density: 0.5,  branch: 0.15, converge: 0.15, order: 1,    energy: 0.22, nodes: 0.3,  spread: 0.82, scale: 1,    groups: 4, tint: 0 },
  journey:     { density: 0.34, branch: 0.1,  converge: 0.1,  order: 0.8,  energy: 0.25, nodes: 0.15, spread: 0.66, scale: 1,    groups: 4, tint: 0 },
  founder:     { density: 0.22, branch: 0,    converge: 0.1,  order: 0.85, energy: 0.12, nodes: 0.08, spread: 0.52, scale: 1,    groups: 4, tint: 0 },
  coda:        { density: 0.34, branch: 0,    converge: 1,    order: 0.9,  energy: 0.45, nodes: 0.1,  spread: 0.62, scale: 1,    groups: 4, tint: 0 },
};

const PARAM_KEYS = Object.keys(SCENES.hero);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

class FlowEngine {
  init(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.mobile = window.matchMedia("(max-width: 760px)").matches;
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.mobile ? 1.25 : 1.75);

    this.params = { ...SCENES.hero };
    this.target = { ...SCENES.hero };
    this.scene = "hero";

    this.laneCount = this.mobile ? 9 : 16;
    this.lanes = Array.from({ length: this.laneCount }, (_, i) => ({
      u: this.laneCount === 1 ? 0.5 : i / (this.laneCount - 1),
      gi: i,
      near: i % 2 === 1,
      ph: Math.random() * Math.PI * 2,
      sp: 0.14 + Math.random() * 0.18,
      yR: 0, // smoothed right-end target
      nodeT: Math.random() < 0.62 ? [0.28 + Math.random() * 0.12, 0.58 + Math.random() * 0.16] : [],
    }));

    const maxP = this.mobile ? 26 : 70;
    this.particles = Array.from({ length: maxP }, () => this.spawnParticle(true));

    this.rings = [];
    this.time = 0;
    this.lastScroll = window.scrollY;
    this.scrollBoost = 0;
    this.ringTimer = 0;

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    window.addEventListener("resize", this.resize);
    this.resize();

    if (this.reduced) {
      this.drawStatic();
    } else {
      this.raf = requestAnimationFrame(this.loop);
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
  }

  setScene(name) {
    if (!SCENES[name] || name === this.scene) return;
    this.scene = name;
    this.target = { ...SCENES[name] };
    if (this.reduced) {
      this.params = { ...SCENES[name] };
      this.drawStatic();
    }
  }

  resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    if (this.reduced) this.drawStatic();
  }

  spawnParticle(seedAnywhere) {
    return {
      lane: Math.floor(Math.random() * this.laneCount),
      t: seedAnywhere ? Math.random() : -0.08,
      speed: 0.05 + Math.random() * 0.09,
      len: 0.045 + Math.random() * 0.05,
      w: 0.9 + Math.random() * 1.4,
      white: Math.random() < 0.06,
    };
  }

  /* Lane geometry for the current params. Returns cubic control points. */
  laneGeom(lane) {
    const { w, h, params } = this;
    const p = params;
    const wob = Math.sin(this.time * lane.sp + lane.ph + window.scrollY * 0.0012);
    const amp = h * 0.055 * (1 - p.order * 0.75);

    const yCenter = (u, spread) => h * (0.5 + (u - 0.5) * spread);

    const yL = yCenter(lane.u, p.spread * 0.85) + wob * amp * 0.6;

    // right-end target: natural spread → group band → convergence focus
    const groups = Math.max(2, Math.round(p.groups));
    const gnorm = groups === 1 ? 0.5 : (lane.gi % groups) / (groups - 1);
    const ySpreadR = yCenter(lane.u, p.spread);
    const yGroup = h * (0.5 + (gnorm - 0.5) * 0.7);
    let yTarget = lerp(ySpreadR, yGroup, p.branch);
    yTarget = lerp(yTarget, h * 0.5, p.converge);
    // ease the endpoint so group-count changes never snap
    lane.yR += (yTarget - lane.yR) * 0.045;

    const xR = lerp(w + 50, w * 0.84, p.converge);
    const x0 = -50;
    const midY = (yL + lane.yR) / 2 + wob * amp;

    return {
      x0, y0: yL,
      x1: w * 0.34, y1: midY + Math.cos(this.time * lane.sp * 0.8 + lane.ph) * amp * 0.7,
      x2: w * 0.66, y2: midY - wob * amp * 0.5,
      x3: xR, y3: lane.yR,
    };
  }

  pointAt(g, t) {
    const it = 1 - t;
    const x = it * it * it * g.x0 + 3 * it * it * t * g.x1 + 3 * it * t * t * g.x2 + t * t * t * g.x3;
    const y = it * it * it * g.y0 + 3 * it * it * t * g.y1 + 3 * it * t * t * g.y2 + t * t * t * g.y3;
    return [x, y];
  }

  step(dt) {
    // ease all params toward the scene target
    const k = clamp(dt * 1.1, 0, 1);
    PARAM_KEYS.forEach((key) => {
      this.params[key] = lerp(this.params[key], this.target[key], k);
    });
    this.time += dt;

    // scroll → a touch more energy in the streams
    const sy = window.scrollY;
    const vel = Math.abs(sy - this.lastScroll) / Math.max(dt, 0.001);
    this.lastScroll = sy;
    this.scrollBoost = lerp(this.scrollBoost, clamp(vel * 0.00045, 0, 1.1), clamp(dt * 3, 0, 1));

    // streams
    const active = Math.round(
      this.particles.length * (0.22 + 0.78 * this.params.density * (0.4 + this.params.energy * 0.6))
    );
    this.activeCount = active;
    for (let i = 0; i < active; i++) {
      const pt = this.particles[i];
      pt.t += pt.speed * dt * (0.55 + this.params.energy + this.scrollBoost);
      if (pt.t > 1 + pt.len) this.particles[i] = this.spawnParticle(false);
    }

    // energy exchange rings (ecosystem)
    this.ringTimer -= dt;
    if (this.params.nodes > 0.62 && this.params.energy > 0.55 && this.ringTimer <= 0 && this.rings.length < 4) {
      const withNodes = this.lanes.filter((l) => l.nodeT.length);
      if (withNodes.length) {
        const lane = withNodes[Math.floor(Math.random() * withNodes.length)];
        const t = lane.nodeT[Math.floor(Math.random() * lane.nodeT.length)];
        const [x, y] = this.pointAt(this.laneGeom(lane), t);
        this.rings.push({ x, y, r: 2, life: 0 });
      }
      this.ringTimer = 0.9 + Math.random() * 0.9;
    }
    this.rings.forEach((r) => {
      r.r += dt * 46;
      r.life += dt;
    });
    this.rings = this.rings.filter((r) => r.life < 1.35);
  }

  draw() {
    const { ctx, w, h, dpr, params: p } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#05070b";
    ctx.fillRect(0, 0, w, h);

    // atmosphere: two slow blooms; the cobalt tint deepens for engineering
    const ax = w * (0.68 + Math.sin(this.time * 0.05) * 0.06);
    const ay = h * (0.4 + Math.cos(this.time * 0.04) * 0.05);
    let grad = ctx.createRadialGradient(ax, ay, 0, ax, ay, w * 0.55);
    grad.addColorStop(0, `rgba(28, 48, 108, ${0.1 + p.density * 0.05 + p.tint * 0.1})`);
    grad.addColorStop(1, "rgba(28,48,108,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    grad = ctx.createRadialGradient(w * 0.22, h * 0.78, 0, w * 0.22, h * 0.78, w * 0.4);
    grad.addColorStop(0, `rgba(70, 100, 190, ${0.05 + p.tint * 0.07})`);
    grad.addColorStop(1, "rgba(70,100,190,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // camera
    const s = p.scale;
    ctx.translate((w / 2) * (1 - s), (h / 2) * (1 - s));
    ctx.scale(s, s);

    // lanes — far pass then near pass for depth
    const geoms = this.lanes.map((l) => this.laneGeom(l));
    ctx.lineCap = "round";
    this.lanes.forEach((lane, i) => {
      const g = geoms[i];
      const base = lane.near ? 0.055 + p.density * 0.075 : 0.028 + p.density * 0.045;
      ctx.strokeStyle = `rgba(140, 165, 230, ${base + p.tint * 0.04})`;
      ctx.lineWidth = lane.near ? 1.1 : 0.6;
      ctx.beginPath();
      ctx.moveTo(g.x0, g.y0);
      ctx.bezierCurveTo(g.x1, g.y1, g.x2, g.y2, g.x3, g.y3);
      ctx.stroke();
    });

    // convergence focus: a faint destination glow when lanes gather
    if (p.converge > 0.12) {
      const fx = w * 0.84;
      const fy = h * 0.5;
      const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 130);
      fg.addColorStop(0, `rgba(150, 185, 255, ${0.16 * p.converge})`);
      fg.addColorStop(1, "rgba(150,185,255,0)");
      ctx.fillStyle = fg;
      ctx.fillRect(fx - 140, fy - 140, 280, 280);
    }

    // nodes
    if (p.nodes > 0.04) {
      this.lanes.forEach((lane, i) => {
        lane.nodeT.forEach((t) => {
          const [x, y] = this.pointAt(geoms[i], t);
          const a = p.nodes * (lane.near ? 0.55 : 0.3);
          ctx.fillStyle = `rgba(190, 210, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(x, y, lane.near ? 2 : 1.3, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    // energy rings
    this.rings.forEach((r) => {
      const a = (1 - r.life / 1.35) * 0.3 * p.energy;
      ctx.strokeStyle = `rgba(150, 190, 255, ${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // streams
    const active = this.activeCount || 0;
    for (let i = 0; i < active; i++) {
      const pt = this.particles[i];
      const lane = this.lanes[pt.lane];
      const g = geoms[pt.lane];
      const t1 = clamp(pt.t, 0, 1);
      const t0 = clamp(pt.t - pt.len, 0, 1);
      if (t1 <= 0 || t0 >= 1) continue;
      const [x1, y1] = this.pointAt(g, t1);
      const [x0, y0] = this.pointAt(g, t0);
      const bright = (lane.near ? 0.7 : 0.4) * (0.45 + p.energy * 0.55);
      const sg = ctx.createLinearGradient(x0, y0, x1, y1);
      if (pt.white) {
        sg.addColorStop(0, "rgba(220, 235, 255, 0)");
        sg.addColorStop(1, `rgba(235, 244, 255, ${bright})`);
      } else {
        sg.addColorStop(0, "rgba(64, 110, 255, 0)");
        sg.addColorStop(1, `rgba(155, 190, 255, ${bright})`);
      }
      ctx.strokeStyle = sg;
      ctx.lineWidth = pt.w * (lane.near ? 1.15 : 0.7);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
  }

  drawStatic() {
    // reduced motion: one calm frame, no streams racing
    this.time = 1;
    this.lanes.forEach((lane) => { lane.yR = this.h * 0.5; });
    for (let i = 0; i < 60; i++) this.lanes.forEach((l) => this.laneGeom(l));
    this.activeCount = Math.round(this.particles.length * 0.3);
    this.particles.forEach((pt, i) => { pt.t = (i / this.particles.length) * 0.9 + 0.05; });
    this.draw();
  }

  loop(now) {
    if (!this.last) this.last = now;
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.step(dt);
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  }
}

const engine = new FlowEngine();
export default engine;
