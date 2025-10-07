import { clubInfo } from "@/lib/data/club-info";
import { i18n } from "@/lib/i18n-config";
import { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { generateNewsSlug } from "@/app/[lang]/news/_utils/slugUtils";
import { generateSlug } from "@/lib/slugUtils";

export const dynamic = "force-dynamic";
export const revalidate = 7200;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "/", changeFrequency: "daily" as const, priority: 1 },
    { path: "/events", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/news", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly" as const, priority: 0.6 },
    {
      path: "/legal/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    { path: "/legal/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ✅ Статические страницы
  staticPages.forEach((page) => {
    sitemapEntries.push({
      url: `${clubInfo.website}/${i18n.defaultLocale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          pl: `${clubInfo.website}/pl${page.path}`,
          en: `${clubInfo.website}/en${page.path}`,
        },
      },
    });
  });

  try {
    // ✅ Динамические страницы - события
    const events = await fetchQuery(api.admin.listEvents);
    const now = new Date();

    events.forEach((event) => {
      const isFutureEvent = new Date(event.date) > now;
      const eventSlug = generateSlug(event.title, event.date, event._id);

      sitemapEntries.push({
        url: `${clubInfo.website}/${i18n.defaultLocale}/events/${eventSlug}`,
        lastModified: new Date(event._creationTime),
        changeFrequency: isFutureEvent ? "daily" : "yearly",
        priority: isFutureEvent ? 0.9 : 0.4, // Будущие события важнее
        alternates: {
          languages: {
            pl: `${clubInfo.website}/pl/events/${eventSlug}`,
            en: `${clubInfo.website}/en/events/${eventSlug}`,
          },
        },
      });
    });

    // ✅ Динамические страницы - новости
    const news = await fetchQuery(api.admin.listNews);

    news.forEach((article) => {
      const articleSlug = generateNewsSlug(
        article.title,
        new Date(article._creationTime).toISOString().split("T")[0],
        article._id,
      );

      sitemapEntries.push({
        url: `${clubInfo.website}/${i18n.defaultLocale}/news/${articleSlug}`,
        lastModified: new Date(article._creationTime),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            pl: `${clubInfo.website}/pl/news/${articleSlug}`,
            en: `${clubInfo.website}/en/news/${articleSlug}`,
          },
        },
      });
    });
  } catch (error) {
    console.error("Error fetching dynamic content for sitemap:", error);
    // Продолжаем работу со статическими страницами
  }

  return sitemapEntries;
}
