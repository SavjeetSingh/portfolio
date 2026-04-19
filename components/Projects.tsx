"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    name: "Project Alpha",
    description:
      "A full-stack web app with real-time collaboration features, built with Next.js and WebSockets.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
    href: "#",
    live: "#",
    status: "live",
  },
  {
    name: "Project Beta",
    description:
      "CLI tool for automating deployment workflows, with support for multiple cloud providers.",
    tech: ["Node.js", "Docker", "AWS", "Bash"],
    href: "#",
    live: null,
    status: "open-source",
  },
  {
    name: "Project Gamma",
    description:
      "Interactive 3D data visualisation dashboard powered by WebGL and real-time data streams.",
    tech: ["React", "Three.js", "GLSL", "WebSockets"],
    href: "#",
    live: "#",
    status: "live",
  },
  {
    name: "Project Delta",
    description:
      "REST API with JWT auth, rate limiting, and a full test suite — deployed on a VPS with Docker.",
    tech: ["Express", "MongoDB", "Redis", "Jest"],
    href: "#",
    live: null,
    status: "open-source",
  },
];

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Projects() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        fontFamily: "inherit",
      }}
      className="px-6 md:px-16 lg:px-32 py-24"
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Section header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="mb-14"
        >
          <p style={{ color: "var(--accent)" }} className="text-xs tracking-widest uppercase mb-3 opacity-60">
            <span className="mr-2">$</span>ls projects/
          </p>
          <h2 style={{ color: "var(--text)" }} className="text-3xl md:text-4xl font-bold">
            Things I&apos;ve built
          </h2>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
              }}
              className="group p-6 rounded-lg flex flex-col gap-4 hover:border-(--accent) transition-colors duration-200"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <h3 style={{ color: "var(--text)" }} className="font-semibold text-base leading-tight">
                  {project.name}
                </h3>
                <span
                  style={{
                    color: "var(--accent)",
                    border: "1px solid var(--border)",
                  }}
                  className="text-xs px-2 py-0.5 rounded-sm whitespace-nowrap shrink-0 opacity-70"
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p style={{ color: "var(--text-muted)" }} className="text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                    className="text-xs px-2 py-0.5 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-1">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)" }}
                  className="flex items-center gap-1.5 text-xs hover:text-(--accent) transition-colors duration-150"
                >
                  <GitHubIcon />
                  Source
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-muted)" }}
                    className="flex items-center gap-1.5 text-xs hover:text-(--accent) transition-colors duration-150"
                  >
                    <ExternalIcon />
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
          }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", border: "1px solid var(--border)" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm hover:opacity-80 transition-opacity"
          >
            <GitHubIcon />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
