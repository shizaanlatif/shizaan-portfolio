"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINES = ["establishing secure session", "loading design tokens", "compiling curiosity", "access granted"];

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 280);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const line = LINES[Math.min(LINES.length - 1, Math.floor((pct / 100) * LINES.length))];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            <span>Shizaan / Portfolio</span>
            <span>Nagpur, IN</span>
          </div>
          <div>
            <div className="font-mono text-xs text-signal">
              <span className="text-mute">$</span> {line}
              <span className="caret">_</span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-6">
              <span className="font-serif text-[22vw] leading-[0.8] tracking-tight sm:text-[16vw]">
                {String(pct).padStart(3, "0")}
              </span>
              <span className="mb-3 hidden max-w-[16rem] text-right font-serif text-2xl italic text-mute sm:block">
                Build · Create · Secure · Explore
              </span>
            </div>
            <div className="mt-6 h-px w-full bg-line">
              <div className="h-px bg-paper" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
