'use client';

import React from 'react';
import { Article, Language } from '@/types/article';
import { getT } from '@/lib/translations';
import { ArticleGallery } from '@/components/ArticleGallery';
import { ArrowLeft, ExternalLink, Clock, MapPin, Building, Calendar, Maximize, Tag } from 'lucide-react';

interface Props {
  article: Article;
  lang: Language;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const FullArticleReader: React.FC<Props> = ({
  article,
  lang,
  onBack,
  onSelectArticle,
  allArticles,
}) => {
  const t = getT(lang);

  const dateParts = article.publishedAt.split('-');
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}` : article.publishedAt;

  const title = article.title[lang] || article.title.ru;
  const summary = article.summary[lang] || article.summary.ru;
  const content = article.content[lang] || article.content.ru;
  const { projectSpecs } = article;

  // Navigation to other articles
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <article className="w-full bg-[#F4F4F0] select-none">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-black px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-white px-3 py-1.5 border border-black transition-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToCatalog}</span>
        </button>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="font-bold border border-black px-2.5 py-1 bg-black text-white text-xs uppercase">
            {article.source}
          </span>

          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 border border-black font-bold uppercase text-xs text-black hover:bg-black hover:text-white transition-none"
          >
            <span>{t.originalArticle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Article Meta Bar */}
        <div className="border-b border-black pb-3 flex flex-wrap items-center justify-between font-mono text-xs text-black gap-2">
          <span className="font-bold uppercase tracking-wider">
            {'//'} {article.source} {'//'} {formattedDate}
          </span>
          <div className="flex items-center gap-3 text-black/70 uppercase">
            <span>{article.category.toUpperCase()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTimeMinutes} {t.readTime}
            </span>
          </div>
        </div>

        {/* Massive Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-[1.02]">
          {title}
        </h1>

        {/* Lead Summary Paragraph */}
        <div className="border-l-4 border-black pl-4 py-1 text-base sm:text-lg font-medium text-black leading-relaxed font-sans">
          {content.lead || summary}
        </div>

        {/* TOP PHOTO GALLERY (IN FULL COLOR, TOGETHER WITH MAIN PHOTO, CLICK TO SWIPE) */}
        {article.gallery && article.gallery.length > 0 && (
          <div className="my-6">
            <ArticleGallery 
              gallery={article.gallery} 
              lang={lang} 
              photographer={projectSpecs?.photographer}
            />
          </div>
        )}

        {/* Project Specifications Grid */}
        {projectSpecs && (
          <div className="border border-black bg-white p-4 sm:p-6">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-2 mb-4 flex items-center justify-between">
              <span>{'//'} {t.projectSpecs}</span>
              {projectSpecs.typology && (
                <span className="text-[10px] text-black/70">
                  [{projectSpecs.typology}]
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div>
                <div className="text-[10px] text-black/60 uppercase flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {t.architect}
                </div>
                <div className="font-bold text-black mt-1 text-sm">{projectSpecs.architect}</div>
              </div>
              <div>
                <div className="text-[10px] text-black/60 uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {t.location}
                </div>
                <div className="font-bold text-black mt-1 text-sm">{projectSpecs.location}</div>
              </div>
              <div>
                <div className="text-[10px] text-black/60 uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {t.year}
                </div>
                <div className="font-bold text-black mt-1 text-sm">{projectSpecs.year}</div>
              </div>
              <div>
                <div className="text-[10px] text-black/60 uppercase flex items-center gap-1">
                  <Maximize className="w-3 h-3" />
                  {t.area}
                </div>
                <div className="font-bold text-black mt-1 text-sm">{projectSpecs.area}</div>
              </div>
            </div>
          </div>
        )}

        {/* Full Article Text Body Copied from Original Architecture Press */}
        <div className="space-y-6 text-black font-sans leading-relaxed text-base sm:text-lg">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black pt-5 border-t border-black/20">
                {section.heading}
              </h2>
              <p className="text-black/90 font-normal leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}

          {/* Pull Quote */}
          {content.quote && (
            <blockquote className="my-8 p-6 border-y-2 border-black bg-white space-y-2">
              <p className="text-lg sm:text-xl font-bold uppercase tracking-tight text-black italic">
                {content.quote.text}
              </p>
              {content.quote.author && (
                <cite className="block font-mono text-xs font-bold uppercase text-black/70 not-italic">
                  — {content.quote.author}
                </cite>
              )}
            </blockquote>
          )}
        </div>

        {/* Working Original Source Link Box */}
        <div className="border border-black bg-black text-white p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase text-white/70">
              {'//'} ОРИГИНАЛЬНАЯ ПУБЛИКАЦИЯ В АРХИТЕКТУРНОЙ ПЕЧАТИ
            </div>
            <div className="font-black uppercase text-lg sm:text-xl mt-1">
              {article.source} — {title}
            </div>
            <div className="font-mono text-[11px] text-white/60 truncate max-w-xl mt-1">
              {article.originalUrl}
            </div>
          </div>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-black hover:text-white border border-white transition-none shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.originalArticle}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Previous / Next Article Navigation Footer */}
        <div className="border-t-2 border-black pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <div
              onClick={() => {
                onSelectArticle(prevArticle);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-black p-4 bg-white cursor-pointer hover:bg-[#F4F4F0] flex flex-col justify-between"
            >
              <span className="font-mono text-[10px] text-black/60 uppercase">
                ← {lang === 'ru' ? 'Предыдущий материал' : 'Previous Dispatch'}
              </span>
              <div className="font-black uppercase text-sm mt-1 line-clamp-2">
                {prevArticle.title[lang] || prevArticle.title.ru}
              </div>
            </div>
          ) : <div />}

          {nextArticle ? (
            <div
              onClick={() => {
                onSelectArticle(nextArticle);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-black p-4 bg-white cursor-pointer hover:bg-[#F4F4F0] flex flex-col justify-between text-right"
            >
              <span className="font-mono text-[10px] text-black/60 uppercase">
                {lang === 'ru' ? 'Следующий материал' : 'Next Dispatch'} →
              </span>
              <div className="font-black uppercase text-sm mt-1 line-clamp-2">
                {nextArticle.title[lang] || nextArticle.title.ru}
              </div>
            </div>
          ) : <div />}
        </div>
      </div>
    </article>
  );
};
