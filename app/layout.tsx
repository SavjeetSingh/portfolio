import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PixelCursor from "@/components/PixelCursor";
import ClickSound from "@/components/ClickSound";
import ClickParticles from "@/components/ClickParticles";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Savjeet Singh",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelifySans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking script: sets theme class before React hydrates — prevents flash and mismatch */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <PixelCursor />
        <ClickSound />
        <ClickParticles />
        {children}
      </body>
    </html>
  );
}
