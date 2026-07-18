"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { letterContent, heroContent } from "@/data/content";
import { fadeUp, staggerContainer } from "@/animations/variants";

export default function Letter() {
  return (
    <section id="letter" className="relative px-6 py-28">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="eyebrow mb-3 text-center"
      >
        Đôi lời gửi gắm
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="mb-14 text-center font-display text-3xl text-inkBrown sm:text-4xl"
      >
        {letterContent.title}
      </motion.h2>

      <div className="relative mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="paper-texture relative rounded-[2rem] border border-champagne/20 p-8 shadow-soft sm:p-14"
        >
          <div className="relative float-right ml-4 mb-4 h-20 w-20 overflow-hidden rounded-2xl border-2 border-champagne/40 shadow-glass sm:h-24 sm:w-24">
            <Image
              src={heroContent.heroImage}
              alt={heroContent.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <motion.div
            variants={staggerContainer(0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="font-hand text-xl leading-loose text-inkBrown sm:text-2xl"
          >
            {letterContent.paragraphs.map((para, i) => (
              <motion.p key={i} variants={fadeUp} className="mb-5">
                {para}
              </motion.p>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 text-right font-hand text-2xl text-terracottaRose sm:text-3xl"
          >
            {letterContent.signature}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
