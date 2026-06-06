"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, Zap, ShieldCheck } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/87474387417?text=Привет! Хочу заказать сайт за 20 000 ₸";

const included = [
  "Дизайн под ваш бренд",
  "До 5 страниц / разделов",
  "Мобильная адаптация",
  "SEO-оптимизация",
  "SSL-сертификат",
  "Домен .kz на год",
  "Хостинг на 1 год",
  "3 раунда правок",
  "Поддержка 30 дней",
  "Подключение аналитики",
];

export default function Pricing() {
  return (
    <section id="price" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="gold-line mb-4" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
            Стоимость
          </p>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-[#f5f0e8] tracking-tight leading-tight">
            Прозрачная цена
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Main price card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 md:p-10 overflow-hidden"
          >
            {/* Gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#C9A84C]/8 blur-3xl pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-3 py-1">
              <Zap size={12} className="text-[#C9A84C]" />
              <span className="text-xs font-semibold text-[#C9A84C]">Популярный</span>
            </div>

            <div className="relative z-10">
              <p className="text-[#888880] text-sm mb-2">Стартовый сайт</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-[clamp(3.2rem,6.5vw,5rem)] font-black text-gold-gradient leading-none tracking-tight">
                  20 000
                </span>
                <span className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#C9A84C]">₸</span>
              </div>
              <p className="text-[#888880] text-sm mb-8">
                Единоразово · Без скрытых платежей
              </p>

              {/* CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base mb-8"
              >
                <MessageCircle size={20} />
                Заказать сайт
              </a>

              {/* What's included */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C9A84C]/15 flex items-center justify-center">
                      <Check size={11} className="text-[#C9A84C]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[#888880]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Why this price */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
              <h3 className="font-bold text-[#f5f0e8] mb-2">Почему такая цена?</h3>
              <p className="text-[#888880] text-sm leading-relaxed">
                Мы не агентство с десятками менеджеров. Небольшая команда специалистов
                работает напрямую с вами — без накруток и лишних звеньев.
                Вы платите за результат, а не за аренду офиса.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
              <h3 className="font-bold text-[#f5f0e8] mb-2">Что если нужно больше?</h3>
              <p className="text-[#888880] text-sm leading-relaxed">
                Интернет-магазин, личный кабинет, интеграция CRM — всё это
                обсуждается индивидуально. Напишите, расскажем стоимость.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
              <h3 className="font-bold text-[#f5f0e8] mb-2">Как оплатить?</h3>
              <p className="text-[#888880] text-sm leading-relaxed">
                Kaspi Pay, банковский перевод, наличные. Оплата 50% до начала,
                50% после финального согласования.
              </p>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-br from-[#C9A84C]/10 to-transparent border border-[#C9A84C]/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center mt-0.5">
                  <ShieldCheck size={18} className="text-[#C9A84C]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-[#f5f0e8] mb-1">Гарантия результата</h3>
                  <p className="text-[#888880] text-sm leading-relaxed">
                    Если сайт не понравится — дорабатываем до вашего одобрения.
                    Ваши деньги в безопасности.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
