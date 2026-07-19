"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { heroContent } from "@/data/content";
import { staggerContainer, letterFade, fadeUp } from "@/animations/variants";

export default function Hero() {
  const { x, y } = useMousePosition();
  const nameLetters = heroContent.title.split("");

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Glow behind portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/25 blur-[90px] will-change-transform"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[65vh] w-[65vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracottaRose/10 blur-[110px] will-change-transform"
      />

      {/* Corner ornaments */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 h-16 w-16 text-champagne/50 sm:left-10 sm:top-10"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path d="M2 30C2 14 14 2 30 2" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="2" r="2" fill="currentColor" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 rotate-180 text-champagne/50 sm:bottom-10 sm:right-10"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path d="M2 30C2 14 14 2 30 2" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="2" r="2" fill="currentColor" />
      </svg>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="eyebrow relative z-10 mb-6"
      >
        {heroContent.eyebrow}
      </motion.p>

      {/* Portrait with parallax tilt + rotating dashed halo */}
      <div className="relative z-10 mb-8">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-5 rounded-[3.5rem] border-[1.5px] border-dashed border-champagne/60 sm:-inset-6 will-change-transform"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          style={{
            rotateY: x * 6,
            rotateX: -y * 6,
            transformPerspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[260px] w-[210px] overflow-hidden rounded-[3rem] border-4 border-white/80 shadow-glass sm:h-[340px] sm:w-[270px] will-change-transform"
        >
          <Image
            src={heroContent.heroImage}
            alt={`Ảnh tốt nghiệp của ${heroContent.title}`}
            fill
            priority
            sizes="(max-width: 640px) 210px, 270px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inkBrown/20 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Name - letter by letter reveal */}
      <motion.h1
        variants={staggerContainer(0.04, 0.2)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-wrap justify-center font-display text-4xl font-semibold tracking-wide text-inkBrown drop-shadow-sm sm:text-6xl"
      >
        {nameLetters.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterFade}
            className="inline-block"
            style={{ transformOrigin: "50% 100%" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        className="relative z-10 mt-4 font-hand text-3xl text-terracottaRose sm:text-4xl"
      >
        {heroContent.subtitle}
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.75 }}
        className="relative z-10 mt-3 text-sm tracking-[0.3em] text-warmGray"
      >
        {heroContent.date}
      </motion.p>

      {/* Đã xóa khối <motion.button> "Mở Thiệp" ở đây */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-warmGray/70"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="will-change-transform"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}