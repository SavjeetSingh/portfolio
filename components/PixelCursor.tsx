"use client";
import { useEffect, useRef } from "react";

const PIXEL = 4;       // snap grid size
const SIZE = 16;       // cursor block size
const TRAIL_LEN = 10;  // number of trail positions

export default function PixelCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Hide native cursor on everything
    document.body.style.cursor = "none";
    const styleEl = document.createElement("style");
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const mouse = { x: -999, y: -999 };
    const trail: { x: number; y: number }[] = [];
    let isHover = false;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      // Snap to pixel grid
      mouse.x = Math.floor(e.clientX / PIXEL) * PIXEL;
      mouse.y = Math.floor(e.clientY / PIXEL) * PIXEL;

      // Track hovered element type
      const el = document.elementFromPoint(e.clientX, e.clientY);
      isHover = !!(el?.closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", onMove);

    // Get accent color from CSS variable
    const getAccent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#A7EF9E";

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const accent = getAccent();

      // Update trail — push current position, cap length
      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > TRAIL_LEN) trail.shift();

      // Draw trail — older positions are smaller and more transparent
      for (let i = 0; i < trail.length - 1; i++) {
        const t = trail[i];
        const alpha = ((i + 1) / TRAIL_LEN) * 0.35;
        const trailSize = Math.floor((PIXEL * 2) * ((i + 1) / TRAIL_LEN));
        const snapped = Math.max(PIXEL, trailSize - (trailSize % PIXEL));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = accent;
        ctx.fillRect(
          t.x - Math.floor(snapped / 2),
          t.y - Math.floor(snapped / 2),
          snapped,
          snapped
        );
      }

      // Draw main cursor
      ctx.globalAlpha = 1;
      const cursorSize = isHover ? SIZE + PIXEL * 2 : SIZE;

      // Outer border (1px dark frame)
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(
        mouse.x - cursorSize / 2 - 1,
        mouse.y - cursorSize / 2 - 1,
        cursorSize + 2,
        cursorSize + 2
      );

      // Main block — pixelated crosshair made of 4 squares
      ctx.fillStyle = accent;
      const half = cursorSize / 2;
      const px = PIXEL;

      // Crosshair arms
      ctx.fillRect(mouse.x - half,         mouse.y - px / 2,   cursorSize, px); // horizontal
      ctx.fillRect(mouse.x - px / 2,       mouse.y - half,     px, cursorSize); // vertical

      // Center pixel cluster
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(mouse.x - px,  mouse.y - px,  px * 2, px * 2);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.body.style.cursor = "";
      styleEl.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        imageRendering: "pixelated",
      }}
    />
  );
}
