import { Locale } from "@/lib/i18n-config";

type Props = { params: Promise<{ lang: Locale }> };

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;

  const content =
    lang === "pl"
      ? {
          title: "Regulamin",
          description:
            "Kupując bilety lub rezerwując stolik, zgadzasz się z naszym regulaminem, polityką wstępu i kodeksem postępowania.",
          rulesTitle: "Regulamin Lokalu",
          refundsTitle: "Zwroty",
          refundsText:
            "Imprezy są nierefundowalne, chyba że zostaną odwołane lub przełożone.",
          rules: [
            "Szanuj gości i personel",
            "Zakaz nękania lub dyskryminacji",
            "Postępuj zgodnie z instrukcjami ochrony",
          ],
        }
      : {
          title: "Terms & Conditions",
          description:
            "By purchasing tickets or reserving tables you agree to our house rules, entry policy, and code of conduct.",
          rulesTitle: "House Rules",
          refundsTitle: "Refunds",
          refundsText:
            "Events are non-refundable unless canceled or rescheduled.",
          rules: [
            "Respect guests and staff",
            "No harassment or discrimination",
            "Follow security instructions",
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
              {content.rulesTitle}
            </h2>
            <ul className="space-y-2">
              {content.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/60"></span>
                  <span className="text-neutral-300">{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {content.refundsTitle}
            </h2>
            <p className="text-neutral-300">{content.refundsText}</p>
          </section>
        </div>
      </article>
    </div>
  );
}
