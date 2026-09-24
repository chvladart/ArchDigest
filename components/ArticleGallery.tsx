'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryItem, Language } from '@/types/article';
import { getT } from '@/lib/translations';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface Props {
  gallery: GalleryItem[];
  lang: Language;
  photographer?: string;
}

export const ArticleGallery: React.FC<Props> = ({ gallery, lang, photographer }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const t = getT(lang);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!gallery || gallery.length === 0) return;
    setCurrentIdx((prev) => (prev + 1) % gallery.length);
  }, [gallery]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!gallery || gallery.length === 0) return;
    setCurrentIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery]);

  // Keyboard navigation when in gallery or lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!gallery || gallery.length === 0) return null;

  const currentItem = gallery[currentIdx] || gallery[0];

  return (
    <div className="w-full border border-black bg-white select-none">
      {/* Gallery Header Bar */}
      <div className="border-b border-black px-4 py-2 bg-[#F4F4F0] flex items-center justify-between font-mono text-xs text-black">
        <div className="flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-black" />
          <span className="font-bold uppercase tracking-wider">
            {t.galleryTitle}
          </span>
        </div>
        <div className="flex items-center gap-3 text-black/80 font-mono text-xs">
          {photographer && (
            <span className="hidden sm:inline uppercase">PHOTO: {photographer}</span>
          )}
          <span className="font-bold border border-black px-2 py-0.5 bg-black text-white text-[11px]">
            {currentIdx + 1} / {gallery.length}
          </span>
        </div>
      </div>

      {/* Main Large Photo Viewer (FULL COLOR - NOT B&W, Click to flip) */}
      <div 
        onClick={handleNext}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black cursor-pointer group"
        title={lang === 'ru' ? 'Нажмите для перехода к следующему фото' : 'Click to advance to next photo'}
      >
        <Image
          src={currentItem.url}
          alt={currentItem.caption[lang] || 'Architectural photograph'}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />

        {/* Previous Button (Left click) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-black/80 hover:bg-black text-white border border-white/60 transition-none cursor-pointer z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button (Right click) */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-black/80 hover:bg-black text-white border border-white/60 transition-none cursor-pointer z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Enlarge / Fullscreen trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute top-3 right-3 bg-black/85 hover:bg-black text-white px-2.5 py-1.5 border border-white/40 cursor-pointer flex items-center gap-1.5 font-mono text-xs z-10 uppercase"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.photoEnlarge}</span>
        </button>

        {/* Bottom hint badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider pointer-events-none">
          {lang === 'ru' ? 'КЛИК ПО ФОТО — ПЕРЕЛИСТЫВАНИЕ →' : 'CLICK PHOTO TO ADVANCE →'}
        </div>
      </div>

      {/* Caption & Thumbnail Navigation Strip */}
      <div className="p-3 sm:p-4 bg-white border-t border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <p className="text-black font-medium leading-relaxed font-sans text-xs sm:text-sm max-w-xl">
          {currentItem.caption[lang]}
        </p>

        {/* Clickable Full-Color Thumbnail Strip */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar pt-1 sm:pt-0">
          {gallery.map((thumb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
              className={`relative w-12 h-8 sm:w-14 sm:h-9 cursor-pointer shrink-0 overflow-hidden ${
                idx === currentIdx
                  ? 'border-2 border-black outline outline-2 outline-black'
                  : 'border border-black/40 opacity-65 hover:opacity-100'
              }`}
              title={thumb.caption[lang]}
            >
              <Image
                src={thumb.url}
                alt=""
                fill
                sizes="60px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-8 select-none"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between text-white font-mono text-xs border-b border-white/20 pb-3">
            <span className="truncate max-w-xl">
              {currentIdx + 1} / {gallery.length} {'//'} {currentItem.caption[lang]}
            </span>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-1.5 border border-white text-white hover:bg-white hover:text-black uppercase text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>{t.photoClose}</span>
            </button>
          </div>

          {/* Center High-Res Image (FULL COLOR) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[70vh] sm:h-[80vh] my-auto flex items-center justify-center cursor-pointer"
            onClickCapture={handleNext}
          >
            <Image
              src={currentItem.url}
              alt={currentItem.caption[lang]}
              fill
              sizes="100vw"
              referrerPolicy="no-referrer"
              className="object-contain"
            />

            {/* Prev / Next buttons inside lightbox */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 p-3 bg-black/80 border border-white text-white hover:bg-white hover:text-black cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-3 bg-black/80 border border-white text-white hover:bg-white hover:text-black cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Caption */}
          <div className="w-full max-w-4xl text-center text-white/90 font-mono text-xs sm:text-sm border-t border-white/20 pt-3">
            {currentItem.caption[lang]}
          </div>
        </div>
      )}
    </div>
  );
};
