"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/data/content";
import { fadeUp } from "@/animations/variants";

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center gap-4 px-6 py-16 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-terracottaRose text-ivory shadow-soft"
      >
        <GraduationCap size={22} />
      </motion.div>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-hand text-2xl text-terracottaRose"
      >
        Cảm ơn vì đã ghé thăm thiệp mời của {siteConfig.name}
      </motion.p>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-xs tracking-[0.2em] text-warmGray"
      >
        © {new Date().getFullYear()} — {siteConfig.eventTitle}
      </motion.p>
    </footer>
  );
}
