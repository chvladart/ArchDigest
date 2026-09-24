'use client';

import React from 'react';
import { Language, SortOption } from '@/types/article';
import { getT } from '@/lib/translations';
import { Search, X, ArrowUpDown } from 'lucide-react';

interface Props {
  lang: Language;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSource: string;
  onSourceChange: (source: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onResetFilters: () => void;
  totalCount: number;
  availableSources: string[];
  categories: Array<{ id: string; label: string }>;
}

export const FilterBar: React.FC<Props> = ({
  lang,
  selectedCategory,
  onCategoryChange,
  selectedSource,
  onSourceChange,
  sortOption,
  onSortChange,
  searchQuery,
  onSearchChange,
  onResetFilters,
  totalCount,
  availableSources,
  categories,
}) => {
  const t = getT(lang);
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSource !== 'all' ||
    searchQuery.trim().length > 0 ||
    sortOption !== 'date-desc';

  return (
    <div className="w-full border-b border-black bg-white select-none">
      {/* Search and Secondary Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black">
        {/* Search input (6 cols lg) */}
        <div className="lg:col-span-6 flex items-center border-b lg:border-b-0 lg:border-r border-black px-4 py-2 bg-white">
          <Search className="w-4 h-4 text-black mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-sm font-sans placeholder:text-black/50 text-black outline-none border-none p-0 focus:ring-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 hover:bg-black/10 text-black ml-2 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Source Dropdown Filter (3 cols lg) */}
        <div className="lg:col-span-3 flex items-center border-b sm:border-b-0 sm:border-r border-black px-4 py-2 bg-[#F4F4F0]">
          <span className="font-mono text-[10px] tracking-wider uppercase text-black font-bold mr-2 shrink-0">
            {t.sourceLabel}:
          </span>
          <select
            value={selectedSource}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full bg-transparent text-xs font-mono uppercase text-black font-bold outline-none cursor-pointer border-none p-0 focus:ring-0 truncate"
          >
            <option value="all">{t.sources.all}</option>
            {availableSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown (3 cols lg) */}
        <div className="lg:col-span-3 flex items-center justify-between px-4 py-2 bg-white">
          <div className="flex items-center w-full">
            <ArrowUpDown className="w-3.5 h-3.5 text-black mr-2 shrink-0" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-black font-bold mr-2 shrink-0">
              {t.sortLabel}:
            </span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full bg-transparent text-xs font-mono uppercase text-black font-bold outline-none cursor-pointer border-none p-0 focus:ring-0 truncate"
            >
              <option value="date-desc">{t.sortOptions['date-desc']}</option>
              <option value="date-asc">{t.sortOptions['date-asc']}</option>
              <option value="title-asc">{t.sortOptions['title-asc']}</option>
              <option value="source-asc">{t.sortOptions['source-asc']}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs & Counter Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between overflow-x-auto bg-[#F4F4F0]">
        {/* Category Horizontal Nav Buttons */}
        <div className="flex items-center overflow-x-auto no-scrollbar divide-x divide-black border-b md:border-b-0 border-black">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-tight whitespace-nowrap transition-none shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black hover:bg-black/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between md:justify-end px-4 py-2 gap-3 border-t md:border-t-0 md:border-l border-black bg-white md:bg-transparent">
          <div className="font-mono text-[11px] text-black">
            <span className="font-bold">[{totalCount}]</span> {t.articlesFound}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-2 py-0.5 border border-black text-[10px] font-mono uppercase font-bold bg-white text-black hover:bg-black hover:text-white cursor-pointer"
            >
              {t.resetFilters}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
