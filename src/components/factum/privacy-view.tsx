import { useState } from "react";
import { handoff } from "@/lib/factum/engine";
import { t } from "@/lib/factum/copy";
import { useFactum } from "@/lib/factum/store";
import { Button } from "@/components/factum/ui";

export function PrivacyView() {
  const lang = useFactum((state) => state.lang);
  const matters = useFactum((state) => state.matters);
  const restoreSample = useFactum((state) => state.restoreSample);
  const erase = useFactum((state) => state.erase);
  const [arm, setArm] = useState(false);
  const [note, setNote] = useState("");

  async function exportAll() {
    const payload = {
      exportedAt: new Date().toISOString(),
      disclaimer: t(lang, "notAdvice"),
      records: matters.map((matter) => handoff(matter)),
    };
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setNote(t(lang, "copied"));
    } catch {
      download(text);
      setNote(t(lang, "exported"));
    }
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-fg">{t(lang, "deviceTitle")}</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">{t(lang, "deviceBody")}</p>
      <section className="mt-8 border-t border-line pt-5">
        <h2 className="font-serif text-2xl">{t(lang, "neverSent")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, "neverSentBody")}</p>
      </section>
      <section className="mt-6 border-t border-line pt-5">
        <h2 className="font-serif text-2xl">{t(lang, "human")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, "humanBody")}</p>
        <a
          className="mt-3 inline-flex min-h-11 items-center text-sm text-brass underline decoration-brass/40 underline-offset-4"
          href="https://www.nlrb.gov"
          target="_blank"
          rel="noreferrer"
        >
          {t(lang, "nlrb")}
        </a>
      </section>
      <div className="mt-8 flex flex-col gap-3">
        <Button onClick={() => void exportAll()}>{t(lang, "exportAll")}</Button>
        <Button onClick={restoreSample}>{t(lang, "restore")}</Button>
        <Button
          onClick={() => {
            if (!arm) {
              setArm(true);
              return;
            }
            erase();
            setArm(false);
          }}
        >
          {arm ? t(lang, "eraseArm") : t(lang, "erase")}
        </Button>
        {note ? <p className="text-sm text-sage">{note}</p> : null}
      </div>
    </div>
  );
}

function download(text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "factum-records.json";
  link.click();
  URL.revokeObjectURL(url);
}
