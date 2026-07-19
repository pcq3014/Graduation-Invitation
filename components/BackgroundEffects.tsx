"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rot: number;
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

interface Cloud {
  id: number;
  top: number;
  delay: number;
  duration: number;
  scale: number;
}

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rot: number;
}

interface Cap {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  rot: number;
}

function PetalShape({ hue }: { hue: Petal["hue"] }) {
  const fill = hue === "rose" ? "#DFA5A5" : "#D9B26F";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="drop-shadow-sm">
      <path
        d="M9 0C11 4 18 6 18 9C18 12 11 14 9 18C7 14 0 12 0 9C0 6 7 4 9 0Z"
        fill={fill}
        opacity={0.65}
      />
    </svg>
  );
}

function CloudShape() {
  return (
    <svg width="140" height="60" viewBox="0 0 140 60" fill="none">
      <g opacity="0.45" filter="blur(1px)">
        <ellipse cx="40" cy="38" rx="34" ry="18" fill="#FFFFFF" />
        <ellipse cx="75" cy="26" rx="28" ry="22" fill="#FFFFFF" />
        <ellipse cx="105" cy="38" rx="26" ry="16" fill="#FFFFFF" />
        <ellipse cx="70" cy="42" rx="55" ry="14" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

function HeartShape() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="drop-shadow-sm">
      <path
        d="M8 14C8 14 1.5 10.1 1.5 5.6C1.5 3.4 3.2 1.8 5.2 1.8C6.4 1.8 7.4 2.4 8 3.4C8.6 2.4 9.6 1.8 10.8 1.8C12.8 1.8 14.5 3.4 14.5 5.6C14.5 10.1 8 14 8 14Z"
        fill="#DFA5A5"
        opacity="0.65"
      />
    </svg>
  );
}

function CapShape() {
  return (
    <svg width="30" height="26" viewBox="0 0 30 26" fill="none" className="drop-shadow-sm">
      <g opacity="0.75">
        <path d="M15 2L28 8L15 14L2 8L15 2Z" fill="#5C4B51" />
        <path d="M9 10.5V17C9 19 11.5 20.5 15 20.5C18.5 20.5 21 19 21 17V10.5" stroke="#5C4B51" strokeWidth="1.3" />
        <path d="M25 9.5V16" stroke="#D9B26F" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="25" cy="17.5" r="1.6" fill="#D9B26F" />
      </g>
    </svg>
  );
}

export default function BackgroundEffects() {
  const [isMounted, setIsMounted] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [caps, setCaps] = useState<Cap[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    
    // Tinh chỉnh số lượng hợp lý
    const petalCount = isMobile ? 8 : 16;
    const particleCount = isMobile ? 12 : 24;
    const cloudCount = isMobile ? 2 : 4;
    const heartCount = isMobile ? 6 : 12;
    const capCount = isMobile ? 3 : 5;

    setPetals(
      Array.from({ length: petalCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: (isMobile ? 0.6 : 0.7) + Math.random() * 0.8,
        rot: Math.random() * 360, // Random góc xoay
        hue: Math.random() > 0.5 ? "rose" : "champagne",
      }))
    );

    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 2 + Math.random() * 3,
      }))
    );

    setClouds(
      Array.from({ length: cloudCount }, (_, i) => ({
        id: i,
        top: 5 + Math.random() * 55,
        delay: Math.random() * 20,
        duration: 55 + Math.random() * 45, // Bay chậm lại cho tự nhiên
        scale: (isMobile ? 0.5 : 0.7) + Math.random() * 0.6,
      }))
    );

    setHearts(
      Array.from({ length: heartCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 8,
        size: 0.8 + Math.random() * 0.9,
        rot: -20 + Math.random() * 40, // Lắc lư trái phải nhẹ
      }))
    );

    setCaps(
      Array.from({ length: capCount }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        top: 10 + Math.random() * 70,
        delay: Math.random() * 6,
        duration: 7 + Math.random() * 6,
        size: (isMobile ? 0.7 : 0.9) + Math.random() * 0.5,
        rot: -15 + Math.random() * 30, // Xoay nhẹ góc
      }))
    );

    // Kích hoạt fade-in
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
      // Giúp GPU tối ưu layer rendering, tránh repaints
      style={{ contain: "paint" }}
    >
      {/* Base pastel gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-blush to-peach" />

      {/* Aurora blobs - blur nhẹ hơn trên mobile */}
      <div className="absolute -left-1/4 top-[-10%] h-[50vh] w-[50vh] rounded-full bg-lavender/50 blur-[60px] animate-auroraShift sm:h-[70vh] sm:w-[70vh] sm:blur-[120px] will-change-transform" />
      <div
        className="absolute right-[-15%] top-[10%] h-[45vh] w-[45vh] rounded-full bg-skyPastel/40 blur-[60px] animate-auroraShift sm:h-[60vh] sm:w-[60vh] sm:blur-[120px] will-change-transform"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[20%] hidden h-[65vh] w-[65vh] rounded-full bg-blush/60 blur-[100px] animate-auroraShift sm:block sm:blur-[140px] will-change-transform"
        style={{ animationDelay: "6s" }}
      />

      {/* Drifting clouds */}
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute left-[-150px] animate-cloudDrift will-change-transform"
          style={{
            top: `${c.top}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          <div style={{ transform: `scale(${c.scale})` }}>
            <CloudShape />
          </div>
        </div>
      ))}

      {/* Falling petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-[20px] animate-petalFall will-change-transform"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {/* Tách thẻ div bọc trong để rotate/scale không bị class animate-* ghi đè */}
          <div style={{ transform: `scale(${p.size}) rotate(${p.rot}deg)` }}>
            <PetalShape hue={p.hue} />
          </div>
        </div>
      ))}

      {/* Rising hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -bottom-[20px] animate-heartRise will-change-transform"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          <div style={{ transform: `scale(${h.size}) rotate(${h.rot}deg)` }}>
            <HeartShape />
          </div>
        </div>
      ))}

      {/* Floating graduation caps */}
      {caps.map((c) => (
        <div
          key={c.id}
          className="absolute animate-capFloat will-change-transform"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          <div style={{ transform: `scale(${c.size}) rotate(${c.rot}deg)` }}>
            <CapShape />
          </div>
        </div>
      ))}

      {/* Light particles */}
      {particles.map((pt) => (
        <div
          key={pt.id}
          className="absolute rounded-full bg-champagne/50 animate-floatY will-change-transform"
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