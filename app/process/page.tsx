"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NOTION_URL =
  "https://impartial-cost-03a.notion.site/Know-The-Process-8087375a73c2821fa1670141280917d4";
const NOTION_EMBED_URL =
  "https://impartial-cost-03a.notion.site/ebd//8087375a73c2821fa1670141280917d4";

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

export default function ProcessPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <main
      style={{ background: "var(--bg)", fontFamily: "inherit" }}
      className="min-h-screen px-6 md:px-16 lg:px-32 py-20"
    >
      <div className="max-w-6xl mx-auto">
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
          className="mb-10"
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
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-2"
          >
            The living documents behind my projects — design docs, Figma
            files, level breakdowns.
          </p>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
            background: "var(--bg-secondary)",
          }}
          className="w-full"
        >
          <iframe
            src={NOTION_EMBED_URL}
            title="Know The Process — Notion"
            className="w-full"
            style={{ height: "85vh", border: "none" }}
            loading="lazy"
            allowFullScreen
          />
        </div>

        <a
          href={NOTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-muted)" }}
          className="mt-3 inline-block text-xs hover:text-(--accent) transition-colors"
        >
          Open in Notion →
        </a>
      </div>
    </main>
  );
}
