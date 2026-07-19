"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

function FlowerGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="text-champagne"
    >
      <g opacity="0.8">
        <path
          d="M11 2C12.5 5 15 6.5 18 6.5C15 6.5 12.5 8 11 11C9.5 8 7 6.5 4 6.5C7 6.5 9.5 5 11 2Z"
          fill="currentColor"
        />
        <path
          d="M11 11C12.5 14 15 15.5 18 15.5C15 15.5 12.5 17 11 20C9.5 17 7 15.5 4 15.5C7 15.5 9.5 14 11 11Z"
          fill="currentColor"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mb-14 text-center sm:mb-16" : "mb-14 text-left sm:mb-16"}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className={isCenter ? "flex justify-center" : "flex justify-start"}
      >
        <FlowerGlyph />
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.05 }}
        className="eyebrow mt-3"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.12 }}
        className="mt-2 font-display text-3xl text-inkBrown sm:text-4xl"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={isCenter ? "mt-5 flourish" : "mt-5 flourish justify-start"}
      >
        <span className="h-1 w-1 rounded-full bg-terracottaRose" />
      </motion.div>
    </div>
  );
}
