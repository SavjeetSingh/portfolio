"use client";
import { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
  {
    role: "Game Designer / QA",
    company: "Ravant Media",
    type: "Full-time",
    period: "AUG 2025 - APR 2026",
    location: "Remote",
    description: [
      "Analyzed gameplay mechanics, level difficulty, and player engagement to suggest design improvements.",
      "Tested and validated 80+ mini-games, ensuring smooth gameplay and high-quality user experience.",
      "Created and executed detailed test cases to identify bugs, performance issues, and edge cases.",
      "Collaborated with designers and developers, providing clear bug reports to support rapid iteration and stability.",
    ],
    tech: [],
  },
  {
    role: "Unity3D Developer Intern",
    company: "Pythrust Technologies",
    type: "Intern",
    period: "FEB 2025 – JUN 2025",
    location: "Noida",
    description: [
      "Developed a multi-game mobile app in Unity featuring both 2D and 3D games within a unified interface.",
      "Designed GDDs and validated UI/UX flows to ensure smooth and intuitive gameplay experience.",
      "Identified and fixed bugs across devices, improving overall performance and usability.",
      "Localized the app into 11 Indian languages and performed functional + linguistic testing.",
    ],
    tech: [],
  },
  {
    role: "Unity Developer",
    company: "QULEEP PRIVATE LIMITED",
    type: "Intern",
    period: "JAN 2025 – FEB 2025",
    location: "Noida",
    description: [
      "Designed and developed multiple 3D mini-games in Unity for WebGL platforms.",
      "Optimized performance for browser-based gameplay, ensuring smooth user experience.",
      "Contributed to interactive features within the company’s metaverse platform.",
      "Assisted in implementing core gameplay mechanics and virtual world interactions.",
    ],
    tech: [],
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "#A7EF9E",
  Contract: "#93c5fd",
  Freelance: "#fcd34d",
};

export default function Experience() {
  const { ref, visible } = useReveal(0.05);
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        fontFamily: "inherit",
      }}
      className="px-6 md:px-16 lg:px-32 py-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            <span className="mr-2">$</span>cat experience.log
          </p>
          <h2
            style={{ color: "var(--text)" }}
            className="text-3xl md:text-4xl font-bold"
          >
            Where I&apos;ve worked
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: "6px",
              width: "1px",
              background: "var(--border)",
              bottom: "6px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
          />

          <div className="flex flex-col gap-0">
            {EXPERIENCES.map((exp, i) => {
              const isOpen = expanded === i;
              const delay = 0.1 + i * 0.1;

              return (
                <div
                  key={i}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
                  }}
                >
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full text-left group"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <div className="flex items-start gap-5 py-5">
                      {/* Timeline dot */}
                      <div
                        style={{
                          position: "relative",
                          flexShrink: 0,
                          marginTop: "4px",
                        }}
                      >
                        <div
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            border: `2px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                            background: isOpen ? "var(--accent)" : "var(--bg)",
                            transition: "border-color 0.2s, background 0.2s",
                            position: "relative",
                            zIndex: 1,
                          }}
                        />
                      </div>

                      {/* Content header */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              style={{ color: "var(--text)" }}
                              className="text-sm font-semibold group-hover:text-(--accent) transition-colors"
                            >
                              {exp.role}
                            </span>
                            <span
                              style={{
                                color: "var(--text-muted)",
                                fontSize: "12px",
                              }}
                            >
                              @
                            </span>
                            <span
                              style={{
                                color: "var(--accent)",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              {exp.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              style={{
                                fontSize: "10px",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                border: `1px solid ${TYPE_COLORS[exp.type] ?? "var(--border)"}`,
                                color:
                                  TYPE_COLORS[exp.type] ?? "var(--text-muted)",
                                opacity: 0.8,
                              }}
                            >
                              {exp.type}
                            </span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                color: "var(--text-muted)",
                                transform: isOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.25s ease",
                                flexShrink: 0,
                              }}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <span
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "11px",
                            }}
                          >
                            {exp.period}
                          </span>
                          <span
                            style={{ color: "var(--border)", fontSize: "11px" }}
                          >
                            ·
                          </span>
                          <span
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "11px",
                            }}
                          >
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable body */}
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? "400px" : "0px",
                      transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                      marginLeft: "40px",
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: "20px",
                        borderLeft: "1px solid var(--border)",
                        paddingLeft: "20px",
                        marginLeft: "-21px",
                      }}
                    >
                      {Array.isArray(exp.description) ? (
                        <ul
                          style={{
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            marginBottom: "14px",
                          }}
                        >
                          {exp.description.map((line, li) => (
                            <li
                              key={li}
                              style={{
                                color: "var(--text-muted)",
                                fontSize: "13px",
                                lineHeight: 1.7,
                                paddingLeft: "14px",
                                position: "relative",
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen
                                  ? "translateY(0)"
                                  : "translateY(6px)",
                                transition: `opacity 0.35s ease ${isOpen ? 0.1 + li * 0.08 : 0}s, transform 0.35s ease ${isOpen ? 0.1 + li * 0.08 : 0}s`,
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--accent)",
                                  opacity: 0.6,
                                }}
                              >
                                ›
                              </span>
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "13px",
                            lineHeight: 1.7,
                            marginBottom: "14px",
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen
                              ? "translateY(0)"
                              : "translateY(6px)",
                            transition: `opacity 0.35s ease ${isOpen ? 0.1 : 0}s, transform 0.35s ease ${isOpen ? 0.1 : 0}s`,
                          }}
                        >
                          {exp.description}
                        </p>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: "10px",
                              padding: "2px 8px",
                              border: "1px solid var(--border)",
                              color: "var(--text-muted)",
                              borderRadius: "4px",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {i < EXPERIENCES.length - 1 && (
                    <div
                      style={{
                        height: "1px",
                        background: "var(--border)",
                        marginLeft: "40px",
                        opacity: 0.4,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
