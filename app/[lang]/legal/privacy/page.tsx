import { Locale } from "@/lib/i18n-config";

type Props = { params: Promise<{ lang: Locale }> };

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;

  const content =
    lang === "pl"
      ? {
          title: "Polityka Prywatności",
          description:
            "Szanujemy Twoją prywatność. Ta strona opisuje sposób zbierania i przetwarzania danych osobowych w związku z biletami, rezerwacjami i analityką strony.",
          dataTitle: "Zbierane Dane",
          contactTitle: "Kontakt",
          items: [
            "Dane kontaktowe (imię, email) do zamówień i rezerwacji",
            "Potwierdzenia płatności poprzez dostawcę",
            "Anonimowe dane analityczne",
          ],
        }
      : {
          title: "Privacy Policy",
          description:
            "We respect your privacy. This page describes how we collect and process personal data in connection with ticketing, reservations, and site analytics.",
          dataTitle: "Data We Collect",
          contactTitle: "Contact",
          items: [
            "Contact details (name, email) for orders and reservations",
            "Payment confirmations via provider",
            "Anonymous usage analytics",
          ],
        };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <article className="prose prose-invert prose-neutral max-w-none">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {content.title}
          </h1>
          <p className="text-lg text-neutral-300">{content.description}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {content.dataTitle}
            </h2>
            <ul className="space-y-2">
              {content.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/60"></span>
                  <span className="text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {content.contactTitle}
            </h2>
            <p className="text-neutral-300">
              <a
                href="mailto:biuro@2progi.pl"
                className="text-white transition-colors hover:text-neutral-300"
              >
                biuro@2progi.pl
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
