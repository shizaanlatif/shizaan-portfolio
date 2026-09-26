"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

/* ---------- 01 · Vaultline — mobile password manager ---------- */
export function VaultVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const id = setInterval(() => {
      v += 2;
      setScore(Math.min(v, 86));
      if (v >= 86) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView]);

  const C = 2 * Math.PI * 42;
  const items = [
    { n: "Behance", s: "Strong", c: "bg-signal" },
    { n: "GitHub", s: "Strong", c: "bg-signal" },
    { n: "College portal", s: "Reused", c: "bg-ember" },
    { n: "Steam", s: "Fair", c: "bg-amber" },
  ];

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(227,180,116,0.25),transparent_60%)]">
      <div className="dot-grid absolute inset-0 opacity-60" />
      {/* floating design annotations */}
      <motion.div
        className="absolute left-[6%] top-[14%] hidden rounded-md border border-amber/50 bg-ink/80 px-2 py-1 font-mono text-[10px] text-amber sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Auto layout · 16
      </motion.div>
      <motion.div
        className="absolute bottom-[16%] right-[6%] hidden rounded-md border border-paper/30 bg-ink/80 px-2 py-1 font-mono text-[10px] text-paper/70 sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        Radius / lg · 24
      </motion.div>

      <motion.div
        className="relative w-[210px] rounded-[34px] border border-paper/15 bg-ink p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
        whileHover={{ rotate: -2, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
      >
        <div className="rounded-[26px] bg-ink-3 px-4 pb-5 pt-3">
          <div className="mx-auto h-4 w-16 rounded-full bg-ink" />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-paper/60">Good evening</span>
            <span className="h-5 w-5 rounded-full bg-amber/80" />
          </div>
          <div className="mt-1 text-sm font-medium">Your vault</div>

          <div className="relative mx-auto mt-4 h-[104px] w-[104px]">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#26262a" strokeWidth="7" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E3B474"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (C * score) / 100}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-3xl leading-none">{score}</span>
              <span className="text-[9px] uppercase tracking-widest text-mute">Health</span>
            </div>
          </div>

          <ul className="mt-4 space-y-1.5">
            {items.map((it, i) => (
              <motion.li
                key={it.n}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-[11px]"
              >
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-md bg-paper/10" />
                  {it.n}
                </span>
                <span className="flex items-center gap-1 text-paper/60">
                  <span className={`h-1.5 w-1.5 rounded-full ${it.c}`} />
                  {it.s}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[18%] w-[170px] rounded-2xl border border-ember/40 bg-ink/95 p-3 text-[11px] shadow-2xl backdrop-blur"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.9 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className="flex items-center gap-2 font-medium text-ember">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" /> Breach found
        </div>
        <p className="mt-1 leading-snug text-paper/70">1 password appeared in a leak. Fix it in 20 seconds.</p>
      </motion.div>
    </div>
  );
}

/* ---------- 02 · PhishLens — phishing URL analyser ---------- */
const URL_TXT = "https://paypa1-secure.verify-login.co/auth";
const CHECKS = [
  { k: "Look-alike characters", v: "'1' used as 'l'", bad: true },
  { k: "Domain age", v: "3 days", bad: true },
  { k: "Redirect chain", v: "4 hops", bad: true },
  { k: "TLS certificate", v: "Valid (free CA)", bad: false },
];

export function PhishVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [typed, setTyped] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setTyped(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(i);
      if (i >= URL_TXT.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [inView, run]);

  const done = typed >= URL_TXT.length;

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(124,245,181,0.18),transparent_60%)] p-5 sm:p-8">
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="relative w-full min-w-0 max-w-[440px] rounded-2xl border border-line bg-ink/95 font-mono text-[10px] shadow-2xl sm:text-[11px]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ember/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
          <span className="ml-3 truncate text-mute">phishlens — scan</span>
          <button onClick={() => setRun((r) => r + 1)} className="ml-auto rounded border border-line px-2 py-0.5 text-[10px] text-signal hover:border-signal">
            ↻ rescan
          </button>
        </div>
        <div className="p-4">
          <div className="flex min-w-0 items-center gap-2 overflow-hidden rounded-lg border border-line bg-ink-2 px-3 py-2">
            <span className="text-signal">⌕</span>
            <span className="min-w-0 truncate text-paper/90">
              {URL_TXT.slice(0, typed)}
              {!done && <span className="caret">▌</span>}
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {CHECKS.map((c, i) => (
              <motion.li
                key={`${c.k}-${run}`}
                initial={{ opacity: 0, x: -8 }}
                animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: 0.15 + i * 0.18 }}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-paper/70">
                  <span className={c.bad ? "text-ember" : "text-signal"}>{c.bad ? "✕" : "✓"}</span> {c.k}
                </span>
                <span className="text-mute">{c.v}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-5">
            <div className="flex items-end justify-between">
              <span className="uppercase tracking-[0.18em] text-mute">Threat score</span>
              <motion.span
                className="font-serif text-4xl text-ember"
                initial={{ opacity: 0 }}
                animate={done ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.9 }}
              >
                92<span className="text-lg text-mute">/100</span>
              </motion.span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                key={run}
                className="h-full rounded-full bg-gradient-to-r from-signal via-amber to-ember"
                initial={{ width: "0%" }}
                animate={done ? { width: "92%" } : { width: "0%" }}
                transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <motion.p
              className="mt-3 font-sans text-[12px] leading-snug text-paper/70"
              initial={{ opacity: 0 }}
              animate={done ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.6 }}
            >
              <span className="text-paper">Likely phishing.</span> This site imitates a payment brand using a number that looks like a letter. Don&apos;t enter your password.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 03 · Lantern — light-radius puzzle platformer ---------- */
export function LanternVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(30);
  const y = useMotionValue(62);
  const sx = useSpring(x, { stiffness: 90, damping: 16 });
  const sy = useSpring(y, { stiffness: 90, damping: 16 });
  const mask = useMotionTemplate`radial-gradient(circle 120px at ${sx}% ${sy}%, #000 30%, transparent 100%)`;
  const glow = useMotionTemplate`radial-gradient(circle 160px at ${sx}% ${sy}%, rgba(240,138,93,0.35), transparent 70%)`;
  const left = useMotionTemplate`${sx}%`;
  const top = useMotionTemplate`${sy}%`;

  // hidden platforms revealed only by the light
  const plats = [
    { l: "8%", t: "70%", w: "22%" },
    { l: "36%", t: "58%", w: "16%" },
    { l: "58%", t: "46%", w: "14%" },
    { l: "74%", t: "32%", w: "18%" },
  ];

  return (
    <div
      ref={ref}
      data-cursor="Light"
      className="relative h-full overflow-hidden bg-[#07070a]"
      onPointerMove={(e) => {
        const b = ref.current!.getBoundingClientRect();
        x.set(((e.clientX - b.left) / b.width) * 100);
        y.set(((e.clientY - b.top) / b.height) * 100);
      }}
    >
      {/* parallax silhouettes */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(transparent,rgba(240,138,93,0.06))]" />
      <svg className="absolute inset-x-0 bottom-0 w-full text-[#111116]" viewBox="0 0 400 120" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 120V70l30-20 25 18 40-40 30 30 35-25 40 35 30-22 45 30 35-26 40 32 50-30v68z" />
      </svg>
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-amber/70"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 90}%` }}
          animate={{ opacity: [0.1, 0.9, 0.1], y: [0, -10, 0] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <motion.div className="absolute inset-0" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        {plats.map((p, i) => (
          <div key={i} className="absolute h-3 border-t-2 border-amber/80 bg-[repeating-linear-gradient(90deg,#3a2a1e_0_8px,#2a1e16_8px_16px)]" style={{ left: p.l, top: p.t, width: p.w }} />
        ))}
        <div className="absolute right-[10%] top-[18%] font-mono text-[10px] uppercase tracking-[0.2em] text-amber">▲ exit</div>
        <div className="absolute left-[40%] top-[40%] font-mono text-[10px] text-paper/50">the path only exists where you look</div>
      </motion.div>

      {/* lantern-bearer */}
      <motion.div className="pointer-events-none absolute" style={{ left, top }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="h-3 w-3 rounded-sm bg-amber shadow-[0_0_24px_8px_rgba(240,138,93,0.7)]" />
        </div>
      </motion.div>

      {/* diegetic HUD */}
      <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
        <span>Oil</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`h-2 w-1.5 ${i < 4 ? "bg-amber" : "bg-line"}`} />
          ))}
        </span>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Move to light the way</div>
    </div>
  );
}

/* ---------- Custom profile — resume / profile builder ---------- */
const PROFILE_STEPS = ["Personal Detail", "Education Details", "Work Experience", "Courses", "General Summary", "Skills", "Preview"];
const PROFILE_FIELDS = [
  { k: "Full name", v: "Shizaan Latif" },
  { k: "Headline", v: "UI/UX Designer" },
  { k: "Date of birth", v: "••/••/••••" },
  { k: "Location", v: "Nagpur, India" },
];

export function ProfileVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % PROFILE_STEPS.length), 1600);
    return () => clearInterval(id);
  }, [inView]);

  const pct = Math.round(((step + 1) / PROFILE_STEPS.length) * 100);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_25%_25%,rgba(227,180,116,0.22),transparent_60%)] p-5 sm:p-8">
      <div className="dot-grid absolute inset-0 opacity-50" />
      <div className="relative flex w-full max-w-[470px] overflow-hidden rounded-2xl border border-line bg-paper text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
        {/* sidebar */}
        <div className="w-[44%] shrink-0 bg-ink-3 px-3 py-4 text-paper sm:px-4">
          <div className="text-[12px] font-medium">Build Profile</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper/20">
            <motion.div className="h-full rounded-full bg-amber" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          <div className="mt-1 font-mono text-[9px] text-mute">{pct}% complete</div>
          <ul className="mt-3 space-y-0.5">
            {PROFILE_STEPS.map((s, i) => (
              <li key={s}>
                <button
                  onClick={() => setStep(i)}
                  className={`relative w-full rounded-md px-2 py-1.5 text-left text-[10px] transition-colors sm:text-[11px] ${
                    i === step ? "text-ink" : i < step ? "text-paper/80" : "text-paper/45"
                  }`}
                >
                  {i === step && <motion.span layoutId="profile-step" className="absolute inset-0 rounded-md bg-amber" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{i < step ? "✓ " : ""}{s}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* form */}
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-end justify-center overflow-hidden rounded-lg bg-ink/10">
              <div className="flex flex-col items-center">
                <span className="h-4 w-4 rounded-full bg-ink" />
                <span className="mt-0.5 h-3 w-8 rounded-t-full bg-ink" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold">{PROFILE_STEPS[step]}</div>
              <div className="font-mono text-[9px] text-ink/50">Step {step + 1} of {PROFILE_STEPS.length}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            {PROFILE_FIELDS.map((f, i) => (
              <div key={f.k}>
                <div className="text-[9px] font-medium text-ink/60">{f.k}</div>
                <div className="mt-0.5 h-6 overflow-hidden rounded border border-ink/15 px-2 text-[10px] leading-6">
                  <motion.span
                    key={`${f.k}-${step}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="block truncate"
                  >
                    {f.v}
                  </motion.span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setStep((s) => (s + 1) % PROFILE_STEPS.length)} className="rounded-full bg-ink px-3 py-1 text-[10px] text-paper hover:bg-ink/80">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Portfolio prototype — personal site hero ---------- */
const ROLES = ["UI UX Designer", "Security Enthusiast", "Game Developer"];
const CYAN = "#5EF2E6";

export function PortfolioVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (!inView) return;
    const word = ROLES[roleIdx];
    if (typed < word.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 70);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setRoleIdx((r) => (r + 1) % ROLES.length);
    }, 1600);
    return () => clearTimeout(t);
  }, [inView, typed, roleIdx]);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 24);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_75%_40%,rgba(94,242,230,0.16),transparent_60%)] p-5 sm:p-8"
    >
      <div className="relative w-full max-w-[470px] overflow-hidden rounded-2xl border border-line bg-[#0b0b0c] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="ml-3 truncate font-mono text-[10px] text-mute">shizaan.design</span>
        </div>
        <div className="relative px-5 pb-6 pt-4">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-paper">Portfolio..</span>
            <span className="flex gap-3 text-paper/70">
              <span style={{ color: CYAN }}>Home</span>
              <span>About</span>
              <span>Services</span>
              <span className="hidden sm:inline">Contact</span>
            </span>
          </div>

          <motion.div
            className="absolute right-[-40px] top-[70px] h-44 w-44 rounded-full sm:h-52 sm:w-52"
            style={{ x: sx, y: sy, background: `radial-gradient(circle at 40% 40%, ${CYAN}, rgba(94,242,230,0.35) 55%, transparent 72%)`, boxShadow: `0 0 80px ${CYAN}55` }}
          />

          <div className="relative mt-10 max-w-[70%]">
            <div className="text-[13px] font-semibold text-paper">Hello it&apos;s me</div>
            <div className="text-3xl font-bold leading-tight text-paper sm:text-4xl">Shizaan.</div>
            <div className="mt-1 text-[13px] font-semibold text-paper">
              and I&apos;m a{" "}
              <span style={{ color: CYAN }}>
                {ROLES[roleIdx].slice(0, typed)}
                <span className="caret">▌</span>
              </span>
            </div>
            <p className="mt-2 text-[10px] leading-snug text-paper/60">Mixing creativity with problem-solving to design interfaces that are both beautiful and easy to use.</p>
            <div className="mt-3 flex gap-2">
              {["▶", "𝕏", "f", "♪"].map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ y: -3, backgroundColor: CYAN, color: "#0b0b0c" }}
                  className="flex h-6 w-6 items-center justify-center rounded-md border text-[10px]"
                  style={{ borderColor: `${CYAN}80`, color: CYAN }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 0 24px ${CYAN}` }}
              className="mt-4 rounded-full px-4 py-1.5 text-[10px] font-semibold text-[#0b0b0c]"
              style={{ background: CYAN, boxShadow: `0 0 14px ${CYAN}88` }}
            >
              Download CV
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cyber detection alert — tactical control console ---------- */
const CHAIN = [
  { k: "RECON", c: "bg-signal" },
  { k: "INITIAL_ACCESS", c: "bg-amber" },
  { k: "EXFIL", c: "bg-ember" },
];
const EVENTS = [
  { t: "12:44:02", tag: "CRED-STUFFING", msg: "Repeated auth failures on user 'adm_dean'" },
  { t: "12:42:15", tag: "EXFIL-ATTEMPT", msg: "High-volume outbound traffic to S3 bucket" },
  { t: "12:39:48", tag: "LATERAL-MOVE", msg: "Compromised AD credential used on ZONE_04" },
  { t: "12:36:10", tag: "PORT-SCAN", msg: "Continuous lateral scanning detected" },
];

export function AlertVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [detections, setDetections] = useState(0);
  const [shown, setShown] = useState(0);
  const [acked, setAcked] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setDetections(0);
    setShown(0);
    let v = 0;
    const id = setInterval(() => {
      v += 37;
      setDetections(Math.min(v, 1420));
      if (v >= 1420) clearInterval(id);
    }, 20);
    const ev = setInterval(() => setShown((s) => (s >= EVENTS.length ? s : s + 1)), 650);
    return () => {
      clearInterval(id);
      clearInterval(ev);
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(240,138,93,0.18),transparent_60%)] p-5 sm:p-8">
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="relative w-full min-w-0 max-w-[460px] rounded-2xl border border-line bg-[#0c1020]/95 font-mono text-[10px] text-paper shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="truncate font-sans text-[11px] font-semibold">Tactical Control Console</span>
          <span className="flex items-center gap-1 rounded border border-signal/50 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-signal">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-signal" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            Telemetry active
          </span>
        </div>
        <div className="space-y-3 p-4">
          <div className="rounded-lg border border-line bg-ink-2/60 p-3">
            <div className="text-[8px] uppercase tracking-[0.18em] text-mute">Overall security posture</div>
            <motion.div
              className="mt-1 font-sans text-base font-bold"
              animate={acked ? { color: "#e3b474" } : { color: ["#efe9df", "#f08a5d", "#efe9df"] }}
              transition={acked ? { duration: 0.3 } : { duration: 1.6, repeat: Infinity }}
            >
              {acked ? "RISK ACKNOWLEDGED" : "ELEVATED RISK LEVEL"}
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-line bg-ink-2/60 p-3">
              <div className="text-[8px] uppercase tracking-[0.18em] text-mute">Active threats</div>
              <div className="mt-1 text-2xl font-bold text-ember">{acked ? "00" : "09"}</div>
              <div className="text-[8px] text-mute">{acked ? "all assigned" : "6 unassigned critical"}</div>
            </div>
            <div className="rounded-lg border border-line bg-ink-2/60 p-3">
              <div className="text-[8px] uppercase tracking-[0.18em] text-mute">System detections</div>
              <div className="mt-1 text-2xl font-bold text-signal">{detections.toLocaleString("en-US")}</div>
              <div className="text-[8px] text-mute">+14% vs baseline</div>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-ink-2/60 p-3">
            <div className="text-[8px] uppercase tracking-[0.18em] text-mute">Simulated kill chain</div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {CHAIN.map((c, i) => (
                <div key={c.k} className="min-w-0">
                  <div className="truncate text-[8px] text-paper/70">{c.k}</div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-line">
                    <motion.div
                      className={`h-full ${c.c}`}
                      initial={{ width: "0%" }}
                      animate={inView ? { width: "100%" } : { width: "0%" }}
                      transition={{ delay: 0.3 + i * 0.5, duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-[0.18em] text-mute">Live detections</span>
              <button
                onClick={() => setAcked((a) => !a)}
                className="rounded border border-line px-2 py-0.5 text-[9px] text-amber hover:border-amber"
              >
                {acked ? "↺ reset" : "✓ acknowledge"}
              </button>
            </div>
            <ul className="mt-2 space-y-1.5">
              {EVENTS.slice(0, shown).map((e) => (
                <motion.li key={e.t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: acked ? 0.45 : 1, x: 0 }} className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 text-mute">{e.t}</span>
                  <span className="shrink-0 rounded border border-ember/60 px-1 text-[8px] text-ember">{e.tag}</span>
                  <span className="truncate text-paper/70">{e.msg}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
