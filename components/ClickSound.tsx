"use client";
import { useEffect } from "react";

export default function ClickSound() {
  useEffect(() => {
    const audio = new Audio(
      "/projectvids/cursorSound/cartoon-music-soundtrack-arcade-game-achievement-bling-489759.mp3",
    );
    audio.preload = "auto";
    audio.volume = 0.3;

    const play = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    document.addEventListener("click", play);
    return () => document.removeEventListener("click", play);
  }, []);

  return null;
}
