import EventsGridSSR from "@/components/Containers/EventsGridSSR";
import Hero from "@/components/Containers/Hero/Hero";
import { api } from "@/convex/_generated/api";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import { preloadQuery } from "convex/nextjs";

// export const revalidate = 3600;

type Props = { params: Promise<{ lang: Locale }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const preloadedEvents = await preloadQuery(api.admin.listUpcomingEvents, {
    limit: 7,
  });

  return (
    <>
      <Hero dict={dict} />
      <EventsGridSSR preloaded={preloadedEvents} lang={lang} dict={dict} />
    </>
  );
}
