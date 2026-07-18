"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { galleryImages } from "@/data/content";
import { fadeUp, staggerContainer, scaleIn } from "@/animations/variants";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function close() {
    setActiveIndex(null);
  }
  function next() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % galleryImages.length);
  }
  function prev() {
    if (activeIndex === null) return;
    setActiveIndex(
      (activeIndex - 1 + galleryImages.length) % galleryImages.length
    );
  }

  return (
    <section id="gallery" className="relative px-6 py-28">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="eyebrow mb-3 text-center"
      >
        Kỷ niệm
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="mb-14 text-center font-display text-3xl text-inkBrown sm:text-4xl"
      >
        Thư Viện Ảnh
      </motion.h2>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {galleryImages.map((img, i) => (
          <motion.button
            key={img.id}
            variants={scaleIn}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-inkBrown/50 via-transparent to-transparent opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex items-center gap-2 p-3 text-xs text-ivory">
                <Expand size={13} /> {img.alt}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-inkBrown/80 p-6 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Đóng"
              className="absolute right-6 top-6 text-ivory/80 transition-colors hover:text-ivory"
            >
              <X size={26} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Ảnh trước"
              className="absolute left-4 text-ivory/80 transition-colors hover:text-ivory sm:left-8"
            >
              <ChevronLeft size={30} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[70vh] w-[90vw] max-w-2xl overflow-hidden rounded-3xl"
            >
              <Image
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Ảnh sau"
              className="absolute right-4 text-ivory/80 transition-colors hover:text-ivory sm:right-8"
            >
              <ChevronRight size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
