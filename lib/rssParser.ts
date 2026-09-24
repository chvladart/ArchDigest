import { XMLParser } from 'fast-xml-parser';
import { Article, ArticleSection, GalleryItem } from '@/types/article';
import { PortalSource } from '@/types/source';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
  parseTagValue: false,
});

export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8212;/g, '—')
    .replace(/&#8211;/g, '–')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&eacute;/g, 'é')
    .replace(/&sup2;/g, '²')
    .replace(/&bull;/g, '•')
    .trim();
}

export function stripHtml(html: string): string {
  if (!html) return '';
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function extractImagesFromHtml(html: string): string[] {
  if (!html) return [];
  const found: string[] = [];
  const matches = html.matchAll(/<img[^>]+src=["'](https?:\/\/[^"'\s]+)["'][^>]*>/gi);
  for (const match of matches) {
    const src = match[1];
    if (
      !src.includes('avatar') &&
      !src.includes('logo') &&
      !src.includes('icon') &&
      !src.includes('tracker') &&
      !src.includes('badge') &&
      !src.includes('pixel') &&
      !src.includes('loader') &&
      (src.endsWith('.jpg') ||
        src.endsWith('.jpeg') ||
        src.endsWith('.png') ||
        src.endsWith('.webp') ||
        src.includes('image') ||
        src.includes('upload') ||
        src.includes('photos') ||
        src.includes('adsttc') ||
        src.includes('futurecdn'))
    ) {
      if (!found.includes(src)) {
        found.push(src);
      }
    }
  }
  return found;
}

export async function parseRssFeed(rssUrl: string, sourceMeta: PortalSource): Promise<Article[]> {
  try {
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*;q=0.9',
      },
      redirect: 'follow',
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed (${response.status} ${response.statusText})`);
    }

    const xmlText = await response.text();
    const parsedData = xmlParser.parse(xmlText);

    // Support standard RSS channel.item or Atom feed.entry
    let rawItems =
      parsedData?.rss?.channel?.item ||
      parsedData?.['rdf:RDF']?.item ||
      parsedData?.feed?.entry ||
      [];

    if (!Array.isArray(rawItems)) {
      rawItems = [rawItems];
    }

    if (rawItems.length === 0) {
      return [];
    }

    const articles: Article[] = [];

    // Parse up to 6 latest items per feed for rich and fast sync
    for (let i = 0; i < Math.min(rawItems.length, 6); i++) {
      const item = rawItems[i];

      // 1. Title
      let rawTitle = item.title?.['#text'] || item.title || 'Новый архитектурный проект';
      rawTitle = decodeHtmlEntities(String(rawTitle)).trim();

      // 2. Canonical Real URL - Priority: feedburner:origLink, then direct link, then guid
      let rawLink =
        item['feedburner:origLink'] ||
        (typeof item.link === 'string' ? item.link : item.link?.['#text']) ||
        (item.link?.['@_href'] ? item.link['@_href'] : '') ||
        (typeof item.guid === 'string' && item.guid.startsWith('http') ? item.guid : item.guid?.['#text']) ||
        '';

      if (rawLink && typeof rawLink === 'string') {
        try {
          const u = new URL(rawLink);
          u.searchParams.delete('utm_source');
          u.searchParams.delete('utm_medium');
          u.searchParams.delete('utm_campaign');
          u.searchParams.delete('utm_content');
          rawLink = u.toString();
        } catch {}
      }

      if (!rawLink) {
        continue;
      }

      // 3. Date
      let publishedAt = new Date().toISOString().split('T')[0];
      const rawDate = item.pubDate || item['dc:date'] || item.published || item.updated;
      if (rawDate) {
        try {
          const d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            publishedAt = d.toISOString().split('T')[0];
          }
        } catch {}
      }

      // 4. Author / Creator
      let author =
        item['dc:creator']?.['#text'] ||
        item['dc:creator'] ||
        item.author?.name ||
        item.author ||
        sourceMeta.name;
      if (typeof author === 'object') author = sourceMeta.name;
      author = decodeHtmlEntities(String(author));

      // 5. Images extraction
      const foundImages: string[] = [];

      // Enclosure (ArchDaily uses this for original high-res photography)
      if (item.enclosure?.['@_url']) {
        foundImages.push(item.enclosure['@_url']);
      }

      // Media content or thumbnail
      if (item['media:content']?.['@_url']) {
        foundImages.push(item['media:content']['@_url']);
      }
      if (item['media:thumbnail']?.['@_url']) {
        foundImages.push(item['media:thumbnail']['@_url']);
      }

      // Images in content:encoded, dc:content, or description
      const fullHtml =
        (item['content:encoded'] ? String(item['content:encoded']) : '') +
        ' ' +
        (item['dc:content'] ? String(item['dc:content']) : '') +
        ' ' +
        (item.description ? String(item.description) : '');

      const htmlImages = extractImagesFromHtml(fullHtml);
      for (const img of htmlImages) {
        if (!foundImages.includes(img)) {
          foundImages.push(img);
        }
      }

      const mainImage =
        foundImages.length > 0
          ? `/api/image-proxy?url=${encodeURIComponent(foundImages[0])}`
          : '/images/projects/skoltech-main.jpg';

      const gallery: GalleryItem[] = foundImages.slice(0, 5).map((imgUrl, idx) => ({
        url: `/api/image-proxy?url=${encodeURIComponent(imgUrl)}`,
        caption: {
          ru: `Оригинальная фотография объекта из публикации ${sourceMeta.name} (Ракурс ${idx + 1})`,
          en: `Original project photograph from ${sourceMeta.name} dispatch (View ${idx + 1})`,
        },
      }));

      // 6. Text extraction
      const paragraphMatches = [...fullHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      const rawParagraphs: string[] = [];
      for (const pMatch of paragraphMatches) {
        const text = stripHtml(pMatch[1]);
        if (
          text.length > 40 &&
          !text.includes('The post') &&
          !text.includes('appeared first on') &&
          !text.includes('All rights reserved') &&
          !text.includes('Subscribe to') &&
          !text.includes('ShareFacebook')
        ) {
          rawParagraphs.push(text);
        }
      }

      const rawDescription = stripHtml(String(item.description || ''));

      // Formulate Lead
      const leadEn = rawParagraphs[0] || rawDescription || rawTitle;

      // Group paragraphs into comprehensive sections (NO TRUNCATION!)
      const sectionsEn: ArticleSection[] = [];
      if (rawParagraphs.length > 1) {
        const remainingPs = rawParagraphs.slice(1);
        const chunkSize = Math.max(1, Math.ceil(remainingPs.length / 3));

        for (let sIdx = 0; sIdx < remainingPs.length; sIdx += chunkSize) {
          const group = remainingPs.slice(sIdx, sIdx + chunkSize);
          let heading = 'Architectural Concept & Spatial Design';
          if (sIdx === 0) heading = 'Programmatic Structure and Context';
          else if (sIdx >= chunkSize * 2) heading = 'Materiality, Craft & Environmental Performance';

          sectionsEn.push({
            heading,
            text: group.join('\n\n'),
          });
        }
      } else {
        sectionsEn.push({
          heading: 'Architectural Review & Project Scope',
          text:
            rawDescription ||
            `Full dispatch published by ${sourceMeta.name} covering contemporary architectural discourse, spatial materiality, and tectonic execution. Read the complete verified coverage on the original publication.`,
        });
      }

      // Build Russian sections preserving all paragraph details
      const sectionsRu: ArticleSection[] = sectionsEn.map((s, idx) => ({
        heading:
          idx === 0
            ? 'Архитектурная концепция и пространственное решение'
            : idx === 1
            ? 'Конструктивные решения, тектоника и материалы'
            : 'Взаимодействие со средой и пользовательский опыт',
        text: s.text,
      }));

      const totalWords = (leadEn + ' ' + sectionsEn.map((s) => s.text).join(' ')).split(/\s+/).length;
      const readTimeMinutes = Math.max(4, Math.ceil(totalWords / 160));

      const articleId = `rss-${sourceMeta.id}-${Date.now()}-${i}`;

      const newArticle: Article = {
        id: articleId,
        source: sourceMeta.name.toUpperCase(),
        sourceUrl: sourceMeta.url,
        publishedAt,
        category: (sourceMeta.category as any) || 'architecture',
        badge: i === 0 ? 'СВЕЖИЙ ВЫПУСК RSS' : 'RSS ДАЙДЖЕСТ',
        isDailyFeatured: i === 0,
        mainImage,
        gallery,
        title: {
          ru: rawTitle,
          en: rawTitle,
        },
        summary: {
          ru: leadEn.substring(0, 240) + '...',
          en: leadEn.substring(0, 240) + '...',
        },
        content: {
          ru: {
            lead: leadEn,
            sections: sectionsRu,
            quote: {
              text: `«Этот проект демонстрирует высочайшую культуру проектирования и чуткое отношение к окружению».`,
              author: author || sourceMeta.name,
            },
          },
          en: {
            lead: leadEn,
            sections: sectionsEn,
            quote: {
              text: `“This project embodies an exemplary standard of architectural rigor and environmental sensitivity.”`,
              author: author || sourceMeta.name,
            },
          },
        },
        originalUrl: rawLink,
        readTimeMinutes,
        projectSpecs: {
          architect: author || sourceMeta.name,
          location: sourceMeta.country,
          year: new Date().getFullYear(),
          area: 'По спецификации проекта',
          typology: sourceMeta.category.toUpperCase(),
        },
      };

      articles.push(newArticle);
    }

    return articles;
  } catch (error: any) {
    console.error(`Error parsing RSS feed for ${sourceMeta.name} (${rssUrl}):`, error.message);
    return [];
  }
}
