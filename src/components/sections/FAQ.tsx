"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Сколько времени займёт создание сайта?",
    a: "В среднем 5–7 рабочих дней. Срок зависит от количества страниц и скорости согласования с вашей стороны. Мы держим вас в курсе на каждом этапе.",
  },
  {
    q: "Нужен ли мне технический опыт?",
    a: "Нет. Вы просто описываете свой бизнес и цели. Всё остальное — дизайн, верстка, хостинг, домен — мы берём на себя.",
  },
  {
    q: "Что будет после того, как сайт запущен?",
    a: "30 дней бесплатной поддержки: правки, доработки, технические вопросы. После — по договорённости. Мы не бросаем клиентов после сдачи.",
  },
  {
    q: "Смогу ли я сам редактировать сайт?",
    a: "Да, если хотите. По запросу подключаем удобную CMS и обучаем вас работать с контентом. Но можно и оставить это нам.",
  },
  {
    q: "Что такое SEO-оптимизация и зачем она нужна?",
    a: "SEO помогает вашему сайту появляться в Google и Яндекс когда люди ищут ваши услуги. Мы настраиваем базовую оптимизацию — правильные заголовки, описания, скорость загрузки.",
  },
  {
    q: "Можно ли добавить онлайн-оплату?",
    a: "Да. Интегрируем Kaspi Pay, Click, Payme и другие платёжные системы. Стоимость обсуждается отдельно.",
  },
  {
    q: "Что если сайт меня не устроит?",
    a: "Включены 3 раунда правок. Если после них сайт всё ещё не устраивает, мы продолжаем доработку. Ваше одобрение — наш приоритет.",
  },
  {
    q: "Работаете ли вы по всему Казахстану?",
    a: "Да, работаем удалённо по всей стране — Алматы, Астана, Шымкент, Актобе и другие города. Всё общение через WhatsApp и видеозвонки.",
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`border-b border-[#2a2a2a] transition-colors duration-200 ${
        open ? "border-[#C9A84C]/20" : ""
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`font-semibold text-sm md:text-base transition-colors duration-200 ${
            open ? "text-[#C9A84C]" : "text-[#f5f0e8] group-hover:text-[#C9A84C]/80"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? "border-[#C9A84C] bg-[#C9A84C]/10 rotate-45"
              : "border-[#2a2a2a] group-hover:border-[#C9A84C]/40"
          }`}
        >
          <Plus size={12} className={open ? "text-[#C9A84C]" : "text-[#888880]"} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#888880] text-sm leading-relaxed pb-6">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="gold-line mb-4" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
              FAQ
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-[#f5f0e8] tracking-tight leading-tight mb-6">
              Частые<br />вопросы
            </h2>
            <p className="text-[#888880] text-sm leading-relaxed">
              Не нашли ответ? Напишите нам в WhatsApp — ответим в течение часа.
            </p>
          </motion.div>

          {/* Right: accordion */}
          <div className="lg:col-span-8">
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
