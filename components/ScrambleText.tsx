"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEF$%&";

/** Decrypt-style text scramble. Triggers on mount (optional), on `trigger` change and on hover. */
export function useScramble(text: string, { speed = 28, delay = 0 } = {}) {
  const [output, setOutput] = useState(text);
  const frame = useRef<number>(0);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const run = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }
    cancelAnimationFrame(frame.current);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      let tick = 0;
      const total = text.length;
      let last = 0;
      const step = (t: number) => {
        if (t - last >= speed) {
          last = t;
          tick++;
          const revealed = Math.floor(tick / 1.6);
          let s = "";
          for (let i = 0; i < total; i++) {
            const ch = text[i];
            if (ch === " " || i < revealed) s += ch;
            else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          setOutput(s);
          if (revealed >= total) {
            setOutput(text);
            return;
          }
        }
        frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    }, delay);
  }, [text, speed, delay]);

  useEffect(() => () => {
    cancelAnimationFrame(frame.current);
    clearTimeout(timeout.current);
  }, []);

  return { output, run };
}

export default function ScrambleText({
  text,
  className,
  onMount = false,
  delay = 0,
  hover = true,
}: {
  text: string;
  className?: string;
  onMount?: boolean;
  delay?: number;
  hover?: boolean;
}) {
  const { output, run } = useScramble(text, { delay });
  useEffect(() => {
    if (onMount) run();
  }, [onMount, run]);
  return (
    <span className={className} onMouseEnter={hover ? run : undefined} aria-label={text}>
      <span aria-hidden>{output}</span>
    </span>
  );
}
