import { blankClarifiers, type Matter } from "@/lib/factum/types";

const NOTE =
  "On January 16, Dana asked me in the aisle, away from the others: Which of you signed cards? I did not answer.";
const WARNING =
  "Written warning dated January 22, 2026. Reason stated: attendance. No prior warning is attached.";
const HISTORY =
  "I have worked nights for three years. I have not received a written attendance warning before January 22.";
const SCHEDULE =
  "My posted schedule dropped from five nights to three, starting the week of January 18.";
const MEETING =
  "Attendance is required. We will cover the union question so everyone hears the same facts.";

export function createSample(): Matter {
  const clarifiers = blankClarifiers();
  clarifiers.meetingMandatory = "yes";
  return {
    id: "sample-harbor",
    sample: true,
    title: "Night warehouse, January 2026",
    workplace: "Harbor & Rye Distribution",
    unit: "Night warehouse",
    state: "Illinois",
    createdAt: "2026-01-25T15:04:00.000Z",
    notes: "",
    clarifiers,
    people: [
      { id: "p-avery", name: "Avery Cole", role: "worker", unit: "Night warehouse" },
      { id: "p-blake", name: "Blake Okonkwo", role: "worker", unit: "Night warehouse" },
      { id: "p-camila", name: "Camila Reyes", role: "worker", unit: "Night warehouse" },
      { id: "p-dana", name: "Dana Ruiz", role: "supervisor", unit: "Night warehouse" },
      { id: "p-jordan", name: "Jordan Hale", role: "hr", unit: "People team" },
    ],
    incidents: [
      {
        id: "i-talk",
        date: "2026-01-04",
        tags: ["concerted_talk"],
        summary:
          "Avery and Blake talked in the break room about whether to contact a union.",
        quotation: "",
        quotationSpeaker: "",
        personIds: ["p-avery", "p-blake"],
        status: "alleged",
        location: "Break room",
      },
      {
        id: "i-cards",
        date: "2026-01-11",
        tags: ["cards"],
        summary: "Avery, Blake, and Camila signed union authorization cards.",
        quotation: "",
        quotationSpeaker: "",
        personIds: ["p-avery", "p-blake", "p-camila"],
        status: "documented",
        location: "Off site",
      },
      {
        id: "i-meet",
        date: "2026-01-13",
        tags: ["mandatory_meeting"],
        summary:
          "HR announced a meeting about the union and said attendance was required.",
        quotation: MEETING,
        quotationSpeaker: "Jordan Hale",
        personIds: ["p-jordan"],
        status: "alleged",
        location: "Warehouse floor",
      },
      {
        id: "i-ask",
        date: "2026-01-16",
        tags: ["questioning"],
        summary: "Supervisor Dana Ruiz asked Avery which coworkers had signed cards.",
        quotation: "Which of you signed cards?",
        quotationSpeaker: "Dana Ruiz",
        personIds: ["p-avery", "p-dana"],
        status: "alleged",
        location: "Aisle, night warehouse",
      },
      {
        id: "i-hours-a",
        date: "2026-01-18",
        tags: ["schedule"],
        summary: "Avery's posted nights dropped from five to three.",
        quotation: "",
        quotationSpeaker: "",
        personIds: ["p-avery"],
        status: "documented",
        location: "Posted schedule",
      },
      {
        id: "i-warn",
        date: "2026-01-22",
        tags: ["discipline"],
        summary:
          "Avery received a written warning citing attendance. Avery recalls no earlier written warning in three years.",
        quotation: "",
        quotationSpeaker: "",
        personIds: ["p-avery"],
        status: "documented",
        location: "HR office",
      },
      {
        id: "i-hours-bc",
        date: "2026-01-24",
        tags: ["schedule"],
        summary: "Blake and Camila both say their nights were reduced the same week.",
        quotation: "",
        quotationSpeaker: "",
        personIds: ["p-blake", "p-camila"],
        status: "alleged",
        location: "Night warehouse",
      },
    ],
    claims: [
      {
        id: "c-hr",
        speaker: "Jordan Hale, HR",
        date: "2026-01-23",
        text: "Scheduling follows business needs. The warning was for chronic attendance problems.",
      },
      {
        id: "c-dana",
        speaker: "Dana Ruiz, supervisor",
        date: "2026-01-20",
        text: "If this union gets in, we may have to look at whether the night shift still makes sense.",
      },
    ],
    evidence: [
      {
        id: "e-note",
        title: "Avery's note of the question",
        kind: "note",
        body: NOTE,
        filename: null,
        sha256: "cfdb0d5534bd98bdea19319af179c29195889e6a1cfab4aceb4fd4d80edd8382",
        source: "Typed by the worker",
        ingestedAt: "2026-01-25T15:06:00.000Z",
        incidentIds: ["i-ask"],
        chain: [
          {
            at: "2026-01-25T15:06:00.000Z",
            action: "ingested",
            detail: "Original note preserved. Hash computed in the browser.",
          },
        ],
      },
      {
        id: "e-warn",
        title: "Text of the written warning",
        kind: "document",
        body: WARNING,
        filename: null,
        sha256: "a0d00bf4f6660e3ec144f7e3b99d0957058ca1e87eb1432bb9ca48524ca2b4bb",
        source: "Worker transcription of a paper warning",
        ingestedAt: "2026-01-25T15:08:00.000Z",
        incidentIds: ["i-warn"],
        chain: [
          {
            at: "2026-01-25T15:08:00.000Z",
            action: "ingested",
            detail: "Transcription. The paper original is not in this vault.",
          },
        ],
      },
      {
        id: "e-hist",
        title: "Note on prior discipline",
        kind: "note",
        body: HISTORY,
        filename: null,
        sha256: "31d3315eacd1efa0504be4de9d6924e778c2f1e2b0693fafc5de6d99f7cc3963",
        source: "Typed by the worker",
        ingestedAt: "2026-01-25T15:09:00.000Z",
        incidentIds: ["i-warn"],
        chain: [
          {
            at: "2026-01-25T15:09:00.000Z",
            action: "ingested",
            detail: "Worker memory. Not a company file.",
          },
        ],
      },
      {
        id: "e-sched",
        title: "Schedule change note",
        kind: "schedule",
        body: SCHEDULE,
        filename: null,
        sha256: "a6c1ffde36c9712611bab714ad11bbf434a19fa1607574bc9b815e7a8ea80e0e",
        source: "Typed from a posted schedule",
        ingestedAt: "2026-01-25T15:11:00.000Z",
        incidentIds: ["i-hours-a"],
        chain: [
          {
            at: "2026-01-25T15:11:00.000Z",
            action: "ingested",
            detail: "Description of a posting. The posting itself was not photographed.",
          },
        ],
      },
      {
        id: "e-meet",
        title: "Words used to call the meeting",
        kind: "message",
        body: MEETING,
        filename: null,
        sha256: "9261ee88a31ca7d19f471c7f238f88bc9e9eb70fb98e935a2f3064878b531f2a",
        source: "Worker recollection of an announcement",
        ingestedAt: "2026-01-25T15:12:00.000Z",
        incidentIds: ["i-meet"],
        chain: [
          {
            at: "2026-01-25T15:12:00.000Z",
            action: "ingested",
            detail: "Recollection, not a recording.",
          },
        ],
      },
    ],
  };
}
