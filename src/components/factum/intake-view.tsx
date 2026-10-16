import { useMemo, useState } from "react";
import { inferTags } from "@/lib/factum/engine";
import { sha256Text } from "@/lib/factum/hash";
import { uid } from "@/lib/factum/format";
import { personRoleLabel, stepTitle, t, tagLabel } from "@/lib/factum/copy";
import { useFactum } from "@/lib/factum/store";
import {
  blankClarifiers,
  TAGS,
  type Incident,
  type Matter,
  type Person,
  type PersonRole,
  type Tag,
} from "@/lib/factum/types";
import { Button, Chip, fieldClass, Field } from "@/components/factum/ui";

const PERSON_ROLES: PersonRole[] = [
  "worker",
  "supervisor",
  "manager",
  "hr",
  "witness",
  "consultant",
  "other",
];

type Follow = { id: string; date: string; tag: Tag; summary: string };

export function IntakeView() {
  const lang = useFactum((state) => state.lang);
  const addMatter = useFactum((state) => state.addMatter);
  const go = useFactum((state) => state.go);
  const [step, setStep] = useState(0);
  const [workplace, setWorkplace] = useState("");
  const [unit, setUnit] = useState("");
  const [stateName, setStateName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [quotation, setQuotation] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsTouched, setTagsTouched] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [personName, setPersonName] = useState("");
  const [personRole, setPersonRole] = useState<PersonRole>("worker");
  const [follows, setFollows] = useState<Follow[]>([]);
  const [employer, setEmployer] = useState("");
  const [employerSpeaker, setEmployerSpeaker] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const suggested = useMemo(
    () => inferTags(`${summary} ${quotation} ${employer}`),
    [summary, quotation, employer],
  );
  const shownTags = tagsTouched ? tags : suggested;

  function toggleTag(tag: Tag) {
    setTagsTouched(true);
    const base = tagsTouched ? tags : suggested;
    setTags(base.includes(tag) ? base.filter((item) => item !== tag) : [...base, tag]);
  }

  function addPerson() {
    const name = personName.trim();
    if (!name) return;
    const person: Person = { id: uid(), name, role: personRole, unit: unit.trim() };
    setPeople((current) => [...current, person]);
    setPicked((current) => [...current, person.id]);
    setPersonName("");
  }

  function validate(index: number): string {
    if (index === 0) {
      if (!date) return t(lang, "needDate");
      if (summary.trim().length < 8) return t(lang, "needStory");
    }
    if (index === 2 && shownTags.length === 0) return t(lang, "needTag");
    return "";
  }

  async function finish() {
    const problem = validate(0) || validate(2);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    const primary: Incident = {
      id: uid(),
      date,
      tags: shownTags,
      summary: summary.trim(),
      quotation: quotation.trim(),
      quotationSpeaker: speaker.trim(),
      personIds: picked,
      status: "alleged",
      location: location.trim(),
    };
    const extra: Incident[] = follows
      .filter((item) => item.date && item.summary.trim())
      .map((item) => ({
        id: uid(),
        date: item.date,
        tags: [item.tag],
        summary: item.summary.trim(),
        quotation: "",
        quotationSpeaker: "",
        personIds: picked,
        status: "alleged" as const,
        location: "",
      }));
    const matter: Matter = {
      id: uid(),
      sample: false,
      title: summary.trim().slice(0, 72),
      workplace: workplace.trim() || (lang === "es" ? "Centro de trabajo" : "Workplace"),
      unit: unit.trim(),
      state: stateName.trim(),
      createdAt: new Date().toISOString(),
      people,
      incidents: [primary, ...extra],
      evidence: [],
      claims: employer.trim()
        ? [
            {
              id: uid(),
              speaker: employerSpeaker.trim() || (lang === "es" ? "Dirección" : "Management"),
              text: employer.trim(),
              date,
            },
          ]
        : [],
      clarifiers: blankClarifiers(),
      notes: "",
    };
    if (note.trim()) {
      const body = note.trim();
      const sha256 = await sha256Text(body);
      matter.evidence.push({
        id: uid(),
        title: lang === "es" ? "Nota de ingreso" : "Intake note",
        kind: "note",
        body,
        filename: null,
        sha256,
        source: lang === "es" ? "Escrita en el ingreso" : "Typed at intake",
        ingestedAt: new Date().toISOString(),
        incidentIds: [primary.id],
        chain: [
          {
            at: new Date().toISOString(),
            action: "ingested",
            detail: lang === "es" ? "Texto original conservado." : "Original text preserved.",
          },
        ],
      });
    }
    addMatter(matter);
    setBusy(false);
  }

  return (
    <div>
      <button type="button" onClick={() => go("home")} className="text-sm text-muted">
        ← {t(lang, "back")}
      </button>
      <p className="mt-6 text-xs uppercase tracking-[0.16em] text-brass">
        {t(lang, "stepOf")} {step + 1} / 5
      </p>
      <h1 className="mt-2 font-serif text-4xl text-fg">{stepTitle(lang, step)}</h1>
      <p className="mt-3 text-sm text-muted">{t(lang, "alias")}</p>

      <div className="mt-8 flex flex-col gap-5">
        {step === 0 ? (
          <>
            <Field label={t(lang, "what")}>
              <textarea
                className={`${fieldClass} min-h-36 py-3`}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t(lang, "when")}>
                <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </Field>
              <Field label={t(lang, "where")}>
                <input className={fieldClass} value={location} onChange={(event) => setLocation(event.target.value)} />
              </Field>
            </div>
            <Field label={t(lang, "workplace")}>
              <input className={fieldClass} value={workplace} onChange={(event) => setWorkplace(event.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t(lang, "unit")}>
                <input className={fieldClass} value={unit} onChange={(event) => setUnit(event.target.value)} />
              </Field>
              <Field label={t(lang, "region")}>
                <input className={fieldClass} value={stateName} onChange={(event) => setStateName(event.target.value)} />
              </Field>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className={fieldClass}
                placeholder={t(lang, "name")}
                value={personName}
                onChange={(event) => setPersonName(event.target.value)}
              />
              <select
                className={fieldClass}
                value={personRole}
                onChange={(event) => setPersonRole(event.target.value as PersonRole)}
              >
                {PERSON_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {personRoleLabel(lang, role)}
                  </option>
                ))}
              </select>
              <Button onClick={addPerson}>{t(lang, "addPerson")}</Button>
            </div>
            <ul className="flex flex-col gap-2">
              {people.map((person) => {
                const on = picked.includes(person.id);
                return (
                  <li key={person.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setPicked((current) =>
                          on ? current.filter((id) => id !== person.id) : [...current, person.id],
                        )
                      }
                      className="flex min-h-11 w-full items-center justify-between border-b border-line py-2 text-left"
                    >
                      <span>
                        {person.name}
                        <span className="ml-2 text-sm text-muted">{personRoleLabel(lang, person.role)}</span>
                      </span>
                      <Chip tone={on ? "brass" : "quiet"}>{on ? t(lang, "yes") : t(lang, "selectPeople")}</Chip>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field label={t(lang, "words")}>
              <textarea
                className={`${fieldClass} min-h-28 py-3 font-serif text-lg italic`}
                value={quotation}
                onChange={(event) => setQuotation(event.target.value)}
              />
            </Field>
            <Field label={t(lang, "speaker")}>
              <input className={fieldClass} value={speaker} onChange={(event) => setSpeaker(event.target.value)} />
            </Field>
            <p className="text-sm text-muted">{t(lang, "suggested")}</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => {
                const on = shownTags.includes(tag);
                return (
                  <button key={tag} type="button" className="min-h-11" onClick={() => toggleTag(tag)}>
                    <Chip tone={on ? "brass" : "quiet"}>{tagLabel(lang, tag)}</Chip>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-faint">{t(lang, "classification")}</p>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <p className="text-sm text-muted">{t(lang, "followHint")}</p>
            {follows.map((item) => (
              <div key={item.id} className="grid gap-3 border-b border-line pb-4 sm:grid-cols-3">
                <input
                  className={fieldClass}
                  type="date"
                  value={item.date}
                  onChange={(event) =>
                    setFollows((current) =>
                      current.map((row) => (row.id === item.id ? { ...row, date: event.target.value } : row)),
                    )
                  }
                />
                <select
                  className={fieldClass}
                  value={item.tag}
                  onChange={(event) =>
                    setFollows((current) =>
                      current.map((row) =>
                        row.id === item.id ? { ...row, tag: event.target.value as Tag } : row,
                      ),
                    )
                  }
                >
                  {TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tagLabel(lang, tag)}
                    </option>
                  ))}
                </select>
                <input
                  className={fieldClass}
                  value={item.summary}
                  placeholder={t(lang, "after")}
                  onChange={(event) =>
                    setFollows((current) =>
                      current.map((row) =>
                        row.id === item.id ? { ...row, summary: event.target.value } : row,
                      ),
                    )
                  }
                />
              </div>
            ))}
            <Button
              onClick={() =>
                setFollows((current) => [
                  ...current,
                  { id: uid(), date: "", tag: "schedule", summary: "" },
                ])
              }
            >
              {t(lang, "addFollow")}
            </Button>
            <Field label={t(lang, "employerSaid")}>
              <textarea
                className={`${fieldClass} min-h-24 py-3`}
                value={employer}
                onChange={(event) => setEmployer(event.target.value)}
              />
            </Field>
            <Field label={t(lang, "speaker")}>
              <input
                className={fieldClass}
                value={employerSpeaker}
                onChange={(event) => setEmployerSpeaker(event.target.value)}
              />
            </Field>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <Field label={t(lang, "keep")}>
              <textarea
                className={`${fieldClass} min-h-36 py-3`}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </Field>
            <p className="text-sm text-muted">{t(lang, "keepHint")}</p>
          </>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm text-clay">{error}</p> : null}

      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <Button
            onClick={() => {
              setError("");
              setStep((current) => current - 1);
            }}
          >
            {t(lang, "back")}
          </Button>
        ) : null}
        {step < 4 ? (
          <Button
            variant="primary"
            onClick={() => {
              const problem = validate(step);
              if (problem) {
                setError(problem);
                return;
              }
              setError("");
              if (step === 1) setTagsTouched(false);
              setStep((current) => current + 1);
            }}
          >
            {t(lang, "continue")}
          </Button>
        ) : (
          <Button variant="primary" disabled={busy} onClick={() => void finish()}>
            {t(lang, "build")}
          </Button>
        )}
      </div>
    </div>
  );
}
