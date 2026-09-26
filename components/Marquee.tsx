"use client";

import { motion, useScroll, useTransform } from "motion/react";

const WORDS = ["UI/UX Design", "Cybersecurity", "Visual Design", "Game Development", "Prototyping", "Design Systems", "Ethical Hacking", "Interaction"];

export default function Marquee() {
  const { scrollYProgress } = useScroll();
  const skew = useTransform(scrollYProgress, [0, 0.15], [0, -3]);
  const row = [...WORDS, ...WORDS];
  return (
    <motion.div style={{ rotate: skew }} className="relative z-10 -mx-4 my-10 border-y border-line bg-paper py-5 text-ink sm:my-16">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`text-3xl sm:text-5xl ${i % 2 ? "font-serif italic" : "font-medium tracking-tight"}`}>{w}</span>
            <span className="text-2xl text-ember">✦</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
