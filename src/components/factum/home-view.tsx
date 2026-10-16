import { gapsFor, issuesFor } from "@/lib/factum/engine";
import { issueTitle, t } from "@/lib/factum/copy";
import { useFactum } from "@/lib/factum/store";
import { Button, Chip } from "@/components/factum/ui";

export function HomeView() {
  const lang = useFactum((state) => state.lang);
  const ready = useFactum((state) => state.ready);
  const matters = useFactum((state) => state.matters);
  const go = useFactum((state) => state.go);
  const openMatter = useFactum((state) => state.openMatter);
  const openSample = useFactum((state) => state.openSample);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-brass">{t(lang, "kicker")}</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight font-medium text-fg sm:text-5xl">
        {t(lang, "heroA")}
        <span className="mt-1 block font-normal text-muted italic">{t(lang, "heroB")}</span>
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{t(lang, "heroBody")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" className="sm:min-w-52" onClick={() => go("intake")}>
          {t(lang, "recordCta")}
        </Button>
        <Button onClick={openSample}>{t(lang, "sampleCta")}</Button>
      </div>

      <ol className="mt-12 border-t border-line">
        {(
          [
            ["01", "p1", "p1b"],
            ["02", "p2", "p2b"],
            ["03", "p3", "p3b"],
          ] as const
        ).map(([index, title, body]) => (
          <li key={index} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-5">
            <span className="font-serif text-brass">{index}</span>
            <span>
              <span className="block text-fg">{t(lang, title)}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{t(lang, body)}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm leading-relaxed text-faint">{t(lang, "sitLine")}</p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-fg">{t(lang, "onDevice")}</h2>
        {!ready ? <p className="mt-4 text-sm text-muted">{t(lang, "empty")}</p> : null}
        {ready && matters.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t(lang, "empty")}</p>
        ) : null}
        {ready ? (
          <ul className="mt-4 border-t border-line">
            {matters.map((matter) => {
              const open = gapsFor(matter).length;
              const issues = issuesFor(matter);
              return (
                <li key={matter.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => openMatter(matter.id)}
                    className="flex w-full flex-col items-start gap-3 py-4 text-left"
                  >
                    <span className="font-serif text-xl text-fg">{matter.workplace}</span>
                    <span className="text-sm text-muted">
                      {matter.title}
                      {matter.state ? ` · ${matter.state}` : ""}
                    </span>
                    <span className="flex flex-wrap gap-2">
                      {matter.sample ? <Chip tone="brass">{t(lang, "sampleFlag")}</Chip> : null}
                      {issues.slice(0, 2).map((id) => (
                        <Chip key={id}>{issueTitle(lang, id)}</Chip>
                      ))}
                      <Chip tone={open > 0 ? "clay" : "sage"}>
                        {open} {t(lang, "openQuestions")}
                      </Chip>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
