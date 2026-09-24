'use client';

import React from 'react';
import Image from 'next/image';
import { Article, Language } from '@/types/article';
import { getT } from '@/lib/translations';
import { ArrowUpRight, BookOpen, Star, Camera } from 'lucide-react';

interface Props {
  article: Article;
  lang: Language;
  onReadArticle: (article: Article) => void;
}

export const LeadArticleHero: React.FC<Props> = ({ article, lang, onReadArticle }) => {
  const t = getT(lang);

  const dateParts = article.publishedAt.split('-');
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}` : article.publishedAt;

  const title = article.title[lang] || article.title.ru;
  const summary = article.summary[lang] || article.summary.ru;

  return (
    <section className="w-full border-b border-black bg-white select-none">
      {/* Top Banner Tag */}
      <div className="bg-black text-white px-4 py-1.5 flex items-center justify-between font-mono text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-white text-white" />
          <span className="font-bold">
            {lang === 'ru' ? 'ГЛАВНЫЙ МАТЕРИАЛ ДНЯ' : 'LEAD EDITORIAL DISPATCH'}
          </span>
        </div>
        <span className="hidden sm:inline font-mono">
          {article.source} {'//'} {article.category.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Col: High-Res Architecture Photo (7 cols lg) */}
        <div 
          onClick={() => onReadArticle(article)}
          className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between bg-black cursor-pointer group"
        >
          <div className="relative aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden">
            <Image
              src={article.mainImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              referrerPolicy="no-referrer"
              className="object-cover filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Gallery badge */}
            <div className="absolute bottom-3 left-3 bg-black/90 text-white font-mono text-xs px-2.5 py-1 border border-white/20 flex items-center gap-1.5 uppercase">
              <Camera className="w-3.5 h-3.5" />
              <span>[{article.gallery?.length || 0} {lang === 'ru' ? 'ОРИГИНАЛЬНЫХ ФОТО В СТАТЬЕ' : 'ORIGINAL PHOTOS'}]</span>
            </div>
          </div>

          <div className="px-4 py-2 bg-white border-t border-black font-mono text-[10px] sm:text-[11px] text-black/80 flex justify-between uppercase">
            <span>АРХИТЕКТОР: {article.projectSpecs?.architect}</span>
            <span>ЛОКАЦИЯ: {article.projectSpecs?.location}</span>
          </div>
        </div>

        {/* Right Col: Editorial Text & Reader Action (5 cols lg) */}
        <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between bg-white space-y-6">
          <div>
            {/* Metadata Bar */}
            <div className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-2">
              {'//'} {article.source} {'//'} {formattedDate}
            </div>

            {/* Category Pill and Read Time */}
            <div className="flex items-center gap-3 my-3">
              <span className="px-2.5 py-0.5 bg-black text-white font-mono font-bold text-xs tracking-wider border border-black uppercase">
                {article.category.toUpperCase()}
              </span>
              <span className="font-mono text-xs font-bold uppercase text-black/70">
                {'//'} {article.readTimeMinutes} {t.readTime}
              </span>
            </div>

            {/* Massive Grotesque Title */}
            <h2
              onClick={() => onReadArticle(article)}
              className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black leading-tight cursor-pointer hover:underline"
            >
              {title}
            </h2>

            {/* Architectural Summary */}
            <p className="mt-4 text-sm sm:text-base text-black/90 font-sans leading-relaxed">
              {summary}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => onReadArticle(article)}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white font-bold uppercase hover:bg-black/80 transition-none cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.readFullArticle}</span>
            </button>

            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 border border-black font-bold uppercase text-black hover:bg-black hover:text-white transition-none"
            >
              <span>{t.originalArticle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
