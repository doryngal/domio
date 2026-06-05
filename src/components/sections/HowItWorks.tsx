"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Palette, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Обсуждаем задачу",
    description:
      "Вы пишете в WhatsApp. Мы узнаём о вашем бизнесе, целевой аудитории и целях. Никаких длинных брифов — всё просто.",
    detail: "~30 минут",
  },
  {
    number: "02",
    icon: Palette,
    title: "Создаём и дорабатываем",
    description:
      "Разрабатываем дизайн и верстаем сайт. Вы видите результат на каждом этапе и вносите правки до полного довольства.",
    detail: "1 день",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Запускаем и передаём",
    description:
      "Публикуем сайт, настраиваем домен и хостинг, передаём все доступы. Вы начинаете получать клиентов.",
    detail: "День запуска",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }

      // Stagger steps
      gsap.utils.toArray<HTMLElement>(".step-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="section-padding" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="gold-line mb-4" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
            Процесс
          </p>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-[#f5f0e8] tracking-tight leading-tight max-w-lg">
            Как это работает
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#2a2a2a] overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-[#C9A84C] to-[#C9A84C]/20"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 !== 0;

              return (
                <div
                  key={step.number}
                  className={`step-card flex flex-col lg:flex-row items-center gap-8 ${
                    isRight ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isRight ? "lg:text-right" : ""}`}>
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        isRight ? "lg:justify-end" : ""
                      }`}
                    >
                      <span className="text-xs font-bold tracking-[0.2em] text-[#C9A84C]/60 uppercase">
                        {step.detail}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-[1.85rem] font-bold text-[#f5f0e8] mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#888880] leading-relaxed text-base md:text-lg max-w-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center group hover:border-[#C9A84C]/40 transition-colors duration-300">
                      <div className="absolute inset-0 rounded-full bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon size={28} className="text-[#C9A84C]" strokeWidth={1.5} />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9A84C] text-[#0d0d0d] text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Number (desktop) */}
                  <div className={`flex-1 hidden lg:flex ${isRight ? "justify-start" : "justify-end"}`}>
                    <span className="font-display text-[8rem] font-black text-[#f5f0e8]/[0.035] leading-none select-none tracking-tighter">
                      {step.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
