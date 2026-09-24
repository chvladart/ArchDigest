import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseRssFeed } from '@/lib/rssParser';
import { PortalSource } from '@/types/source';
import { Article } from '@/types/article';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { activeSources = [], specificSourceId } = body;

    const sourcesFilePath = path.join(process.cwd(), 'data', 'rss-sources.json');
    let allSources: PortalSource[] = [];

    if (fs.existsSync(sourcesFilePath)) {
      try {
        allSources = JSON.parse(fs.readFileSync(sourcesFilePath, 'utf8'));
      } catch {}
    }

    // Determine target sources to fetch
    let targets: PortalSource[] = [];
    if (specificSourceId) {
      targets = allSources.filter((s) => s.id === specificSourceId);
    } else if (activeSources.length > 0) {
      targets = allSources.filter((s) => activeSources.includes(s.id) || activeSources.includes(s.name));
    }

    if (targets.length === 0) {
      // Default to all active sources with rssUrl
      targets = allSources.filter((s) => s.isActive !== false && Boolean(s.rssUrl));
    }

    // Limit to top 5 sources per sync to prevent timeouts, ArchDaily first
    targets.sort((a, b) => (a.id === 'archdaily' ? -1 : b.id === 'archdaily' ? 1 : 0));
    const selectedTargets = targets.slice(0, 5);

    const syncPromises = selectedTargets.map(async (source) => {
      if (!source.rssUrl) return [];
      try {
        return await parseRssFeed(source.rssUrl, source);
      } catch (err: any) {
        console.warn(`Sync failed for ${source.name}:`, err.message);
        return [];
      }
    });

    const results = await Promise.allSettled(syncPromises);
    const newArticles: Article[] = [];

    for (const r of results) {
      if (r.status === 'fulfilled' && Array.isArray(r.value)) {
        newArticles.push(...r.value);
      }
    }

    const todayDate = new Date();
    const formattedDateStr = todayDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const timeStr = todayDate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return NextResponse.json({
      success: true,
      editionDate: todayDate.toISOString().split('T')[0],
      formattedDate: formattedDateStr,
      syncTime: timeStr,
      activeSourcesCount: selectedTargets.length,
      articles: newArticles,
      fetchedCount: newArticles.length,
      message: `Успешно спарсено ${newArticles.length} свежих статей из RSS источников (${selectedTargets.map((s) => s.name).join(', ')}) за ${formattedDateStr}, ${timeStr}.`,
    });
  } catch (error: any) {
    console.error('Daily sync error:', error);
    return NextResponse.json({ error: error.message || 'Sync failed' }, { status: 500 });
  }
}
