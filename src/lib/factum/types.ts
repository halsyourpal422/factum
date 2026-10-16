export type Lang = "en" | "es";
export type Role = "work" | "organize" | "counsel";

export const TAGS = [
  "concerted_talk",
  "cards",
  "questioning",
  "mandatory_meeting",
  "schedule",
  "discipline",
  "discharge",
  "surveillance",
  "threat",
  "promise",
  "transfer",
  "policy",
] as const;

export type Tag = (typeof TAGS)[number];

export type PersonRole =
  | "worker"
  | "supervisor"
  | "manager"
  | "hr"
  | "consultant"
  | "witness"
  | "other";

export type Person = {
  id: string;
  name: string;
  role: PersonRole;
  unit: string;
};

export type CustodyAction = "ingested" | "noted" | "linked";

export type CustodyEvent = {
  at: string;
  action: CustodyAction;
  detail: string;
};

export type EvidenceKind =
  | "note"
  | "message"
  | "document"
  | "schedule"
  | "policy"
  | "photo-note";

export type Evidence = {
  id: string;
  title: string;
  kind: EvidenceKind;
  body: string;
  filename: string | null;
  sha256: string;
  source: string;
  ingestedAt: string;
  incidentIds: string[];
  chain: CustodyEvent[];
};

export type IncidentStatus = "alleged" | "documented" | "disputed";

export type Incident = {
  id: string;
  date: string;
  tags: Tag[];
  summary: string;
  quotation: string;
  quotationSpeaker: string;
  personIds: string[];
  status: IncidentStatus;
  location: string;
};

export type Claim = {
  id: string;
  speaker: string;
  text: string;
  date: string;
};

export type Tri = "yes" | "no" | "unknown";

export type Clarifiers = {
  supportWasOpen: Tri;
  hostileBackground: Tri;
  employerKnewOn: string;
  comparatorsAffected: Tri;
  whoDecided: string;
  meetingMandatory: Tri;
  meetingPenalty: Tri;
  objectiveBasis: Tri;
  someoneHeard: Tri;
  hasCompanyDocument: Tri;
};

export type Matter = {
  id: string;
  sample: boolean;
  title: string;
  workplace: string;
  unit: string;
  state: string;
  createdAt: string;
  people: Person[];
  incidents: Incident[];
  evidence: Evidence[];
  claims: Claim[];
  clarifiers: Clarifiers;
  notes: string;
};

export type View = "home" | "intake" | "matter" | "law" | "privacy";
export type Tab =
  | "story"
  | "time"
  | "links"
  | "vault"
  | "gaps"
  | "issues"
  | "packet";

export type IssueId =
  | "questioning"
  | "retaliation"
  | "captive"
  | "speech"
  | "benefit"
  | "surveillance";

export type DoctrineStatus =
  | "controlling"
  | "contested"
  | "prior"
  | "statute"
  | "framework";

export function blankClarifiers(): Clarifiers {
  return {
    supportWasOpen: "unknown",
    hostileBackground: "unknown",
    employerKnewOn: "",
    comparatorsAffected: "unknown",
    whoDecided: "",
    meetingMandatory: "unknown",
    meetingPenalty: "unknown",
    objectiveBasis: "unknown",
    someoneHeard: "unknown",
    hasCompanyDocument: "unknown",
  };
}
