"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/hooks/useAppState";
import { siteConfig } from "@/data/content";

export default function Loader() {
  const { isLoading, finishLoading } = useAppState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    let raf: number;
    const start = performance.now();
    const duration = 2200;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(finishLoading, 350);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoading, finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Radiating light */}
          <motion.div
            className="absolute h-[60vh] w-[60vh] rounded-full bg-gradient-to-br from-champagne/30 via-terracottaRose/20 to-jade/20 blur-3xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-champagne/40 glass-panel shadow-glass">
              <span className="font-display text-3xl tracking-widest text-inkBrown">
                {siteConfig.initials}
              </span>
            </div>

            <p className="eyebrow text-inkBrown/70">Đang chuẩn bị thiệp mời</p>

            <div className="relative h-[2px] w-56 overflow-hidden rounded-full bg-inkBrown/10">
              <motion.div
                className="h-full bg-gradient-to-r from-champagne via-terracottaRose to-jade"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-display text-sm tabular-nums text-warmGray">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
