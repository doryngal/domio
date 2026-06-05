"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Search, Star, Package,
  BarChart2, Settings, ChevronRight,
  Plus, Minus, MessageCircle, Check,
} from "lucide-react";

// ─── Demo data ────────────────────────────────────────────────────────────────
const CATEGORIES = ["Все", "Одежда", "Обувь", "Аксессуары"];

const PRODUCTS = [
  { id: 1, name: "Худи оверсайз", price: 12900, category: "Одежда", emoji: "👕", tag: "Хит" },
  { id: 2, name: "Nike Air Max 90", price: 54900, category: "Обувь", emoji: "👟", tag: null },
  { id: 3, name: "Сумка кожаная", price: 28500, category: "Аксессуары", emoji: "👜", tag: "Новинка" },
  { id: 4, name: "Платье летнее", price: 15900, category: "Одежда", emoji: "👗", tag: null },
  { id: 5, name: "Jordan 1 Retro", price: 69900, category: "Обувь", emoji: "👟", tag: "Лимитед" },
  { id: 6, name: "Очки Ray-Ban", price: 22000, category: "Аксессуары", emoji: "🕶️", tag: null },
];

const TABS = [
  { id: "store", label: "Витрина", icon: Package },
  { id: "cart",  label: "Корзина", icon: ShoppingCart },
  { id: "dash",  label: "Дашборд", icon: BarChart2 },
];

// ─── Storefront preview ───────────────────────────────────────────────────────
function StorefrontPreview() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartIds, setCartIds] = useState<number[]>([]);

  const filtered = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const toggle = (id: number) =>
    setCartIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="flex flex-col h-full">
      {/* Shop header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
        <div>
          <div className="text-sm font-bold text-[#f5f0e8]">Fashion KZ</div>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={10} className="text-[#C9A84C] fill-[#C9A84C]" />
            <span className="text-[10px] text-[#888880]">4.9 · Алматы</span>
          </div>
        </div>
        <button className="relative p-1.5 rounded-lg bg-[#C9A84C]/10">
          <ShoppingCart size={14} className="text-[#C9A84C]" />
          {cartIds.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] rounded-full text-[#0d0d0d] text-[9px] font-black flex items-center justify-center">
              {cartIds.length}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-2.5 py-1.5 border border-[#2a2a2a]">
          <Search size={11} className="text-[#888880]" />
          <span className="text-[11px] text-[#888880]">Поиск товаров...</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 px-3 pb-2 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-none text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#C9A84C] text-[#0d0d0d]"
                : "bg-[#1a1a1a] text-[#888880] border border-[#2a2a2a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((p) => {
            const inCart = cartIds.includes(p.id);
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a] cursor-pointer"
              >
                {/* Product image placeholder */}
                <div className="aspect-square bg-[#222] flex items-center justify-center relative">
                  <span className="text-3xl">{p.emoji}</span>
                  {p.tag && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#C9A84C] text-[#0d0d0d]">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-[#f5f0e8] truncate">{p.name}</div>
                  <div className="text-[10px] text-[#C9A84C] font-bold mt-0.5">
                    {p.price.toLocaleString("ru")} ₸
                  </div>
                  <button
                    onClick={() => toggle(p.id)}
                    className={`mt-1.5 w-full text-[10px] font-bold py-1 rounded-lg transition-all cursor-pointer ${
                      inCart
                        ? "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/40"
                        : "bg-[#C9A84C] text-[#0d0d0d]"
                    }`}
                  >
                    {inCart ? "✓ В корзине" : "В корзину"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Cart preview ─────────────────────────────────────────────────────────────
function CartPreview() {
  const initial = [
    { ...PRODUCTS[0], qty: 1 },
    { ...PRODUCTS[2], qty: 2 },
    { ...PRODUCTS[3], qty: 1 },
  ];
  const [items, setItems] = useState(initial);

  const update = (id: number, delta: number) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a2a]">
        <ShoppingCart size={14} className="text-[#C9A84C]" />
        <span className="text-sm font-bold text-[#f5f0e8]">Корзина</span>
        <span className="ml-auto text-[10px] text-[#888880]">{items.length} товара</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, height: 0 }}
              className="flex items-center gap-2.5 bg-[#1a1a1a] rounded-xl p-2.5 border border-[#2a2a2a]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#222] flex items-center justify-center text-xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-[#f5f0e8] truncate">{item.name}</div>
                <div className="text-[10px] text-[#C9A84C] font-bold">
                  {(item.price * item.qty).toLocaleString("ru")} ₸
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => update(item.id, -1)}
                  className="w-5 h-5 rounded-md bg-[#2a2a2a] flex items-center justify-center cursor-pointer hover:bg-[#333]"
                >
                  <Minus size={8} className="text-[#888880]" />
                </button>
                <span className="text-[11px] font-bold text-[#f5f0e8] w-4 text-center">{item.qty}</span>
                <button
                  onClick={() => update(item.id, 1)}
                  className="w-5 h-5 rounded-md bg-[#2a2a2a] flex items-center justify-center cursor-pointer hover:bg-[#333]"
                >
                  <Plus size={8} className="text-[#888880]" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-3 pb-3 pt-2 border-t border-[#2a2a2a]">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[11px] text-[#888880]">Итого</span>
          <span className="text-sm font-bold text-[#f5f0e8]">{total.toLocaleString("ru")} ₸</span>
        </div>
        <button className="w-full bg-[#25D366] text-white text-[11px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          <MessageCircle size={13} />
          Заказать в WhatsApp
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard preview ────────────────────────────────────────────────────────
const STATS = [
  { label: "Просмотры", value: "1 240", delta: "+18%" },
  { label: "Корзин", value: "87", delta: "+24%" },
  { label: "Заказы WA", value: "34", delta: "+12%" },
  { label: "Конверсия", value: "2.7%", delta: "+0.4pp" },
];

const TOP = [
  { name: "Nike Air Max 90", views: 312, emoji: "👟" },
  { name: "Худи оверсайз",   views: 198, emoji: "👕" },
  { name: "Сумка кожаная",   views: 143, emoji: "👜" },
];

function DashboardPreview() {
  return (
    <div className="flex h-full">
      {/* Mini sidebar */}
      <div className="w-9 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col items-center py-3 gap-3">
        {[BarChart2, Package, ShoppingCart, Settings].map((Icon, i) => (
          <button
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer ${
              i === 0 ? "bg-[#C9A84C]/15" : "hover:bg-[#1a1a1a]"
            }`}
          >
            <Icon size={13} className={i === 0 ? "text-[#C9A84C]" : "text-[#888880]"} />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="text-xs font-bold text-[#f5f0e8]">Обзор · сегодня</div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-1.5">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-2.5 border border-[#2a2a2a]">
              <div className="text-[9px] text-[#888880] uppercase tracking-wide">{s.label}</div>
              <div className="text-sm font-black text-[#f5f0e8] mt-0.5">{s.value}</div>
              <div className="text-[9px] text-emerald-400 font-semibold">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Bar chart sketch */}
        <div className="bg-[#1a1a1a] rounded-xl p-2.5 border border-[#2a2a2a]">
          <div className="text-[9px] text-[#888880] mb-2">Просмотры витрины</div>
          <div className="flex items-end gap-1 h-10">
            {[30, 55, 40, 70, 85, 60, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: i === 6
                    ? "#C9A84C"
                    : `rgba(201,168,76,${0.15 + i * 0.06})`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map((d) => (
              <span key={d} className="flex-1 text-center text-[8px] text-[#888880]">{d}</span>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-[#1a1a1a] rounded-xl p-2.5 border border-[#2a2a2a]">
          <div className="text-[9px] text-[#888880] mb-2">Топ товаров</div>
          <div className="space-y-1.5">
            {TOP.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="text-xs">{p.emoji}</span>
                <span className="text-[10px] text-[#f5f0e8] flex-1 truncate">{p.name}</span>
                <div className="flex items-center gap-1">
                  <div
                    className="h-1 rounded-full bg-[#C9A84C]/40"
                    style={{ width: `${(p.views / 312) * 36}px` }}
                  />
                  <span className="text-[9px] text-[#888880]">{p.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Cases() {
  const [activeTab, setActiveTab] = useState("store");

  return (
    <section id="cases" className="section-padding bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="gold-line mb-4" />
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] mb-4">
            Живое демо
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-[#f5f0e8] tracking-tight leading-tight">
              Посмотрите как<br />это работает
            </h2>
            <p className="text-[#888880] text-sm max-w-xs leading-relaxed">
              Нажимайте кнопки, добавляйте в корзину, смотрите аналитику — всё по-настоящему.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {[
              {
                tab: "store",
                title: "Витрина вашего магазина",
                desc: "Покупатели видят каталог с фотографиями, ценами и категориями. Фильтруют, ищут и добавляют в корзину одним тапом.",
                points: ["Свой дизайн и цвета", "Поиск и фильтры", "Работает на телефоне"],
              },
              {
                tab: "cart",
                title: "Корзина → WhatsApp",
                desc: "Покупатель собирает заказ и нажимает одну кнопку. Вы получаете готовое сообщение в WhatsApp со списком товаров и суммой.",
                points: ["Изменение количества", "Автоматический итог", "Заказ одним нажатием"],
              },
              {
                tab: "dash",
                title: "Дашборд продавца",
                desc: "Видите сколько людей зашло, что смотрели и сколько перешли в WhatsApp. Управляете товарами и настройками.",
                points: ["Аналитика в реальном времени", "CRUD каталога товаров", "Настройки темы"],
              },
            ].map((item) => (
              <motion.button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeTab === item.tab
                    ? "bg-[#141414] border-[#C9A84C]/30"
                    : "bg-[#141414]/40 border-[#2a2a2a] hover:border-[#C9A84C]/15"
                }`}
              >
                {activeTab === item.tab && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent rounded-t-2xl" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`font-semibold text-sm mb-1 transition-colors ${
                      activeTab === item.tab ? "text-[#f5f0e8]" : "text-[#888880]"
                    }`}>
                      {item.title}
                    </h3>
                    {activeTab === item.tab && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-[#888880] text-xs leading-relaxed mb-3">{item.desc}</p>
                        <ul className="space-y-1">
                          {item.points.map((pt) => (
                            <li key={pt} className="flex items-center gap-2 text-xs text-[#888880]">
                              <Check size={11} className="text-[#C9A84C] flex-shrink-0" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                  <ChevronRight
                    size={14}
                    className={`flex-shrink-0 mt-0.5 transition-all ${
                      activeTab === item.tab ? "text-[#C9A84C] rotate-90" : "text-[#888880]/40"
                    }`}
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            {/* Tab switcher */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-1 p-1 bg-[#141414] border border-[#2a2a2a] rounded-xl">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-[#C9A84C] text-[#0d0d0d]"
                          : "text-[#888880] hover:text-[#f5f0e8]"
                      }`}
                    >
                      <Icon size={12} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Phone frame */}
              <div
                className="relative"
                style={{
                  width: 260,
                  background: "#0d0d0d",
                  borderRadius: 32,
                  border: "2px solid #2a2a2a",
                  boxShadow: "0 0 0 1px #1a1a1a, 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* Notch */}
                <div className="flex justify-center pt-2.5 pb-1">
                  <div className="w-16 h-1.5 rounded-full bg-[#2a2a2a]" />
                </div>

                {/* Screen content */}
                <div style={{ height: 480, overflow: "hidden", background: "#0d0d0d" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: "100%" }}
                    >
                      {activeTab === "store" && <StorefrontPreview />}
                      {activeTab === "cart"  && <CartPreview />}
                      {activeTab === "dash"  && <DashboardPreview />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-20 h-1 rounded-full bg-[#2a2a2a]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
