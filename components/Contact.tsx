"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function useReveal() {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@vineet_prabhakar",
    href: "https://github.com/kakashi146",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "vineet-prabhakar",
    href: "https://www.linkedin.com/in/vineet-prabhakar/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },

  {
    label: "Email",
    handle: "vineetsept@gmail.com",
    href: "mailto:vineetsept@gmail.com",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Contact() {
  const { ref, visible } = useReveal();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await emailjs.send(
        "service_40yh0af",
        "template_dzff13t",
        { from_name: formState.name, from_email: formState.email, message: formState.message },
        { publicKey: "4EC943YR1gvQRkHjp" }
      );
      setSent(true);
    } catch {
      setError("Something went wrong. Try emailing me directly.");
    } finally {
      setLoading(false);
    }
  };

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  });

  return (
    <section
      id="contact"
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
        <div style={fade(0)} className="mb-14">
          <p
            style={{ color: "var(--accent)" }}
            className="text-xs tracking-widest uppercase mb-3 opacity-60"
          >
            <span className="mr-2">$</span>cat contact.txt
          </p>
          <h2
            style={{ color: "var(--text)" }}
            className="text-3xl md:text-4xl font-bold"
          >
            Get in touch
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — socials */}
          <div style={fade(0.1)} className="flex flex-col gap-3">
            <p
              style={{ color: "var(--text-muted)" }}
              className="text-sm leading-relaxed mb-6"
            >
              Have a project in mind or just want to say hi? Reach me on any of
              these platforms.
            </p>

            {SOCIALS.map(({ label, handle, href, icon }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.45s ease ${0.15 + i * 0.08}s, transform 0.45s ease ${0.15 + i * 0.08}s, border-color 0.2s, background 0.2s`,
                }}
                className="group flex items-center gap-4 px-5 py-4 rounded-lg hover:border-(--accent) hover:bg-(--surface)"
              >
                <span
                  style={{ color: "var(--accent)" }}
                  className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  {icon}
                </span>
                <div className="flex flex-col min-w-0">
                  <span
                    style={{ color: "var(--text-muted)" }}
                    className="text-xs uppercase tracking-widest mb-0.5"
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {handle}
                  </span>
                </div>
                <svg
                  className="ml-auto shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ color: "var(--accent)" }}
                  width="14"
                  height="14"
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

          {/* Right — form */}
          <div style={fade(0.2)}>
            {sent ? (
              <div
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                }}
                className="rounded-lg p-8 flex flex-col items-center justify-center gap-4 h-full min-h-64 text-center"
              >
                <span style={{ color: "var(--accent)" }} className="text-3xl">
                  ✓
                </span>
                <p style={{ color: "var(--text)" }} className="text-sm">
                  Message sent! I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormState({ name: "", email: "", message: "" });
                  }}
                  style={{
                    color: "var(--text-muted)",
                    borderBottom: "1px solid var(--border)",
                  }}
                  className="text-xs mt-2 pb-0.5 hover:text-(--accent) hover:border-(--accent) transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: "name", placeholder: "Your name", type: "text" },
                  {
                    key: "email",
                    placeholder: "your@email.com",
                    type: "email",
                  },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={formState[key as keyof typeof formState]}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, [key]: e.target.value }))
                    }
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontFamily: "inherit",
                    }}
                    className="px-4 py-3 text-sm rounded-lg outline-none focus:border-(--accent) transition-colors placeholder:opacity-30"
                  />
                ))}
                <textarea
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "inherit",
                    resize: "none",
                  }}
                  className="px-4 py-3 text-sm rounded-lg outline-none focus:border-(--accent) transition-colors placeholder:opacity-30"
                />
                {error && (
                  <p style={{ color: "#f87171", fontSize: "12px" }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-fg)",
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  className="px-6 py-3 text-sm font-semibold tracking-wide rounded-lg hover:opacity-90 transition-opacity flex items-center justify-between"
                >
                  {loading ? "Sending…" : "Send message"}
                  <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
            opacity: visible ? 0.45 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
          className="mt-20 pt-8 text-xs text-center"
        >
          Vineet Prabhakar — {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}
