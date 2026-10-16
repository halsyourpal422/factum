import { statusLabel, t } from "@/lib/factum/copy";
import { REVIEWED, RULES, tx } from "@/lib/factum/law";
import { useFactum } from "@/lib/factum/store";
import { Chip } from "@/components/factum/ui";

const TONE = {
  controlling: "sage",
  contested: "clay",
  prior: "quiet",
  statute: "brass",
  framework: "quiet",
} as const;

export function LawView() {
  const lang = useFactum((state) => state.lang);
  const lawId = useFactum((state) => state.lawId);
  const openLaw = useFactum((state) => state.openLaw);
  const rule = RULES.find((item) => item.id === lawId);

  if (rule) {
    return (
      <article>
        <button type="button" onClick={() => openLaw(null)} className="min-h-11 text-sm text-muted">
          ← {t(lang, "law")}
        </button>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip tone={TONE[rule.status]}>{statusLabel(lang, rule.status)}</Chip>
        </div>
        <h1 className="mt-4 font-serif text-4xl text-fg">{tx(lang, rule.title)}</h1>
        <p className="mt-3 font-serif text-lg text-brass italic">{rule.citation}</p>
        <section className="mt-8 border-l-2 border-sage pl-4">
          <h2 className="text-xs uppercase tracking-[0.16em] text-sage">{t(lang, "holds")}</h2>
          <p className="mt-2 leading-relaxed text-fg">{tx(lang, rule.holds)}</p>
        </section>
        <section className="mt-6 border-l-2 border-clay pl-4">
          <h2 className="text-xs uppercase tracking-[0.16em] text-clay">{t(lang, "doesNot")}</h2>
          <p className="mt-2 leading-relaxed text-fg">{tx(lang, rule.doesNot)}</p>
        </section>
        <section className="mt-6 border-t border-line pt-4">
          <h2 className="text-xs uppercase tracking-[0.16em] text-muted">{t(lang, "status")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{tx(lang, rule.statusNote)}</p>
          <p className="mt-4 text-sm text-faint">
            {t(lang, "reviewed")} · {REVIEWED}
          </p>
          {rule.sourceUrl ? (
            <a
              className="mt-3 inline-flex min-h-11 items-center text-sm text-brass underline decoration-brass/40 underline-offset-4"
              href={rule.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              {tx(lang, rule.sourceLabel)}
            </a>
          ) : (
            <p className="mt-3 text-sm text-faint">{t(lang, "noUrl")}</p>
          )}
        </section>
        <p className="mt-8 text-xs leading-relaxed text-faint">{t(lang, "notAdvice")}</p>
      </article>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-brass">{t(lang, "libraryKicker")}</p>
      <h1 className="mt-3 font-serif text-4xl text-fg">{t(lang, "libraryTitle")}</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{t(lang, "libraryBody")}</p>
      <ul className="mt-8 border-t border-line">
        {RULES.map((item) => (
          <li key={item.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => openLaw(item.id)}
              className="flex w-full flex-col items-start gap-2 py-4 text-left"
            >
              <span className="flex flex-wrap items-center gap-2">
                <Chip tone={TONE[item.status]}>{statusLabel(lang, item.status)}</Chip>
              </span>
              <span className="font-serif text-xl text-fg">{tx(lang, item.title)}</span>
              <span className="text-sm text-muted italic">{item.citation}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
