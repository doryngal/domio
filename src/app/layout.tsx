import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="ru">
      <body className="grain">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
