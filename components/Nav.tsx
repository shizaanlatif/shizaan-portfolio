"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { scrollToId } from "./SmoothScroll";
import { socials } from "@/lib/data";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];

function Clock() {
  const [t, setT] = useState<string>("");
  useEffect(() => {
    const f = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "--:--"} IST</span>;
}

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400 && !open);
    setScrolled(v > 40);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-500 sm:px-5 ${
            scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <button onClick={() => go("top")} className="group flex items-center gap-2" aria-label="Back to top">
            <span className="font-serif text-2xl italic leading-none">ms</span>
            <span className="h-1.5 w-1.5 rounded-full bg-signal transition-transform duration-500 group-hover:scale-150" />
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="relative rounded-full px-4 py-1.5 text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-paper/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Nagpur · <Clock />
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <motion.span className="h-px w-4 bg-paper" animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} />
              <motion.span className="h-px w-4 bg-paper" animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} />
            </button>
            <a
              href={socials[0].href}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-paper px-4 py-1.5 text-sm font-medium text-ink transition-transform hover:scale-[1.04] md:inline-block"
            >
              Let&apos;s talk
            </a>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-10 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button onClick={() => go(l.id)} className="flex items-baseline gap-4 font-serif text-6xl">
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 flex gap-5 font-mono text-xs uppercase tracking-[0.18em] text-mute">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-paper">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
