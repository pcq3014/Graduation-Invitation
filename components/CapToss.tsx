"use client";

import { useEffect, useState } from "react";

interface TossedCap {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
}

function CapGlyph() {
  return (
    <svg width="34" height="30" viewBox="0 0 30 26" fill="none">
      <path d="M15 2L28 8L15 14L2 8L15 2Z" fill="#5C4B51" />
      <path
        d="M9 10.5V17C9 19 11.5 20.5 15 20.5C18.5 20.5 21 19 21 17V10.5"
        stroke="#5C4B51"
        strokeWidth="1.3"
      />
      <path d="M25 9.5V16" stroke="#D9B26F" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="25" cy="17.5" r="1.6" fill="#D9B26F" />
    </svg>
  );
}

export default function CapToss() {
  const [caps, setCaps] = useState<TossedCap[]>([]);

  useEffect(() => {
    setCaps(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 0.5,
        duration: 2.2 + Math.random() * 1,
        scale: 0.8 + Math.random() * 0.6,
      }))
    );
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {caps.map((c) => (
        <div
          key={c.id}
          className="absolute bottom-0 animate-capThrow"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            transform: `scale(${c.scale})`,
          }}
        >
          <CapGlyph />
        </div>
      ))}
    </div>
  );
}
