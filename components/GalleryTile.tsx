"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Expand } from "lucide-react";
import { GalleryImage } from "@/data/content";
import { fadeUp } from "@/animations/variants";

interface GalleryTileProps {
  image: GalleryImage;
  onOpen: () => void;
}

export default function GalleryTile({ image, onOpen }: GalleryTileProps) {
  // Logic xử lý độ nghiêng 3D (giữ nguyên từ code cũ của bạn)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig
  );

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.button
      variants={fadeUp} // Dùng fadeUp để đồng bộ với hiệu ứng xuất hiện của lưới ảnh
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }} // Tăng perspective lên 800 để độ nghiêng trông tự nhiên hơn
      // Cập nhật giao diện: Tỷ lệ 4:5 và góc bo tròn lớn (rounded-[1.5rem]) giống ảnh mẫu
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] shadow-sm will-change-transform sm:rounded-3xl"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        style={{ objectFit: "cover", objectPosition: image.position ?? "center" }}
        className="transition-transform duration-700 ease-out group-hover:scale-110"
      />
      
      {/* Lớp mờ và text Expand hiển thị khi hover */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-inkBrown/60 via-transparent to-transparent opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100">
        <span className="flex items-center gap-2 p-4 text-xs tracking-wider text-ivory drop-shadow-md sm:text-sm">
          <Expand size={14} /> {image.alt}
        </span>
      </div>
      
      {/* Vệt sáng lướt qua (Soft light sweep) cực kỳ tinh tế */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
    </motion.button>
  );
}