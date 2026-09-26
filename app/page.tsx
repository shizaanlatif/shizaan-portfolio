import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Disciplines from "@/components/Disciplines";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Disciplines />
        <Skills />
        <Projects />
        <Process />
        <Terminal />
      </main>
      <Contact />
    </SmoothScroll>
  );
}
