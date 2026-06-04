import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// UI text, body, cards, labels — full Cyrillic + Latin + numerals
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Display headings only — wide, geometric, full Cyrillic
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Domio — Сайты для бизнеса в Казахстане",
  description: "Профессиональные сайты для малого бизнеса в Казахстане. Готовый сайт за 7 дней от 20 000 ₸. Увеличьте продажи и доверие клиентов.",
  keywords: "сайт для бизнеса, казахстан, веб-сайт, лендинг, разработка сайта, алматы, астана",
  openGraph: {
    title: "Domio — Сайты для бизнеса в Казахстане",
    description: "Профессиональные сайты для малого бизнеса. Готовый сайт за 7 дней от 20 000 ₸.",
    url: "https://domio.top",
    siteName: "Domio",
    locale: "ru_KZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Domio — Сайты для бизнеса в Казахстане",
    description: "Профессиональные сайты для малого бизнеса. Готовый сайт за 7 дней от 20 000 ₸.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} ${unbounded.variable}`}>
      <body className="grain">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
