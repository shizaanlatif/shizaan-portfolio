"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { profile } from "@/lib/data";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import { scrollToId } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;
const START = 1.75; // after the loader lifts

function Letters({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className ?? ""}`} aria-label={word}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          className="inline-block whitespace-nowrap text-amber"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Portrait with a pointer-driven colour "decrypt" lens and a scanning line. */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(42);
  const sx = useSpring(mx, { stiffness: 140, damping: 20 });
  const sy = useSpring(my, { stiffness: 140, damping: 20 });
  const rX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const r = useMotionValue(0);
  const rs = useSpring(r, { stiffness: 120, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(circle ${rs}px at ${sx}% ${sy}%, #000 55%, transparent 100%)`;

  useEffect(() => {
    // idle: the lens opens by default on touch devices so the colour is visible
    if (!window.matchMedia("(pointer: fine)").matches) r.set(900);
  }, [r]);

  return (
    <motion.div
      ref={ref}
      data-cursor="Scan"
      className="relative aspect-[4/5] w-full [perspective:1200px]"
      initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.4, ease: EASE, delay: START + 0.2 }}
      onPointerMove={(e) => {
        const b = ref.current!.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width;
        const py = (e.clientY - b.top) / b.height;
        mx.set(px * 100);
        my.set(py * 100);
        rY.set((px - 0.5) * 10);
        rX.set(-(py - 0.5) * 10);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && r.set(190)}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") r.set(0);
        rX.set(0);
        rY.set(0);
      }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[28px] border border-line bg-ink-2"
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      >
        <Image
          src="/shizaan.jpg"
          alt="Illustrated portrait of Mohammad Shizaan"
          fill
          priority
          sizes="(min-width: 1024px) 420px, 90vw"
          className="object-cover object-[50%_30%] grayscale contrast-[1.08] brightness-[0.72]"
        />
        <motion.div className="absolute inset-0" style={{ WebkitMaskImage: mask, maskImage: mask }}>
          <Image src="/shizaan.jpg" alt="" fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover object-[50%_30%]" />
        </motion.div>
        <div className="scanlines pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-signal/25 to-transparent"
          initial={{ top: "-20%" }}
          animate={{ top: ["-20%", "110%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear", delay: START + 1 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

        {/* HUD corners */}
        {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map((c) => (
          <span key={c} className={`absolute h-5 w-5 border-signal/80 ${c}`} />
        ))}
        <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-signal/90">
          <ScrambleText text="ID // MS-2026" onMount delay={(START + 0.8) * 1000} />
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
          <div>
            <div className="text-mute">Subject</div>
            <div className="mt-1 text-paper">Mohammad Shizaan</div>
          </div>
          <div className="flex items-center gap-2 text-signal">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            <ScrambleText text="Verified" onMount delay={(START + 1.2) * 1000} />
          </div>
        </div>
      </motion.div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
        <span className="hidden sm:inline">Hover to decrypt colour</span>
        <span className="sm:hidden">Build · Create · Secure · Explore</span>
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yName = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-amber/10 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-signal/10 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ opacity: fade }} className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_400px] lg:items-center lg:gap-16">
        <motion.div style={{ y: yName }}>
          <motion.div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: START, duration: 0.8 }}
          >
            <span className="text-signal">● Open to work & collaboration</span>
            <span>21.14°N 79.08°E</span>
          </motion.div>

          <h1 className="mt-6 font-serif leading-[0.86] tracking-[-0.02em]">
            <span className="block text-[17vw] sm:text-[13vw] lg:text-[9.2rem] xl:text-[10.5rem]">
              <Letters word="Mohammad" delay={START} />
            </span>
            <span className="block text-[17vw] italic sm:text-[13vw] lg:text-[9.2rem] xl:text-[10.5rem]">
              <Letters word="Shizaan" delay={START + 0.2} className="text-amber" />
              <motion.span
                className="ml-3 inline-block align-top font-sans text-base not-italic text-signal sm:text-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: START + 0.9, type: "spring", stiffness: 260, damping: 14 }}
              >
                ✦
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.6, duration: 1, ease: EASE }}
            className="mt-8 max-w-xl"
          >
            <p className="text-xl leading-snug text-paper/90 sm:text-2xl">
              <RoleCycler /> <span className="text-paper/50">in the making —</span>
              <br />
              {profile.tagline}
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mute">
              CSE student at St. Vincent Pallotti College, Nagpur. Working where UI/UX, visual design, cybersecurity and
              game development overlap.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.8, duration: 1, ease: EASE }}
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("work")}
                className="group relative overflow-hidden rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View selected work
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
                <span className="absolute inset-0 translate-y-full rounded-full bg-amber transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToId("terminal")}
                className="rounded-full border border-line px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper/80 transition-colors hover:border-signal hover:text-signal"
              >
                $ open terminal
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <div className="mx-auto w-full max-w-[400px] lg:mx-0">
          <Portrait />
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: START + 1.4 }}
        aria-label="Scroll to about"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-paper"
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
