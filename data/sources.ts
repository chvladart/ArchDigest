import { PortalSource } from '@/types/source';
import rssSourcesData from './rss-sources.json';

export const INITIAL_SOURCES: PortalSource[] = (rssSourcesData as any[]).map((s, idx) => ({
  id: s.id || `source-${idx}`,
  name: s.name,
  url: s.url,
  category: s.category || 'architecture',
  description: s.description || {
    ru: 'Архитектурный портал с ежедневными публикациями и новостями.',
    en: 'Architecture portal with daily publications and architectural coverage.',
  },
  country: s.country || 'Global',
  language: s.language || 'en',
  isActive: s.isActive ?? true,
  articlesCount: 24,
  lastSyncedAt: '2026-09-24T08:00:00Z',
  rssUrl: s.rssUrl,
}));
