import React, { useEffect, useRef } from "react";

type RevealProps = {
  children?: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export function Reveal({ children, delay = 0, as: Tag = "div", className = "", style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      if (reduced) { el.classList.add("in"); return; }

      const dur = 620;
      let start: number | null = null;

      const step = (now: number) => {
        if (start === null) start = now + delay;
        let p = (now - start) / dur;
        if (p < 0) { requestAnimationFrame(step); return; }
        p = Math.min(p, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.style.opacity = String(e);
        el.style.transform = `translateY(${(1 - e) * 26}px)`;
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          el.style.opacity = "";
          el.style.transform = "";
          el.classList.add("in");
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          animate();
        }
      },
      // "-8%" bottom margin ≈ fire at 92% scroll depth (matches original threshold)
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // Hard failsafe: never leave content invisible if observer misfires
    const safety = setTimeout(() => {
      el.classList.add("in");
      observer.disconnect();
    }, 2600 + delay);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [delay]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic tag; typed externally
  const T = (Tag || "div") as any;
  return (
    <T ref={ref} className={`reveal ${className}`.trim()} style={style} id={id}>
      {children}
    </T>
  );
}
