"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/hooks/useAppState";
import Monogram from "@/components/Monogram";

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
          {/* Radiating light - Thêm will-change-transform để báo trình duyệt tối ưu */}
          <motion.div
            className="pointer-events-none absolute h-[60vh] w-[60vh] rounded-full bg-gradient-to-br from-champagne/30 via-terracottaRose/20 to-jade/20 blur-3xl will-change-transform"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <Monogram size="md" />

            <p className="eyebrow text-inkBrown/70">Đang chuẩn bị thiệp mời</p>

            <div className="relative h-[2px] w-56 overflow-hidden rounded-full bg-inkBrown/10">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-champagne via-terracottaRose to-jade will-change-transform"
                // Dùng scaleX thay cho width để tối ưu hiệu năng tuyệt đối
                style={{ scaleX: progress / 100 }}
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