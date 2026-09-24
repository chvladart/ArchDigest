'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Article, Language, SortOption } from '@/types/article';
import { PortalSource } from '@/types/source';
import { MOCK_ARTICLES } from '@/data/mockArticles';
import { INITIAL_SOURCES } from '@/data/sources';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { LeadArticleHero } from '@/components/LeadArticleHero';
import { ArticleCard } from '@/components/ArticleCard';
import { FullArticleReader } from '@/components/FullArticleReader';
import { SourcesModal } from '@/components/SourcesModal';
import { Footer } from '@/components/Footer';
import { getT } from '@/lib/translations';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('ru');
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCustom = localStorage.getItem('arch_digest_custom_articles');
        const savedRss = localStorage.getItem('arch_digest_rss_articles');
        const customs = savedCustom ? JSON.parse(savedCustom) : [];
        const rss = savedRss ? JSON.parse(savedRss) : [];
        const combined = [...(Array.isArray(customs) ? customs : []), ...(Array.isArray(rss) ? rss : [])];
        if (combined.length > 0) {
          const existingUrls = new Set(combined.map((a: Article) => a.originalUrl));
          const baseRemaining = MOCK_ARTICLES.filter((a) => !existingUrls.has(a.originalUrl));
          return [...combined, ...baseRemaining];
        }
      } catch {}
    }
    return MOCK_ARTICLES;
  });
  const [sources, setSources] = useState<PortalSource[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSources = localStorage.getItem('arch_digest_sources');
        if (savedSources) {
          return JSON.parse(savedSources);
        }
      } catch {}
    }
    return INITIAL_SOURCES;
  });
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('08:00');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncBanner, setSyncBanner] = useState<string>('');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State for reading article in full
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const t = getT(lang);

  const handleToggleSource = (sourceId: string) => {
    setSources((prev) => {
      const next = prev.map((s) => (s.id === sourceId ? { ...s, isActive: !s.isActive } : s));
      try {
        localStorage.setItem('arch_digest_sources', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleAddSource = (newSource: PortalSource) => {
    setSources((prev) => {
      const next = [newSource, ...prev];
      try {
        localStorage.setItem('arch_digest_sources', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleArticleParsed = (newArticle: Article) => {
    setArticles((prev) => {
      const next = [newArticle, ...prev];
      try {
        const customs = next.filter((a) => a.isCustomParsed);
        localStorage.setItem('arch_digest_custom_articles', JSON.stringify(customs));
      } catch {}
      return next;
    });
    setReadingArticle(newArticle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDailySync = async () => {
    setIsSyncing(true);
    try {
      const activeIds = sources.filter((s) => s.isActive).map((s) => s.id);
      const res = await fetch('/api/daily-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeSources: activeIds }),
      });
      const data = await res.json();
      if (data.syncTime) {
        setLastSyncTime(data.syncTime);
      }
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        setArticles((prev) => {
          const existingUrls = new Set(prev.map((a) => a.originalUrl));
          const fresh = data.articles.filter((a: Article) => !existingUrls.has(a.originalUrl));
          const updated = [...fresh, ...prev];
          try {
            const toPersist = updated.filter((a) => a.id.startsWith('rss-') || a.isCustomParsed);
            localStorage.setItem('arch_digest_rss_articles', JSON.stringify(toPersist));
          } catch {}
          return updated;
        });
      }

      const count = data.fetchedCount || 0;
      setSyncBanner(
        lang === 'ru'
          ? `✓ Синхронизация завершена: успешно спарсено ${count} свежих статей из RSS источников!`
          : `✓ Sync complete: successfully fetched ${count} fresh dispatches from RSS feeds!`
      );
      setTimeout(() => setSyncBanner(''), 6000);
    } catch {
      setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncSingleSource = async (sourceId: string): Promise<number> => {
    try {
      const res = await fetch('/api/daily-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specificSourceId: sourceId }),
      });
      const data = await res.json();
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        setArticles((prev) => {
          const existingUrls = new Set(prev.map((a) => a.originalUrl));
          const fresh = data.articles.filter((a: Article) => !existingUrls.has(a.originalUrl));
          const updated = [...fresh, ...prev];
          try {
            const toPersist = updated.filter((a) => a.id.startsWith('rss-') || a.isCustomParsed);
            localStorage.setItem('arch_digest_rss_articles', JSON.stringify(toPersist));
          } catch {}
          return updated;
        });
        return data.articles.length;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Active sources map
  const activeSourcesNames = useMemo(() => {
    const activeSet = new Set<string>();
    sources.forEach((s) => {
      if (s.isActive) {
        activeSet.add(s.name.toUpperCase());
        activeSet.add(s.id.toUpperCase());
      }
    });
    return activeSet;
  }, [sources]);

  // Available unique sources in catalog
  const availableSources = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.source));
    return Array.from(set).sort();
  }, [articles]);

  // Category definitions with localized labels
  const categories = useMemo(() => [
    { id: 'all', label: t.categories.all },
    { id: 'architecture', label: t.categories.architecture },
    { id: 'interior', label: t.categories.interior },
    { id: 'urbanism', label: t.categories.urbanism },
    { id: 'culture', label: t.categories.culture },
    { id: 'technology', label: t.categories.technology },
  ], [t]);

  // Lead featured article
  const leadArticle = useMemo(() => {
    const featured = articles.find((a) => a.isDailyFeatured);
    return featured || articles[0];
  }, [articles]);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    let result = articles.filter((a) => {
      // Must match active sources (or custom parsed articles)
      if (a.isCustomParsed) return true;
      const matched = sources.some((s) => s.isActive && a.source.toUpperCase().includes(s.name.toUpperCase()));
      return matched;
    });

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter by Specific Source Dropdown
    if (selectedSource !== 'all') {
      result = result.filter((a) => a.source === selectedSource);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((a) => {
        const titleRu = a.title.ru?.toLowerCase() || '';
        const titleEn = a.title.en?.toLowerCase() || '';
        const summaryRu = a.summary.ru?.toLowerCase() || '';
        const summaryEn = a.summary.en?.toLowerCase() || '';
        const source = a.source.toLowerCase();
        const architect = a.projectSpecs?.architect.toLowerCase() || '';
        const location = a.projectSpecs?.location.toLowerCase() || '';

        return (
          titleRu.includes(q) ||
          titleEn.includes(q) ||
          summaryRu.includes(q) ||
          summaryEn.includes(q) ||
          source.includes(q) ||
          architect.includes(q) ||
          location.includes(q)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'date-asc':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title-asc':
          return (a.title[lang] || a.title.ru).localeCompare(b.title[lang] || b.title.ru);
        case 'source-asc':
          return a.source.localeCompare(b.source);
        default:
          return 0;
      }
    });

    return result;
  }, [articles, sources, selectedCategory, selectedSource, searchQuery, sortOption, lang]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSource('all');
    setSortOption('date-desc');
    setSearchQuery('');
  };

  const handleOpenArticle = (article: Article) => {
    setReadingArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setReadingArticle(null);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSource !== 'all' ||
    searchQuery.trim().length > 0 ||
    sortOption !== 'date-desc';

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F0] text-black antialiased selection:bg-black selection:text-white">
      {/* Swiss Newspaper Masthead Header */}
      <Header 
        lang={lang} 
        onLanguageChange={setLang}
        onHomeClick={handleBackToCatalog} 
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        onDailySync={handleDailySync}
        isSyncing={isSyncing}
        lastSyncTime={lastSyncTime}
        activeSourcesCount={sources.filter((s) => s.isActive).length}
      />

      {/* Sync Notification Banner */}
      {syncBanner && (
        <div className="bg-black text-white px-4 py-2 border-b border-black font-mono text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{syncBanner}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setSyncBanner('')} 
            className="text-white/60 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto border-x border-black bg-[#F4F4F0]">
        {readingArticle ? (
          /* FULL ARTICLE VIEW */
          <FullArticleReader
            article={readingArticle}
            lang={lang}
            onBack={handleBackToCatalog}
            onSelectArticle={handleOpenArticle}
            allArticles={articles}
          />
        ) : (
          /* CATALOG VIEW */
          <>
            {/* Lead Featured Article (Hero) when no strict filters */}
            {!hasActiveFilters && leadArticle && (
              <LeadArticleHero
                article={leadArticle}
                lang={lang}
                onReadArticle={handleOpenArticle}
              />
            )}

            {/* Sticky Filter and Sorting Bar */}
            <div className="sticky top-0 z-30">
              <FilterBar
                lang={lang}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedSource={selectedSource}
                onSourceChange={setSelectedSource}
                sortOption={sortOption}
                onSortChange={setSortOption}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onResetFilters={handleResetFilters}
                totalCount={filteredArticles.length}
                availableSources={availableSources}
                categories={categories}
              />
            </div>

            {/* Section Title Bar */}
            <div className="px-4 py-2 bg-black text-white font-mono text-xs tracking-wider uppercase flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>
                  {lang === 'ru' ? '// ЕЖЕДНЕВНЫЙ ДАЙДЖЕСТ ПРЕССЫ' : '// DAILY ARCHITECTURE NEWS DIGEST'}
                </span>
                <span className="text-[10px] text-white/60 hidden sm:inline">
                  (ОРИГИНАЛЬНЫЕ МАТЕРИАЛЫ И ФОТО)
                </span>
              </div>
              <span className="font-mono text-[11px] text-white/80">
                {filteredArticles.length} / {articles.length} ВЫПУСКОВ
              </span>
            </div>

            {/* Article Grid: 3-4 columns desktop, 2 tablet, 1 mobile */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#F4F4F0]">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    lang={lang}
                    onReadArticle={handleOpenArticle}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center border-b border-black bg-white select-none my-8 mx-4 sm:mx-6 border">
                <div className="font-mono text-xs tracking-widest uppercase font-bold text-black/60 mb-2">
                  {'// 404 NOT MATCHED'}
                </div>
                <h3 className="text-2xl font-black uppercase text-black">
                  {t.noResultsTitle}
                </h3>
                <p className="mt-2 text-sm text-black/80 max-w-md mx-auto">
                  {t.noResultsText}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-black text-white font-mono text-xs uppercase font-bold hover:bg-black/80 transition-none cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSourcesModalOpen(true)}
                    className="px-6 py-2.5 border border-black bg-white text-black font-mono text-xs uppercase font-bold hover:bg-black hover:text-white transition-none cursor-pointer"
                  >
                    {t.manageSources}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Sources and Portals Management Modal */}
      <SourcesModal
        lang={lang}
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
        sources={sources}
        onToggleSource={handleToggleSource}
        onAddSource={handleAddSource}
        onArticleParsed={handleArticleParsed}
        onSyncSingleSource={handleSyncSingleSource}
      />

      {/* Swiss Newspaper Colophon Footer */}
      <Footer lang={lang} />
    </div>
  );
}
