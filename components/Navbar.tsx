"use client";
import { useEffect, useRef, useState, startTransition } from "react";
import { gsap } from "gsap";

type Theme = "dark" | "light";

const NAV_ITEMS = [
  { label: "Home", href: "#intro" },
  { label: "About", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hasAnimatedIn = useRef(false);

  // Sync theme from DOM on mount (class was set by the blocking <script> in layout)
  useEffect(() => {
    const t: Theme = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    startTransition(() => setTheme(t));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const threshold = window.innerHeight * 0.8;
    const onScroll = () => {
      if (window.scrollY >= threshold && !visible) {
        setVisible(true);
      } else if (window.scrollY < threshold && visible) {
        setVisible(false);
        hasAnimatedIn.current = false;
        setMobileOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    if (visible && !hasAnimatedIn.current) {
      hasAnimatedIn.current = true;
      gsap.fromTo(
        el,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );
    } else if (!visible) {
      gsap.set(el, { y: -80, opacity: 0 });
    }
  }, [visible]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const handleVisibility = () => {
      if (!document.hidden && visible) {
        gsap.set(el, { y: 0, opacity: 1 });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [visible]);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (mobileOpen) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.add("theme-switching");
    setTheme(next);
    localStorage.setItem("theme", next);
    setTimeout(
      () => document.documentElement.classList.remove("theme-switching"),
      300,
    );
  };

  const isDark = theme === "dark";
  const bg = isDark ? "rgba(10,10,10,0.85)" : "rgba(244,244,244,0.85)";
  const border = "var(--border)";
  const text = "var(--text)";
  const accent = "var(--accent)";
  const accentDark = "var(--accent-fg)";

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        opacity: 0,
        width: "min(900px, calc(100vw - 2rem))",
        background: bg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "14px",
        fontFamily: "inherit",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          height: "52px",
        }}
      >
        {/* Logo */}
        <a
          href="#intro"
          style={{
            color: accent,
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "0.05em",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <span style={{ color: text, opacity: 0.4 }}>~/</span>vineet
        </a>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            marginLeft: "auto",
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: text,
                textDecoration: "none",
                fontSize: "13px",
                letterSpacing: "0.04em",
                padding: "6px 14px",
                borderRadius: "8px",
                transition: "background 0.15s, color 0.15s",
                opacity: 0.7,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = isDark
                  ? "rgba(167,239,158,0.1)"
                  : "rgba(10,10,10,0.07)";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.color = isDark
                  ? accent
                  : accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7";
                (e.currentTarget as HTMLAnchorElement).style.color = text;
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right-side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: isDark
              ? "rgba(167,239,158,0.1)"
              : "rgba(10,10,10,0.07)",
            color: isDark ? accent : accentDark,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = isDark
              ? "rgba(167,239,158,0.2)"
              : "rgba(10,10,10,0.14)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = isDark
              ? "rgba(167,239,158,0.1)"
              : "rgba(10,10,10,0.07)";
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="mobile-hamburger"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "transparent",
            border: `1px solid ${border}`,
            color: text,
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "14px",
              height: "1.5px",
              background: "currentColor",
              display: "block",
              transition: "all 0.2s",
              transform: mobileOpen
                ? "rotate(45deg) translate(4px, 4px)"
                : "none",
            }}
          />
          <span
            style={{
              width: "14px",
              height: "1.5px",
              background: "currentColor",
              display: "block",
              transition: "all 0.2s",
              transform: mobileOpen
                ? "rotate(-45deg) translate(4px, -4px)"
                : "none",
            }}
          />
        </button>

        </div>{/* end right-side controls */}
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
        className="mobile-menu"
      >
        <div
          style={{
            padding: "8px 12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            borderTop: `1px solid ${border}`,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: text,
                textDecoration: "none",
                fontSize: "13px",
                letterSpacing: "0.04em",
                padding: "10px 12px",
                borderRadius: "8px",
                opacity: 0.8,
                display: "block",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap');
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
