"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { process } from "@/lib/data";
import { LineReveal, Reveal, SectionLabel } from "./Reveal";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionLabel index="05">Process</SectionLabel>
      <LineReveal
        className="mt-8 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl"
        lines={["Design thinking,", <span key="b">with a <em className="text-signal">security layer.</em></span>]}
      />

      <div ref={ref} className="relative mt-16">
        <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-line lg:block" />
        <motion.div className="absolute left-0 top-[22px] hidden h-px bg-gradient-to-r from-amber to-signal lg:block" style={{ width }} />
        <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <li className="group relative">
                <div
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-ink font-mono text-xs transition-all duration-500 group-hover:scale-110 ${
                    p.step === "Defend" ? "border-signal text-signal" : "border-line text-paper/70 group-hover:border-amber group-hover:text-amber"
                  }`}
                >
                  0{i + 1}
                </div>
                <h3 className="mt-6 text-2xl font-medium tracking-tight">
                  {p.step}
                  {p.step === "Defend" && <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-signal">my edge</span>}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/60">{p.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
