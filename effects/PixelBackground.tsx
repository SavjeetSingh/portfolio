"use client";
import { useEffect, useRef } from "react";

interface PixelBackgroundProps {
  color?: string;
  fps?: number;
  className?: string;
}

const W = 180;
const H = 110;

export default function PixelBackground({
  color = "#A7EF9E",
  fps = 30,
  className,
}: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Internal low-res size — CSS stretches it, browser pixelates it
    canvas.width = W;
    canvas.height = H;

    // Parse accent color to rgb for manual blending
    const hex = color.replace("#", "");
    const ar = parseInt(hex.slice(0, 2), 16);
    const ag = parseInt(hex.slice(2, 4), 16);
    const ab = parseInt(hex.slice(4, 6), 16);

    let animId: number;
    let lastTime = 0;
    const frameInterval = 1000 / fps;

    // Pre-allocate ImageData — mutate it in place each frame (fastest path)
    const img = ctx.createImageData(W, H);
    const d = img.data;

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);

      const elapsed = timestamp - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = timestamp - (elapsed % frameInterval);

      const t = timestamp * 0.0006;

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const plasma =
            Math.sin(x * 0.18 + t) +
            Math.sin(y * 0.22 + t * 1.1) +
            Math.sin((x * 0.12 + y * 0.15) + t * 0.8) +
            Math.sin(Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2) * 0.12 + t * 0.6);

          // Normalise -4..4 → 0..1
          const v = (plasma + 4) / 8;

          let r: number, g: number, b: number;

          if (v < 0.38) {
            // Dark zone — very dim glow
            const s = v / 0.38;
            r = Math.round(ar * s * 0.06);
            g = Math.round(ag * s * 0.06);
            b = Math.round(ab * s * 0.06);
          } else if (v < 0.62) {
            // Mid zone — dim accent
            const s = (v - 0.38) / 0.24;
            r = Math.round(ar * s * 0.35);
            g = Math.round(ag * s * 0.35);
            b = Math.round(ab * s * 0.35);
          } else if (v < 0.82) {
            // Bright zone — full accent
            const s = (v - 0.62) / 0.20;
            r = Math.round(ar * (0.35 + s * 0.65));
            g = Math.round(ag * (0.35 + s * 0.65));
            b = Math.round(ab * (0.35 + s * 0.65));
          } else {
            // Hot zone — white flash
            const s = (v - 0.82) / 0.18;
            r = Math.round(ar + (255 - ar) * s * 0.8);
            g = Math.round(ag + (255 - ag) * s * 0.8);
            b = Math.round(ab + (255 - ab) * s * 0.8);
          }

          const idx = (y * W + x) * 4;
          d[idx] = r;
          d[idx + 1] = g;
          d[idx + 2] = b;
          d[idx + 3] = 255;
        }
      }

      ctx.putImageData(img, 0, 0);
    };

    animId = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (!document.hidden && !animId) animId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [color, fps]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        imageRendering: "pixelated",
      }}
    />
  );
}
