"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { disciplines } from "@/lib/data";
import { LineReveal, Reveal, SectionLabel } from "./Reveal";

const ICONS: Record<string, React.ReactNode> = {
  uiux: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <rect x="6" y="8" width="36" height="28" rx="4" />
      <path d="M6 15h36" />
      <rect x="11" y="20" width="12" height="10" rx="2" />
      <path d="M27 21h10M27 25h7M27 29h9" />
      <path d="M30 34l4 8 1.5-3.5L39 37z" fill="currentColor" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <path d="M8 40L24 8l16 32" />
      <path d="M14 28h20" />
      <circle cx="24" cy="8" r="2.5" fill="currentColor" />
      <circle cx="8" cy="40" r="2.5" />
      <circle cx="40" cy="40" r="2.5" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <path d="M24 5l15 6v11c0 10-6.5 17.5-15 21-8.5-3.5-15-11-15-21V11z" />
      <rect x="18" y="22" width="12" height="10" rx="2" />
      <path d="M20.5 22v-3a3.5 3.5 0 017 0v3" />
    </svg>
  ),
  games: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <path d="M14 16h20a9 9 0 019 9v2a7 7 0 01-12.5 4.3L28 28h-8l-2.5 3.3A7 7 0 015 27v-2a9 9 0 019-9z" />
      <path d="M14 21v6M11 24h6" />
      <circle cx="32" cy="22" r="1.5" fill="currentColor" />
      <circle cx="35" cy="26" r="1.5" fill="currentColor" />
    </svg>
  ),
};

const ACCENT: Record<string, string> = {
  uiux: "227,180,116",
  design: "239,233,223",
  security: "124,245,181",
  games: "240,138,93",
};

function Card({ d, i }: { d: (typeof disciplines)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(${ACCENT[d.id]},0.16), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(${ACCENT[d.id]},0.9), transparent 70%)`;

  return (
    <Reveal delay={i * 0.08} className="h-full">
      <div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => {
          x.set(-300);
          y.set(-300);
        }}
        className="group relative h-full rounded-[26px] bg-line p-px"
        data-hover
      >
        <motion.div className="absolute inset-0 rounded-[26px]" style={{ background: border }} />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] bg-ink-2 p-7">
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
          <div className="relative flex items-start justify-between">
            <span style={{ color: `rgb(${ACCENT[d.id]})` }} className="transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110">
              {ICONS[d.id]}
            </span>
            <span className="font-mono text-xs text-mute">0{i + 1}</span>
          </div>
          <h3 className="relative mt-14 text-3xl font-medium tracking-tight">{d.title}</h3>
          <p className="relative mt-3 text-[15px] leading-relaxed text-paper/65">{d.blurb}</p>
          <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
            {d.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Disciplines() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel index="02">What I do</SectionLabel>
          <LineReveal
            className="mt-8 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl"
            lines={["Four crafts,", <em key="e" className="text-amber">one mindset.</em>]}
          />
        </div>
        <Reveal>
          <p className="max-w-sm text-paper/60">
            A designer who understands attack surfaces. A security learner who cares about the humans on the other side of the
            screen.
          </p>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {disciplines.map((d, i) => (
          <Card key={d.id} d={d} i={i} />
        ))}
      </div>
    </section>
  );
}
