"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { about, education, profile, projects, skillGroups, socials } from "@/lib/data";
import { LineReveal, Reveal, SectionLabel } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

type Line = { kind: "in" | "out" | "sys" | "ok" | "err"; text: string };

const HELP = [
  "whoami        who is behind this portfolio",
  "about         the long version",
  "skills        list the toolkit (try: skills security)",
  "projects      selected work",
  "education     where I study",
  "socials       find me online",
  "open <name>   open linkedin | github | behance",
  "scan          run a quick 'security audit' of this site",
  "goto <sec>    jump to about | skills | work | contact",
  "clear         clear the screen",
];

function exec(raw: string): Line[] | "clear" {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(" ").toLowerCase();
  switch ((cmd || "").toLowerCase()) {
    case "":
      return [];
    case "help":
      return HELP.map((t) => ({ kind: "out", text: t }));
    case "whoami":
      return [
        { kind: "ok", text: profile.name },
        { kind: "out", text: profile.roles.join(" · ") },
        { kind: "out", text: profile.intro },
      ];
    case "about":
      return about.map((t) => ({ kind: "out", text: t }));
    case "education":
      return education.map((e) => ({ kind: "out", text: `${e.degree} — ${e.school}` }));
    case "skills": {
      const groups = arg ? skillGroups.filter((g) => g.id.includes(arg) || g.label.toLowerCase().includes(arg)) : skillGroups;
      if (!groups.length) return [{ kind: "err", text: `no category '${arg}'. try: ${skillGroups.map((g) => g.id).join(", ")}` }];
      return groups.flatMap((g) => [
        { kind: "ok" as const, text: `[${g.label}]` },
        { kind: "out" as const, text: g.skills.join(", ") },
      ]);
    }
    case "projects":
    case "ls":
      return projects.map((p) => ({ kind: "out", text: `${p.index}  ${p.title.padEnd(10)} ${p.kind}` }));
    case "socials":
      return socials.map((s) => ({ kind: "out", text: `${s.label.padEnd(9)} ${s.href}` }));
    case "open": {
      const s = socials.find((x) => x.label.toLowerCase() === arg);
      if (!s) return [{ kind: "err", text: "usage: open linkedin | github | behance" }];
      window.open(s.href, "_blank", "noopener,noreferrer");
      return [{ kind: "ok", text: `opening ${s.href} …` }];
    }
    case "goto": {
      const map: Record<string, string> = { about: "about", skills: "skills", work: "work", projects: "work", contact: "contact", top: "top" };
      if (!map[arg]) return [{ kind: "err", text: "usage: goto about | skills | work | contact" }];
      setTimeout(() => scrollToId(map[arg]), 200);
      return [{ kind: "ok", text: `navigating to #${map[arg]}` }];
    }
    case "scan":
      return [
        { kind: "sys", text: "running audit on shizaan.portfolio …" },
        { kind: "ok", text: "✓ HTTPS enforced" },
        { kind: "ok", text: "✓ no trackers, no cookies" },
        { kind: "ok", text: "✓ external links use rel=noreferrer" },
        { kind: "ok", text: "✓ respects prefers-reduced-motion" },
        { kind: "sys", text: "1 finding: dangerously high levels of curiosity. severity: feature." },
      ];
    case "sudo":
      return [{ kind: "err", text: "nice try. privilege escalation attempt logged 👀 — try 'hire' instead." }];
    case "hire":
      return [
        { kind: "ok", text: "excellent decision." },
        { kind: "out", text: `reach out on LinkedIn → ${socials[0].href}` },
      ];
    case "rm":
      return [{ kind: "err", text: "permission denied: this portfolio is immutable." }];
    case "echo":
      return [{ kind: "out", text: args.join(" ") }];
    case "date":
      return [{ kind: "out", text: new Date().toString() }];
    case "clear":
      return "clear";
    default:
      return [{ kind: "err", text: `command not found: ${cmd}. type 'help'.` }];
  }
}

const BOOT: Line[] = [
  { kind: "sys", text: "shizaan-os v2.6 — secure shell established" },
  { kind: "sys", text: "type 'help' to see available commands, or tap a suggestion below." },
];

const COLORS: Record<Line["kind"], string> = {
  in: "text-paper",
  out: "text-paper/70",
  sys: "text-mute",
  ok: "text-signal",
  err: "text-ember",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const run = (cmd: string) => {
    const res = exec(cmd);
    if (res === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: cmd }, ...res]);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
    setValue("");
  };

  return (
    <section id="terminal" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionLabel index="06">Terminal</SectionLabel>
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <LineReveal
            className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl"
            lines={["Prefer the", <em key="e" className="text-signal">command line?</em>]}
          />
          <Reveal>
            <p className="mt-6 max-w-sm text-paper/60">
              The same portfolio, for people who live in a shell. Ask it anything — it knows about my skills, work and where to
              find me.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <motion.div
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
            className="overflow-hidden rounded-3xl border border-line bg-[#070708] shadow-[0_0_0_1px_rgba(124,245,181,0.05),0_40px_120px_-40px_rgba(124,245,181,0.25)]"
          >
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-ember/80" />
              <span className="h-3 w-3 rounded-full bg-amber/80" />
              <span className="h-3 w-3 rounded-full bg-signal/80" />
              <span className="ml-3 font-mono text-[11px] text-mute">guest@shizaan: ~</span>
            </div>
            <div ref={bodyRef} data-lenis-prevent className="h-[340px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed" role="log" aria-live="polite">
              {lines.map((l, i) => (
                <div key={i} className={`whitespace-pre-wrap break-words ${COLORS[l.kind]}`}>
                  {l.kind === "in" && <span className="text-signal">guest@shizaan:~$ </span>}
                  {l.text}
                </div>
              ))}
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(value);
                }}
              >
                <span className="shrink-0 text-signal">guest@shizaan:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const n = Math.min(hIndex + 1, history.length - 1);
                      if (history[n] !== undefined) {
                        setHIndex(n);
                        setValue(history[n]);
                      }
                    } else if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const n = hIndex - 1;
                      setHIndex(Math.max(n, -1));
                      setValue(n >= 0 ? history[n] : "");
                    }
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command"
                  className="w-full bg-transparent text-paper caret-signal focus:outline-none"
                />
              </form>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line px-5 py-3.5">
              {["whoami", "skills security", "projects", "scan", "hire"].map((c) => (
                <button
                  key={c}
                  onClick={(e) => {
                    e.stopPropagation();
                    run(c);
                  }}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-paper/70 transition-colors hover:border-signal hover:text-signal"
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
