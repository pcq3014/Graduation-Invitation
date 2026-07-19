"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { timelineItems } from "@/data/content";
import { slideFromLeft, slideFromRight } from "@/animations/variants";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  return (
    <section id="timeline" className="relative px-6 py-28">
      <SectionHeading eyebrow="Hành trình" title="Ba Năm Thanh Xuân Đáng Nhớ" />

      <div className="relative mx-auto max-w-3xl">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-champagne/10 via-champagne/50 to-champagne/10 sm:block" />
        <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-champagne/10 via-champagne/50 to-champagne/10 sm:hidden" />

        <div className="flex flex-col gap-14">
          {timelineItems.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={item.id}
                className="relative flex flex-col gap-4 pl-12 sm:grid sm:grid-cols-2 sm:gap-8 sm:pl-0"
              >
                {/* Node */}
                <div className="absolute left-4 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                  <div className="glow-ring flex h-8 w-8 items-center justify-center rounded-full bg-ivory shadow-glass ring-2 ring-champagne">
                    <GraduationCap size={14} className="text-champagne" />
                  </div>
                </div>

                {isLeft ? (
                  <>
                    <motion.div
                      variants={slideFromLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      className="glass-panel rounded-3xl p-6 shadow-soft sm:text-right"
                    >
                      <TimelineCardContent item={item} />
                    </motion.div>
                    <div className="hidden sm:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden sm:block" />
                    <motion.div
                      variants={slideFromRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      className="glass-panel rounded-3xl p-6 shadow-soft"
                    >
                      <TimelineCardContent item={item} />
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineCardContent({
  item,
}: {
  item: (typeof timelineItems)[number];
}) {
  return (
    <>
      <span className="font-hand text-2xl text-terracottaRose">
        {item.year}
      </span>
      <h3 className="mb-2 mt-1 font-display text-lg text-inkBrown">
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed text-warmGray">
        {item.description}
      </p>
    </>
  );
}
