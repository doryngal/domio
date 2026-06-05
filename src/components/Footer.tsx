"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";

const navLinks = [
  { label: "Как работает", href: "#how" },
  { label: "Что входит", href: "#features" },
  { label: "Цена", href: "#price" },
  { label: "Кейсы", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

const WHATSAPP_URL =
  "https://wa.me/77001234567?text=Привет! Хочу сайт для бизнеса";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="font-display inline-block text-2xl font-extrabold tracking-tight mb-4">
              <span className="text-gold-gradient">domio</span>
              <span className="text-[#C9A84C]/40">.top</span>
            </a>
            <p className="text-[#888880] text-sm leading-relaxed max-w-xs">
              Профессиональные сайты для малого бизнеса в Казахстане.
              Готово за 1 день, от 20 000 ₸.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-[#888880] text-xs">
              <MapPin size={12} className="text-[#C9A84C]/60" />
              <span>Казахстан · Алматы, Астана и по всей стране</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#888880] mb-5">
              Навигация
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#888880] mb-5">
              Связь
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 btn-outline-gold px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <MessageCircle size={16} />
              Написать в WhatsApp
            </a>
            <p className="text-[#888880]/50 text-xs mt-4 leading-relaxed">
              Отвечаем в течение 1 часа<br />
              Пн–Вс: 9:00 – 22:00
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#888880]/40 text-xs">
            © 2025 Domio. Все права защищены.
          </p>
          <p className="text-[#888880]/40 text-xs">
            Сделано с вниманием к деталям
          </p>
        </div>
      </div>
    </footer>
  );
}
