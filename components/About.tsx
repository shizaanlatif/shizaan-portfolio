"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { about, education, profile, skillGroups } from "@/lib/data";
import { Reveal, SectionLabel } from "./Reveal";

const SKILL_COUNT = skillGroups.reduce((n, g) => n + g.skills.length, 0);

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Intro sentence that "writes itself" as you scroll. */
function ScrollParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="font-serif text-[9.5vw] leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-7xl">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionLabel index="01">About</SectionLabel>
      <div className="mt-10 max-w-5xl">
        <ScrollParagraph text={profile.intro} />
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="space-y-6 text-[17px] leading-relaxed text-paper/75">
          {about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? "text-paper" : ""}>{p}</p>
            </Reveal>
          ))}
          <Reveal>
            <div className="pt-4 font-serif text-3xl italic leading-tight text-paper sm:text-4xl">
              {profile.motto.map((m, i) => (
                <span key={m} className={`block ${i === 2 ? "text-amber" : ""}`}>
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">Education</div>
          </Reveal>
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-paper/30">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber/0 blur-3xl transition-colors duration-700 group-hover:bg-amber/20" />
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                    {e.period}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-medium leading-tight tracking-tight">{e.school}</h3>
                <p className="mt-2 text-paper/70">{e.degree}</p>
                <p className="mt-4 font-mono text-xs text-mute">{e.note}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                ["4", "Focus areas"],
                [String(SKILL_COUNT), "Tools & skills"],
                ["∞", "Curiosity"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-line p-4">
                  <div className="font-serif text-4xl">{n}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mute">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
