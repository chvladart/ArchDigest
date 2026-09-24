'use client';

import React, { useState } from 'react';
import { PortalSource } from '@/types/source';
import { Article, Language } from '@/types/article';
import { getT } from '@/lib/translations';
import { X, Plus, Link as LinkIcon, Check, ExternalLink, Loader2, Sparkles, Sliders, Rss, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  sources: PortalSource[];
  onToggleSource: (sourceId: string) => void;
  onAddSource: (newSource: PortalSource) => void;
  onArticleParsed: (article: Article) => void;
  onSyncSingleSource?: (sourceId: string) => Promise<number>;
}

export const SourcesModal: React.FC<Props> = ({
  lang,
  isOpen,
  onClose,
  sources,
  onToggleSource,
  onAddSource,
  onArticleParsed,
  onSyncSingleSource,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'parse'>('list');
  const t = getT(lang);
  const sm = t.sourcesModal;

  // New source form state
  const [newPortalName, setNewPortalName] = useState('');
  const [newPortalUrl, setNewPortalUrl] = useState('');
  const [newPortalRssUrl, setNewPortalRssUrl] = useState('');
  const [newPortalCountry, setNewPortalCountry] = useState('Global');
  const [newPortalCategory, setNewPortalCategory] = useState<'architecture' | 'interior' | 'culture' | 'urbanism' | 'design'>('architecture');
  const [newPortalDesc, setNewPortalDesc] = useState('');
  const [addSuccessMsg, setAddSuccessMsg] = useState('');
  const [isSavingSource, setIsSavingSource] = useState(false);

  // Parse article form state
  const [parseUrl, setParseUrl] = useState('');
  const [parseCategory, setParseCategory] = useState<'architecture' | 'interior' | 'culture' | 'urbanism'>('architecture');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState('');
  const [parseSuccess, setParseSuccess] = useState<Article | null>(null);

  // RSS testing state: map of sourceId -> { loading, status, msg }
  const [rssTestStatus, setRssTestStatus] = useState<Record<string, { loading?: boolean; ok?: boolean; msg?: string }>>({});
  const [rssParsingId, setRssParsingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestRss = async (sourceId: string, rssUrl?: string) => {
    if (!rssUrl) return;
    setRssTestStatus((prev) => ({ ...prev, [sourceId]: { loading: true } }));

    try {
      const res = await fetch(`/api/rss-sources?action=test&url=${encodeURIComponent(rssUrl)}`);
      const data = await res.json();
      if (data.success) {
        setRssTestStatus((prev) => ({
          ...prev,
          [sourceId]: {
            loading: false,
            ok: true,
            msg:
              lang === 'ru'
                ? `✓ 200 OK — ${data.itemsCount} свежих статей доступно прямо сейчас`
                : `✓ 200 OK — ${data.itemsCount} live articles currently in feed`,
          },
        }));
      } else {
        setRssTestStatus((prev) => ({
          ...prev,
          [sourceId]: {
            loading: false,
            ok: false,
            msg: data.error || (lang === 'ru' ? 'Ошибка связи с RSS' : 'RSS connection error'),
          },
        }));
      }
    } catch (e: any) {
      setRssTestStatus((prev) => ({
        ...prev,
        [sourceId]: {
          loading: false,
          ok: false,
          msg: e.message || (lang === 'ru' ? 'Сбой соединения' : 'Connection failed'),
        },
      }));
    }
  };

  const handleSyncSource = async (sourceId: string) => {
    if (!onSyncSingleSource) return;
    setRssParsingId(sourceId);
    try {
      const count = await onSyncSingleSource(sourceId);
      setRssTestStatus((prev) => ({
        ...prev,
        [sourceId]: {
          ok: true,
          msg:
            lang === 'ru'
              ? `✓ Загружено ${count} статей в дайджест!`
              : `✓ Loaded ${count} articles into digest!`,
        },
      }));
    } catch (e: any) {
      setRssTestStatus((prev) => ({
        ...prev,
        [sourceId]: {
          ok: false,
          msg: e.message || 'Ошибка парсинга',
        },
      }));
    } finally {
      setRssParsingId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortalName.trim() || !newPortalUrl.trim()) return;

    let formattedUrl = newPortalUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    let formattedRss = newPortalRssUrl.trim();
    if (formattedRss && !formattedRss.startsWith('http://') && !formattedRss.startsWith('https://')) {
      formattedRss = `https://${formattedRss}`;
    }

    const createdSource: PortalSource = {
      id: `custom-${Date.now()}`,
      name: newPortalName.trim(),
      url: formattedUrl,
      rssUrl: formattedRss || undefined,
      category: newPortalCategory as any,
      description: {
        ru: newPortalDesc.trim() || `Пользовательский портал: ${newPortalName.trim()}`,
        en: newPortalDesc.trim() || `Custom portal: ${newPortalName.trim()}`,
      },
      country: newPortalCountry.trim() || 'Global',
      language: 'multilingual',
      isActive: true,
      isCustom: true,
      articlesCount: 1,
      lastSyncedAt: new Date().toISOString(),
    };

    setIsSavingSource(true);
    try {
      // Save directly to data/rss-sources.json via API
      await fetch('/api/rss-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newSource: createdSource }),
      });

      onAddSource(createdSource);
      setAddSuccessMsg(
        lang === 'ru'
          ? `✓ Портал «${createdSource.name}» успешно сохранен в data/rss-sources.json!`
          : `✓ Portal "${createdSource.name}" saved to data/rss-sources.json!`
      );

      setNewPortalName('');
      setNewPortalUrl('');
      setNewPortalRssUrl('');
      setNewPortalDesc('');
      setTimeout(() => {
        setAddSuccessMsg('');
        setActiveTab('list');
      }, 2000);
    } catch {
      onAddSource(createdSource);
    } finally {
      setIsSavingSource(false);
    }
  };

  const handleParseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parseUrl.trim()) return;

    setIsParsing(true);
    setParseError('');
    setParseSuccess(null);

    try {
      const res = await fetch('/api/parse-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: parseUrl.trim(),
          category: parseCategory,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract article');
      }

      setParseSuccess(data.article);
      onArticleParsed(data.article);
      setParseUrl('');
    } catch (err: any) {
      setParseError(err.message || 'Ошибка парсинга статьи');
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-4xl bg-white border-2 border-black max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-black text-white border-b-2 border-black flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-white/70 tracking-widest uppercase flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-white/80" />
              <span>data/rss-sources.json</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
              {sm.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-white hover:bg-white hover:text-black transition-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-black bg-[#F4F4F0] overflow-x-auto divide-x divide-black font-mono text-xs font-bold uppercase">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`px-5 py-3 flex items-center gap-2 cursor-pointer transition-none ${
              activeTab === 'list' ? 'bg-white text-black border-b-2 border-b-white' : 'text-black/70 hover:bg-black/10'
            }`}
          >
            <Rss className="w-4 h-4 text-black" />
            <span>{sm.tabList} ({sources.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`px-5 py-3 flex items-center gap-2 cursor-pointer transition-none ${
              activeTab === 'add' ? 'bg-white text-black border-b-2 border-b-white' : 'text-black/70 hover:bg-black/10'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{sm.tabAdd}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('parse')}
            className={`px-5 py-3 flex items-center gap-2 cursor-pointer transition-none ${
              activeTab === 'parse' ? 'bg-white text-black border-b-2 border-b-white' : 'text-black/70 hover:bg-black/10'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>{sm.tabParse}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F4F4F0]">
          {/* TAB 1: ALL SOURCES & RSS LIST */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Informational file banner */}
              <div className="p-3.5 bg-black text-white font-mono text-xs border border-black flex items-start gap-3">
                <FileCode className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold uppercase tracking-wider">
                    {lang === 'ru' ? 'Конфигурация RSS-лент' : 'RSS Feeds Configuration'}
                  </div>
                  <div className="text-white/80 mt-0.5">
                    {sm.fileNotice}
                  </div>
                </div>
              </div>

              <div className="font-mono text-xs text-black/70 uppercase mb-2 flex items-center justify-between">
                <span>
                  {lang === 'ru'
                    ? 'Список всех мировых порталов и их проверенных RSS-лент:'
                    : 'List of world architectural portals and their verified RSS feeds:'}
                </span>
                <span className="font-bold text-black">
                  {sources.filter((s) => s.isActive).length} / {sources.length} АКТИВНО
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {sources.map((src) => {
                  const testState = rssTestStatus[src.id];
                  const isSyncingThis = rssParsingId === src.id;

                  return (
                    <div
                      key={src.id}
                      className={`border-2 border-black p-4 bg-white flex flex-col justify-between transition-none ${
                        src.isActive ? 'border-l-8 border-l-black' : 'opacity-70 bg-gray-50'
                      }`}
                    >
                      <div>
                        {/* Title and Active Status Switch */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-base uppercase text-black tracking-tight">
                              {src.name}
                            </span>
                            <span className="border border-black text-black text-[10px] font-mono px-2 py-0.5 uppercase font-bold">
                              {src.category}
                            </span>
                            <span className="text-[11px] font-mono text-black/60 uppercase">
                              • {src.country}
                            </span>
                            {src.isCustom && (
                              <span className="bg-black text-white text-[9px] font-mono px-1.5 py-0.5 uppercase">
                                CUSTOM
                              </span>
                            )}
                          </div>

                          {/* Toggle Active Button */}
                          <button
                            type="button"
                            onClick={() => onToggleSource(src.id)}
                            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold border-2 border-black transition-none cursor-pointer flex items-center gap-1 ${
                              src.isActive
                                ? 'bg-black text-white'
                                : 'bg-white text-black hover:bg-black/10'
                            }`}
                          >
                            {src.isActive ? <Check className="w-3.5 h-3.5" /> : null}
                            <span>{src.isActive ? sm.activeStatus : sm.inactiveStatus}</span>
                          </button>
                        </div>

                        {/* Description */}
                        <p className="mt-2 text-xs text-black/80 font-sans">
                          {src.description[lang] || src.description.en}
                        </p>

                        {/* RSS Feed Box */}
                        {src.rssUrl ? (
                          <div className="mt-3 p-2 bg-[#F4F4F0] border border-black/30 font-mono text-[11px] flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                              <Rss className="w-3.5 h-3.5 text-black shrink-0" />
                              <span className="font-bold text-black/60 uppercase">{sm.rssLabel}</span>
                              <span className="text-black font-semibold truncate select-all">{src.rssUrl}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Test RSS Button */}
                              <button
                                type="button"
                                onClick={() => handleTestRss(src.id, src.rssUrl)}
                                disabled={testState?.loading}
                                className="px-2 py-1 bg-white border border-black font-mono text-[10px] uppercase font-bold hover:bg-black hover:text-white cursor-pointer transition-none flex items-center gap-1 disabled:opacity-50"
                              >
                                {testState?.loading ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-3 h-3 text-black" />
                                )}
                                <span>{sm.testRssBtn}</span>
                              </button>

                              {/* Parse RSS button */}
                              {onSyncSingleSource && (
                                <button
                                  type="button"
                                  onClick={() => handleSyncSource(src.id)}
                                  disabled={isSyncingThis}
                                  className="px-2.5 py-1 bg-black text-white border border-black font-mono text-[10px] uppercase font-bold hover:bg-black/80 cursor-pointer transition-none flex items-center gap-1 disabled:opacity-50"
                                >
                                  {isSyncingThis ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Sparkles className="w-3 h-3" />
                                  )}
                                  <span>{sm.parseRssBtn}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 text-xs font-mono text-black/50">
                            {lang === 'ru' ? 'Прямой парсинг HTML по запросу' : 'Direct HTML parsing'}
                          </div>
                        )}

                        {/* Test Status Feedback */}
                        {testState?.msg && (
                          <div
                            className={`mt-2 p-2 border font-mono text-xs flex items-center gap-1.5 ${
                              testState.ok
                                ? 'bg-green-50 border-green-700 text-green-900 font-bold'
                                : 'bg-red-50 border-red-700 text-red-900 font-bold'
                            }`}
                          >
                            {testState.ok ? (
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700" />
                            ) : (
                              <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
                            )}
                            <span>{testState.msg}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer Link */}
                      <div className="mt-3 pt-2.5 border-t border-black/20 flex items-center justify-between font-mono text-[11px] text-black/70">
                        <span className="uppercase text-[10px]">
                          ID: {src.id}
                        </span>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black font-bold uppercase hover:underline flex items-center gap-1"
                        >
                          <span>{sm.visitPortal} ({src.name})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADD RSS SOURCE */}
          {activeTab === 'add' && (
            <div className="max-w-xl mx-auto bg-white border-2 border-black p-6 space-y-5">
              <div className="border-b border-black pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-black/70 uppercase">
                  <FileCode className="w-4 h-4" />
                  <span>data/rss-sources.json</span>
                </div>
                <h3 className="font-black uppercase text-xl text-black mt-1">
                  {sm.addForm.submit}
                </h3>
                <p className="font-mono text-xs text-black/70 mt-1">
                  {lang === 'ru'
                    ? 'Новый источник будет сохранен в файл data/rss-sources.json и сразу появится в списке дайджеста.'
                    : 'The new source will be stored in data/rss-sources.json and immediately accessible in the digest.'}
                </p>
              </div>

              {addSuccessMsg && (
                <div className="p-3 bg-black text-white font-mono text-xs font-bold uppercase flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>{addSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                    {sm.addForm.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPortalName}
                    onChange={(e) => setNewPortalName(e.target.value)}
                    placeholder={sm.addForm.namePlaceholder}
                    className="w-full px-3 py-2 border border-black text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                    {sm.addForm.urlLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPortalUrl}
                    onChange={(e) => setNewPortalUrl(e.target.value)}
                    placeholder={sm.addForm.urlPlaceholder}
                    className="w-full px-3 py-2 border border-black text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-black mb-1 flex items-center justify-between">
                    <span>{sm.addForm.rssLabel}</span>
                    <span className="text-[10px] text-black/60 font-normal">
                      {lang === 'ru' ? 'Для автоматической синхронизации' : 'For daily automated sync'}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={newPortalRssUrl}
                    onChange={(e) => setNewPortalRssUrl(e.target.value)}
                    placeholder={sm.addForm.rssPlaceholder}
                    className="w-full px-3 py-2 border border-black text-sm font-mono focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                      {sm.addForm.catLabel}
                    </label>
                    <select
                      value={newPortalCategory}
                      onChange={(e) => setNewPortalCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-black text-sm font-mono uppercase bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="architecture">{t.categories.architecture}</option>
                      <option value="interior">{t.categories.interior}</option>
                      <option value="urbanism">{t.categories.urbanism}</option>
                      <option value="culture">{t.categories.culture}</option>
                      <option value="design">Дизайн / Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                      {lang === 'ru' ? 'Страна / Регион' : 'Country / Region'}
                    </label>
                    <input
                      type="text"
                      value={newPortalCountry}
                      onChange={(e) => setNewPortalCountry(e.target.value)}
                      placeholder="Global, USA, UK, Italy..."
                      className="w-full px-3 py-2 border border-black text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                    {sm.addForm.descLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={newPortalDesc}
                    onChange={(e) => setNewPortalDesc(e.target.value)}
                    placeholder={sm.addForm.descPlaceholder}
                    className="w-full px-3 py-2 border border-black text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingSource}
                  className="w-full py-3 bg-black text-white font-mono text-xs uppercase font-bold hover:bg-black/90 transition-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingSource ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>{sm.addForm.submit}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: PARSE ARTICLE BY URL */}
          {activeTab === 'parse' && (
            <div className="max-w-xl mx-auto bg-white border-2 border-black p-6 space-y-5">
              <div className="border-b border-black pb-3">
                <div className="flex items-center gap-2 text-black font-black uppercase text-xl">
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>{sm.tabParse}</span>
                </div>
                <p className="font-mono text-xs text-black/70 mt-1">
                  {sm.parseForm.hint}
                </p>
              </div>

              {parseError && (
                <div className="p-3 bg-red-100 border border-black text-red-900 font-mono text-xs font-bold">
                  {parseError}
                </div>
              )}

              {parseSuccess && (
                <div className="p-4 bg-[#F4F4F0] border-2 border-black space-y-3">
                  <div className="flex items-center gap-2 text-black font-mono font-bold text-xs uppercase">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>
                      {lang === 'ru' ? 'ПОЛНАЯ СТАТЬЯ УСПЕШНО ИЗВЛЕЧЕНА И ДОБАВЛЕНА!' : 'FULL ARTICLE EXTRACTED & ADDED!'}
                    </span>
                  </div>
                  <div className="font-black uppercase text-base text-black leading-snug">
                    {parseSuccess.title[lang]}
                  </div>
                  <div className="font-mono text-[11px] text-black/70 uppercase">
                    {parseSuccess.source} • {parseSuccess.gallery.length} ОРИГИНАЛЬНЫХ ФОТО • ТОЧНАЯ ССЫЛКА НА ОРИГИНАЛ
                  </div>
                  <div className="font-mono text-[10px] text-black/60 truncate">
                    {parseSuccess.originalUrl}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                    }}
                    className="mt-2 px-4 py-2 bg-black text-white font-mono text-xs uppercase font-bold hover:bg-black/80 cursor-pointer"
                  >
                    {lang === 'ru' ? 'Перейти к чтению статьи' : 'Go to Article Reader'}
                  </button>
                </div>
              )}

              <form onSubmit={handleParseSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                    {sm.parseForm.urlLabel} *
                  </label>
                  <input
                    type="url"
                    required
                    value={parseUrl}
                    onChange={(e) => setParseUrl(e.target.value)}
                    placeholder={sm.parseForm.urlPlaceholder}
                    disabled={isParsing}
                    className="w-full px-3 py-2 border border-black text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                    {sm.parseForm.catLabel}
                  </label>
                  <select
                    value={parseCategory}
                    onChange={(e) => setParseCategory(e.target.value as any)}
                    disabled={isParsing}
                    className="w-full px-3 py-2 border border-black text-sm font-mono uppercase bg-white focus:outline-none cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="architecture">{t.categories.architecture}</option>
                    <option value="interior">{t.categories.interior}</option>
                    <option value="urbanism">{t.categories.urbanism}</option>
                    <option value="culture">{t.categories.culture}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isParsing || !parseUrl.trim()}
                  className="w-full py-3 bg-black text-white font-mono text-xs uppercase font-bold hover:bg-black/90 transition-none cursor-pointer flex items-center justify-center gap-2 disabled:bg-black/50"
                >
                  {isParsing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{sm.parseForm.parsing}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{sm.parseForm.submit}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
