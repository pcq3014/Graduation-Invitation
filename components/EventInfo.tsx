"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Shirt, ArrowUp } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { eventInfo, siteConfig } from "@/data/content";
import { fadeUp, staggerContainer, scaleIn } from "@/animations/variants";
import SectionHeading from "./SectionHeading";
import GraduationCalendar from "./GraduationCalendar";

const infoRows = [
  { icon: CalendarDays, label: "Ngày", value: eventInfo.date },
  { icon: Clock, label: "Thời gian", value: eventInfo.time },
  { icon: MapPin, label: "Địa điểm", value: `${eventInfo.venue} — ${eventInfo.address}` },
  { icon: Shirt, label: "Trang phục", value: eventInfo.dressCode },
];

export default function EventInfo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section id="event" className="relative px-6 py-28">
        <SectionHeading eyebrow="Thông tin buổi lễ" title="Trân Trọng Kính Mời" />

        {/* Hiển thị Lịch Visual */}
    

        <div className="mx-auto mt-12 grid max-w-4xl gap-10 lg:gap-14 sm:grid-cols-2">
          {/* Cột trái: Thông tin chi tiết */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="glass-panel flex flex-col gap-6 rounded-[2.5rem] p-8 shadow-glass sm:p-10"
          >
            <div className="flex flex-col gap-7">
              {infoRows.map((row) => (
                <motion.div key={row.label} variants={fadeUp} className="group flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-champagne/20 to-terracottaRose/20 text-inkBrown shadow-sm ring-1 ring-white/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-champagne/40 group-hover:shadow-soft">
                    <row.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="eyebrow mb-1 text-[0.65rem] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                      {row.label}
                    </p>
                    <p className="font-display text-base font-medium text-inkBrown sm:text-lg leading-tight">
                      {row.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-3">
              <a
                href={eventInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-inkBrown px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <MapPin size={16} /> Xem bản đồ
              </a>
            </motion.div>
          </motion.div>

          {/* Cột phải: Bản đồ và QR Code */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="group relative h-64 overflow-hidden rounded-[2.5rem] border-[6px] border-white/60 shadow-glass transition-colors duration-500 hover:border-white sm:h-72">
              <iframe
                title="Bản đồ địa điểm tổ chức"
                src={eventInfo.mapEmbedUrl}
                className="h-full w-full border-0 grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-champagne/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>

            <div className="glass-panel flex flex-col items-center justify-center gap-5 rounded-[2rem] p-6 shadow-soft sm:flex-row sm:gap-6 sm:p-7">
              <div className="shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-transform duration-500 hover:scale-105">
                <QRCodeSVG
                  value={siteConfig.siteUrl}
                  size={110}
                  level="H"
                  fgColor="#5C4B51"
                  bgColor="#ffffff"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="eyebrow mb-2">Lưu lại thiệp mời</p>
                <p className="text-xs leading-relaxed text-warmGray">
                  Quét mã QR bằng camera điện thoại để mở trực tiếp trang web này và dễ dàng theo dõi thông tin buổi lễ.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nút Lên đầu trang đặt ngoài section */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-inkBrown text-ivory shadow-lg transition-transform hover:scale-110 sm:bottom-10 sm:right-10"
        aria-label="Lên đầu trang"
      >
        <ArrowUp size={20} />
      </motion.button>
    </>
  );
}