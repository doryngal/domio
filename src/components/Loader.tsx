"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "domio".split("");

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Delay body scroll until loader is gone
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="fixed inset-0 z-[99999] bg-[#0d0d0d] flex flex-col items-center justify-center select-none"
        >
          {/* Grain overlay inside loader */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Wordmark — chars reveal up */}
          <div className="overflow-hidden flex">
            {CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-black text-gold-gradient-animated"
                style={{ fontSize: "clamp(4rem, 12vw, 9rem)", display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative mt-8 w-40 h-px bg-[#2a2a2a] overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A84C] to-[#E2C880]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left", right: 0 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
            className="mt-5 text-[#888880] text-[10px] tracking-[0.35em] uppercase font-onest"
          >
            Сайты для бизнеса · Казахстан
          </motion.p>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-[#2a2a2a]" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-[#2a2a2a]" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-[#2a2a2a]" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-[#2a2a2a]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
