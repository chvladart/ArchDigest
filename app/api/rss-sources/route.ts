import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

const sourcesFilePath = path.join(process.cwd(), 'data', 'rss-sources.json');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    // Test a specific RSS feed URL live
    if (action === 'test') {
      const testUrl = searchParams.get('url');
      if (!testUrl) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
      }

      try {
        const response = await fetch(testUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          },
          redirect: 'follow',
        });

        if (!response.ok) {
          return NextResponse.json({
            success: false,
            status: response.status,
            error: `Сервер источника ответил с кодом HTTP ${response.status}`,
          });
        }

        const xml = await response.text();
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '@_',
          textNodeName: '#text',
        });
        const parsed = parser.parse(xml);
        let items =
          parsed?.rss?.channel?.item ||
          parsed?.['rdf:RDF']?.item ||
          parsed?.feed?.entry ||
          [];
        if (!Array.isArray(items)) items = items ? [items] : [];

        const feedTitle =
          parsed?.rss?.channel?.title?.['#text'] ||
          parsed?.rss?.channel?.title ||
          parsed?.feed?.title?.['#text'] ||
          parsed?.feed?.title ||
          'RSS Источник';

        return NextResponse.json({
          success: true,
          status: 200,
          feedTitle,
          itemsCount: items.length,
          firstItemTitle: items[0]?.title?.['#text'] || items[0]?.title || 'Без названия',
          firstItemLink:
            items[0]?.['feedburner:origLink'] ||
            items[0]?.link?.['#text'] ||
            items[0]?.link ||
            items[0]?.guid?.['#text'] ||
            items[0]?.guid ||
            '',
        });
      } catch (err: any) {
        return NextResponse.json({
          success: false,
          error: `Ошибка соединения с RSS: ${err.message}`,
        });
      }
    }

    // Default: read sources file
    if (!fs.existsSync(sourcesFilePath)) {
      return NextResponse.json({ sources: [] });
    }

    const fileContent = fs.readFileSync(sourcesFilePath, 'utf8');
    const sources = JSON.parse(fileContent);
    return NextResponse.json({ sources });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to read sources' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sources, newSource } = body;

    let currentSources: any[] = [];
    if (fs.existsSync(sourcesFilePath)) {
      try {
        currentSources = JSON.parse(fs.readFileSync(sourcesFilePath, 'utf8'));
      } catch {}
    }

    let updatedSources = currentSources;

    if (Array.isArray(sources)) {
      updatedSources = sources;
    } else if (newSource) {
      // Add or update individual source
      const existingIdx = updatedSources.findIndex((s) => s.id === newSource.id);
      if (existingIdx >= 0) {
        updatedSources[existingIdx] = { ...updatedSources[existingIdx], ...newSource };
      } else {
        updatedSources = [newSource, ...updatedSources];
      }
    }

    fs.writeFileSync(sourcesFilePath, JSON.stringify(updatedSources, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Файл rss-sources.json успешно сохранен и обновлен.',
      sources: updatedSources,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update sources' }, { status: 500 });
  }
}
