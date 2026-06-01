import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  max: number;
  c: string;
  base: number;
}

const COLORS = ["#FF3B1E", "#FF7A1A", "#FFC42E"];

export function EmberCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = reduced ? 0 : 46;

    let raf: number;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: Particle[] = [];

    const reset = (p: Particle, initial: boolean) => {
      p.x = Math.random() * w;
      p.y = initial ? Math.random() * h : h + 12;
      p.r = 0.6 + Math.random() * 1.9;
      p.vy = 0.15 + Math.random() * 0.55;
      p.vx = (Math.random() - 0.5) * 0.25;
      p.life = 0;
      p.max = 240 + Math.random() * 360;
      p.c = COLORS[(Math.random() * COLORS.length) | 0];
      p.base = Math.random() * 0.5;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    parts = Array.from({ length: COUNT }, () => {
      const p = {} as Particle;
      reset(p, true);
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.life++;
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.18;
        const fade = Math.sin((p.life / p.max) * Math.PI);
        const a = Math.max(0, p.base * fade);
        if (p.life > p.max || p.y < -10) reset(p, false);
        ctx.beginPath();
        ctx.globalAlpha = a;
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    if (COUNT) draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="ember-canvas" aria-hidden="true" />;
}
