'use client';

import React from 'react';
import { Language } from '@/types/article';
import { getT } from '@/lib/translations';
import { Sliders, RefreshCw, Link as LinkIcon } from 'lucide-react';

interface Props {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onHomeClick?: () => void;
  onOpenSourcesModal: () => void;
  onDailySync: () => void;
  isSyncing: boolean;
  lastSyncTime: string;
  activeSourcesCount: number;
}

export const Header: React.FC<Props> = ({
  lang,
  onLanguageChange,
  onHomeClick,
  onOpenSourcesModal,
  onDailySync,
  isSyncing,
  lastSyncTime,
  activeSourcesCount,
}) => {
  const t = getT(lang);

  return (
    <header className="w-full border-b border-black bg-[#F4F4F0] select-none">
      {/* Top Bar: Date, Daily Sync Status, Sources Modal Trigger & Language Switcher */}
      <div className="border-b border-black px-4 py-2 flex flex-wrap items-center justify-between font-mono text-[11px] tracking-wider uppercase text-black gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            {t.dailyEdition} {'//'} {t.dateLabel}
          </span>
          <span className="hidden sm:inline text-black/40">|</span>
          <span className="hidden sm:inline text-black/70">
            {t.lastSyncLabel}: {lastSyncTime}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Daily Sync Button */}
          <button
            type="button"
            onClick={onDailySync}
            disabled={isSyncing}
            className="px-2.5 py-1 border border-black bg-white hover:bg-black hover:text-white transition-none cursor-pointer flex items-center gap-1.5 font-bold uppercase text-[10px] disabled:opacity-50"
            title={t.dailySyncBtn}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isSyncing ? t.dailySyncing : t.dailySyncBtn}</span>
          </button>

          {/* Sources and Portals Management */}
          <button
            type="button"
            onClick={onOpenSourcesModal}
            className="px-2.5 py-1 border border-black bg-black text-white hover:bg-black/80 transition-none cursor-pointer flex items-center gap-1.5 font-bold uppercase text-[10px]"
          >
            <Sliders className="w-3 h-3" />
            <span>{t.manageSources}</span>
            <span className="bg-white text-black px-1 py-0.2 text-[9px]">
              {activeSourcesCount}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-black text-xs font-mono ml-1">
            <button
              type="button"
              onClick={() => onLanguageChange('ru')}
              className={`px-2.5 py-0.5 uppercase font-bold transition-none cursor-pointer ${
                lang === 'ru'
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-black/10'
              }`}
            >
              RU
            </button>
            <span className="w-px h-full bg-black" />
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-0.5 uppercase font-bold transition-none cursor-pointer ${
                lang === 'en'
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-black/10'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Swiss Masthead Title */}
      <div className="px-4 py-5 md:py-7">
        <div 
          onClick={onHomeClick}
          className={onHomeClick ? 'cursor-pointer inline-block w-full' : 'inline-block w-full'}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.92] text-black">
            {t.siteTitle}
          </h1>
          <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-wider uppercase text-black/80">
            {t.siteSubtitle}
          </p>
        </div>
      </div>
    </header>
  );
};
