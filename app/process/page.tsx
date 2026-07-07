"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Source = "doc" | "figma";

type Entry = {
  title: string;
  note?: string;
  href: string;
  source: Source;
};

type Category = {
  heading: string;
  tag: string;
  blurb: string;
  entries: Entry[];
};

const CATEGORIES: Category[] = [
  {
    heading: "Game Design Documents",
    tag: "GDD",
    blurb:
      "Design pillars, mechanics, systems, and progression for each project.",
    entries: [
      {
        title: "GDD — Color Drive",
        href: "https://docs.google.com/document/d/1CDu7K7pVsXuQM9M850uvQZvgF1BURAFj5P4Dsq0EC7I/edit?usp=sharing",
        source: "doc",
      },
      {
        title: "GDD — Color Cannon",
        href: "https://docs.google.com/document/d/1LtUcnvSZGVMsXNBhWjmrlrDDp1X4AmFnkr3QuuADd6o/edit?usp=sharing",
        source: "doc",
      },
      {
        title: "GDD — The Manusmriti Wars",
        href: "https://docs.google.com/document/d/1l-2xI7aQT4xNZTp0HGkCgAy2lUSms-IhyFFFMi4aCRo/edit?usp=sharing",
        source: "doc",
      },
    ],
  },
  {
    heading: "Ideation & Concepts",
    tag: "Ideation",
    blurb: "Early concepts, brainstorms, and pitches before a design locks in.",
    entries: [
      {
        title: "Ideation — Color Cannon",
        href: "https://docs.google.com/document/d/10wzahghecaHKot4bQUUr8QBQ0WXH-KID5mjNJhwRtRM/edit?usp=sharing",
        source: "doc",
      },
    ],
  },
  {
    heading: "Figma — UI / UX",
    tag: "Figma",
    blurb: "Wireframes, UI flows, and interface mockups for menus and HUDs.",
    entries: [
      {
        title: "Figma — Color Drive",
        href: "https://www.figma.com/design/GbIujQzjAcnqdA8NIuJAq5/Color-Drive?node-id=0-1&t=fkwrhvp9SNv4WhN5-1",
        source: "figma",
      },
    ],
  },
];

function DocIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 2h3.5v6.5H8.5a3.25 3.25 0 0 1 0-6.5zM12 2h3.5a3.25 3.25 0 0 1 0 6.5H12V2zM12 8.75h3.5a3.25 3.25 0 1 1-3.5 3.25V8.75zM8.5 8.75H12v3.25a3.25 3.25 0 1 1-3.5-3.25zM8.5 15.5H12v3.25A3.25 3.25 0 1 1 8.5 15.5z" />
    </svg>
  );
}

const SOURCE_LABEL: Record<Source, string> = {
  doc: "Google Doc",
  figma: "Figma",
};

function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.08) {
  const ref = useRef<T>(null);
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

function CategoryBlock({ category }: { category: Category }) {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="mb-16">
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
        className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1"
      >
        <span
          style={{
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "4px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            opacity: 0.8,
          }}
          className="uppercase tracking-widest"
        >
          {category.tag}
        </span>
        <h2
          style={{ color: "var(--text)" }}
          className="text-2xl md:text-3xl font-bold"
        >
          {category.heading}
        </h2>
        <p
          style={{ color: "var(--text-muted)" }}
          className="w-full text-sm leading-relaxed mt-1"
        >
          {category.blurb}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.entries.map((entry, i) => (
          <a
            key={entry.title}
            href={entry.href}
            target={entry.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              color: "var(--text)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s, border-color 0.2s, background 0.2s`,
            }}
            className="group flex items-center gap-4 p-5 rounded-lg hover:border-(--accent) hover:bg-(--surface)"
          >
            <span
              style={{ color: "var(--accent)", background: "var(--surface)" }}
              className="shrink-0 grid place-items-center w-10 h-10 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
            >
              {entry.source === "figma" ? <FigmaIcon /> : <DocIcon />}
            </span>
            <div className="min-w-0 flex-1">
              <h3
                style={{ color: "var(--text)" }}
                className="text-base md:text-lg font-semibold truncate group-hover:text-(--accent) transition-colors"
              >
                {entry.title}
              </h3>
              {entry.note && (
                <p
                  style={{ color: "var(--text-muted)" }}
                  className="text-sm leading-snug truncate"
                >
                  {entry.note}
                </p>
              )}
              <span
                style={{ color: "var(--text-muted)" }}
                className="text-[11px] uppercase tracking-widest opacity-70"
              >
                {SOURCE_LABEL[entry.source]}
              </span>
            </div>
            <svg
              className="ml-auto shrink-0 opacity-0 group-hover:opacity-70 transition-opacity"
              style={{ color: "var(--accent)" }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ProcessPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <main
      style={{ background: "var(--bg)", fontFamily: "inherit" }}
      className="min-h-screen px-6 md:px-16 lg:px-32 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          style={{ color: "var(--text-muted)" }}
          className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-14 hover:text-(--accent) transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          back home
        </Link>

        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="mb-16"
        >
          <p
            style={{ color: "var(--accent)" }}
            className="text-xs tracking-widest uppercase mb-3 opacity-60"
          >
            <span className="mr-2">$</span>cat process.md
          </p>
          <h1
            style={{ color: "var(--text)" }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            How I build games
          </h1>
          <p
            style={{ color: "var(--text-muted)" }}
            className="text-base md:text-lg leading-relaxed max-w-2xl"
          >
            The living documents behind my projects — design docs, Figma files,
            level breakdowns. Every entry opens in a new tab.
          </p>
        </div>

        {CATEGORIES.map((category) => (
          <CategoryBlock key={category.heading} category={category} />
        ))}
      </div>
    </main>
  );
}
