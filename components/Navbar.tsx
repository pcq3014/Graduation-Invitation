"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navSections } from "@/data/content";
import { useAppState } from "@/hooks/useAppState";
import Monogram from "@/components/Monogram";

export default function Navbar() {
  const { isCardOpened } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(id: string) {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  if (!isCardOpened) return null;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass-panel shadow-glass" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => handleNavClick("hero")} aria-label="Về đầu trang">
          <Monogram size="sm" />
        </button>

        <ul className="hidden gap-8 text-sm text-inkBrown/80 sm:flex">
          {navSections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleNavClick(s.id)}
                className="transition-colors hover:text-champagne"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="text-inkBrown sm:hidden"
          aria-label="Mở menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-panel flex flex-col gap-1 px-6 pb-4 sm:hidden"
        >
          {navSections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleNavClick(s.id)}
                className="w-full py-2 text-left text-sm text-inkBrown/80"
              >
                {s.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}