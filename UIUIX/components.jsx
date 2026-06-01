/* ============================================================================
   Shared building blocks — exported to window for the other Babel scripts.
   Reveal + Counter use a scroll-position registry (NOT IntersectionObserver,
   which does not fire reliably in this embedded preview context).
   ============================================================================ */
const { useState, useEffect, useRef } = React;

/* ---- Per-element "in view" watcher ------------------------------------------
   IntersectionObserver does not fire reliably in this embedded preview, and a
   shared registry raced badly with the slow webfont reflow. So each element
   watches itself: check now, on scroll/resize, and on a short retry loop that
   survives late layout shifts (fonts loading). Fully self-contained = robust. */
function _watchInView(el, cb) {
  let done = false;
  const fire = () => {
    if (done || !el) return false;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) { done = true; cleanup(); cb(); return true; }
    return false;
  };
  const onScroll = () => fire();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // retry for ~4s to catch reflow from late webfont load, then rely on scroll
  let n = 0;
  const iv = setInterval(() => { if (fire() || ++n > 34) clearInterval(iv); }, 120);
  requestAnimationFrame(fire);
  function cleanup() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    clearInterval(iv);
  }
  return cleanup;
}

/* ---- Animated counter (counts up when scrolled into view) -------------- */
function Counter({ end, duration = 1900, suffix = "", prefix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return _watchInView(el, () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(end * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setVal(end);
      };
      requestAnimationFrame(tick);
    });
  }, [end, duration]);
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref} className="tnum">{prefix}{shown}{suffix}</span>;
}

/* ---- Reveal on scroll (rAF-driven so it never stalls like a throttled
   CSS transition can; embers prove rAF runs even when the tab is occluded) -- */
function Reveal({ children, delay = 0, as = "div", className = "", style = {}, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = () => {
      if (reduced) { el.classList.add("in"); return; }
      const dur = 620;
      let start = null;
      const step = (now) => {
        if (start === null) start = now + delay;
        let p = (now - start) / dur;
        if (p < 0) { requestAnimationFrame(step); return; }
        p = Math.min(p, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.style.opacity = e;
        el.style.transform = "translateY(" + (1 - e) * 26 + "px)";
        if (p < 1) requestAnimationFrame(step);
        else { el.style.opacity = ""; el.style.transform = ""; el.classList.add("in"); }
      };
      requestAnimationFrame(step);
    };
    const cancel = _watchInView(el, reveal);
    // hard failsafe: never leave content hidden even if something goes wrong
    const safety = setTimeout(() => el.classList.add("in"), 2600 + delay);
    return () => { cancel && cancel(); clearTimeout(safety); };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={"reveal " + className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/* ---- Ember particle background (subtle, drifts up like a campfire) ------ */
function EmberCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dpr;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = reduced ? 0 : 46;
    let parts = [];
    const colors = ["#FF3B1E", "#FF7A1A", "#FFC42E"];
    const reset = (p, initial) => {
      p.x = Math.random() * w;
      p.y = initial ? Math.random() * h : h + 12;
      p.r = 0.6 + Math.random() * 1.9;
      p.vy = 0.15 + Math.random() * 0.55;
      p.vx = (Math.random() - 0.5) * 0.25;
      p.life = 0; p.max = 240 + Math.random() * 360;
      p.c = colors[(Math.random() * colors.length) | 0];
      p.base = 0.0 + Math.random() * 0.5;
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    parts = Array.from({ length: COUNT }, () => { const p = {}; reset(p, true); return p; });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.life++; p.y -= p.vy; p.x += p.vx + Math.sin(p.life * 0.02) * 0.18;
        const fade = Math.sin((p.life / p.max) * Math.PI);
        const a = Math.max(0, p.base * fade);
        if (p.life > p.max || p.y < -10) reset(p, false);
        ctx.beginPath();
        ctx.globalAlpha = a;
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 8; ctx.shadowColor = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    if (COUNT) draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="ember-canvas" aria-hidden="true" />;
}

Object.assign(window, { Counter, Reveal, EmberCanvas });
