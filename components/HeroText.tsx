"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const GLITCH_CHARS = "!@#$%^&*<>?/|ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FULL_TEXT = "VINEET PRABHAKAR";

interface CharState {
  display: string;
  settled: boolean;
}

export default function HeroText() {
  const [chars, setChars] = useState<CharState[]>(
    FULL_TEXT.split("").map((c) => ({
      display: c === " " ? " " : "",
      settled: c === " ",
    }))
  );
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  const scrambleThenSettle = useCallback((idx: number, delay: number) => {
    const start = setTimeout(() => {
      let ticks = 0;
      const maxTicks = 5 + Math.floor(Math.random() * 7);
      const iv = setInterval(() => {
        ticks++;
        if (ticks >= maxTicks) {
          clearInterval(iv);
          setChars((prev) => {
            const next = [...prev];
            next[idx] = { display: FULL_TEXT[idx], settled: true };
            return next;
          });
        } else {
          setChars((prev) => {
            const next = [...prev];
            next[idx] = {
              display: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
              settled: false,
            };
            return next;
          });
        }
      }, 40);
      timers.current.push(iv);
    }, delay);
    timers.current.push(start as unknown as ReturnType<typeof setInterval>);
  }, []);

  useEffect(() => {
    const indices = FULL_TEXT.split("")
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => c !== " ")
      .map(({ i }) => i);

    indices.forEach((idx, order) => scrambleThenSettle(idx, order * 70));

    const doneTimer = setTimeout(
      () => setDone(true),
      indices.length * 70 + 500
    );
    timers.current.push(doneTimer as unknown as ReturnType<typeof setInterval>);

    return () => timers.current.forEach((t) => clearInterval(t));
  }, [scrambleThenSettle]);

  // Periodic glitch after reveal
  useEffect(() => {
    if (!done) return;

    const glitch = () => {
      const indices = FULL_TEXT.split("")
        .map((c, i) => ({ c, i }))
        .filter(({ c }) => c !== " ")
        .map(({ i }) => i)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2 + Math.floor(Math.random() * 3));

      indices.forEach((idx) => {
        let ticks = 0;
        const iv = setInterval(() => {
          ticks++;
          if (ticks > 5) {
            clearInterval(iv);
            setChars((prev) => {
              const next = [...prev];
              next[idx] = { display: FULL_TEXT[idx], settled: true };
              return next;
            });
          } else {
            setChars((prev) => {
              const next = [...prev];
              next[idx] = {
                display: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
                settled: false,
              };
              return next;
            });
          }
        }, 50);
      });
    };

    const id = setInterval(glitch, 2800 + Math.random() * 1500);
    return () => clearInterval(id);
  }, [done]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
      }}
    >
      <h1
        style={{
          fontFamily: "'Pixelify Sans', monospace",
          fontSize: "clamp(1.2rem, 8vw, 9rem)",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textAlign: "center",
          lineHeight: 1,
          margin: 0,
          userSelect: "none",
          whiteSpace: "nowrap",
          textShadow:
            "0 0 40px rgba(95,173,108,0.5), 0 0 100px rgba(95,173,108,0.2)",
        }}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              color: ch.settled ? "#5FAD6C" : "#c8ffb0",
              display: "inline-block",
              minWidth: FULL_TEXT[i] === " " ? "0.3em" : undefined,
              transition: ch.settled ? "color 0.15s ease" : "none",
            }}
          >
            {ch.display || (FULL_TEXT[i] === " " ? "\u00a0" : "")}
          </span>
        ))}
      </h1>
    </div>
  );
}
