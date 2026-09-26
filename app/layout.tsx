import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shizaan.vercel.app"),
  title: "Mohammad Shizaan — UI/UX Designer & Security Explorer",
  description:
    "Portfolio of Mohammad Shizaan — Computer Science Engineering student in Nagpur designing interfaces, exploring cybersecurity and building games.",
  keywords: ["Mohammad Shizaan", "UI/UX designer", "cybersecurity", "game development", "Nagpur", "portfolio", "Figma"],
  authors: [{ name: "Mohammad Shizaan", url: "https://www.linkedin.com/in/shizaan-latif/" }],
  openGraph: {
    title: "Mohammad Shizaan — Build · Create · Secure · Explore",
    description: "UI/UX, visual design, cybersecurity and game development.",
    images: [{ url: "/shizaan.jpg", width: 1254, height: 1254 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/shizaan.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
