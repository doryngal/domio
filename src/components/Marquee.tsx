"use client";

const ITEMS = [
  "50+ сайтов",
  "7 дней",
  "Казахстан",
  "от 20 000 ₸",
  "100% довольных",
  "SEO включено",
  "Хостинг на год",
  "Поддержка 30 дней",
];

// Duplicate for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="border-y border-[#2a2a2a] bg-[#0a0a0a] py-3.5 overflow-hidden select-none">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? "-reverse" : ""} 28s linear infinite`,
          willChange: "transform",
        }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3.5 px-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#888880] hover:text-[#C9A84C] transition-colors duration-300 cursor-default"
          >
            <span
              className="flex-shrink-0 rounded-full bg-[#C9A84C]"
              style={{ width: 3, height: 3 }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
