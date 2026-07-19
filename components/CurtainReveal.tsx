"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAppState } from "@/hooks/useAppState";

export default function CurtainReveal() {
  const { isLoading, openCard } = useAppState();
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    // Ngay khi Loader chạy xong (isLoading = false), hiển thị rèm và chờ người dùng bấm ổ khóa
    if (!isLoading) {
      setShowCurtain(true);
    }
  }, [isLoading]);

  function handleOpen() {
    // Gọi NGAY trong click handler để giữ user gesture, nhờ đó audio.play() trong
    // MusicPlayer (được kích hoạt bởi shouldAutoplayMusic) không bị trình duyệt chặn
    openCard();
    setShowCurtain(false);
  }

  // Họa tiết hoa văn
  const patternBackground = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 3.333c.92 0 1.667-.746 1.667-1.666a1.667 1.667 0 0 0-3.334 0c0 .92.747 1.666 1.667 1.666zm0 36.667c.92 0 1.667-.746 1.667-1.667a1.667 1.667 0 0 0-3.334 0c0 .92.747 1.667 1.667 1.667zm16.667-18.333c.92 0 1.667-.746 1.667-1.667a1.667 1.667 0 0 0-3.334 0c0 .92.747 1.667 1.667 1.667zM3.333 21.667c.92 0 1.667-.746 1.667-1.667a1.667 1.667 0 0 0-3.334 0c0 .92.747 1.667 1.667 1.667z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`;

  return (
    <AnimatePresence>
      {showCurtain && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden">
          
          {/* =======================
              CÁNH CỬA TRÁI (z-20 để đè lên cửa phải)
              ======================= */}
          <motion.div
            className="relative z-20 h-full w-1/2 bg-[#B8860B] shadow-[15px_0_30px_rgba(0,0,0,0.5)] pointer-events-none"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            exit={{
              // Trượt âm qua trái đủ xa để kéo cất giấu toàn bộ cái mũ khỏi màn hình
              x: "calc(-100% - 16rem)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Lớp nền Pattern */}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundImage: patternBackground }} />
            {/* Đường viền kim loại mép cửa */}
            <div className="absolute bottom-0 right-0 top-0 w-[8px] bg-gradient-to-b from-[#FFF2CD] via-[#FFD700] to-[#DAA520] shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10" />

            {/* Ổ KHÓA BỊ GẮN VÀO CỬA TRÁI */}
            <motion.button
              onClick={handleOpen}
              className="pointer-events-auto absolute right-0 top-1/2 z-20 flex cursor-pointer flex-col items-center justify-center"
              initial={{ x: "50%", y: "-50%", scale: 0, rotate: -25 }}
              animate={{ 
                x: "50%",
                y: "-50%",
                scale: 1, 
                rotate: 0,
                transition: { delay: 0.1, type: "spring", stiffness: 220, damping: 15 } 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Mở thiệp mời"
            >
              <motion.div
                className="relative h-48 w-48 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] sm:h-64 sm:w-64"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/assets/images/cap-diploma.png"
                  alt="Mũ và Bằng Tốt Nghiệp"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              </motion.div>
              <motion.span
                className="mt-3 text-xs font-medium tracking-widest text-white/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Chạm để mở thiệp
              </motion.span>
            </motion.button>
          </motion.div>

          {/* =======================
              CÁNH CỬA PHẢI (z-10)
              ======================= */}
          <motion.div
            className="relative z-10 h-full w-1/2 bg-[#B8860B] shadow-[-15px_0_30px_rgba(0,0,0,0.5)] pointer-events-none"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            exit={{
              // Trượt sang phải
              x: "calc(100% + 16rem)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Lớp nền Pattern */}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundImage: patternBackground }} />
            {/* Đường viền kim loại mép cửa */}
            <div className="absolute bottom-0 left-0 top-0 w-[8px] bg-gradient-to-b from-[#FFF2CD] via-[#FFD700] to-[#DAA520] shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10" />
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}