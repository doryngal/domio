"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL =
  "https://wa.me/87474387417?text=Привет! Хочу заказать сайт для бизнеса";

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1.2,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated glow */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #C9A84C 0px, transparent 1px, transparent 80px)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C9A84C]">
              Готовы начать?
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-black text-[#f5f0e8] tracking-tight leading-tight mb-6">
            Ваш сайт будет готов
            <br />
            <span className="text-gold-gradient-animated">за 1 день</span>
          </h2>

          <p className="text-[#888880] text-lg max-w-lg mx-auto leading-relaxed mb-10">
            Напишите нам прямо сейчас — обсудим ваш проект и расскажем всё без лишних слов.
          </p>

          {/* CTA */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold shadow-lg"
          >
            <MessageCircle size={22} />
            Написать в WhatsApp
          </motion.a>

          <p className="text-[#888880]/60 text-xs mt-6 tracking-wide">
            Отвечаем в течение 1 часа · Казахстан
          </p>
        </motion.div>
      </div>
    </section>
  );
}
