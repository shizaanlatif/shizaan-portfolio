"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile, socials } from "@/lib/data";
import Magnetic from "./Magnetic";
import { scrollToId } from "./SmoothScroll";

const ICON: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z" />
    </svg>
  ),
  Behance: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M8.2 11.3c.9-.45 1.4-1.2 1.4-2.3C9.6 6.9 8 6 5.9 6H0v12h6.1c2.2 0 4.2-1.05 4.2-3.5 0-1.5-.7-2.65-2.1-3.2zM2.7 8.1h2.6c1 0 1.9.28 1.9 1.44 0 1.07-.7 1.5-1.7 1.5H2.7zm2.9 7.8H2.7v-3.3h3c1.2 0 2 .52 2 1.8 0 1.27-.9 1.5-2.1 1.5zM15.5 7.2h5.1v1.3h-5.1zM18.1 9.6c-2.8 0-4.6 2-4.6 4.6 0 2.7 1.7 4.6 4.6 4.6 2.2 0 3.6-1 4.3-3.1h-2.2c-.25.78-1.23 1.2-2 1.2-1.46 0-2.24-.86-2.24-2.3h6.6c.1-2.9-1.5-5-4.46-5zm-2.1 3.7c.08-1.2.88-1.95 2.08-1.95 1.26 0 1.88.74 1.99 1.95z" />
    </svg>
  ),
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden border-t border-line pt-24 sm:pt-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
          <span className="text-signal">07</span>
          <span className="h-px w-10 bg-line" />
          <span>Contact</span>
        </div>

        <motion.h2 style={{ x }} className="mt-10 whitespace-nowrap font-serif text-[15vw] leading-[0.85] tracking-[-0.03em] lg:text-[12rem]">
          Let&apos;s <em className="text-amber">build</em>
        </motion.h2>
        <h2 className="whitespace-nowrap text-right font-serif text-[15vw] leading-[0.85] tracking-[-0.03em] lg:text-[12rem]">
          something<span className="text-signal">.</span>
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="max-w-md text-lg leading-relaxed text-paper/70">
              Looking to collaborate on meaningful projects, internships and anything that needs a designer who thinks about security.
              My inbox is open.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {[
                { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
                { k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
              ].map((c) => (
                <a key={c.k} href={c.href} data-cursor="Open" className="group block w-fit">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{c.k}</span>
                  <span className="mt-1 inline-flex items-center gap-2 break-all font-serif text-2xl text-paper transition-colors group-hover:text-amber sm:text-3xl">
                    {c.v}
                    <span className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.2} className="!block">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Visit"
                  className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-transparent hover:text-ink"
                >
                  <span className="absolute inset-0 translate-y-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="relative flex items-center justify-between">
                    {ICON[s.label]}
                    <span className="transition-transform duration-500 group-hover:rotate-45">↗</span>
                  </span>
                  <span className="relative">
                    <span className="block text-lg font-medium">{s.label}</span>
                    <span className="block font-mono text-[11px] opacity-60">{s.handle}</span>
                  </span>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-line py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
          <span className="normal-case tracking-normal">
            <span className="font-serif text-base italic">Build · Create · Secure · Explore</span>
          </span>
          <button onClick={() => scrollToId("top")} className="text-left hover:text-paper sm:text-right">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
