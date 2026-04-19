"use client";
import { useEffect, useRef, useState } from "react";

const SKILL_CATEGORIES = [
  {
    label: "Game Design",
    icon: "◈",
    skills: [
      "Game Design",
      "Level Design",
      "Gameplay Mechanics",
      "System Design",
      "Core Loop Design",
      "Player Experience (UX)",
    ],
  },
  {
    label: "Engine & Tech",
    icon: "◉",
    skills: [
      "Unity",
      "Unreal",
      "Prototyping",
      "Animation Integration",
      "Blueprints",
    ],
  },
  {
    label: "Design Process",
    icon: "◇",
    skills: [
      "Game Design Document (GDD)",
      "Level Greyboxing",
      "Wireframing",
      "FLow Design",
    ],
  },
  {
    label: "QA & Optimization",
    icon: "◎",
    skills: [
      "Game Testing",
      "Bug Tracking",
      "Regression Testing",
      "Performance Testing",
    ],
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Skills() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      id="skills"
      style={{
        background: "var(--bg-secondary)",
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
          <p
            style={{ color: "var(--accent)" }}
            className="text-xs tracking-widest uppercase mb-3 opacity-60"
          >
            <span className="mr-2">$</span>ls skills/
          </p>
          <h2
            style={{ color: "var(--text)" }}
            className="text-3xl md:text-4xl font-bold"
          >
            What I work with
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
              className="p-6 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-5">
                <span style={{ color: "var(--accent)" }} className="text-lg">
                  {cat.icon}
                </span>
                <span
                  style={{ color: "var(--text)" }}
                  className="text-sm font-semibold tracking-widest uppercase"
                >
                  {cat.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                    }}
                    className="px-3 py-1 text-xs rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
