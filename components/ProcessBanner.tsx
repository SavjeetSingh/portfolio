"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProcessBanner() {
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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "inherit",
      }}
      className="px-6 md:px-16 lg:px-32 py-16"
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8"
      >
        <div>
          <p
            style={{ color: "var(--accent)" }}
            className="text-xs tracking-widest uppercase mb-3 opacity-60"
          >
            <span className="mr-2">$</span>open process.md
          </p>
          <h2
            style={{ color: "var(--text)" }}
            className="text-3xl md:text-3xl font-bold mb-2"
          >
            Wanna know the process?
          </h2>
          <p
            style={{ color: "var(--text-muted)" }}
            className="text-1xl leading-relaxed max-w-md"
          >
            Peek behind the screen — GDDs, level design breakdowns, test plans,
            and the docs I write while building games.
          </p>
        </div>

        <Link
          href="/process"
          style={{
            background: "var(--accent)",
            color: "var(--accent-fg)",
          }}
          className="group shrink-0 inline-flex items-center gap-3 px-6 py-3 text-sm-1 font-semibold tracking-wide rounded-lg hover:opacity-90 transition-opacity"
        >
          Wanna know the process?
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
