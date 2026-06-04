"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Search,
  Gauge,
  Lock,
  Globe,
  Headphones,
  PenTool,
  BarChart2,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Мобильная версия",
    description: "Идеально выглядит на телефоне, планшете и компьютере.",
  },
  {
    icon: Search,
    title: "SEO-оптимизация",
    description: "Мета-теги, заголовки и скорость для лидерства в поиске.",
  },
  {
    icon: Gauge,
    title: "Быстрая загрузка",
    description: "PageSpeed 90+. Клиенты не уходят пока ждут.",
  },
  {
    icon: Lock,
    title: "SSL-сертификат",
    description: "HTTPS и защита данных из коробки. Бесплатно.",
  },
  {
    icon: Globe,
    title: "Домен и хостинг",
    description: "Помогаем выбрать домен. Хостинг на год в подарок.",
  },
  {
    icon: Headphones,
    title: "Поддержка 30 дней",
    description: "После запуска решаем все вопросы. Вы не одни.",
  },
  {
    icon: PenTool,
    title: "Уникальный дизайн",
    description: "Не шаблон — разрабатываем под ваш бренд и аудиторию.",
  },
  {
    icon: BarChart2,
    title: "Аналитика",
    description: "Подключаем Google Analytics и Яндекс.Метрику.",
  },
];

// ─── 3-D tilt card ────────────────────────────────────────────────────────────
function TiltCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(6px)`;

    // Move shine spot to cursor position
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(201,168,76,0.12) 0%, transparent 65%)`;
    }
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 h-full overflow-hidden"
        style={{
          transition:
            "transform 0.18s ease, box-shadow 0.35s ease",
          willChange: "transform",
        }}
      >
        {/* Dynamic cursor-following glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        />

        {/* Top shimmer line on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Hover box-shadow glow (applied via parent, not inline since it's CSS) */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ boxShadow: "inset 0 0 30px rgba(201,168,76,0.05)" }}
        />

        {children}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section id="features" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="gold-line mb-4" />
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] mb-4">
              Комплектация
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-[#f5f0e8] tracking-tight leading-tight">
              Что входит<br />в каждый сайт
            </h2>
          </div>
          <p className="text-[#888880] max-w-xs text-sm leading-relaxed font-onest">
            Всё необходимое для старта — без скрытых доплат и бесконечных
            надстроек.
          </p>
        </motion.div>

        {/* Grid with stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <TiltCard key={feature.title} delay={i * 0.07}>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-5 group-hover:bg-[#C9A84C]/18 transition-colors duration-300">
                    <Icon
                      size={20}
                      className="text-[#C9A84C]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-semibold text-[#f5f0e8] mb-2 text-sm md:text-base tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[#888880] text-sm leading-relaxed font-onest">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
