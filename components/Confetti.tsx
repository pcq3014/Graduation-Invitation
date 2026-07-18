"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#D9B26F", "#DFA5A5", "#A8D5D0", "#F3EEFF"];

interface Piece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotate: number;
}

export default function Confetti() {
  // Sinh giá trị ngẫu nhiên sau khi mount (chỉ chạy ở client) để tránh
  // hydration mismatch nếu component này vô tình được render lúc SSR
  // (ví dụ khi ngày tốt nghiệp đã qua ngay tại lần tải trang đầu tiên).
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.6,
        duration: 2.5 + Math.random() * 1.5,
        rotate: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 block h-2.5 w-1.5 rounded-sm"
          style={{ left: `${p.left}%`, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: p.rotate }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
