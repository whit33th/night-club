import { clubInfo } from "@/lib/data/club-info";
import type { Graph } from "schema-dts";

export default function JsonLdMainPage() {
  const nightClubData: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NightClub",
        "@id": "https://2progi.pl/#nightclub",
        name: clubInfo.name,
        alternateName: "2progi Night Club",
        description:
          "2progi — klub muzyczno-eventowy w Poznaniu. Koncerty, imprezy, DJ-sety i wynajem przestrzeni eventowej.",
        url: clubInfo.website,
        logo: {
          "@type": "ImageObject",
          url: `${clubInfo.website}/imgs/icons/logo.png`,
          width: { "@type": "QuantitativeValue", value: 300, unitText: "px" },
          height: { "@type": "QuantitativeValue", value: 300, unitText: "px" },
        },
        image: [`${clubInfo.website}/imgs/icons/logo.png`],
        address: {
          "@type": "PostalAddress",
          streetAddress: clubInfo.address.street,
          addressLocality: clubInfo.address.city,
          addressRegion: clubInfo.address.region,
          postalCode: clubInfo.address.postalCode,
          addressCountry: "PL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: clubInfo.address.lat,
          longitude: clubInfo.address.lng,
        },
        telephone: clubInfo.phone,
        email: clubInfo.email,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Friday", "Saturday"],
            opens: "20:00",
            closes: "06:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday"],
            opens: "20:00",
            closes: "04:00",
          },
        ],
        priceRange: clubInfo.priceRange,
        // Removed servesCuisine/acceptsReservations as NightClub is not a FoodEstablishment
        maximumAttendeeCapacity: clubInfo.maximumAttendeeCapacity,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Club Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Ticketed Events",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Private Event Organization",
              },
            },
          ],
        },
        sameAs: [
          clubInfo.socialMedia.instagram,
          clubInfo.socialMedia.facebook,
          clubInfo.socialMedia.telegram,
          clubInfo.socialMedia.tiktok,
          clubInfo.socialMedia.linktree,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${clubInfo.website}/#website`,
        url: clubInfo.website,
        name: clubInfo.name,
        description: "Oficjalna strona klubu 2progi w Poznaniu",
        publisher: {
          "@id": `${clubInfo.website}/#nightclub`,
        },
        inLanguage: "pl-PL, en-US",
        potentialAction: [
          {
            "@type": "ViewAction",
            name: "Browse Events",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://2progi.pl/events",
            },
          },
          {
            "@type": "ViewAction",
            name: "Read News",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://2progi.pl/news",
            },
          },
          {
            "@type": "ViewAction",
            name: "View Gallery",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://2progi.pl/gallery",
            },
          },
          {
            "@type": "ViewAction",
            name: "About the Club",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://2progi.pl/about",
            },
          },
          {
            "@type": "ViewAction",
            name: "FAQ",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://2progi.pl/faq",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${clubInfo.website}/#organization`,
        name: clubInfo.name,
        url: clubInfo.website,
        logo: {
          "@type": "ImageObject",
          url: `${clubInfo.website}/imgs/icons/logo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: clubInfo.phone,
          contactType: "customer service",
          availableLanguage: ["Polish", "English", "Ukrainian", "Russian"],
          areaServed: "PL",
        },
        sameAs: [
          clubInfo.socialMedia.instagram,
          clubInfo.socialMedia.facebook,
          clubInfo.socialMedia.telegram,
          clubInfo.socialMedia.tiktok,
          clubInfo.socialMedia.linktree,
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${clubInfo.website}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: clubInfo.website,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Wydarzenia",
            item: `${clubInfo.website}/events`,
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        id="structured-data-nightclub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nightClubData) }}
      />
    </>
  );
}
