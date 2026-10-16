import { useState, type ReactNode } from "react";
import {
  bourneFactors,
  contradictions,
  factLevel,
  gapsFor,
  handoff,
  issuesFor,
  linkEdges,
  patternStats,
  readClaim,
  recordLevel,
  sortedIncidents,
  wrightElements,
  type Gap,
} from "@/lib/factum/engine";
import { sha256Buffer, sha256Text, shortHash } from "@/lib/factum/hash";
import { formatDate, formatStamp, uid } from "@/lib/factum/format";
import {
  claimKindLabel,
  claimTest,
  contradictionCopy,
  factorLabel,
  gapPrompt,
  issueDoesNot,
  issueLead,
  issueTitle,
  issueWhy,
  levelLabel,
  patternSentence,
  personRoleLabel,
  roleHint,
  statusLabel,
  storyLead,
  t,
  tabLabel,
  tagLabel,
  TAB_ORDER,
} from "@/lib/factum/copy";
import { ISSUE_RULES, ruleById, tx } from "@/lib/factum/law";
import { useActiveMatter, useFactum } from "@/lib/factum/store";
import {
  TAGS,
  type Clarifiers,
  type EvidenceKind,
  type Incident,
  type IncidentStatus,
  type PersonRole,
  type Tab,
  type Tag,
  type Tri,
} from "@/lib/factum/types";
import { Button, Chip, fieldClass, Field } from "@/components/factum/ui";

const KINDS: EvidenceKind[] = ["note", "message", "document", "schedule", "policy", "photo-note"];
const STATUSES: IncidentStatus[] = ["alleged", "documented", "disputed"];
const PERSON_ROLES: PersonRole[] = ["worker", "supervisor", "manager", "hr", "witness", "other"];

export function MatterView() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const role = useFactum((state) => state.role);
  const tab = useFactum((state) => state.tab);
  const setTab = useFactum((state) => state.setTab);
  const go = useFactum((state) => state.go);

  if (!matter) {
    return (
      <div>
        <p className="text-muted">{t(lang, "empty")}</p>
        <Button className="mt-4" onClick={() => go("home")}>
          {t(lang, "back")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <header className="no-print">
        <button type="button" onClick={() => go("home")} className="min-h-11 text-sm text-muted">
          ← {t(lang, "records")}
        </button>
        {matter.sample ? (
          <p className="mt-4 border-l-2 border-brass pl-3 text-sm text-brass">{t(lang, "sampleBanner")}</p>
        ) : null}
        <h1 className="mt-3 font-serif text-4xl text-fg">{matter.workplace}</h1>
        <p className="mt-2 text-sm text-muted">
          {matter.title}
          {matter.unit ? ` · ${matter.unit}` : ""}
          {matter.state ? ` · ${matter.state}` : ""}
        </p>
        <p className="mt-3 text-sm text-faint">{roleHint(lang, role)}</p>
        <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
          {TAB_ORDER.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`shrink-0 min-h-11 border-b-2 px-2 text-sm ${
                tab === item ? "border-brass text-fg" : "border-transparent text-muted"
              }`}
            >
              {tabLabel(lang, role, item)}
            </button>
          ))}
        </div>
      </header>
      <div className="mt-6">
        {tab === "story" ? <StoryPane /> : null}
        {tab === "time" ? <TimePane /> : null}
        {tab === "links" ? <LinksPane /> : null}
        {tab === "vault" ? <VaultPane /> : null}
        {tab === "gaps" ? <GapsPane /> : null}
        {tab === "issues" ? <IssuesPane /> : null}
        {tab === "packet" ? <PacketPane /> : null}
      </div>
    </div>
  );
}

function StoryPane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const role = useFactum((state) => state.role);
  const setTab = useFactum((state) => state.setTab);
  const removeMatter = useFactum((state) => state.removeMatter);
  const [arm, setArm] = useState(false);
  if (!matter) return null;
  const issues = issuesFor(matter);
  const gaps = gapsFor(matter);
  const facts = factLevel(matter);
  const record = recordLevel(matter);
  const flags = contradictions(matter);

  return (
    <div>
      <p className="text-base leading-relaxed text-fg">{storyLead(lang, issues)}</p>
      <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-faint">{t(lang, "fact")}</dt>
          <dd className="mt-1 text-sm text-fg">{levelLabel(lang, facts)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-faint">{t(lang, "recordConf")}</dt>
          <dd className="mt-1 text-sm text-fg">{levelLabel(lang, record)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-faint">{t(lang, "legal")}</dt>
          <dd className="mt-1 text-sm text-brass">{t(lang, "notScored")}</dd>
        </div>
      </dl>

      {role !== "work" ? (
        <section className="mt-6">
          <h2 className="font-serif text-2xl">{t(lang, "pattern")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {patternSentence(lang, patternStats(matter))}
          </p>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="font-serif text-2xl">{t(lang, "people")}</h2>
        <p className="mt-1 text-xs text-faint">{t(lang, "noScore")}</p>
        <ul className="mt-3">
          {matter.people.map((person) => (
            <li key={person.id} className="flex min-h-11 items-center justify-between border-b border-line text-sm">
              <span>{person.name}</span>
              <span className="text-muted">{personRoleLabel(lang, person.role)}</span>
            </li>
          ))}
        </ul>
        <AddPerson />
      </section>

      {flags.length > 0 ? (
        <section className="mt-8 border-l-2 border-clay pl-4">
          <h2 className="text-xs uppercase tracking-[0.16em] text-clay">{t(lang, "contradiction")}</h2>
          <p className="mt-2 text-sm leading-relaxed">{contradictionCopy(lang)}</p>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="font-serif text-2xl">{t(lang, "worth")}</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {issues.map((id) => (
            <li key={id} className="border border-line p-4">
              <p className="font-serif text-xl">{issueTitle(lang, id)}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{issueLead(lang, id)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl">{t(lang, "still")}</h2>
          <button type="button" className="text-sm text-brass" onClick={() => setTab("gaps")}>
            {t(lang, "seeAll")}
          </button>
        </div>
        {gaps.length === 0 ? <p className="mt-2 text-sm text-muted">{t(lang, "allClear")}</p> : null}
        <ul className="mt-3">
          {gaps.slice(0, 3).map((gap) => (
            <li key={gap.id} className="border-b border-line py-3 text-sm leading-relaxed">
              {gapPrompt(lang, gap.id)}
            </li>
          ))}
        </ul>
      </section>

      {matter.claims.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl">{t(lang, "claims")}</h2>
          <ul className="mt-3 flex flex-col gap-4">
            {matter.claims.map((claim) => {
              const read = readClaim(claim);
              return (
                <li key={claim.id}>
                  <p className="text-xs text-muted">
                    {claim.speaker} · {formatDate(claim.date, lang)}
                  </p>
                  <blockquote className="mt-1 font-serif text-lg italic">“{claim.text}”</blockquote>
                  <p className="mt-2 text-sm text-muted">
                    {t(lang, "shape")}: {claimKindLabel(lang, read.kind)}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <p className="mt-8 text-xs leading-relaxed text-faint">{t(lang, "notAdvice")}</p>
      <button
        type="button"
        className="mt-4 min-h-11 text-sm text-faint"
        onClick={() => {
          if (!arm) {
            setArm(true);
            return;
          }
          removeMatter(matter.id);
        }}
      >
        {arm ? t(lang, "removeArm") : t(lang, "remove")}
      </button>
    </div>
  );
}

function TimePane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  if (!matter) return null;
  const incidents = sortedIncidents(matter);
  return (
    <div>
      {incidents.length === 0 ? <p className="text-sm text-muted">{t(lang, "noneYet")}</p> : null}
      <ol className="relative border-l border-line pl-5">
        {incidents.map((incident) => (
          <li key={incident.id} className="relative mb-6">
            <span className="rail-dot" />
            <p className="text-sm text-brass tabular-nums">{formatDate(incident.date, lang)}</p>
            <p className="mt-1 text-fg">{incident.summary}</p>
            {incident.quotation ? (
              <blockquote className="mt-2 font-serif text-lg italic text-fg">
                “{incident.quotation}”
                {incident.quotationSpeaker ? (
                  <span className="mt-1 block text-sm text-muted not-italic">— {incident.quotationSpeaker}</span>
                ) : null}
              </blockquote>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-2">
              {incident.tags.map((tag) => (
                <Chip key={tag}>{tagLabel(lang, tag)}</Chip>
              ))}
              <Chip tone={incident.status === "documented" ? "sage" : incident.status === "disputed" ? "clay" : "quiet"}>
                {statusLabel(lang, incident.status)}
              </Chip>
            </div>
            {incident.location ? <p className="mt-2 text-xs text-faint">{incident.location}</p> : null}
          </li>
        ))}
      </ol>
      <AddIncident />
    </div>
  );
}

function LinksPane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  if (!matter) return null;
  const edges = linkEdges(matter);
  const byId = new Map(matter.incidents.map((incident) => [incident.id, incident]));
  return (
    <div>
      <p className="text-sm leading-relaxed text-muted">{patternSentence(lang, patternStats(matter))}</p>
      <p className="mt-2 text-xs text-faint">{t(lang, "classification")}</p>
      <ol className="mt-6">
        {edges.map((edge) => {
          const from = byId.get(edge.from);
          const to = byId.get(edge.to);
          if (!from || !to) return null;
          const names = edge.shared
            .map((id) => matter.people.find((person) => person.id === id)?.name)
            .filter(Boolean);
          return (
            <li key={`${edge.from}-${edge.to}`} className="border-b border-line py-4">
              <p className="text-sm text-muted">{formatDate(from.date, lang)}</p>
              <p>{from.summary}</p>
              <p className="my-2 text-xs uppercase tracking-wide text-brass">
                {edge.days === 0 ? t(lang, "sameDay") : `${edge.days} ${t(lang, "days")}`} · {t(lang, "followed")}
              </p>
              <p className="text-sm text-muted">{formatDate(to.date, lang)}</p>
              <p>{to.summary}</p>
              <p className="mt-2 text-xs text-faint">
                {names.length > 0 ? `${t(lang, "shared")}: ${names.join(", ")}` : t(lang, "noneShared")}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function VaultPane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const addEvidence = useFactum((state) => state.addEvidence);
  const addCustody = useFactum((state) => state.addCustody);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState<EvidenceKind>("note");
  const [busy, setBusy] = useState(false);
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [custody, setCustody] = useState("");
  if (!matter) return null;

  async function saveNote() {
    if (!matter) return;
    const record = matter;
    const text = body.trim();
    if (!text) return;
    setBusy(true);
    const sha256 = await sha256Text(text);
    addEvidence(record.id, {
      id: uid(),
      title: title.trim() || (lang === "es" ? "Nota" : "Note"),
      kind,
      body: text,
      filename: null,
      sha256,
      source: lang === "es" ? "Escrita en este dispositivo" : "Typed on this device",
      ingestedAt: new Date().toISOString(),
      incidentIds: [],
      chain: [
        {
          at: new Date().toISOString(),
          action: "ingested",
          detail: lang === "es" ? "Texto original conservado." : "Original text preserved.",
        },
      ],
    });
    setTitle("");
    setBody("");
    setBusy(false);
  }

  async function onFile(file: File) {
    if (!matter) return;
    const record = matter;
    setBusy(true);
    const sha256 = await sha256Buffer(await file.arrayBuffer());
    addEvidence(record.id, {
      id: uid(),
      title: file.name,
      kind: "document",
      body: "",
      filename: file.name,
      sha256,
      source: t(lang, "fileKeptOut"),
      ingestedAt: new Date().toISOString(),
      incidentIds: [],
      chain: [
        {
          at: new Date().toISOString(),
          action: "ingested",
          detail: t(lang, "fileKeptOut"),
        },
      ],
    });
    setBusy(false);
  }

  return (
    <div>
      <p className="text-sm leading-relaxed text-muted">{t(lang, "preserveBody")}</p>
      {matter.evidence.length === 0 ? <p className="mt-4 text-sm text-faint">{t(lang, "vaultEmpty")}</p> : null}
      <ul className="mt-4">
        {matter.evidence.map((item) => (
          <li key={item.id} className="border-b border-line py-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{item.title}</p>
              <Chip>{item.kind}</Chip>
            </div>
            {item.body ? <p className="mt-2 text-sm leading-relaxed">{item.body}</p> : null}
            <p className="hash mt-2 text-faint">
              {t(lang, "hash")} {shortHash(item.sha256)}
            </p>
            <p className="mt-1 text-xs text-faint">
              {t(lang, "ingested")} {formatStamp(item.ingestedAt, lang)} · {item.source}
            </p>
            <p className="mt-1 text-xs text-faint">{item.body ? t(lang, "original") : t(lang, "derived")}</p>
            <ol className="mt-2">
              {item.chain.map((event, index) => (
                <li key={`${event.at}-${index}`} className="text-xs text-muted">
                  {t(lang, "chain")} · {formatStamp(event.at, lang)} · {event.detail}
                </li>
              ))}
            </ol>
            {noteFor === item.id ? (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input className={fieldClass} value={custody} onChange={(event) => setCustody(event.target.value)} />
                <Button
                  onClick={() => {
                    if (!custody.trim()) return;
                    addCustody(matter.id, item.id, custody.trim());
                    setCustody("");
                    setNoteFor(null);
                  }}
                >
                  {t(lang, "save")}
                </Button>
              </div>
            ) : (
              <button type="button" className="mt-2 min-h-11 text-sm text-brass" onClick={() => setNoteFor(item.id)}>
                {t(lang, "custodyNote")}
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3">
        <Field label={t(lang, "title")}>
          <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} />
        </Field>
        <Field label={t(lang, "note")}>
          <textarea className={`${fieldClass} min-h-28 py-3`} value={body} onChange={(event) => setBody(event.target.value)} />
        </Field>
        <select className={fieldClass} value={kind} onChange={(event) => setKind(event.target.value as EvidenceKind)}>
          {KINDS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Button variant="primary" disabled={busy} onClick={() => void saveNote()}>
          {t(lang, "addNote")}
        </Button>
        <label className="inline-flex min-h-11 cursor-pointer items-center justify-center border border-line px-4 text-sm">
          {t(lang, "hashFile")}
          <input
            className="sr-only"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onFile(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}

function answeredClarifiers(
  clarifiers: Clarifiers,
  issues: ReturnType<typeof issuesFor>,
  lang: ReturnType<typeof useFactum.getState>["lang"],
) {
  const rows: { id: string; text: string }[] = [];
  const pushTri = (id: string, active: boolean, value: Tri) => {
    if (!active || value === "unknown") return;
    rows.push({ id, text: `${gapPrompt(lang, id)} — ${t(lang, value)}` });
  };
  const pushText = (id: string, active: boolean, value: string) => {
    if (!active || !value.trim()) return;
    rows.push({ id, text: `${gapPrompt(lang, id)} — ${value}` });
  };
  pushTri("open-support", issues.includes("questioning"), clarifiers.supportWasOpen);
  pushTri("background", issues.includes("questioning"), clarifiers.hostileBackground);
  pushTri("earshot", issues.includes("questioning"), clarifiers.someoneHeard);
  pushText("when-knew", issues.includes("retaliation"), clarifiers.employerKnewOn);
  pushTri("comparators", issues.includes("retaliation"), clarifiers.comparatorsAffected);
  pushText("who-decided", issues.includes("retaliation"), clarifiers.whoDecided);
  pushTri("company-file", issues.includes("retaliation"), clarifiers.hasCompanyDocument);
  pushTri("mandatory", issues.includes("captive"), clarifiers.meetingMandatory);
  pushTri("penalty", issues.includes("captive"), clarifiers.meetingPenalty);
  pushTri("objective", issues.includes("speech"), clarifiers.objectiveBasis);
  return rows;
}

function GapsPane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const setClarifier = useFactum((state) => state.setClarifier);
  const patchMatter = useFactum((state) => state.patchMatter);
  const setTab = useFactum((state) => state.setTab);
  const [words, setWords] = useState("");
  const [place, setPlace] = useState("");
  if (!matter) return null;
  const gaps = gapsFor(matter);
  const issues = issuesFor(matter);
  const answered = answeredClarifiers(matter.clarifiers, issues, lang);

  return (
    <div>
      {gaps.length === 0 ? <p className="text-sm text-muted">{t(lang, "allClear")}</p> : null}
      <ul className="flex flex-col gap-5">
        {gaps.map((gap) => (
          <li key={gap.id} className="border-b border-line pb-4">
            <p className="text-xs uppercase tracking-wide text-faint">
              {gap.issue === "record" ? t(lang, "recordConf") : issueTitle(lang, gap.issue)}
            </p>
            <p className="mt-1 leading-relaxed">{gapPrompt(lang, gap.id)}</p>
            <div className="mt-3">
              <GapControl
                gap={gap}
                clarifiers={matter.clarifiers}
                onTri={(field, value) => setClarifier(matter.id, field, value)}
                onText={(field, value) => setClarifier(matter.id, field, value)}
              />
              {gap.id === "exact-words" ? (
                <div className="mt-2 flex flex-col gap-2">
                  <textarea className={`${fieldClass} min-h-20 py-3`} value={words} onChange={(event) => setWords(event.target.value)} />
                  <Button
                    onClick={() => {
                      if (!words.trim()) return;
                      patchMatter(matter.id, (current) => ({
                        ...current,
                        incidents: current.incidents.map((incident) =>
                          incident.tags.includes("questioning") && !incident.quotation
                            ? { ...incident, quotation: words.trim() }
                            : incident,
                        ),
                      }));
                      setWords("");
                    }}
                  >
                    {t(lang, "save")}
                  </Button>
                </div>
              ) : null}
              {gap.id === "where-asked" ? (
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input className={fieldClass} value={place} onChange={(event) => setPlace(event.target.value)} />
                  <Button
                    onClick={() => {
                      if (!place.trim()) return;
                      patchMatter(matter.id, (current) => ({
                        ...current,
                        incidents: current.incidents.map((incident) =>
                          incident.tags.includes("questioning") && !incident.location
                            ? { ...incident, location: place.trim() }
                            : incident,
                        ),
                      }));
                      setPlace("");
                    }}
                  >
                    {t(lang, "save")}
                  </Button>
                </div>
              ) : null}
              {gap.id === "nothing-kept" ? (
                <Button className="mt-2" onClick={() => setTab("vault")}>
                  {t(lang, "jumpVault")}
                </Button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      {answered.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl">{t(lang, "recorded")}</h2>
          <ul className="mt-2">
            {answered.map((item) => (
              <li key={item.id} className="border-b border-line py-3 text-sm text-muted">
                {item.text}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="font-serif text-2xl">{t(lang, "escalation")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, "escalationBody")}</p>
      </section>
    </div>
  );
}

function GapControl({
  gap,
  clarifiers,
  onTri,
  onText,
}: {
  gap: Gap;
  clarifiers: Clarifiers;
  onTri: (field: keyof Clarifiers, value: Tri) => void;
  onText: (field: keyof Clarifiers, value: string) => void;
}) {
  const lang = useFactum((state) => state.lang);
  if (!gap.field) return null;
  if (gap.field === "employerKnewOn") {
    return (
      <input
        className={fieldClass}
        type="date"
        value={clarifiers.employerKnewOn}
        onChange={(event) => onText("employerKnewOn", event.target.value)}
      />
    );
  }
  if (gap.field === "whoDecided") {
    return (
      <input
        className={fieldClass}
        value={clarifiers.whoDecided}
        onChange={(event) => onText("whoDecided", event.target.value)}
      />
    );
  }
  const value = clarifiers[gap.field];
  if (value !== "yes" && value !== "no" && value !== "unknown") return null;
  return (
    <div className="grid grid-cols-3 gap-2">
      {(["yes", "no", "unknown"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onTri(gap.field as keyof Clarifiers, option)}
          className={`min-h-11 border text-sm ${
            value === option ? "border-brass text-brass" : "border-line text-muted"
          }`}
        >
          {t(lang, option)}
        </button>
      ))}
    </div>
  );
}

function IssuesPane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const role = useFactum((state) => state.role);
  const openLaw = useFactum((state) => state.openLaw);
  if (!matter) return null;
  const issues = issuesFor(matter);
  const flags = contradictions(matter);

  return (
    <div>
      <p className="text-sm leading-relaxed text-muted">{t(lang, "coverageLine")}</p>
      <button type="button" className="mt-2 min-h-11 text-sm text-brass" onClick={() => openLaw("coverage")}>
        {t(lang, "seeCoverage")}
      </button>
      {matter.state ? <p className="mt-3 text-sm text-faint">{t(lang, "stateNote")}</p> : null}
      {flags.length > 0 ? (
        <section className="mt-6 border-l-2 border-clay pl-4">
          <h2 className="text-xs uppercase tracking-[0.16em] text-clay">{t(lang, "contradiction")}</h2>
          <p className="mt-2 text-sm leading-relaxed">{contradictionCopy(lang)}</p>
        </section>
      ) : null}
      <ul className="mt-6 flex flex-col gap-6">
        {issues.map((id) => (
          <li key={id} className="border border-line p-4">
            <h2 className="font-serif text-2xl">{issueTitle(lang, id)}</h2>
            <p className="mt-2 text-sm leading-relaxed">{issueLead(lang, id)}</p>
            <p className="mt-3 border-l-2 border-clay pl-3 text-sm">{issueDoesNot(lang, id)}</p>
            <p className="mt-3 text-xs text-faint">
              {t(lang, "why")}: {issueWhy(lang, id)}
            </p>
            {role === "counsel" && id === "questioning" ? (
              <FactorList title="Bourne" factors={bourneFactors(matter)} />
            ) : null}
            {role === "counsel" && id === "retaliation" ? (
              <FactorList title="Wright Line" factors={wrightElements(matter)} />
            ) : null}
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-wide text-muted">{t(lang, "authority")}</p>
              {ISSUE_RULES[id].map((ruleId) => {
                const rule = ruleById(ruleId);
                if (!rule) return null;
                return (
                  <button
                    key={ruleId}
                    type="button"
                    onClick={() => openLaw(ruleId)}
                    className="min-h-11 text-left text-sm text-brass"
                  >
                    {tx(lang, rule.title)}
                    <span className="mt-1 block text-xs text-muted not-italic">{rule.citation}</span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      {matter.claims.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl">{t(lang, "claims")}</h2>
          <ul className="mt-3 flex flex-col gap-5">
            {matter.claims.map((claim) => {
              const read = readClaim(claim);
              return (
                <li key={claim.id} className="border-t border-line pt-4">
                  <p className="text-xs text-muted">
                    {claim.speaker} · {formatDate(claim.date, lang)}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-faint">{t(lang, "literal")}</p>
                  <blockquote className="font-serif text-lg italic">“{claim.text}”</blockquote>
                  <p className="mt-2 text-sm">
                    {t(lang, "shape")}: {claimKindLabel(lang, read.kind)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{claimTest(lang, read.kind)}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
      <p className="mt-8 text-xs text-faint">{t(lang, "notAdvice")}</p>
    </div>
  );
}

function FactorList({
  title,
  factors,
}: {
  title: string;
  factors: { id: string; state: "in-record" | "missing" }[];
}) {
  const lang = useFactum((state) => state.lang);
  return (
    <div className="mt-4">
      <p className="text-xs uppercase tracking-wide text-muted">
        {t(lang, "elements")} · {title}
      </p>
      <ul className="mt-2">
        {factors.map((factor) => (
          <li key={factor.id} className="flex min-h-11 items-center justify-between gap-3 border-b border-line text-sm">
            <span>{factorLabel(lang, factor.id)}</span>
            <Chip tone={factor.state === "in-record" ? "sage" : "clay"}>
              {factor.state === "in-record" ? t(lang, "inRecord") : t(lang, "missing")}
            </Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PacketPane() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const [note, setNote] = useState("");
  if (!matter) return null;
  const issues = issuesFor(matter);
  const gaps = gapsFor(matter);
  const flags = contradictions(matter);
  const incidents = sortedIncidents(matter);

  async function copyJson() {
    if (!matter) return;
    const text = JSON.stringify(handoff(matter), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setNote(t(lang, "copied"));
    } catch {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "factum-handoff.json";
      link.click();
      URL.revokeObjectURL(url);
      setNote(t(lang, "exported"));
    }
  }

  return (
    <div>
      <div className="no-print mb-4 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" onClick={() => window.print()}>
          {t(lang, "print")}
        </Button>
        <Button onClick={() => void copyJson()}>{t(lang, "copyJson")}</Button>
      </div>
      {note ? <p className="no-print mb-3 text-sm text-sage">{note}</p> : null}
      <article className="sheet bg-paper px-5 py-8 text-paper-ink sm:px-8">
        <p className="text-xs uppercase tracking-[0.18em] text-paper-muted">Factum · {t(lang, "handoff")}</p>
        <h2 className="mt-2 font-serif text-4xl">{matter.workplace}</h2>
        <p className="mt-2 text-sm text-paper-muted">{t(lang, "packetNote")}</p>
        <p className="mt-4 text-sm">{t(lang, "notAdvice")}</p>
        {matter.sample ? <p className="mt-2 text-sm">{t(lang, "sampleBanner")}</p> : null}

        <PacketSection n="01" title={t(lang, "overview")}>
          <p>
            {matter.title}. {matter.unit} {matter.state ? `· ${matter.state}` : ""}
          </p>
          <p className="mt-2">{storyLead(lang, issues)}</p>
        </PacketSection>
        <PacketSection n="02" title={t(lang, "people")}>
          <ul>
            {matter.people.map((person) => (
              <li key={person.id}>
                {person.name} — {personRoleLabel(lang, person.role)}
                {person.unit ? ` · ${person.unit}` : ""}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-paper-muted">{t(lang, "noScore")}</p>
        </PacketSection>
        <PacketSection n="03" title={t(lang, "chronology")}>
          <ul className="flex flex-col gap-3">
            {incidents.map((incident) => (
              <li key={incident.id}>
                <span className="tabular-nums">{formatDate(incident.date, lang)}</span> — {incident.summary}{" "}
                <span className="text-paper-muted">({statusLabel(lang, incident.status)})</span>
                {incident.quotation ? (
                  <span className="mt-1 block font-serif italic">“{incident.quotation}”</span>
                ) : null}
              </li>
            ))}
          </ul>
        </PacketSection>
        <PacketSection n="04" title={t(lang, "evidenceIndex")}>
          <ul className="flex flex-col gap-3">
            {matter.evidence.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span className="mt-1 block text-xs text-paper-muted">
                  {item.kind} · {formatStamp(item.ingestedAt, lang)}
                </span>
                <span className="hash mt-1 block text-paper-muted">{item.sha256}</span>
              </li>
            ))}
          </ul>
        </PacketSection>
        <PacketSection n="05" title={t(lang, "potential")}>
          <ul className="flex flex-col gap-3">
            {issues.map((id) => (
              <li key={id}>
                <span className="font-medium">{issueTitle(lang, id)}.</span> {issueDoesNot(lang, id)}
                <span className="mt-1 block text-sm text-paper-muted">
                  {ISSUE_RULES[id]
                    .map((ruleId) => ruleById(ruleId)?.citation)
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </PacketSection>
        <PacketSection n="06" title={t(lang, "missingEv")}>
          {flags.length > 0 ? <p>{contradictionCopy(lang)}</p> : null}
          <ul className="mt-2 flex flex-col gap-2">
            {gaps.map((gap) => (
              <li key={gap.id}>{gapPrompt(lang, gap.id)}</li>
            ))}
          </ul>
        </PacketSection>
        <PacketSection n="07" title={t(lang, "uncertainty")}>
          <p>{t(lang, "uncertaintyBody")}</p>
          <p className="mt-2">
            {t(lang, "fact")}: {levelLabel(lang, factLevel(matter))}. {t(lang, "recordConf")}:{" "}
            {levelLabel(lang, recordLevel(matter))}. {t(lang, "legal")}: {t(lang, "notScored")}.
          </p>
        </PacketSection>
        <p className="mt-8 border-t border-paper-line pt-4 text-sm">{t(lang, "appendix")}</p>
      </article>
    </div>
  );
}

function PacketSection({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-6 border-t border-paper-line pt-4">
      <h3 className="font-serif text-xl">
        <span className="mr-2 text-paper-muted">{n}</span>
        {title}
      </h3>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function AddPerson() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const addPerson = useFactum((state) => state.addPerson);
  const [name, setName] = useState("");
  const [role, setRole] = useState<PersonRole>("worker");
  const [open, setOpen] = useState(false);
  if (!matter) return null;
  if (!open) {
    return (
      <Button className="mt-3" onClick={() => setOpen(true)}>
        {t(lang, "addPerson")}
      </Button>
    );
  }
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
      <input className={fieldClass} placeholder={t(lang, "name")} value={name} onChange={(event) => setName(event.target.value)} />
      <select className={fieldClass} value={role} onChange={(event) => setRole(event.target.value as PersonRole)}>
        {PERSON_ROLES.map((item) => (
          <option key={item} value={item}>
            {personRoleLabel(lang, item)}
          </option>
        ))}
      </select>
      <Button
        variant="primary"
        onClick={() => {
          if (!name.trim()) return;
          addPerson(matter.id, { id: uid(), name: name.trim(), role, unit: matter.unit });
          setName("");
          setOpen(false);
        }}
      >
        {t(lang, "save")}
      </Button>
    </div>
  );
}

function AddIncident() {
  const matter = useActiveMatter();
  const lang = useFactum((state) => state.lang);
  const addIncident = useFactum((state) => state.addIncident);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [quotation, setQuotation] = useState("");
  const [status, setStatus] = useState<IncidentStatus>("alleged");
  const [tags, setTags] = useState<Tag[]>([]);
  const [people, setPeople] = useState<string[]>([]);
  if (!matter) return null;
  if (!open) {
    return (
      <Button className="mt-2" onClick={() => setOpen(true)}>
        {t(lang, "addDate")}
      </Button>
    );
  }
  return (
    <div className="mt-4 flex flex-col gap-3 border border-line p-4">
      <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      <textarea className={`${fieldClass} min-h-24 py-3`} placeholder={t(lang, "what")} value={summary} onChange={(event) => setSummary(event.target.value)} />
      <textarea className={`${fieldClass} min-h-20 py-3 font-serif italic`} placeholder={t(lang, "quotation")} value={quotation} onChange={(event) => setQuotation(event.target.value)} />
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <button key={tag} type="button" className="min-h-11" onClick={() => setTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]))}>
            <Chip tone={tags.includes(tag) ? "brass" : "quiet"}>{tagLabel(lang, tag)}</Chip>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {matter.people.map((person) => (
          <button
            key={person.id}
            type="button"
            className="min-h-11"
            onClick={() =>
              setPeople((current) =>
                current.includes(person.id) ? current.filter((id) => id !== person.id) : [...current, person.id],
              )
            }
          >
            <Chip tone={people.includes(person.id) ? "brass" : "quiet"}>{person.name}</Chip>
          </button>
        ))}
      </div>
      <select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value as IncidentStatus)}>
        {STATUSES.map((item) => (
          <option key={item} value={item}>
            {statusLabel(lang, item)}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => {
            if (!date || summary.trim().length < 3 || tags.length === 0) return;
            const incident: Incident = {
              id: uid(),
              date,
              tags,
              summary: summary.trim(),
              quotation: quotation.trim(),
              quotationSpeaker: "",
              personIds: people,
              status,
              location: "",
            };
            addIncident(matter.id, incident);
            setOpen(false);
            setSummary("");
            setQuotation("");
            setTags([]);
          }}
        >
          {t(lang, "save")}
        </Button>
        <Button onClick={() => setOpen(false)}>{t(lang, "cancel")}</Button>
      </div>
    </div>
  );
}
