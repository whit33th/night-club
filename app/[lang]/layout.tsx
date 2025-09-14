import AppearanceEffect from "@/components/Providers/AppearanceEffect";
import ConvexClientProvider from "@/components/Providers/ConvexClientProvider";
import { ImageKitProviderWrapper } from "@/components/Providers/ImageKitProvider";
import LenisProvider from "@/components/Providers/LenisProvider";
import JsonLdMainPage from "@/components/SEO/StructuredData";
import Footer from "@/components/UI/Footer/Footer";
import Nav from "@/components/UI/Header/Nav";
import { localeMap } from "@/lib/date-utils";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const locale = lang === "pl" ? "pl" : "en";

  return {
    title: {
      default:
        lang === "pl"
          ? "2progi - Klub Nocny | Poznań"
          : "2progi - Night Club | Poznan",
      template: `%s | 2progi - ${dict.hero.subtitle}`,
    },
    description: dict.hero.description,

    keywords: [
      "night club",
      "2progi",
      "Poznań",
      "club",
      "parties",
      "dancing",
      "music",
      "DJ",
      "events",
      "Aleja Niepodległości",
      "Poland",
      "concerts",
      "electronic music",
      ...(lang === "pl"
        ? ["klub nocny", "imprezy", "koncerty", "muzyka elektroniczna"]
        : []),
    ],

    authors: [{ name: "2progi Night Club" }],
    creator: "2progi Night Club",
    publisher: "2progi Entertainment",
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
      url: `https://2progi.pl/${lang}`,
      title: dict.hero.title,
      description: dict.hero.description,
      siteName: "2progi Night Club",
    },

    twitter: {
      card: "summary_large_image",
      site: "@2progi_club",
      creator: "@2progi_club",
      title: dict.hero.title,
      description: dict.hero.description,
    },

    alternates: {
      canonical: `https://2progi.pl/${lang}`,
      languages: {
        pl: "https://2progi.pl/pl",
        en: "https://2progi.pl/en",
        "x-default": "https://2progi.pl/pl",
      },
    },

    // canonical base for alternates (useful for metadataBase in Next)
    metadataBase: new URL("https://2progi.pl"),

    // Verification (keep placeholders or replace with real codes)
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
      other: {
        "msvalidate.01": "your-bing-verification-code",
      },
    },

    // Updated local / geo / contact info (from public listings)
    other: {
      "geo.region": "PL",
      "geo.placename": "Poznań",
      "geo.position": "52.415087;16.926991",
      ICBM: "52.415087, 16.926991",
      contact: "biuro@2progi.pl",
      phone: "+48 606 277 256", // listed on official site
      "phone:alt": "+48 881 277 500", // alternative/booking number from listings
      address: "Aleja Niepodległości 36, 61-714 Poznań, Poland",
      "business.hours":
        "Hours vary by event — typical event hours ~22:00–06:00 (check event page)",
      "price.range": "PLN - mid",
      "og:see_also": [
        "https://instagram.com/2progi",
        "https://facebook.com/2progi",
        "https://linktr.ee/2progiVenu",
      ],
      rating: "mature",
      audience: "18+",
      language: lang,
      "content-language": lang,
      "format-detection": "telephone=yes, address=yes, email=yes",
      referrer: "origin-when-cross-origin",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "2progi",
      "msapplication-TileColor": "#000000",
      "msapplication-config": "/browserconfig.xml",
      "msapplication-TileImage": "/web-app-manifest-192x192.png",
      "theme-color": "#000000",
      "application-name": "2progi",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

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
            <ImageKitProviderWrapper>
              <Nav lang={lang} dict={dict} />

              <main className="relative flex-1 *:p-4">
                <AppearanceEffect>{children}</AppearanceEffect>
              </main>

              <Footer lang={lang} dict={dict} />
            </ImageKitProviderWrapper>
            <Toaster richColors position="bottom-right" />
          </ConvexClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
