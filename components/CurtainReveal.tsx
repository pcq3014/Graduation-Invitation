"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/hooks/useAppState";

/**
 * Hiệu ứng "mở thiệp": khi người dùng bấm nút, hai tấm màn lướt vào che
 * toàn màn hình rồi mở ra hai bên kèm zoom + blur nhẹ, để lộ toàn bộ nội dung.
 */
export default function CurtainReveal() {
  const { isCardOpened } = useAppState();
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    if (isCardOpened) {
      setShowCurtain(true);
      const timer = setTimeout(() => setShowCurtain(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isCardOpened]);

  return (
    <AnimatePresence>
      {showCurtain && (
        <div className="fixed inset-0 z-40 flex">
          <motion.div
            className="h-full w-1/2 bg-gradient-to-r from-peach via-blush to-lavender"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "-100%",
              transition: { duration: 1.1, delay: 0.15, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="h-full w-1/2 bg-gradient-to-l from-peach via-blush to-lavender"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "100%",
              transition: { duration: 1.1, delay: 0.15, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
