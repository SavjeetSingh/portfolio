"use client";
import { useEffect, useRef } from "react";

interface MatrixRainProps {
  color?: string;
  fontSize?: number;
  speed?: number;
  density?: number;
  fadeOpacity?: number;
  fps?: number;
  className?: string;
}

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\|[]{}";

function buildSpriteSheet(fontSize: number, color: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = fontSize;
  c.height = fontSize * CHARS.length;
  const ctx = c.getContext("2d")!;
  ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  for (let i = 0; i < CHARS.length; i++) {
    ctx.fillText(CHARS[i], 0, i * fontSize);
  }
  return c;
}

function buildSpriteSheetWhite(fontSize: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = fontSize;
  c.height = fontSize * CHARS.length;
  const ctx = c.getContext("2d")!;
  ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
  ctx.textBaseline = "top";
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < CHARS.length; i++) {
    ctx.fillText(CHARS[i], 0, i * fontSize);
  }
  return c;
}

export default function MatrixRain({
  color = "#A7EF9E",
  fontSize = 14,
  speed = 1,
  density = 0.975,
  fadeOpacity = 0.05,
  fps = 24,
  className,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef(fps);
  fpsRef.current = fps;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameInterval = 1000 / fpsRef.current;
    let animId: number;
    let lastTime = 0;
    let drops: number[] = [];

    // Build sprite sheets once — reuse every frame with drawImage (fast)
    const sheet = buildSpriteSheet(fontSize, color);
    const sheetWhite = buildSpriteSheetWhite(fontSize);

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    };

    init();

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);

      // Throttle — skip frames we don't need
      const elapsed = timestamp - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = timestamp - (elapsed % frameInterval);

      // Fading black overlay
      ctx.fillStyle = `rgba(0,0,0,${fadeOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const yHead = Math.floor(drops[i]) * fontSize;
        const x = i * fontSize;

        // Leading character — white, drawn from white sprite sheet
        if (yHead >= 0 && yHead < canvas.height) {
          const ci = Math.floor(Math.random() * CHARS.length);
          ctx.drawImage(sheetWhite, 0, ci * fontSize, fontSize, fontSize, x, yHead, fontSize, fontSize);
        }

        // Second character — accent color, drawn from color sprite sheet
        const yTrail = yHead - fontSize;
        if (yTrail >= 0 && yTrail < canvas.height) {
          const ci = Math.floor(Math.random() * CHARS.length);
          ctx.drawImage(sheet, 0, ci * fontSize, fontSize, fontSize, x, yTrail, fontSize, fontSize);
        }

        // Reset column when it hits the bottom
        if (yHead > canvas.height && Math.random() > density) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
    };

    animId = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (!document.hidden && !animId) {
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const ro = new ResizeObserver(() => {
      init();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [color, fontSize, speed, density, fadeOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
