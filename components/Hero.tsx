"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useAppState } from "@/hooks/useAppState";
import { heroContent } from "@/data/content";
import { staggerContainer, letterFade, fadeUp } from "@/animations/variants";

export default function Hero() {
  const { x, y } = useMousePosition();
  const { openCard, isCardOpened } = useAppState();

  const nameLetters = heroContent.title.split("");

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Glow behind portrait */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/25 blur-[90px]" />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="eyebrow relative z-10 mb-6"
      >
        {heroContent.eyebrow}
      </motion.p>

      {/* Portrait with parallax tilt */}
      <motion.div
        style={{
          transform: `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`,
        }}
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-8 h-[260px] w-[210px] overflow-hidden rounded-[3rem] border-4 border-white/70 shadow-soft sm:h-[340px] sm:w-[270px]"
      >
        <Image
          src={heroContent.heroImage}
          alt={`Ảnh tốt nghiệp của ${heroContent.title}`}
          fill
          priority
          sizes="(max-width: 640px) 210px, 270px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inkBrown/10 via-transparent to-transparent" />
      </motion.div>

      {/* Name - letter by letter reveal */}
      <motion.h1
        variants={staggerContainer(0.04, 0.2)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-wrap justify-center font-display text-4xl font-semibold tracking-wide text-inkBrown sm:text-6xl"
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

      {!isCardOpened && (
        <motion.button
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.95 }}
          onClick={openCard}
          className="relative z-10 mt-10 rounded-full bg-gradient-to-r from-champagne to-terracottaRose px-10 py-4 font-display text-base tracking-widest text-ivory shadow-soft transition-transform hover:scale-105 active:scale-95"
        >
          {heroContent.cta}
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-warmGray"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
