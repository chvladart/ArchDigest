'use client';

import React from 'react';
import { Language } from '@/types/article';
import { getT } from '@/lib/translations';

interface Props {
  lang: Language;
}

export const Footer: React.FC<Props> = ({ lang }) => {
  const t = getT(lang);

  return (
    <footer className="w-full border-t-2 border-black bg-[#F4F4F0] select-none mt-12">
      {/* Upper Colophon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black">
        {/* Left Column: Brand & Manifesto */}
        <div className="md:col-span-6 p-6 sm:p-8 space-y-4">
          <div className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black">
            {t.siteTitle} {'//'} GAZETTE
          </div>
          <p className="text-xs sm:text-sm font-sans text-black/90 max-w-md leading-relaxed">
            {t.footerColophon}
          </p>
          <div className="font-mono text-[11px] text-black/70 space-y-0.5">
            <div>{'//'} PALETTE: #000000 | #FFFFFF | #F4F4F0</div>
            <div>{'//'} TYPOGRAPHY: INTER HEAVY / JETBRAINS MONO</div>
            <div>{'//'} BORDERS: 1PX SOLID #000000 | RADIUS: 0</div>
          </div>
        </div>

        {/* Middle Column: Architecture Scope */}
        <div className="md:col-span-3 p-6 space-y-3 font-mono text-xs">
          <div className="font-bold uppercase tracking-wider text-black border-b border-black/30 pb-1">
            {'//'} АРХИВ И ИСТОЧНИКИ
          </div>
          <ul className="space-y-1.5 text-[11px] text-black/80">
            <li>• ЕЖЕДНЕВНЫЙ ВЫПУСК И ОБНОВЛЕНИЕ 1 РАЗ В ДЕНЬ</li>
            <li>• ОРИГИНАЛЬНЫЕ ФОТОГРАФИИ ОБЪЕКТОВ С САЙТОВ</li>
            <li>• ВЫБОР И ДОБАВЛЕНИЕ СВОИХ ПОРТАЛОВ</li>
            <li>• ПАРСИНГ СТАТЕЙ ИЗ МИРОВЫХ ИЗДАНИЙ ПО URL</li>
            <li>• ПОЛНОТЕКСТОВЫЕ МАТЕРИАЛЫ БЕЗ ВЫРЕЗОК</li>
          </ul>
        </div>

        {/* Right Column: Monospace Stamp */}
        <div className="md:col-span-3 p-6 flex flex-col justify-between font-mono text-xs bg-white">
          <div>
            <div className="font-bold uppercase tracking-wider text-black border-b border-black pb-1">
              {'//'} STATUS DISPATCH
            </div>
            <div className="mt-3 space-y-1 text-[11px] text-black">
              <div>BUILD STAGE: 01_UI_CORE</div>
              <div>RUNTIME: NEXT.JS APP ROUTER</div>
              <div>VIEWPORT: 375PX - 1920PX</div>
              <div>ANIMATION: NONE (PURE CSS)</div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/30 text-[10px] text-black/60 uppercase">
            VERIFIED NO-SHADOW {'//'} NO-RADIUS COMPLIANCE
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="px-4 py-3 bg-black text-white font-mono text-[10px] sm:text-[11px] tracking-wider uppercase flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div>{t.footerCopyright}</div>
        <div className="text-white/70">ARCHITECTURAL PRESS INTELLIGENCE 2026</div>
      </div>
    </footer>
  );
};
