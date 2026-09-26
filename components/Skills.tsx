"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skillGroups } from "@/lib/data";
import { LineReveal, Reveal, SectionLabel } from "./Reveal";

const DOT: Record<string, string> = {
  "design-tools": "bg-amber",
  ux: "bg-amber",
  visual: "bg-paper",
  security: "bg-signal",
  games: "bg-ember",
  dev: "bg-[#8fb3ff]",
};

export default function Skills() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const tabs = [{ id: "all", label: "Everything", caption: "The full toolkit — design, defence, play and build." }, ...skillGroups];
  const current = tabs.find((t) => t.id === active)!;

  const items = useMemo(() => {
    const groups = active === "all" ? skillGroups : skillGroups.filter((g) => g.id === active);
    const q = query.trim().toLowerCase();
    return groups.flatMap((g) => g.skills.filter((s) => !q || s.toLowerCase().includes(q)).map((s) => ({ s, g: g.id })));
  }, [active, query]);

  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionLabel index="03">Skills & Toolkit</SectionLabel>
      <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <LineReveal
          className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl"
          lines={["From Figma frames", <span key="b">to <em className="text-signal">packet captures.</em></span>]}
        />
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            <span className="font-serif text-6xl normal-case tracking-normal text-paper">{total}</span> skills · {skillGroups.length} disciplines
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div role="tablist" aria-label="Skill categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
            {tabs.map((t) => {
              const count = t.id === "all" ? total : skillGroups.find((g) => g.id === t.id)!.skills.length;
              const on = active === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(t.id)}
                  className={`relative flex shrink-0 items-center justify-between gap-6 rounded-2xl px-4 py-3 text-left transition-colors ${on ? "text-ink" : "text-paper/70 hover:text-paper"}`}
                >
                  {on && (
                    <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-2xl bg-paper" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                  )}
                  <span className="relative flex items-center gap-3 whitespace-nowrap text-[15px] font-medium">
                    {t.id !== "all" && <span className={`h-2 w-2 rounded-full ${DOT[t.id]}`} />}
                    {t.label}
                  </span>
                  <span className={`relative font-mono text-[11px] ${on ? "text-ink/60" : "text-mute"}`}>{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <label className="mt-6 flex items-center gap-3 rounded-2xl border border-line px-4 py-3 font-mono text-sm focus-within:border-signal">
            <span className="text-signal">&gt;</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="grep skill…"
              className="w-full bg-transparent text-paper placeholder:text-mute focus:outline-none"
              aria-label="Filter skills"
            />
          </label>
        </div>

        <div className="min-h-[420px] min-w-0 rounded-[28px] border border-line bg-ink-2 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="font-serif text-2xl italic text-paper/80 sm:text-3xl"
            >
              {current.caption}
            </motion.p>
          </AnimatePresence>

          <motion.ul layout className="mt-8 flex flex-wrap gap-2.5">
            <AnimatePresence mode="popLayout">
              {items.map(({ s, g }, i) => (
                <motion.li
                  layout
                  key={`${g}-${s}`}
                  initial={{ opacity: 0, scale: 0.6, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: Math.min(i, 30) * 0.018, type: "spring", stiffness: 320, damping: 24 } }}
                  exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-ink px-4 py-2 text-sm text-paper/85 transition-colors hover:border-paper/50 hover:bg-paper hover:text-ink"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[g]} transition-transform group-hover:scale-150`} />
                  {s}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {items.length === 0 && <p className="mt-8 font-mono text-sm text-mute">0 matches — but I&apos;m probably learning it next.</p>}
        </div>
      </div>
    </section>
  );
}
