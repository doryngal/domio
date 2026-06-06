"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/77001234567?text=Привет! Хочу узнать про сайт для бизнеса";

// ─── Word reveal ──────────────────────────────────────────────────────────────
function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({
  target,
  suffix,
  duration = 1600,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let startTime: number | null = null;
          const animate = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return (
    <div ref={ref} className="font-display font-bold text-2xl md:text-3xl text-gold-gradient tracking-tight tabular-nums">
      {count}
      {suffix}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.04;
      current.current.y += (mouse.current.y - current.current.y) * 0.04;

      const dx = (current.current.x - 0.5) * 50;
      const dy = (current.current.y - 0.5) * 35;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-20% + ${dy}px))`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 lg:px-8 pt-24 pb-20"
    >
      {/* Parallax radial glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none will-change-transform"
        style={{
          top: "15%",
          left: "50%",
          width: "900px",
          height: "600px",
          transform: "translate(-50%, -20%)",
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />

      {/* Parallax grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Subtle vignette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0d0d0d, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#2a2a2a] bg-[#141414]/60 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse-gold" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            Казахстан · Быстро · Надёжно
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-black leading-none mb-8 max-w-5xl">
          <div className="text-[clamp(2.4rem,7vw,6.5rem)] text-[#f5f0e8] leading-[1.02] tracking-[-0.02em]">
            <RevealText text="Ваш бизнес" delay={2.5} />
          </div>
          <div className="text-[clamp(2.4rem,7vw,6.5rem)] text-[#f5f0e8] leading-[1.02] tracking-[-0.02em]">
            <RevealText text="заслуживает" delay={2.6} />
          </div>
          <div className="text-[clamp(2.4rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.02em]">
            <RevealText
              text="сильный сайт"
              className="text-gold-gradient-animated"
              delay={2.7}
            />
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#888880] text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-onest"
        >
          Создаём профессиональные сайты для малого бизнеса в Казахстане.
          Готово{" "}
          <span className="text-[#C9A84C]">за 1 день</span>, от{" "}
          <span className="text-[#C9A84C]">20 000 ₸</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold"
          >
            <MessageCircle size={20} />
            Написать в WhatsApp
          </a>
          <a
            href="#how"
            className="btn-outline-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
          >
            Как это работает
            <ArrowDown size={16} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="flex flex-wrap gap-10 mt-16 pt-8 border-t border-[#2a2a2a]"
        >
          {[
            { target: 50, suffix: "+", label: "Сайтов запущено" },
            { target: 1, suffix: " день", label: "Срок готовности" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <Counter target={stat.target} suffix={stat.suffix} duration={1800} />
              <div className="text-xs text-[#888880] tracking-wide font-onest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-[#2a2a2a] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2.5 rounded-full bg-[#C9A84C]" />
        </motion.div>
        <span className="text-[9px] text-[#888880]/40 tracking-[0.3em] uppercase font-onest">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
