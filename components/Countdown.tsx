"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { siteConfig } from "@/data/content";
import { fadeUp, staggerContainer } from "@/animations/variants";
import FlipUnit from "./FlipUnit";
import Confetti from "./Confetti";

export default function Countdown() {
  const { days, hours, minutes, seconds, isFinished } = useCountdown(
    siteConfig.graduationDateISO
  );

  return (
    <section
      id="countdown"
      className="relative flex flex-col items-center px-6 py-28"
    >
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="eyebrow mb-3"
      >
        Đếm ngược
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="mb-14 text-center font-display text-3xl text-inkBrown sm:text-4xl"
      >
        {isFinished ? "Chúc mừng ngày tốt nghiệp!" : "Còn Bao Lâu Nữa Đến Ngày Trọng Đại"}
      </motion.h2>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
      >
        <motion.div variants={fadeUp}>
          <FlipUnit value={days} label="Ngày" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <FlipUnit value={hours} label="Giờ" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <FlipUnit value={minutes} label="Phút" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <FlipUnit value={seconds} label="Giây" />
        </motion.div>
      </motion.div>

      {isFinished && <Confetti />}
    </section>
  );
}
