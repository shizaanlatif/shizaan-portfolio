"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { projects, type Project } from "@/lib/data";
import { LineReveal, SectionLabel } from "./Reveal";
import { AlertVisual, LanternVisual, PhishVisual, PortfolioVisual, ProfileVisual, VaultVisual } from "./ProjectVisuals";
import ScrambleText from "./ScrambleText";

const VISUALS = { vault: VaultVisual, phish: PhishVisual, lantern: LanternVisual, profile: ProfileVisual, portfolio: PortfolioVisual, alert: AlertVisual };

function ProjectCard({ p, i, progress, total }: { p: Project; i: number; progress: MotionValue<number>; total: number }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [start, start + 1 / total], [0, i === total - 1 ? 0 : 0.5]);
  const Visual = VISUALS[p.visual];

  return (
    <div className="flex items-start pt-6 lg:sticky lg:top-[var(--stack-top)] lg:min-h-[85vh]" style={{ "--stack-top": `calc(4.5rem + ${i * 20}px)` } as React.CSSProperties}>
      <motion.article
        style={{ scale }}
        className="relative w-full origin-top overflow-hidden rounded-[32px] border border-line bg-ink-2"
      >
        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col p-7 sm:p-10">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
              <span style={{ color: p.accent }}>{p.index} / 0{total}</span>
              <span className="text-mute">{p.year}</span>
            </div>
            <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{p.kind}</div>
            <h3 className="mt-2 font-serif text-5xl leading-none tracking-tight sm:text-7xl">
              <ScrambleText text={p.title} />
            </h3>
            <p className="mt-5 text-lg leading-snug text-paper/85">{p.summary}</p>

            <dl className="mt-7 grid gap-5 text-[14px] leading-relaxed sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Challenge</dt>
                <dd className="mt-1.5 text-paper/65">{p.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Outcome</dt>
                <dd className="mt-1.5 text-paper/65">{p.outcome}</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {p.role.map((r) => (
                <span key={r} className="rounded-full bg-paper/[0.06] px-3 py-1 text-xs text-paper/75">
                  {r}
                </span>
              ))}
            </div>
            <div className="mt-3 font-mono text-[11px] text-mute">{p.tools.join("  ·  ")}</div>

            <div className="mt-auto flex flex-wrap gap-3 pt-9">
              {p.links.map((l, j) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all ${
                    j === 0 ? "bg-paper text-ink hover:bg-amber" : "border border-line text-paper/80 hover:border-paper/60"
                  }`}
                >
                  {l.label}
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="relative min-h-[380px] border-t border-line lg:min-h-[560px] lg:border-l lg:border-t-0">
            <Visual />
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionLabel index="04">Selected Work</SectionLabel>
      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <LineReveal
          className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl"
          lines={["Three projects,", <em key="e" className="text-amber">three ways of thinking.</em>]}
        />
        <p className="max-w-sm text-paper/60">Each one is interactive — hover, scan and explore the previews on the right.</p>
      </div>

      <div ref={ref} className="mt-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} progress={scrollYProgress} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
