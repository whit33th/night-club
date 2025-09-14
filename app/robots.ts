import { clubInfo } from "@/lib/data/club-info";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/admin/",
    "/api/",
    "/_next/",
    "/convex/",
    "/*.json$",
    "/*_buildManifest.js$",
    "/*_ssgManifest.js$",
  ];
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pl/", "/en/", "/imgs/", "/videos/"],
        disallow: disallow,
      },

      {
        userAgent: "YandexBot",
        allow: ["/", "/pl/", "/en/", "/imgs/", "/videos/"],
        disallow: disallow,
        crawlDelay: 2,
      },
    ],
    sitemap: `${clubInfo.website}/sitemap.xml`,
    host: clubInfo.website,
  };
}
