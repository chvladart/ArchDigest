import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARCH/INDEX — Architectural Press & Scoring',
  description: 'Швейцарская газетная сетка архитектурного дайджеста с многокритериальной оценкой и двуязычным интерфейсом.',
  openGraph: {
    title: 'ARCH/INDEX — Architectural Press & Scoring',
    description: 'Швейцарская газетная сетка архитектурного дайджеста с многокритериальной оценкой и двуязычным интерфейсом.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARCH/INDEX — Architectural Press & Scoring',
    description: 'Швейцарская газетная сетка архитектурного дайджеста с многокритериальной оценкой и двуязычным интерфейсом.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#F4F4F0] text-black overflow-x-hidden antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
