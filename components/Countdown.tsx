"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { siteConfig } from "@/data/content";
import { staggerContainer, fadeUp } from "@/animations/variants";
import SectionHeading from "./SectionHeading";
import Confetti from "./Confetti";
import CapToss from "./CapToss";

// 1. Họa tiết hoa lá và trái tim mô phỏng giống hệt ảnh mẫu
function FloralOrnament() {
  return (
    <svg 
      viewBox="0 0 120 40" 
      className="mt-1 w-20 text-[#4a4a4a] sm:w-24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Trái tim ở giữa */}
      <path d="M60 30 C60 30 46 18 46 10 C46 5 54 3 60 9 C66 3 74 5 74 10 C74 18 60 30 60 30 Z" />
      
      {/* Nhánh bên trái */}
      <path d="M44 24 Q24 30 10 16" />
      <path d="M32 27 C26 21 24 16 28 14 C32 18 34 23 32 27 Z" /> {/* Lá 1 */}
      <path d="M22 22 C16 16 14 11 18 9 C22 13 24 18 22 22 Z" /> {/* Lá 2 */}
      <path d="M10 16 C 5 12 5 6 8 4 C 10 8 10 8 10 10 C 10 8 10 8 12 4 C 15 6 15 12 10 16 Z" /> {/* Hoa Tulip */}
      
      {/* Nhánh bên phải */}
      <path d="M76 24 Q96 30 110 16" />
      <path d="M88 27 C94 21 96 16 92 14 C88 18 86 23 88 27 Z" /> {/* Lá 1 */}
      <path d="M98 22 C104 16 106 11 102 9 C98 13 96 18 98 22 Z" /> {/* Lá 2 */}
      <path d="M110 16 C 115 12 115 6 112 4 C 110 8 110 8 110 10 C 110 8 110 8 108 4 C 105 6 105 12 110 16 Z" /> {/* Hoa Tulip */}
    </svg>
  );
}

// 2. Khối đếm ngược thiết kế phẳng (Flat Design)
function CountdownBlock({ value, label }: { value: number; label: string }) {
  // Hàm padStart giúp số luôn hiển thị 2 chữ số (ví dụ: "05" thay vì "5")
  const formattedValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="font-display text-4xl font-bold tracking-wide text-[#4a4a4a] sm:text-5xl md:text-6xl">
        {formattedValue}
      </span>
      <span className="mb-1 mt-1 text-base font-bold text-[#4a4a4a] sm:text-lg">
        {label}
      </span>
      <FloralOrnament />
    </div>
  );
}

// 3. Component chính
export default function Countdown() {
  const { days, hours, minutes, seconds, isFinished } = useCountdown(
    siteConfig.graduationDateISO
  );

  return (
    <section
      id="countdown"
      className="relative flex flex-col items-center px-6 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="Đếm ngược"
        title={
          isFinished
            ? "Chúc Mừng Ngày Tốt Nghiệp!"
            : "Còn Bao Lâu Nữa Đến Ngày Trọng Đại"
        }
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mt-8 w-full max-w-3xl"
      >
        {!isFinished && (
          <div className="flex w-full items-center justify-between sm:justify-evenly gap-2 sm:gap-6">
            <motion.div variants={fadeUp}>
              <CountdownBlock value={days} label="Ngày" />
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <CountdownBlock value={hours} label="Giờ" />
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <CountdownBlock value={minutes} label="Phút" />
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <CountdownBlock value={seconds} label="Giây" />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Animation tung mũ nón lúc hoàn thành đếm ngược */}
      {isFinished && (
        <>
          <Confetti />
          <CapToss />
        </>
      )}
    </section>
  );
}