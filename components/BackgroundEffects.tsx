"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: "rose" | "champagne";
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

function PetalShape({ hue }: { hue: Petal["hue"] }) {
  const fill = hue === "rose" ? "#DFA5A5" : "#D9B26F";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 0C11 4 18 6 18 9C18 12 11 14 9 18C7 14 0 12 0 9C0 6 7 4 9 0Z"
        fill={fill}
        opacity={0.55}
      />
    </svg>
  );
}

export default function BackgroundEffects() {
  // Bắt đầu rỗng để markup lúc SSR khớp với lần render đầu tiên ở client.
  // Chỉ sinh giá trị Math.random() SAU khi đã mount (useEffect chỉ chạy ở client),
  // tránh lỗi hydration mismatch giữa server và client.
  const [petals, setPetals] = useState<Petal[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 0.7 + Math.random() * 0.8,
        hue: Math.random() > 0.5 ? "rose" : "champagne",
      }))
    );

    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 2 + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base pastel gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-blush to-peach" />

      {/* Aurora blobs */}
      <div className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vh] rounded-full bg-lavender/60 blur-[100px] animate-auroraShift" />
      <div
        className="absolute right-[-15%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-skyPastel/60 blur-[100px] animate-auroraShift"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[20%] h-[65vh] w-[65vh] rounded-full bg-blush/70 blur-[100px] animate-auroraShift"
        style={{ animationDelay: "6s" }}
      />

      {/* Falling petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal animate-petalFall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.size})`,
          }}
        >
          <PetalShape hue={p.hue} />
        </div>
      ))}

      {/* Light particles */}
      {particles.map((pt) => (
        <div
          key={pt.id}
          className="particle-light animate-floatY bg-champagne/40"
          style={{
            left: `${pt.left}%`,
            top: `${pt.top}%`,
            width: pt.size,
            height: pt.size,
            animationDelay: `${pt.delay}s`,
            animationDuration: `${pt.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
