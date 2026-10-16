import type {
  Claim,
  Clarifiers,
  IssueId,
  Matter,
  Tag,
  Tri,
} from "@/lib/factum/types";
import { dayDiff } from "@/lib/factum/format";

const ADVERSE: Tag[] = ["schedule", "discipline", "discharge", "transfer"];
const PROTECTED: Tag[] = ["cards", "concerted_talk"];

export type GapField = keyof Clarifiers | null;

export type Gap = {
  id: string;
  issue: IssueId | "record";
  field: GapField;
};

export type ContradictionId = "attendance-record";

export type Level = "thin" | "partial" | "supported";

export type ClaimKind = "fact" | "prediction" | "opinion" | "mixed";

export type ClaimRead = {
  id: string;
  kind: ClaimKind;
  threatLike: boolean;
  promiseLike: boolean;
};

export type FactorState = "in-record" | "missing";

export type Factor = { id: string; state: FactorState };

export type PatternStats = {
  workers: number;
  protectedCount: number;
  adverseCount: number;
  both: number;
  start: string;
  end: string;
};

const THREAT =
  /\b(fire|fired|close the|shut down|you'll lose|cut your hours|despid|cerrar|amenaz)\b/i;
const PROMISE = /\b(raise|bonus|promotion|better benefits|aumento|bono)\b/i;
const PREDICTION =
  /\b(may|might|could|if (this |the )?union|si el sindicato|quiz[aá])\b/i;
const OPINION = /\b(i think|we believe|in my opinion|creo|creemos)\b/i;

export function inferTags(text: string): Tag[] {
  const value = text.toLowerCase();
  const hit = (pattern: RegExp) => pattern.test(value);
  const tags: Tag[] = [];
  if (hit(/union|sindicato|organiz|concerted|juntos|together with/)) {
    tags.push("concerted_talk");
  }
  if (hit(/authorization card|signed cards|signed a card|tarjeta|union card/)) {
    tags.push("cards");
  }
  if (
    hit(
      /asked (me|us|who|which)|pregunt|qui[eé]n firm|who signed|who support|which of you/,
    )
  ) {
    tags.push("questioning");
  }
  if (
    hit(
      /mandatory|required meeting|attendance is required|reuni[oó]n obligat|tienen que asistir|captive/,
    )
  ) {
    tags.push("mandatory_meeting");
  }
  if (hit(/hours|horario|schedule|turno|fewer shifts|reduj|cut my|recort/)) {
    tags.push("schedule");
  }
  if (hit(/warning|write-?up|disciplin|amonest|suspens/)) tags.push("discipline");
  if (hit(/\bfired\b|terminat|despid|let me go|let us go/)) tags.push("discharge");
  if (hit(/camera|c[aá]mara|watching us|vigil|spying|espi[aó]/)) {
    tags.push("surveillance");
  }
  if (hit(/raise|bonus|aumento|bono|promotion if/)) tags.push("promise");
  if (hit(/close the|shut down|fire you|cerrar la|amenaz|threaten/)) {
    tags.push("threat");
  }
  if (hit(/transfer|traslad/)) tags.push("transfer");
  if (hit(/new policy|handbook changed|nueva pol[ií]tica/)) tags.push("policy");
  return [...new Set(tags)];
}

export function issuesFor(matter: Matter): IssueId[] {
  const tags = new Set(matter.incidents.flatMap((incident) => incident.tags));
  const issues: IssueId[] = [];
  if (tags.has("questioning")) issues.push("questioning");
  const protectedAct = PROTECTED.some((tag) => tags.has(tag));
  const adverse = ADVERSE.some((tag) => tags.has(tag));
  if (protectedAct && adverse) issues.push("retaliation");
  if (tags.has("mandatory_meeting")) issues.push("captive");
  if (tags.has("threat") || matter.claims.some((claim) => readClaim(claim).threatLike || readClaim(claim).kind === "prediction")) {
    issues.push("speech");
  }
  if (tags.has("promise") || matter.claims.some((claim) => readClaim(claim).promiseLike)) {
    issues.push("benefit");
  }
  if (tags.has("surveillance")) issues.push("surveillance");
  return issues;
}

function triOpen(value: Tri): boolean {
  return value === "unknown";
}

export function gapsFor(matter: Matter): Gap[] {
  const issues = new Set(issuesFor(matter));
  const gaps: Gap[] = [];
  const questions = matter.incidents.filter((incident) =>
    incident.tags.includes("questioning"),
  );

  if (issues.has("questioning")) {
    if (!questions.some((incident) => incident.quotation.trim())) {
      gaps.push({ id: "exact-words", issue: "questioning", field: null });
    }
    if (!questions.some((incident) => incident.location.trim())) {
      gaps.push({ id: "where-asked", issue: "questioning", field: null });
    }
    if (triOpen(matter.clarifiers.supportWasOpen)) {
      gaps.push({ id: "open-support", issue: "questioning", field: "supportWasOpen" });
    }
    if (triOpen(matter.clarifiers.hostileBackground)) {
      gaps.push({
        id: "background",
        issue: "questioning",
        field: "hostileBackground",
      });
    }
    if (triOpen(matter.clarifiers.someoneHeard)) {
      gaps.push({ id: "earshot", issue: "questioning", field: "someoneHeard" });
    }
  }

  if (issues.has("retaliation")) {
    if (!matter.clarifiers.employerKnewOn) {
      gaps.push({ id: "when-knew", issue: "retaliation", field: "employerKnewOn" });
    }
    if (triOpen(matter.clarifiers.comparatorsAffected)) {
      gaps.push({
        id: "comparators",
        issue: "retaliation",
        field: "comparatorsAffected",
      });
    }
    if (!matter.clarifiers.whoDecided.trim()) {
      gaps.push({ id: "who-decided", issue: "retaliation", field: "whoDecided" });
    }
    if (triOpen(matter.clarifiers.hasCompanyDocument)) {
      gaps.push({
        id: "company-file",
        issue: "retaliation",
        field: "hasCompanyDocument",
      });
    }
  }

  if (issues.has("captive")) {
    if (triOpen(matter.clarifiers.meetingMandatory)) {
      gaps.push({ id: "mandatory", issue: "captive", field: "meetingMandatory" });
    }
    if (triOpen(matter.clarifiers.meetingPenalty)) {
      gaps.push({ id: "penalty", issue: "captive", field: "meetingPenalty" });
    }
  }

  if (issues.has("speech")) {
    if (triOpen(matter.clarifiers.objectiveBasis)) {
      gaps.push({ id: "objective", issue: "speech", field: "objectiveBasis" });
    }
  }

  if (matter.evidence.length === 0) {
    gaps.push({ id: "nothing-kept", issue: "record", field: null });
  }

  return gaps;
}

export function contradictions(matter: Matter): ContradictionId[] {
  const claims = matter.claims.map((claim) => claim.text).join(" ").toLowerCase();
  const vault = matter.evidence.map((item) => item.body).join(" ").toLowerCase();
  const saysAttendance = /attendance|absent|tardy|asistencia|faltas/.test(claims);
  const deniesHistory =
    /no prior|not received a written|have not received|sin antecedente|nunca me/.test(
      vault,
    );
  const hasDiscipline = matter.incidents.some((incident) =>
    incident.tags.includes("discipline"),
  );
  if (saysAttendance && deniesHistory && hasDiscipline) return ["attendance-record"];
  return [];
}

export function readClaim(claim: Claim): ClaimRead {
  const threatLike = THREAT.test(claim.text);
  const promiseLike = PROMISE.test(claim.text);
  const prediction = PREDICTION.test(claim.text);
  const opinion = OPINION.test(claim.text);
  let kind: ClaimKind = "fact";
  if (opinion && !threatLike) kind = "opinion";
  else if (prediction || threatLike) kind = "prediction";
  else if (promiseLike) kind = "mixed";
  return { id: claim.id, kind, threatLike, promiseLike };
}

export function patternStats(matter: Matter): PatternStats {
  const workers = new Set(
    matter.people.filter((person) => person.role === "worker").map((person) => person.id),
  );
  const protectedIds = new Set<string>();
  const adverseIds = new Set<string>();
  for (const incident of matter.incidents) {
    const isProtected = incident.tags.some((tag) => PROTECTED.includes(tag));
    const isAdverse = incident.tags.some((tag) => ADVERSE.includes(tag));
    for (const id of incident.personIds) {
      if (!workers.has(id)) continue;
      if (isProtected) protectedIds.add(id);
      if (isAdverse) adverseIds.add(id);
    }
  }
  let both = 0;
  for (const id of protectedIds) if (adverseIds.has(id)) both += 1;
  const dates = matter.incidents.map((incident) => incident.date).sort();
  return {
    workers: workers.size,
    protectedCount: protectedIds.size,
    adverseCount: adverseIds.size,
    both,
    start: dates[0] ?? "",
    end: dates[dates.length - 1] ?? "",
  };
}

export type LinkEdge = {
  from: string;
  to: string;
  days: number;
  shared: string[];
};

export function linkEdges(matter: Matter): LinkEdge[] {
  const sorted = [...matter.incidents].sort((a, b) => a.date.localeCompare(b.date));
  const edges: LinkEdge[] = [];
  for (let index = 1; index < sorted.length; index += 1) {
    const previous = sorted[index - 1];
    const current = sorted[index];
    if (!previous || !current) continue;
    edges.push({
      from: previous.id,
      to: current.id,
      days: dayDiff(previous.date, current.date),
      shared: current.personIds.filter((id) => previous.personIds.includes(id)),
    });
  }
  return edges;
}

export function bourneFactors(matter: Matter): Factor[] {
  const questions = matter.incidents.filter((incident) =>
    incident.tags.includes("questioning"),
  );
  const asker = questions.some((incident) =>
    incident.personIds.some((id) => {
      const person = matter.people.find((item) => item.id === id);
      return (
        person?.role === "supervisor" ||
        person?.role === "manager" ||
        person?.role === "hr"
      );
    }),
  );
  return [
    {
      id: "background",
      state: matter.clarifiers.hostileBackground === "unknown" ? "missing" : "in-record",
    },
    {
      id: "nature",
      state: questions.some((incident) => incident.quotation.trim())
        ? "in-record"
        : "missing",
    },
    { id: "identity", state: asker ? "in-record" : "missing" },
    {
      id: "place",
      state: questions.some((incident) => incident.location.trim())
        ? "in-record"
        : "missing",
    },
    {
      id: "openness",
      state: matter.clarifiers.supportWasOpen === "unknown" ? "missing" : "in-record",
    },
  ];
}

export function wrightElements(matter: Matter): Factor[] {
  const tags = new Set(matter.incidents.flatMap((incident) => incident.tags));
  const protectedAct = PROTECTED.some((tag) => tags.has(tag));
  const adverse = ADVERSE.some((tag) => tags.has(tag));
  return [
    { id: "protected", state: protectedAct ? "in-record" : "missing" },
    {
      id: "knowledge",
      state: matter.clarifiers.employerKnewOn ? "in-record" : "missing",
    },
    { id: "adverse", state: adverse ? "in-record" : "missing" },
    {
      id: "reason",
      state: matter.claims.length > 0 ? "in-record" : "missing",
    },
    {
      id: "comparators",
      state:
        matter.clarifiers.comparatorsAffected === "unknown" ? "missing" : "in-record",
    },
    {
      id: "same-action",
      state: matter.clarifiers.hasCompanyDocument === "unknown" ? "missing" : "in-record",
    },
  ];
}

export function recordLevel(matter: Matter): Level {
  const open = gapsFor(matter).length;
  if (matter.incidents.length === 0) return "thin";
  if (open === 0 && matter.evidence.length > 0) return "supported";
  if (open <= 3) return "partial";
  return "thin";
}

export function factLevel(matter: Matter): Level {
  if (matter.incidents.length === 0) return "thin";
  const documented = matter.incidents.filter(
    (incident) => incident.status === "documented",
  ).length;
  if (documented === 0) return "thin";
  if (documented < matter.incidents.length) return "partial";
  return "supported";
}

export function sortedIncidents(matter: Matter) {
  return [...matter.incidents].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

export function handoff(matter: Matter) {
  return {
    kind: "factum-handoff",
    disclaimer:
      "Legal information from a local library, not legal advice, not a filing, and not a finding.",
    workplace: {
      title: matter.title,
      name: matter.workplace,
      unit: matter.unit,
      state: matter.state,
      sample: matter.sample,
    },
    people: matter.people.map((person) => ({
      name: person.name,
      role: person.role,
      unit: person.unit,
    })),
    chronology: sortedIncidents(matter).map((incident) => ({
      date: incident.date,
      tags: incident.tags,
      summary: incident.summary,
      quotation: incident.quotation,
      status: incident.status,
      location: incident.location,
    })),
    claims: matter.claims.map((claim) => ({
      speaker: claim.speaker,
      date: claim.date,
      text: claim.text,
      read: readClaim(claim),
    })),
    evidence: matter.evidence.map((item) => ({
      title: item.title,
      kind: item.kind,
      sha256: item.sha256,
      ingestedAt: item.ingestedAt,
      source: item.source,
      filename: item.filename,
    })),
    issues: issuesFor(matter),
    openQuestions: gapsFor(matter).map((gap) => gap.id),
    contradictions: contradictions(matter),
    clarifiers: matter.clarifiers,
    libraryReviewed: "2026-10-15",
  };
}
