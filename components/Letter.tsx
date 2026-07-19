"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { letterContent, heroContent } from "@/data/content";
import { fadeUp, staggerContainer } from "@/animations/variants";
import SectionHeading from "./SectionHeading";

export default function Letter() {
  return (
    <section id="letter" className="relative px-6 py-28">
      <SectionHeading eyebrow="Đôi lời gửi gắm" title={letterContent.title} />

      <div className="relative mx-auto mt-10 max-w-2xl">
        {/* Bóng đổ mềm cho toàn bộ khung thư */}
        <div className="absolute inset-x-4 -bottom-3 -z-10 h-full rounded-[2.5rem] bg-terracottaRose/15 blur-md" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] border border-white/60 bg-[#FCFAF6] p-8 pt-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-14 sm:pt-16"
        >
          {/* LỚP NỀN VÂN CHẤM BI (DOTTED GRID) */}
          <div 
            className="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] opacity-[0.15] mix-blend-multiply" 
            style={{ 
              backgroundImage: 'radial-gradient(#8c7b70 1.5px, transparent 1.5px)', 
              backgroundSize: '12px 12px' 
            }} 
          />

          {/* CON DẤU SÁP Ở MÉP TRÊN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -top-8 left-0 right-0 z-20 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#A46767] shadow-sm ring-[6px] ring-white sm:-top-9 sm:h-18 sm:w-18"
          >
            <span className="font-display text-2xl drop-shadow-sm">💌</span>
          </motion.div>

          {/* ẢNH CHÂN DUNG KHUNG VÀNG 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="relative z-10 float-right ml-6 mb-2 mt-2 h-[8.5rem] w-[8.5rem] sm:h-44 sm:w-44"
          >
            {/* Viền vàng 3D vòng ngoài */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFF2CD] via-[#FFD700] to-[#DAA520] p-[3px] shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              {/* Vòng đệm đen/xám mỏng */}
              <div className="h-full w-full rounded-full bg-[#1a1a1a] p-[3px]">
                {/* Viền vàng mỏng vòng trong */}
                <div className="relative h-full w-full overflow-hidden rounded-full border-[2px] border-[#FFD700]">
                  <Image
                    src={heroContent.heroImage}
                    alt={heroContent.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 144px, 176px"
                  />
                </div>
              </div>
            </div>

            {/* Icon Mũ Tốt Nghiệp Nghiêng Ở Góc (Đã chỉnh lại tọa độ) */}
            <motion.div
              initial={{ scale: 0, rotate: 30 }}
              whileInView={{ scale: 1, rotate: -15 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 12 }}
              // Rút tọa độ lại gần khung hơn (-left-1 và -top-3 thay vì -5)
              className="absolute -left-1 -top-3 z-20 flex h-16 w-16 items-center justify-center drop-shadow-xl sm:-left-2 sm:-top-3 sm:h-20 sm:w-20"
            >
              {/* Xóa class absolute và thêm leading-none để emoji được căn giữa tuyệt đối */}
              
              <Image
                src="/assets/images/gold-cap.png"
                alt="Mũ Vàng"
                fill
                className="relative z-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'; 
                }}
              />
            </motion.div>
          </motion.div>

          {/* NỘI DUNG VÀ CHỮ KÝ */}
          <motion.div
            variants={staggerContainer(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 font-hand text-[1.25rem] leading-[2] text-[#5A534E] sm:text-2xl sm:leading-[2.2]"
          >
            {letterContent.paragraphs.map((para, i) => (
              <motion.p key={i} variants={fadeUp} className="mb-5 indent-10 text-justify">
                {para}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 mt-8 flex flex-col items-end pt-4"
          >
            <p className="font-hand text-3xl font-bold text-[#A46767] sm:text-4xl">
              {letterContent.signature}
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}