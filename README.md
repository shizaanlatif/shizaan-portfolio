# Mohammad Shizaan — Portfolio

> Build · Create · Secure · Explore

Personal portfolio of **Mohammad Shizaan**, a Computer Science Engineering student at St. Vincent Pallotti College of Engineering & Technology, Nagpur. The site covers UI/UX design, visual design, cybersecurity and game development.

**Links:** [LinkedIn](https://www.linkedin.com/in/shizaan-latif/) · [GitHub](https://github.com/shizaanlatif) · [Behance](https://www.behance.net/shizaanlatif05)

---

## Highlights

| | |
|---|---|
| **Decrypt-style loader** | Boot sequence with a counter and status lines that "establish a secure session". |
| **Colour-decrypt portrait** | The hero portrait shows in greyscale. Hovering opens a colour lens that follows the cursor, with a 3D tilt, a scanning line and HUD corners. |
| **Kinetic typography** | Letter-by-letter name reveal, a rotating role line, and an About sentence that fills in word by word as you scroll. |
| **Spotlight cards** | Each discipline card has a glow that follows the cursor and a gradient border. |
| **Filterable skill matrix** | 75 skills in 6 groups. Tabs animate between groups, and a `grep` search box filters the list. |
| **Stacking case studies** | Project cards stick and stack as you scroll. Each one has a live, interactive preview: a password-health app, a phishing-URL scanner, and a game scene lit by your cursor. |
| **Working terminal** | A shell you can type into: `help`, `whoami`, `skills security`, `projects`, `scan`, `open github`, `goto contact`, `hire`… with command history on ↑/↓. |
| **Polish** | Custom cursor that shows labels, magnetic buttons, Lenis smooth scrolling, a scroll-progress bar, film grain, a mobile menu that opens as a circle, and a live IST clock. |
| **Accessible by default** | Motion turns off under `prefers-reduced-motion`. Keyboard- and screen-reader-friendly controls and a responsive layout down to 360px. |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export-ready) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animation · [Lenis](https://lenis.darkroom.engineering) for smooth scroll
- Geist Sans / Geist Mono + Instrument Serif

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All copy lives in **`lib/data.ts`**: profile, About paragraphs, education, disciplines, skill groups, projects and process steps. Edit that one file and the whole site updates, including the terminal's answers.

To add a real project, replace an entry in `projects`. Point its `links` at the Behance case study or GitHub repo. To swap the portrait, replace `public/shizaan.jpg`.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No configuration or environment variables are needed.

## Structure

```
app/            layout, global styles, favicon
components/     Hero, About, Disciplines, Skills, Projects, ProjectVisuals,
                Process, Terminal, Contact, Nav + motion utilities
                (Cursor, Loader, Magnetic, Reveal, ScrambleText, SmoothScroll)
lib/data.ts     all site content
public/         portrait
```
