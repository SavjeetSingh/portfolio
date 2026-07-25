"use client";
import Link from "next/link";

const NOTION_URL =
  "https://impartial-cost-03a.notion.site/Know-The-Process-8087375a73c2821fa1670141280917d4";
const NOTION_EMBED_URL =
  "https://impartial-cost-03a.notion.site/ebd//8087375a73c2821fa1670141280917d4";

export default function ProcessPage() {
  return (
    <main
      style={{
        background: "var(--bg)",
        fontFamily: "inherit",
        height: "100dvh",
      }}
      className="flex flex-col"
    >
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
        className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3"
      >
        <Link
          href="/"
          style={{ color: "var(--text-muted)" }}
          className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase hover:text-(--accent) transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          back home
        </Link>
        <a
          href={NOTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-muted)" }}
          className="text-xs hover:text-(--accent) transition-colors"
        >
          Open in Notion →
        </a>
      </div>

      <iframe
        src={NOTION_EMBED_URL}
        title="Know The Process — Notion"
        className="w-full"
        style={{ border: "none", flex: "1 1 auto", minHeight: 0 }}
        loading="lazy"
        allowFullScreen
      />
    </main>
  );
}
