"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Utensils, Sparkles, HardHat, BookOpen, Dumbbell } from "lucide-react";

const cases = [
  {
    client: "Кулинария «Дастархан»",
    category: "Кафе / Ресторан",
    result: "+340% заявок онлайн",
    description:
      "Домашняя кухня из Алматы. Сделали сайт с меню, галереей и формой доставки. Через неделю после запуска — поток заявок вырос в 4 раза.",
    color: "#C9A84C",
    Icon: Utensils,
  },
  {
    client: "Студия красоты «Silk»",
    category: "Красота / Здоровье",
    result: "Запись онлайн 24/7",
    description:
      "Небольшой салон в Астане. Подключили онлайн-запись, страницы мастеров и портфолио работ. Администратор разгружен на 60%.",
    color: "#9B8AE0",
    Icon: Sparkles,
  },
  {
    client: "ИП «Строй-КЗ»",
    category: "Строительство",
    result: "Выход в Google Топ-3",
    description:
      "Небольшая бригада отделочников. Создали продающий сайт с кейсами и расчётом стоимости. Вышли в топ по запросу в городе.",
    color: "#5AB5A0",
    Icon: HardHat,
  },
  {
    client: "Школа «ProEnglish»",
    category: "Образование",
    result: "120 заявок в 1й месяц",
    description:
      "Частная школа английского. Разработали лендинг с расписанием, ценами и отзывами. Рекордный набор в сентябре.",
    color: "#E07B6A",
    Icon: BookOpen,
  },
  {
    client: "Магазин «GymShop»",
    category: "Спорттовары",
    result: "Продажи с сайта ×3",
    description:
      "Продажа спортивного питания. Каталог с фильтрами, корзина, Kaspi-оплата. Магазин работает без менеджеров.",
    color: "#4A9EE0",
    Icon: Dumbbell,
  },
];

export default function Cases() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="cases" className="section-padding bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 px-0"
        >
          <span className="gold-line mb-4" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
            Кейсы
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-[#f5f0e8] tracking-tight leading-tight">
              Результаты<br />наших клиентов
            </h2>
            <p className="text-[#888880] text-sm max-w-xs">
              Листайте вправо — реальные проекты из Казахстана.
            </p>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="horizontal-scroll flex gap-5 overflow-x-auto pb-6 -mx-6 px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin" }}
        >
          {cases.map((c, i) => {
            const Icon = c.Icon;
            return (
              <motion.div
                key={c.client}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-none w-[300px] md:w-[360px] snap-start"
              >
                <div className="group h-full bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 md:p-7 cursor-default hover:border-[#2a2a2a]/60 transition-all duration-300 flex flex-col gap-5 relative overflow-hidden">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                    style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                    style={{ background: c.color }}
                  />

                  {/* Icon + category */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${c.color}18` }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        style={{ color: c.color }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{
                        color: c.color,
                        borderColor: `${c.color}30`,
                        background: `${c.color}10`,
                      }}
                    >
                      {c.category}
                    </span>
                  </div>

                  {/* Result */}
                  <div>
                    <div
                      className="font-display text-lg md:text-xl font-bold mb-1 tracking-tight"
                      style={{ color: c.color }}
                    >
                      {c.result}
                    </div>
                    <h3 className="font-semibold text-[#f5f0e8] text-sm">
                      {c.client}
                    </h3>
                  </div>

                  <p className="text-[#888880] text-sm leading-relaxed flex-1">
                    {c.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[#888880] group-hover:text-[#C9A84C] transition-colors duration-300">
                    <span>Подробнее</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
