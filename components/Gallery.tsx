"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/data/content";
import { staggerContainer } from "@/animations/variants";
import SectionHeading from "./SectionHeading";
import GalleryTile from "./GalleryTile";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => 
      current === null ? null : (current + 1) % galleryImages.length
    );
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((current) => 
      current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeIndex, close, next, prev]);

  return (
    <section id="gallery" className="relative px-6 py-28">
      <SectionHeading eyebrow="Kỷ niệm" title="Thư Viện Ảnh" />

      {/* Lưới ảnh (Grid) - Khoảng cách và max-width được tinh chỉnh để giống ảnh mẫu */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto mt-10 grid max-w-[56rem] grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
      >
        {galleryImages.map((img, i) => (
          <GalleryTile
            key={img.id}
            image={img}
            onOpen={() => setActiveIndex(i)}
          />
        ))}
      </motion.div>

      {/* TRÌNH XEM ẢNH (LIGHTBOX) ĐƯỢC THIẾT KẾ LẠI */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
            onClick={close}
          >
            {/* Bộ đếm ảnh (Ví dụ: 1 / 6) */}
            <div className="absolute left-6 top-6 z-20 font-display text-sm tracking-widest text-white/70">
              {activeIndex + 1} / {galleryImages.length}
            </div>

            {/* Nút Đóng */}
            <button
              onClick={close}
              aria-label="Đóng"
              className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
            >
              <X size={24} />
            </button>
            
            {/* Nút Trước */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Ảnh trước"
              className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 sm:left-10 sm:h-14 sm:w-14"
            >
              <ChevronLeft size={28} className="mr-1" />
            </button>

            {/* Khung chứa ảnh phóng to */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] w-[90vw] max-w-5xl items-center justify-center"
            >
              <Image
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 1024px"
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Nút Sau */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Ảnh sau"
              className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 sm:right-10 sm:h-14 sm:w-14"
            >
              <ChevronRight size={28} className="ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}