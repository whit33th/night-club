import { clubInfo } from "@/lib/data/club-info";
import type { Graph } from "schema-dts";
import { generateSlug } from "@/lib/slugUtils";
import { Doc } from "@/convex/_generated/dataModel";

interface JsonLdProps {
  event: Doc<"events">;
  locale: string;
}

export default function JsonLd({ event, locale }: JsonLdProps) {
  const eventSlug = generateSlug(event.title, event.date, event._id);
  const eventUrl = `${clubInfo.website}/${locale}/events/${eventSlug}`;

  // Format date and time for schema.org
  const eventDateTime = new Date(`${event.date}T${event.startAt}`);
  const doorsDateTime = event.doorsAt
    ? new Date(`${event.date}T${event.doorsAt}`)
    : null;

  // Create artist/performer objects
  const performers =
    event.artists?.map((artist) => ({
      "@type": "Person" as const,
      name: artist.name,
      ...(artist.role && { jobTitle: artist.role }),
      ...(artist.imageKitPath && {
        image: {
          "@type": "ImageObject" as const,
          url: artist.imageKitPath,
        },
      }),
    })) || [];

  // Create offers for tickets
  const offers =
    event.priceFrom !== undefined
      ? [
          {
            "@type": "Offer" as const,
            name: event.priceFrom === 0 ? "Free Entry" : "General Admission",
            price: event.priceFrom,
            priceCurrency: event.currency ?? "PLN",
            availability: "https://schema.org/InStock" as const,
            validFrom: new Date().toISOString(),
            validThrough: eventDateTime.toISOString(),
            ...(event.ticketUrl && { url: event.ticketUrl }),
            ...(event.minAge && {
              eligibleQuantity: {
                "@type": "QuantitativeValue" as const,
                minValue: event.minAge,
                unitText: "years",
              },
            }),
          },
        ]
      : [];

  const eventData: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${eventUrl}#event`,
        name: event.title,
        description: event.description || `${event.title} at ${clubInfo.name}`,
        url: eventUrl,
        image: event.imageKitPath!,
        startDate: eventDateTime.toISOString(),
        ...(doorsDateTime && { doorTime: doorsDateTime.toISOString() }),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          "@id": `${clubInfo.website}/#venue`,
          name: clubInfo.name,
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
          url: clubInfo.website,
        },
        organizer: {
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
            email: clubInfo.email,
            contactType: "customer service",
          },
        },
        ...(performers.length > 0 && { performer: performers }),
        ...(event.musicGenres &&
          event.musicGenres.length > 0 && {
            genre: event.musicGenres.join(", "),
          }),
        ...(offers.length > 0 && { offers }),
        ...(event.minAge && {
          audience: {
            "@type": "Audience",
            audienceType: `Adults ${event.minAge}+`,
          },
        }),
        ...(event.dressCode && {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Dress Code",
            value: event.dressCode,
          },
        }),
      },
      {
        "@type": "NightClub",
        "@id": `${clubInfo.website}/#nightclub`,
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
        maximumAttendeeCapacity: clubInfo.maximumAttendeeCapacity,
        sameAs: [
          clubInfo.socialMedia.instagram,
          clubInfo.socialMedia.facebook,
          clubInfo.socialMedia.telegram,
          clubInfo.socialMedia.tiktok,
          clubInfo.socialMedia.linktree,
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
        "@id": `${eventUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "pl" ? "Strona główna" : "Home",
            item: clubInfo.website,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "pl" ? "Wydarzenia" : "Events",
            item: `${clubInfo.website}/${locale}/events`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: event.title,
            item: eventUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        id="structured-data-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
      />
    </>
  );
}
