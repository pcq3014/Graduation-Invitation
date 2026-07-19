"use client";

import { motion } from "framer-motion";

export default function GraduationCalendar() {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const targetDate = 18;
  // Tháng 08/2026 bắt đầu vào Thứ Bảy -> 5 ô trống trước ngày 1 (T2=0 ... T7=5, CN=6)
  const firstDayOffset = 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mt-10 w-full max-w-[640px] rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-[0_8px_40px_-8px_rgba(180,120,110,0.25)] backdrop-blur-md sm:p-12"
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="text-[15px] font-semibold uppercase tracking-[0.25em] text-terracottaRose/70">
          Lễ Tốt Nghiệp
        </span>
        <h4 className="mt-1 font-display text-3xl text-inkBrown sm:text-4xl">Tháng 08 / 2026</h4>
        <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-terracottaRose/60 to-transparent" />
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 text-center sm:gap-3">
        {days.map((d) => (
          <div
            key={d}
            className={`pb-3 text-sm font-bold tracking-wide ${
              d === "CN" ? "text-terracottaRose/70" : "text-inkBrown/50"
            }`}
          >
            {d}
          </div>
        ))}

        {/* Empty leading cells */}
        {Array.from({ length: firstDayOffset }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days of month */}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
          const isTarget = date === targetDate;
          const isSunday = (date + firstDayOffset) % 7 === 0;
          return (
            <div key={date} className="flex items-center justify-center py-0.5">
              {isTarget ? (
                <motion.div
                  initial={{ scale: 0.85 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.2 }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-terracottaRose text-base font-bold text-white shadow-[0_4px_14px_-2px_rgba(199,110,95,0.6)] ring-4 ring-terracottaRose/20"
                >
                  {date}
                  <span className="absolute -top-2 -right-2 text-sm">🎓</span>
                </motion.div>
              ) : (
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-base transition-colors hover:bg-white/60 ${
                    isSunday ? "text-terracottaRose/60" : "text-inkBrown/80"
                  }`}
                >
                  {date}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-inkBrown/60">
        <span className="h-px w-6 bg-inkBrown/20" />
        <span>Ngày {targetDate} tháng 08</span>
        <span className="h-px w-6 bg-inkBrown/20" />
      </div>
    </motion.div>
  );
}