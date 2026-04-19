"use client";
import { useRef, useState, useCallback, useEffect } from "react";

interface Project {
  name: string;
  description: string;
  tech: string[];
  videoSrc: string;
  href: string;
  live?: string;
  is3D: boolean;
}

// Replace videoSrc with your own screen recordings / demo clips
const PROJECTS: Project[] = [
  {
    name: "Pixel Game",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611045/2d/Pixel_game_jdtbh7.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Cosmic Run",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611053/2d/Cosmic_run_da2tvk.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Right Pace",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611047/2d/Right_Pace_wddctl.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Sling Puck",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611048/2d/Sling_Puck_cq0kfb.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Tag Fall",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611052/2d/Tag_Fall_ndbbse.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Targetary",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611054/2d/Targetary_jot9qc.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Tennis",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611050/2d/Tennis_y6bigs.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Tile Breaker",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611049/2d/Tile_Breaker_u0wlfl.mp4",
    href: "#",
    is3D: false,
  },
  {
    name: "Battle Tanks",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611009/3d/Battle_Tanks_tyuyh3.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Bike Race",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611014/3d/Bike_Race_pcukuy.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Cosmic Clash",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611008/3d/Cosmic_clash_hrscmo.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Level Design",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611001/3d/Level_Design_uwyzyq.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Level Design 2",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611029/3d/Level_design2_gy1i3z.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Roulette",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611011/3d/Roulette_gzs7p0.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Winkies Game Design",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611009/3d/Winkies_game_design_q8vfzb.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Car Simulator",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611013/3d/car_simulator_clyjhf.mp4",
    href: "#",
    is3D: true,
  },
  {
    name: "Character Selection",
    description: "",
    tech: [],
    videoSrc: "https://res.cloudinary.com/dvxlpukud/video/upload/v1776611002/3d/character_selection_game_fdslcn.mp4",
    href: "#",
    is3D: true,
  },
];

const VIDEO_DURATION = 15000;

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
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
  );
}

interface CardProps {
  project: Project;
  position: number; // -1 | 0 | 1 | other
  onClick: () => void;
  cardW: number;
  isMobile: boolean;
}

function ProjectCard({ project, position, onClick, cardW, isMobile }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const isCenter = position === 0;

  const startVideo = useCallback(() => {
    if (!isCenter) return;
    const video = videoRef.current;
    if (!video) return;
    clearTimeout(timerRef.current);
    video.currentTime = 0;
    video.play().catch(() => {});
    setPlaying(true);

    // Animate progress bar
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = `width ${VIDEO_DURATION}ms linear`;
            progressRef.current.style.width = "100%";
          }
        });
      });
    }

    timerRef.current = setTimeout(() => {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
      if (progressRef.current) {
        progressRef.current.style.transition = "none";
        progressRef.current.style.width = "0%";
      }
    }, VIDEO_DURATION);
  }, [isCenter]);

  const stopVideo = useCallback(() => {
    clearTimeout(timerRef.current);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
    if (progressRef.current) {
      progressRef.current.style.transition = "width 0.2s ease";
      progressRef.current.style.width = "0%";
    }
  }, []);

  // Stop video when card moves away from center
  useEffect(() => {
    if (!isCenter) stopVideo();
  }, [isCenter, stopVideo]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const abs = Math.abs(position);
  const isVisible = abs <= 1;

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    width: `${cardW}px`,
    top: 0,
    left: "50%",
    marginLeft: `${-cardW / 2}px`,
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid var(--border)`,
    background: "var(--bg)",
    cursor: isCenter ? "default" : "pointer",
    userSelect: "none",
    transition:
      "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.6s ease, box-shadow 0.3s ease",
    transformStyle: "preserve-3d",
    willChange: "transform, opacity",
    boxShadow: isCenter
      ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border)"
      : "0 8px 32px rgba(0,0,0,0.3)",
    ...(position === 0 && {
      transform: "translateX(0) rotateY(0deg) scale(1)",
      opacity: 1,
      zIndex: 10,
    }),
    ...(position === -1 && !isMobile && {
      transform: "translateX(-72%) rotateY(42deg) scale(0.82)",
      opacity: 0.6,
      zIndex: 5,
    }),
    ...(position === 1 && !isMobile && {
      transform: "translateX(72%) rotateY(-42deg) scale(0.82)",
      opacity: 0.6,
      zIndex: 5,
    }),
    ...(isMobile && position === -1 && {
      transform: "translateX(-82%) scale(0.88)",
      opacity: 0.45,
      zIndex: 5,
    }),
    ...(isMobile && position === 1 && {
      transform: "translateX(82%) scale(0.88)",
      opacity: 0.45,
      zIndex: 5,
    }),
    ...((isMobile && Math.abs(position) > 1) && {
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    }),
    ...(!isVisible && {
      transform: `translateX(${position < 0 ? -140 : 140}%) rotateY(${position < 0 ? 60 : -60}deg) scale(0.6)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    }),
  };

  return (
    <div style={cardStyle} onClick={!isCenter ? onClick : undefined}>
      {/* Video area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "#000",
          overflow: "hidden",
        }}
        onMouseEnter={startVideo}
        onMouseLeave={stopVideo}
      >
        <video
          ref={videoRef}
          src={project.videoSrc}
          muted
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Overlay: hidden when playing */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(0,0,0,0.3) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: playing ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {isCenter && (
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                style={{ marginLeft: "2px" }}
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          )}
          {isCenter && (
            <span
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "10px",
                fontFamily: "inherit",
                letterSpacing: "0.05em",
              }}
            >
              hover to preview
            </span>
          )}
        </div>

        {/* 5-second progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            background: "var(--bg)",
            opacity: 0.3,
            width: "100%",
          }}
        />
        <div
          ref={progressRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            background: "var(--accent)",
            width: "0%",
          }}
        />
      </div>

      {/* Card info */}
      <div style={{ padding: "20px 22px 22px", fontFamily: "inherit" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <h3
            style={{
              color: "var(--text)",
              fontSize: "15px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {project.name}
          </h3>
          <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ color: "var(--text-muted)" }}
              className="hover:text-(--accent) transition-colors"
            >
              <GitHubIcon />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ color: "var(--text-muted)" }}
                className="hover:text-(--accent) transition-colors"
              >
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            lineHeight: 1.6,
            marginBottom: "14px",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "4px",
                letterSpacing: "0.04em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCarousel() {
  const [mode, setMode] = useState<"2D" | "3D">("2D");
  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(600);
  const touchStartX = useRef(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCardW(w < 600 ? Math.round(w * 0.72) : Math.min(600, w - 32));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = cardW < 600;

  const filtered = PROJECTS.filter((p) => p.is3D === (mode === "3D"));
  const n = filtered.length;

  const toggleMode = useCallback((next: "2D" | "3D") => {
    setMode(next);
    setActive(0);
  }, []);

  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);
  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Normalised position: -1, 0, 1, or ±2 for hidden
  const getPosition = (i: number) => {
    let pos = i - active;
    if (pos > n / 2) pos -= n;
    if (pos < -n / 2) pos += n;
    return pos;
  };

  return (
    <section
      id="projects"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        fontFamily: "inherit",
      }}
      className="px-6 py-24"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 px-0 md:px-10">
          <p
            style={{ color: "var(--accent)" }}
            className="text-xs tracking-widest uppercase mb-3 opacity-60"
          >
            <span className="mr-2">$</span>ls projects/
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2
              style={{ color: "var(--text)" }}
              className="text-3xl md:text-4xl font-bold"
            >
              Things I&apos;ve Designed
            </h2>
            <div
              style={{
                display: "flex",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                overflow: "hidden",
                fontFamily: "inherit",
              }}
            >
              {(["2D", "3D"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => toggleMode(m)}
                  style={{
                    width: isMobile ? "48px" : "60px",
                    padding: isMobile ? "6px 0" : "8px 0",
                    border: "none",
                    cursor: "pointer",
                    background: mode === m ? "var(--accent)" : "transparent",
                    color: mode === m ? "var(--bg)" : "var(--text-muted)",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          style={{
            position: "relative",
            height: isMobile ? `${Math.round(cardW * (9 / 16) + 100)}px` : `${Math.round(cardW * (9 / 16) + 120)}px`,
            perspective: "1200px",
            perspectiveOrigin: "50% 40%",
            overflow: "hidden",
          }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              position={getPosition(i)}
              onClick={() => setActive(i)}
              cardW={cardW}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              width: "42px",
              height: "42px",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              background: "var(--bg)",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s, color 0.15s",
            }}
            className="hover:border-(--accent) hover:text-(--accent)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === active ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  background: i === active ? "var(--accent)" : "var(--border)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s ease, background 0.2s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            style={{
              width: "42px",
              height: "42px",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              background: "var(--bg)",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s, color 0.15s",
            }}
            className="hover:border-(--accent) hover:text-(--accent)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
