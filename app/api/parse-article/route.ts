import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { Article } from '@/types/article';
import { decodeHtmlEntities, stripHtml } from '@/lib/rssParser';

export async function POST(req: NextRequest) {
  try {
    const { url, category = 'architecture' } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Неверный формат URL ссылки' }, { status: 400 });
    }

    // Fetch the webpage HTML
    let html = '';
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8',
        },
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      html = await response.text();
    } catch (err: any) {
      console.warn('Direct fetch failed, fallback parsing:', err.message);
    }

    // Extract OpenGraph and basic meta tags via regex
    const ogTitleMatch =
      html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
    const ogDescMatch =
      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
    const ogImageMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    const titleTagMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

    let rawTitle = (ogTitleMatch ? ogTitleMatch[1] : titleTagMatch ? titleTagMatch[1] : 'Новый архитектурный проект').trim();
    rawTitle = rawTitle.replace(/\s*\|\s*(ArchDaily|Dezeen|Designboom|Domus|Wallpaper\*|Architectural Digest).*$/i, '').trim();
    rawTitle = decodeHtmlEntities(rawTitle);

    const rawSummary = decodeHtmlEntities((ogDescMatch ? ogDescMatch[1] : '').trim());

    // Extract real images from HTML
    const foundImages: string[] = [];
    if (ogImageMatch && ogImageMatch[1]) {
      foundImages.push(ogImageMatch[1]);
    }

    const imgMatches = html.matchAll(/<img[^>]+src=["'](https?:\/\/[^"'\s]+)["'][^>]*>/gi);
    for (const match of imgMatches) {
      const src = match[1];
      if (
        !src.includes('avatar') &&
        !src.includes('logo') &&
        !src.includes('icon') &&
        !src.includes('tracker') &&
        !src.includes('badge') &&
        !src.includes('pixel') &&
        (src.endsWith('.jpg') ||
          src.endsWith('.jpeg') ||
          src.endsWith('.png') ||
          src.endsWith('.webp') ||
          src.includes('image') ||
          src.includes('uploads') ||
          src.includes('adsttc') ||
          src.includes('futurecdn'))
      ) {
        if (!foundImages.includes(src)) {
          foundImages.push(src);
        }
      }
      if (foundImages.length >= 8) break;
    }

    // Source domain detection
    const hostname = parsedUrl.hostname.replace(/^www\./, '');
    let sourceName = hostname.split('.')[0].toUpperCase();
    if (hostname.includes('archdaily')) sourceName = 'ARCHDAILY';
    else if (hostname.includes('dezeen')) sourceName = 'DEZEEN';
    else if (hostname.includes('designboom')) sourceName = 'DESIGNBOOM';
    else if (hostname.includes('domus')) sourceName = 'DOMUS';
    else if (hostname.includes('wallpaper')) sourceName = 'WALLPAPER*';
    else if (hostname.includes('architecturaldigest')) sourceName = 'ARCHITECTURAL DIGEST';
    else if (hostname.includes('design-milk')) sourceName = 'DESIGN MILK';
    else if (hostname.includes('yellowtrace')) sourceName = 'YELLOWTRACE';

    // Extract ALL real paragraphs from the page
    const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    const rawParagraphs: string[] = [];
    for (const m of pMatches) {
      const pText = stripHtml(m[1]);
      if (
        pText.length > 50 &&
        !pText.includes('ShareFacebook') &&
        !pText.includes('Clipboard') &&
        !pText.includes('cookie') &&
        !pText.includes('privacy policy') &&
        !pText.includes('All rights reserved') &&
        !pText.includes('subscribe') &&
        !pText.includes('Advertisement')
      ) {
        rawParagraphs.push(pText);
      }
    }

    // Extract specifications from HTML or JSON-LD if present
    let architect = 'Ведущее архитектурное бюро';
    let location = 'Мировая локация';
    let year: string | number = new Date().getFullYear();
    let area = 'По проекту';

    // Try finding architect in title (e.g. "Project / Architect Name")
    if (rawTitle.includes(' / ')) {
      const parts = rawTitle.split(' / ');
      if (parts[1]) architect = parts[1].trim();
    } else if (rawTitle.includes(' by ')) {
      const parts = rawTitle.split(' by ');
      if (parts[1]) architect = parts[1].trim();
    }

    const archMatch = html.match(/Architects?:?\s*<[^>]+>([^<]+)<\/a>/i) || html.match(/Architects?:?\s*([^\n<,]+)/i);
    if (archMatch && archMatch[1]?.length > 2 && archMatch[1].length < 60) {
      architect = decodeHtmlEntities(archMatch[1].trim());
    }

    const locMatch = html.match(/(?:Location|City|Place):?\s*<[^>]+>([^<]+)<\/a>/i) || html.match(/(?:Location|City):?\s*([^\n<]+)/i);
    if (locMatch && locMatch[1]?.length > 2 && locMatch[1].length < 60) {
      location = decodeHtmlEntities(locMatch[1].trim());
    }

    const yearMatch = html.match(/Year:?\s*([12][09][0-9]{2})/i);
    if (yearMatch) year = parseInt(yearMatch[1], 10);

    const areaMatch = html.match(/Area:?\s*([0-9\s,.]+\s*(?:m²|m2|sqm|sq\s*ft))/i);
    if (areaMatch) area = decodeHtmlEntities(areaMatch[1].trim());

    // Build comprehensive sections from the extracted real text
    const fullTextBody = rawParagraphs.join('\n\n');
    let leadEn = rawParagraphs[0] || rawSummary || `Full detailed coverage published by ${sourceName}.`;
    let leadRu = rawSummary || leadEn;

    let generatedSectionsEn = [];
    if (rawParagraphs.length > 1) {
      const otherPs = rawParagraphs.slice(1);
      const chunkSize = Math.max(1, Math.ceil(otherPs.length / 3));
      for (let i = 0; i < otherPs.length; i += chunkSize) {
        const chunk = otherPs.slice(i, i + chunkSize);
        let heading = 'Архитектурный контекст и функциональная программа';
        if (i === 0) heading = 'Пространственная концепция и генеральный план';
        else if (i >= chunkSize * 2) heading = 'Материалы, тектоника и инженерные решения';
        generatedSectionsEn.push({
          heading,
          text: chunk.join('\n\n'),
        });
      }
    } else {
      generatedSectionsEn.push({
        heading: 'Архитектурный обзор проекта',
        text: fullTextBody || rawSummary || 'Полный текст публикации доступен по оригинальной ссылке источника.',
      });
    }

    let generatedSectionsRu = generatedSectionsEn.map((s, idx) => ({
      heading:
        idx === 0
          ? 'Пространственная концепция и генеральный план'
          : idx === 1
          ? 'Архитектурный контекст и функциональная программа'
          : 'Материалы, тектоника и инженерные решения',
      text: s.text,
    }));

    // If Gemini API Key exists, generate full Russian translation and enrichment preserving ALL facts
    if (process.env.GEMINI_API_KEY && (rawParagraphs.length > 0 || rawSummary)) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are a senior architectural critic and editor for a prestigious global architecture news digest.
We are copying and publishing a complete article from ${sourceName}.
Original Title: "${rawTitle}"
Original URL: "${url}"
Original Lead/Summary: "${rawSummary}"
Original Extracted Article Text:
"""
${rawParagraphs.slice(0, 10).join('\n\n')}
"""

Translate and structure this article into a COMPLETE, FULL-LENGTH publication with both Russian and English versions.
CRITICAL: Do NOT shorten, truncate, or summarize! Preserve all project descriptions, dimensions, materials, spatial flow, and context in full detail.

Respond with pure JSON matching this schema:
{
  "titleRu": "string",
  "titleEn": "string",
  "summaryRu": "string (comprehensive, 2-3 sentences)",
  "summaryEn": "string (comprehensive, 2-3 sentences)",
  "leadRu": "string (complete opening paragraphs)",
  "leadEn": "string (complete opening paragraphs)",
  "architect": "string",
  "location": "string",
  "year": "number or string",
  "area": "string",
  "sectionsRu": [
    { "heading": "string", "text": "string (full comprehensive text)" },
    { "heading": "string", "text": "string (full comprehensive text)" },
    { "heading": "string", "text": "string (full comprehensive text)" }
  ],
  "sectionsEn": [
    { "heading": "string", "text": "string (full comprehensive text)" },
    { "heading": "string", "text": "string (full comprehensive text)" },
    { "heading": "string", "text": "string (full comprehensive text)" }
  ],
  "quote": {
    "text": "string",
    "author": "string"
  }
}
Return only JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);
          if (data.titleRu) rawTitle = data.titleRu;
          if (data.leadRu) leadRu = data.leadRu;
          if (data.sectionsRu?.length) generatedSectionsRu = data.sectionsRu;
          if (data.sectionsEn?.length) generatedSectionsEn = data.sectionsEn;
          if (data.architect) architect = data.architect;
          if (data.location) location = data.location;
          if (data.year) year = data.year;
          if (data.area) area = data.area;
        }
      } catch (geminiError: any) {
        console.warn('Gemini enrichment skipped or failed:', geminiError?.message);
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // Image URL proxies
    const mainImg =
      foundImages[0]
        ? `/api/image-proxy?url=${encodeURIComponent(foundImages[0])}`
        : '/images/projects/skoltech-main.jpg';

    // Build the final Article object with the exact URL
    const newArticle: Article = {
      id: `parsed-${Date.now()}`,
      source: sourceName,
      sourceUrl: parsedUrl.origin,
      publishedAt: todayStr,
      category: category as any,
      badge: 'СПАРСЕНО ИЗ ПОРТАЛА',
      isDailyFeatured: false,
      isCustomParsed: true,
      mainImage: mainImg,
      gallery: foundImages.slice(0, 6).map((img, idx) => ({
        url: `/api/image-proxy?url=${encodeURIComponent(img)}`,
        caption: {
          ru: `Фотография проекта из оригинальной публикации ${sourceName} (Ракурс ${idx + 1})`,
          en: `Project photograph from original publication on ${sourceName} (View ${idx + 1})`,
        },
      })),
      title: {
        ru: rawTitle,
        en: rawTitle,
      },
      summary: {
        ru: leadRu.substring(0, 240) + '...',
        en: leadEn.substring(0, 240) + '...',
      },
      content: {
        ru: {
          lead: leadRu,
          sections: generatedSectionsRu,
          quote: {
            text: `«Архитектура этого проекта отражает дух времени и бескомпромиссное качество пространственной среды».`,
            author: architect,
          },
        },
        en: {
          lead: leadEn,
          sections: generatedSectionsEn,
          quote: {
            text: `“The architecture of this scheme embodies the zeitgeist and uncompromised civic quality.”`,
            author: architect,
          },
        },
      },
      originalUrl: url, // 100% EXACT ORIGINAL URL
      readTimeMinutes: Math.max(5, Math.ceil(fullTextBody.split(/\s+/).length / 160)),
      projectSpecs: {
        architect,
        location,
        year,
        area,
        typology: category.toUpperCase(),
      },
    };

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error: any) {
    console.error('Error in parse-article API:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse article' }, { status: 500 });
  }
}
