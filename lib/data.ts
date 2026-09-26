// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Mohammad Shizaan",
  firstName: "Mohammad",
  lastName: "Shizaan",
  handle: "shizaan",
  location: "Nagpur, India",
  email: "shizaanlatif012@gmail.com",
  phone: "+91 88306 27617",
  timezone: "Asia/Kolkata",
  roles: ["UI/UX Designer", "Security Explorer", "Game Developer", "Visual Designer"],
  tagline: "Designing interfaces people trust — and systems attackers can't.",
  intro: "I don't just want to learn technology — I want to build something with it.",
  motto: ["Always learning.", "Always building.", "Always looking for the next thing to create."],
};

export const socials = [
  { label: "LinkedIn", handle: "in/shizaan-latif", href: "https://www.linkedin.com/in/shizaan-latif/" },
  { label: "GitHub", handle: "@shizaanlatif", href: "https://github.com/shizaanlatif" },
  { label: "Behance", handle: "shizaanlatif05", href: "https://www.behance.net/shizaanlatif05" },
] as const;

export const about = [
  "I'm Mohammad Shizaan, a Computer Science Engineering student at St. Vincent Pallotti College of Engineering and Technology, with a Diploma from JD College of Engineering and Management.",
  "My journey in technology has taken me from understanding the fundamentals of computer science to exploring the areas I genuinely enjoy — Cybersecurity, Game Development, UI/UX, and Design.",
  "What excites me most is the process of turning an idea into something real. Whether it's designing an interface, experimenting with game concepts, understanding how systems can be secured, or working on a new project, I enjoy learning by actually doing.",
  "I'm still building my experience, but I bring curiosity, creativity, and a willingness to keep learning. I'm looking to connect with people, work on meaningful projects, collaborate, and turn my skills into real-world experience.",
];

export const education = [
  {
    school: "St. Vincent Pallotti College of Engineering & Technology",
    degree: "B.Tech — Computer Science Engineering",
    period: "Present",
    note: "Cybersecurity, systems, software engineering",
  },
  {
    school: "JD College of Engineering & Management",
    degree: "Diploma — Engineering",
    period: "Completed",
    note: "Computer science fundamentals",
  },
];

export const disciplines = [
  {
    id: "uiux",
    title: "UI/UX Design",
    blurb: "Research-led interfaces with clear hierarchy, honest flows and interactions that feel inevitable.",
    tags: ["Research", "Wireframes", "Prototypes", "Design systems"],
  },
  {
    id: "design",
    title: "Visual Design",
    blurb: "Brand, type, colour and motion — the craft layer that makes a product feel considered.",
    tags: ["Branding", "Typography", "Motion", "Illustration"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    blurb: "Understanding how systems break so I can design ones that don't. Secure by design, not by patch.",
    tags: ["Web security", "Networks", "OWASP", "CTFs"],
  },
  {
    id: "games",
    title: "Game Development",
    blurb: "Prototyping mechanics, building worlds and designing moments of play in real-time engines.",
    tags: ["Unity", "Level design", "C#", "Game feel"],
  },
] as const;

export type SkillGroup = { id: string; label: string; caption: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "design-tools",
    label: "Design Tools",
    caption: "The studio — where ideas get pixels.",
    skills: [
      "Figma",
      "FigJam",
      "Framer",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe XD",
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Adobe InDesign",
      "ProtoPie",
      "Spline",
      "Canva",
      "Miro",
    ],
  },
  {
    id: "ux",
    label: "UX Practice",
    caption: "The method — how a good idea becomes the right one.",
    skills: [
      "User Research",
      "User Personas",
      "Journey Mapping",
      "Information Architecture",
      "Wireframing",
      "Interactive Prototyping",
      "Usability Testing",
      "Design Systems",
      "Interaction Design",
      "Micro-interactions",
      "Responsive Design",
      "Accessibility (WCAG)",
      "Design Thinking",
    ],
  },
  {
    id: "visual",
    label: "Visual Design",
    caption: "The craft — the details people feel before they notice.",
    skills: [
      "Typography",
      "Colour Theory",
      "Layout & Grids",
      "Branding & Identity",
      "Logo Design",
      "Iconography",
      "Illustration",
      "Motion Design",
      "Poster & Social Design",
      "Photo Editing",
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    caption: "The defence — thinking like an attacker, building like a guardian.",
    skills: [
      "Networking (TCP/IP, OSI)",
      "Linux & Bash",
      "Kali Linux",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Metasploit",
      "OWASP Top 10",
      "Vulnerability Assessment",
      "Web App Security",
      "Cryptography Basics",
      "OSINT",
      "CTF Challenges",
      "TryHackMe",
      "Hack The Box",
    ],
  },
  {
    id: "games",
    label: "Game Dev",
    caption: "The playground — systems, stories and game feel.",
    skills: [
      "Unity",
      "C#",
      "Unreal Engine (Blueprints)",
      "Godot",
      "Blender",
      "Aseprite (Pixel Art)",
      "Level Design",
      "Game Design Docs",
      "2D Animation",
      "Game UI / HUD",
    ],
  },
  {
    id: "dev",
    label: "Development",
    caption: "The build — shipping what I design.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Python",
      "C / C++",
      "Java",
      "SQL",
      "Git & GitHub",
      "VS Code",
      "Notion",
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  problem: string;
  outcome: string;
  role: string[];
  tools: string[];
  accent: string;
  visual: "vault" | "phish" | "lantern" | "profile" | "portfolio" | "alert";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "custom-profile",
    index: "01",
    title: "Build Profile",
    kind: "UI/UX Design · Web App",
    year: "2026",
    summary:
      "Custom profile UI/UX designs — a guided, step-by-step builder that helps people co-create their resume and profile.",
    problem:
      "Long profile and resume forms feel overwhelming, so people abandon them halfway or leave key sections empty.",
    outcome:
      "A clean multi-step flow — personal details, education, work experience, courses, summary, skills and preview — with a live progress tracker.",
    role: ["UX flows", "UI design", "Form design", "Prototyping"],
    tools: ["Figma"],
    accent: "#E3B474",
    visual: "profile",
    links: [{ label: "View on Behance", href: "https://www.behance.net/gallery/256275185/custom-profile-uiux-designs" }],
  },
  {
    id: "portfolio-prototype",
    index: "02",
    title: "Portfolio",
    kind: "UI/UX Design · Website Prototype",
    year: "2026",
    summary:
      "A bold, dark personal portfolio prototype with a neon-cyan accent — built to make a strong first impression in seconds.",
    problem:
      "Most designer portfolios look the same. The hero needed personality while still making the next step — contact or CV — obvious.",
    outcome:
      "A high-contrast hero with a character illustration, clear role statement, social links and a glowing Download CV call-to-action.",
    role: ["Visual design", "UI design", "Layout", "Prototyping"],
    tools: ["Figma"],
    accent: "#5EF2E6",
    visual: "portfolio",
    links: [{ label: "View on Behance", href: "https://www.behance.net/gallery/256274913/Portfolio-Prototype-" }],
  },
  {
    id: "cyber-alert",
    index: "03",
    title: "Cyber Alert",
    kind: "Cybersecurity · Dashboard UI",
    year: "2026",
    summary:
      "Alert design for cyber detection — a tactical control console that turns raw security telemetry into decisions.",
    problem:
      "Security analysts drown in alerts. The interface has to show what's critical, how an attack is progressing and what to do next — at a glance.",
    outcome:
      "A console with a live risk level, active-threat and detection counters, a simulated kill-chain pathway and a real-time detections timeline.",
    role: ["Research", "User flows", "Information architecture", "Wireframes", "Design system", "High-fidelity UI"],
    tools: ["Figma"],
    accent: "#F08A5D",
    visual: "alert",
    links: [{ label: "View on Behance", href: "https://www.behance.net/gallery/256274629/alert-design-for-cyber-detection" }],
  },
];

export const process = [
  { step: "Discover", text: "Talk to people, map the problem, question the brief." },
  { step: "Define", text: "Turn research into principles, flows and constraints." },
  { step: "Design", text: "Sketch, prototype, test — iterate until it feels obvious." },
  { step: "Defend", text: "Threat-model the flow. Privacy and security are UX." },
  { step: "Deliver", text: "Hand off systems, not screens — or build it myself." },
];
