"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Shirt } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { eventInfo, siteConfig } from "@/data/content";
import { fadeUp, staggerContainer, scaleIn } from "@/animations/variants";

const infoRows = [
  { icon: CalendarDays, label: "Ngày", value: eventInfo.date },
  { icon: Clock, label: "Thời gian", value: eventInfo.time },
  { icon: MapPin, label: "Địa điểm", value: `${eventInfo.venue} — ${eventInfo.address}` },
  { icon: Shirt, label: "Trang phục", value: eventInfo.dressCode },
];

export default function EventInfo() {
  return (
    <section id="event" className="relative px-6 py-28">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="eyebrow mb-3 text-center"
      >
        Thông tin buổi lễ
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="mb-14 text-center font-display text-3xl text-inkBrown sm:text-4xl"
      >
        Trân Trọng Kính Mời
      </motion.h2>

      <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-panel flex flex-col gap-6 rounded-3xl p-8 shadow-soft"
        >
          {infoRows.map((row) => (
            <motion.div key={row.label} variants={fadeUp} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-champagne/30 to-terracottaRose/30 text-inkBrown">
                <row.icon size={18} />
              </div>
              <div>
                <p className="eyebrow mb-1">{row.label}</p>
                <p className="font-display text-base text-inkBrown">{row.value}</p>
              </div>
            </motion.div>
          ))}

          <motion.a
            variants={fadeUp}
            href={eventInfo.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-inkBrown px-6 py-3 text-sm text-ivory transition-transform hover:scale-105"
          >
            <MapPin size={15} /> Xem trên Google Maps
          </motion.a>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="relative h-56 overflow-hidden rounded-3xl shadow-soft sm:h-64">
            <iframe
              title="Bản đồ địa điểm tổ chức"
              src={eventInfo.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-6 shadow-soft">
            <p className="eyebrow">Quét mã để lưu thiệp</p>
            <div className="rounded-2xl bg-ivory p-3 shadow-glass">
              <QRCodeSVG
                value={siteConfig.siteUrl}
                size={128}
                fgColor="#5C4B51"
                bgColor="#FFFDF8"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
