import PixelBackground from "@/effects/PixelBackground";
import HeroText from "@/components/HeroText";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectCarousel2 from "@/components/ProjectCarousel";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Intro — full viewport with FaultyTerminal background */}
      <section
        id="intro"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <PixelBackground color="#A7EF9E" fps={60} />
        </div>
        <div
          className="relative z-10 w-full flex items-center justify-center"
          style={{ height: "100%" }}
        >
          <div className="w-full h-full">
            <HeroText />
          </div>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ color: "rgba(167,239,158,0.7)" }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
          >
            scroll
          </span>
          <div
            className="w-px h-8 animate-pulse"
            style={{ background: "rgba(167,239,158,0.7)" }}
          />
        </div>
      </section>

      {/* Hero — Navbar appears when user scrolls here */}
      <Hero />
      <Skills />
      <Experience />
      <ProjectCarousel />

      <Contact />
    </>
  );
}
