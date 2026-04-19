import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ background: "var(--bg)" }}
      className="relative min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden"
    >
      {/* Left: text content */}
      <div className="flex-1 flex items-center px-6 md:px-16 lg:px-24 py-32 md:py-0">
        <div className="max-w-xl w-full">
          <p
            style={{ color: "var(--accent)" }}
            className="text-sm tracking-widest uppercase mb-6 opacity-70"
          >
            <span className="mr-2">$</span>whoami
          </p>

          <h1
            style={{ color: "var(--text)" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            Game
            <br />
            <span style={{ color: "var(--accent)" }}>Designer.</span>
          </h1>

          <p
            style={{ color: "var(--text-muted)" }}
            className="text-lg md:text-xl leading-relaxed mb-12"
          >
            Game designer with a strong foundation in QA, bringing a
            detail-oriented approach to crafting engaging and polished player
            experiences. Skilled in level design, gameplay systems, and
            documentation, with a focus on blending creativity with practical
            execution.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
              className="px-6 py-3 font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity duration-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
              className="px-6 py-3 font-semibold text-sm tracking-wide hover:opacity-80 transition-opacity duration-200"
            >
              Contact Me
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "Game Design",
              "Level Design",
              "Gameplay Mechanics",
              "System Design",
              "Unity",
              "Unreal",
              "Game Testing",
              "QA",
            ].map((skill) => (
              <span
                key={skill}
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                className="px-3 py-1 text-xs tracking-wider"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: photo — full height panel */}
      <div
        className="relative w-full md:w-2/5 min-h-[60vh] md:min-h-0"
        style={{ borderLeft: "1px solid var(--border)" }}
      >
        <Image
          src="/vineet.jpeg"
          alt="Vineet Prabhakar"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-center"
          priority
        />
        {/* subtle gradient fade on left edge */}
        <div
          className="absolute inset-y-0 left-0 w-16"
          style={{
            background: "linear-gradient(to right, var(--bg), transparent)",
          }}
        />
      </div>

      <div
        style={{ color: "var(--text-muted)" }}
        className="absolute bottom-8 left-1/2 sm:left-1/4 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest">scroll</span>
        <div
          style={{ background: "var(--text-muted)" }}
          className="w-px h-8 animate-pulse"
        />
      </div>
    </section>
  );
}
