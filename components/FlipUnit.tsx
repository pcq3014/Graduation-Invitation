"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface FlipUnitProps {
  value: number;
  label: string;
}

export default function FlipUnit({ value, label }: FlipUnitProps) {
  const display = formatNumber(value);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flip-card relative h-20 w-16 rounded-2xl bg-inkBrown shadow-soft sm:h-28 sm:w-24">
        <div className="absolute inset-x-0 top-1/2 z-10 h-[1px] -translate-y-1/2 bg-ivory/10" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flip-card__face absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold text-ivory sm:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow text-inkBrown/70">{label}</span>
    </div>
  );
}
