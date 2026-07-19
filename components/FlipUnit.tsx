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
      <div className="flip-card relative h-20 w-16 rounded-2xl bg-gradient-to-b from-inkBrown to-[#4a3c41] p-[1.5px] shadow-soft sm:h-28 sm:w-24">
        <div className="relative h-full w-full overflow-hidden rounded-[calc(1rem-1.5px)] bg-gradient-to-b from-inkBrown to-[#4a3c41]">
          {/* top highlight sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
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
      </div>
      <span className="eyebrow text-inkBrown/70">{label}</span>
    </div>
  );
}
