'use client';

import React from 'react';
import Image from 'next/image';
import { Article, Language } from '@/types/article';
import { getT } from '@/lib/translations';
import { ArrowUpRight, BookOpen, Camera } from 'lucide-react';

interface Props {
  article: Article;
  lang: Language;
  onReadArticle: (article: Article) => void;
}

export const ArticleCard: React.FC<Props> = ({ article, lang, onReadArticle }) => {
  const t = getT(lang);

  const dateParts = article.publishedAt.split('-');
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}` : article.publishedAt;

  const title = article.title[lang] || article.title.ru;
  const summary = article.summary[lang] || article.summary.ru;

  return (
    <article className="group flex flex-col justify-between h-full bg-white border border-black select-none transition-none">
      <div>
        {/* Main Architectural Photo in Black and White (Grayscale) */}
        <div 
          onClick={() => onReadArticle(article)}
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-black bg-black cursor-pointer"
        >
          <Image
            src={article.mainImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            referrerPolicy="no-referrer"
            className="object-cover filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle Category Stamp on Image */}
          <div className="absolute top-2 right-2 bg-black/90 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider border border-white/20">
            {article.category.toUpperCase()}
          </div>
          {/* Editorial badge if present */}
          {article.badge && (
            <div className="absolute top-2 left-2 bg-black text-white font-mono font-bold text-[9px] px-2 py-0.5 uppercase tracking-wider border border-white/30">
              {article.badge}
            </div>
          )}
          {/* Authentic photos count badge */}
          {article.gallery?.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-black/85 text-white font-mono text-[9px] px-1.5 py-0.5 uppercase flex items-center gap-1">
              <Camera className="w-2.5 h-2.5" />
              <span>[{article.gallery.length} ФОТО]</span>
            </div>
          )}
        </div>

        {/* Source and Date Metadata Bar - exact format // SOURCE // DD.MM.YYYY */}
        <div className="px-4 py-2 border-b border-black/30 bg-[#F4F4F0] flex items-center justify-between font-mono text-[11px] text-black">
          <span className="font-bold tracking-wider uppercase truncate">
            {'//'} {article.source} {'//'} {formattedDate}
          </span>
          <span className="text-[10px] uppercase text-black/60 hidden sm:inline">
            {article.readTimeMinutes} {t.readTime}
          </span>
        </div>

        {/* Content Box */}
        <div className="p-4 space-y-3">
          {/* Architect and Location specs pill (replacing score badge) */}
          {article.projectSpecs && (
            <div className="flex items-center justify-between text-black/80 font-mono text-[10px] uppercase tracking-wider border-b border-black/10 pb-1.5">
              <span className="font-bold truncate max-w-[160px]">
                {article.projectSpecs.architect}
              </span>
              <span className="truncate max-w-[120px] text-black/60">
                {article.projectSpecs.location.split(',')[0]}
              </span>
            </div>
          )}

          {/* Headline - Heavy grotesque */}
          <h2
            onClick={() => onReadArticle(article)}
            className="text-lg sm:text-xl font-black uppercase tracking-tight text-black leading-snug cursor-pointer group-hover:underline line-clamp-3"
          >
            {title}
          </h2>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-black/90 font-sans leading-relaxed line-clamp-3">
            {summary}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="border-t border-black bg-[#F4F4F0] px-4 py-2.5 flex items-center justify-between font-mono text-[11px]">
        <button
          type="button"
          onClick={() => onReadArticle(article)}
          className="flex items-center gap-1.5 font-bold uppercase text-black hover:underline cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.readFullArticle}</span>
        </button>

        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-black/70 hover:text-black hover:underline uppercase text-[10px]"
        >
          <span>{t.originalArticle}</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
};
