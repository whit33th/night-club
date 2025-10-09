import AppearanceEffect from "@/components/Providers/AppearanceEffect";
import ConvexClientProvider from "@/components/Providers/ConvexClientProvider";
import { ImageKitProviderWrapper } from "@/components/Providers/ImageKitProvider";
import { LanguageProvider } from "@/components/Providers/LanguageProvider";
import LenisProvider from "@/components/Providers/LenisProvider";
import JsonLdMainPage from "@/components/SEO/StructuredData";
import Footer from "@/components/UI/Footer/Footer";
import Nav from "@/components/UI/Header/Nav";
import { clubInfo } from "@/lib/data/club-info";
import { localeMap } from "@/lib/date-utils";
import { getDictionary } from "@/lib/get-dictionary";
import { i18n, Locale } from "@/lib/i18n-config";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const locale = lang === "pl" ? "pl" : "en";

  return {
    title: {
      default:
        lang === "pl"
          ? `${clubInfo.name} - Klub Nocny | Poznań`
          : `${clubInfo.name} - Night Club | Poznan`,
      template: `%s | ${clubInfo.name} - ${dict.hero.subtitle}`,
    },
    description: dict.hero.description,

    alternates: {
      canonical: `${clubInfo.website}/${lang}`,
      languages: {
        pl: `${clubInfo.website}/pl`,
        en: `${clubInfo.website}/en`,
        "x-default": `${clubInfo.website}/pl`,
      },
    },

    metadataBase: new URL(clubInfo.website),
    keywords: [
      // ✅ Общие ключевые слова для всех языков
      "night club",
      "parties",
      "music",
      "DJ",
      "events",
      "concerts",
      "electronic music",
      "raves",
      `${clubInfo.name}`,
      `${clubInfo.address.city}`,
      `${clubInfo.address.street}`,
      ...(lang === "pl"
        ? [
            "klub nocny",
            "imprezy",
            "koncerty",
            "muzyka elektroniczna",
            "Polska",
          ]
        : ["dancing", "Poznan", "Greater Poland", "Poland"]),
    ],

    authors: [{ name: `${clubInfo.name} Night Club` }],
    creator: `${clubInfo.name} Night Club`,
    publisher: `${clubInfo.name} Entertainment`,
    category: "Entertainment",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    icons: {
      icon: [
        {
          url: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        { url: "/imgs/logo.png", sizes: "32x32", type: "image/png" },
        { url: "/imgs/logo.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        {
          url: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        { url: "/imgs/logo.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/web-app-manifest-192x192.png",
    },
    manifest: "../manifest.json",

    // Open Graph
    openGraph: {
      type: "website",
      locale: localeMap[locale],
      url: `${clubInfo.website}/${lang}`,
      title: dict.hero.title,
      description: dict.hero.description,
      siteName: `${clubInfo.name} Night Club`,
    },

    twitter: {
      card: "summary_large_image",
      site: `@${clubInfo.name}_club`,
      creator: `@${clubInfo.name}_club`,
      title: dict.hero.title,
      description: dict.hero.description,
    },

    // Updated local / geo / contact info (from public listings)
    other: {
      "geo.region": "PL",
      "geo.placename": `${clubInfo.address.city}, ${clubInfo.address.region}`,
      "geo.position": `${clubInfo.address.lat};${clubInfo.address.lng}`,
      ICBM: `${clubInfo.address.lat}, ${clubInfo.address.lng}`,
      contact: `${clubInfo.email}`,
      phone: `${clubInfo.phone}`,
      // "phone:alt": "+48 881 277 500", // alternative/booking number from listings
      address: `${clubInfo.address.street}, ${clubInfo.address.postalCode} ${clubInfo.address.city}, ${clubInfo.address.country}`,
      "business.hours":
        "Hours vary by event — typical event hours ~22:00–06:00 (check event page)",
      "price.range": `${clubInfo.priceRange}`,
      "og:see_also": [
        `${clubInfo.socialMedia.facebook}`,
        `${clubInfo.socialMedia.instagram}`,
        `${clubInfo.socialMedia.telegram}`,
        `${clubInfo.socialMedia.tiktok}`,
        `${clubInfo.socialMedia.linktree}`,
      ],
      rating: "mature",
      audience: "18+",
      language: lang,
      "content-language": lang,
      "format-detection": "telephone=yes, address=yes, email=yes",
      referrer: "origin-when-cross-origin",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": `${clubInfo.name}`,
      "msapplication-TileColor": "#000000",
      "msapplication-config": "/browserconfig.xml",
      "msapplication-TileImage": "/web-app-manifest-192x192.png",
      "theme-color": "#000000",
      "application-name": `${clubInfo.name}`,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body
        suppressHydrationWarning
        className={`${inter.variable} flex min-h-screen flex-col antialiased`}
      >
        <JsonLdMainPage />
        <NextTopLoader
          color="var(--primary)"
          easing="ease"
          shadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
          height={2.5}
          showSpinner={false}
        />
        <LenisProvider>
          <ConvexClientProvider>
            <LanguageProvider lang={lang as Locale} dict={dict}>
              <ImageKitProviderWrapper>
                <Nav />

                <main className="relative flex-1 *:p-4">
                  <AppearanceEffect>{children}</AppearanceEffect>
                </main>

                <Footer />
              </ImageKitProviderWrapper>
            </LanguageProvider>
            <Toaster richColors position="bottom-right" />
          </ConvexClientProvider>
        </LenisProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
