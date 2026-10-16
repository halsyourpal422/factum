import type { IssueId, Lang, PersonRole, Role, Tab, Tag } from "@/lib/factum/types";
import type { ClaimKind, Level, PatternStats } from "@/lib/factum/engine";

type Pair = Record<Lang, string>;

function pair(en: string, es: string): Pair {
  return { en, es };
}

export const ui = {
  kicker: pair("Open labor intelligence", "Inteligencia laboral abierta"),
  heroA: pair("What happened at work", "Lo que pasó en el trabajo"),
  heroB: pair("becomes a record, not a guess.", "se vuelve un expediente, no una suposición."),
  heroBody: pair(
    "Dates, exact words, what is still missing, and the law that might apply — with the citation still attached. Kept in this browser. Not a lawyer. Not a filing.",
    "Fechas, palabras exactas, lo que aún falta y la ley que podría aplicar — con la cita todavía pegada. Guardado en este navegador. No es un abogado. No es una demanda.",
  ),
  recordCta: pair("Record what happened", "Registrar lo que pasó"),
  sampleCta: pair("Open the sample record", "Abrir el expediente de ejemplo"),
  p1: pair("On this device", "En este dispositivo"),
  p1b: pair(
    "The record stays in this browser. Nothing in it is sent to an account, an ad network, or a model.",
    "El expediente se queda en este navegador. Nada de él se envía a una cuenta, a anuncios o a un modelo.",
  ),
  p2: pair("Law has a date", "La ley tiene fecha"),
  p2b: pair(
    "A rule is a citation, a jurisdiction, and a status. Contested law stays contested. Nothing here is a permanent “this is illegal.”",
    "Una regla es una cita, una jurisdicción y un estado. La ley disputada sigue disputada. Aquí nada es un “esto es ilegal” permanente.",
  ),
  p3: pair("People decide", "Las personas deciden"),
  p3b: pair(
    "Organizers, unions, and lawyers stay in charge. This does not file a charge, score a leader, or replace a conversation.",
    "Organizadores, sindicatos y abogados siguen a cargo. Esto no presenta una carga, no califica líderes ni reemplaza una conversación.",
  ),
  sitLine: pair(
    "Chatbots already answer questions. Organizing lists already exist. This is the middle: a private chronology, the holes in it, and authority a person can check.",
    "Los chats ya responden preguntas. Las listas de organización ya existen. Esto es el medio: una cronología privada, sus huecos y autoridad que una persona puede verificar.",
  ),
  onDevice: pair("On this device", "En este dispositivo"),
  empty: pair(
    "No record yet. Start with what happened, or open the sample to see the shape of one.",
    "Aún no hay expediente. Empiece por lo que pasó, o abra el ejemplo para ver la forma de uno.",
  ),
  sampleFlag: pair("Sample · invented facts · real citations", "Ejemplo · hechos inventados · citas reales"),
  openQuestions: pair("open questions", "preguntas abiertas"),
  reading: pair("Reading as", "Leer como"),
  depth: pair("Same record. Different depth.", "El mismo expediente. Otra profundidad."),
  back: pair("Back", "Volver"),
  records: pair("Records", "Expedientes"),
  add: pair("Add", "Añadir"),
  law: pair("Law", "Ley"),
  device: pair("Device", "Dispositivo"),
  work: pair("Work", "Trabajo"),
  organize: pair("Organize", "Organizar"),
  counsel: pair("Counsel", "Jurídico"),
  notAdvice: pair(
    "Legal information, not legal advice. Not a finding. Not a filing.",
    "Información jurídica, no asesoría legal. No es una conclusión. No es una demanda.",
  ),
  libraryKicker: pair("Public library · separate from any private record", "Biblioteca pública · separada de cualquier expediente privado"),
  libraryTitle: pair("Dated labor law", "Derecho laboral con fecha"),
  libraryBody: pair(
    "Primary authority this build will name, and the limits of each card. Reviewed October 15, 2026. Not a citator. Confirm the reporter before you rely on a sentence.",
    "Autoridad primaria que esta versión nombra, y los límites de cada ficha. Revisada el 15 de octubre de 2026. No es un citador. Confirme el reporter antes de apoyarse en una frase.",
  ),
  holds: pair("What it holds", "Lo que sostiene"),
  doesNot: pair("What it does not say", "Lo que no dice"),
  status: pair("Status", "Estado"),
  source: pair("Source", "Fuente"),
  reviewed: pair("Library review", "Revisión de la biblioteca"),
  noUrl: pair(
    "No link, on purpose. Use the citation in a reporter.",
    "Sin enlace, a propósito. Use la cita en un reporter.",
  ),
  deviceTitle: pair("This device is the vault", "Este dispositivo es el resguardo"),
  deviceBody: pair(
    "Factum keeps records in local storage on this browser. Clearing site data, or using another phone, will not find them. There is no account in this build. Export a copy if you need one.",
    "Factum guarda los expedientes en el almacenamiento local de este navegador. Si borra los datos del sitio, o usa otro teléfono, no los encontrará. Esta versión no tiene cuenta. Exporte una copia si la necesita.",
  ),
  neverSent: pair("What does not leave", "Qué no sale"),
  neverSentBody: pair(
    "Names, notes, quotes, and file hashes are not uploaded. A file you hash is not kept — only the hash, unless you type a text copy yourself. There is no cross-workplace analytics. Other people's records are not pooled here.",
    "Nombres, notas, citas y hashes de archivos no se suben. Un archivo que usted hashea no se conserva — solo el hash, salvo que usted escriba una copia en texto. No hay analítica entre centros de trabajo. Los expedientes de otras personas no se juntan aquí.",
  ),
  human: pair("What still needs a person", "Qué sigue necesitando una persona"),
  humanBody: pair(
    "A charge, a petition, a demand, and the decision to tell a union or a lawyer. The NLRB’s public dockets are not synced in this build. Look them up yourself when you are ready.",
    "Una carga, una petición, una demanda y la decisión de hablar con un sindicato o un abogado. Los expedientes públicos del NLRB no se sincronizan en esta versión. Consúltelos usted cuando esté listo.",
  ),
  exportAll: pair("Export every record as JSON", "Exportar todos los expedientes en JSON"),
  restore: pair("Restore the sample record", "Restaurar el expediente de ejemplo"),
  erase: pair("Erase records on this device", "Borrar expedientes en este dispositivo"),
  eraseArm: pair("Erase now — this cannot be undone", "Borrar ahora — no se puede deshacer"),
  copied: pair("Copied", "Copiado"),
  exported: pair("Exported", "Exportado"),
  alias: pair(
    "Use a first name or an alias. A legal name is not required.",
    "Use un nombre de pila o un alias. No hace falta el nombre legal.",
  ),
  stepOf: pair("Step", "Paso"),
  continue: pair("Continue", "Seguir"),
  build: pair("Build the record", "Armar el expediente"),
  suggested: pair(
    "Suggested from your words. Change anything that is wrong.",
    "Sugerido a partir de sus palabras. Corrija lo que esté mal.",
  ),
  needDate: pair("Add a date.", "Añada una fecha."),
  needStory: pair("Write a little more of what happened.", "Escriba un poco más de lo que pasó."),
  needTag: pair("Pick the closest type of event.", "Elija el tipo de hecho más cercano."),
  addPerson: pair("Add person", "Añadir persona"),
  addFollow: pair("Add what changed", "Añadir qué cambió"),
  people: pair("People", "Personas"),
  noScore: pair(
    "This list does not score leaders. That judgment stays with organizers.",
    "Esta lista no califica líderes. Ese juicio queda en quienes organizan.",
  ),
  worth: pair("Worth a careful look", "Vale una mirada cuidadosa"),
  still: pair("Still unclear", "Todavía no está claro"),
  seeAll: pair("All open questions", "Todas las preguntas abiertas"),
  allClear: pair(
    "The questions this library knows how to ask are answered or not triggered. That is not a clean bill of health.",
    "Las preguntas que esta biblioteca sabe hacer están respondidas o no se activaron. Eso no es un certificado de salud.",
  ),
  fact: pair("Facts", "Hechos"),
  recordConf: pair("Record", "Expediente"),
  legal: pair("Legal result", "Resultado jurídico"),
  notScored: pair("Not scored", "No se puntúa"),
  coverageLine: pair(
    "Private-sector NLRA coverage is an assumption until someone checks who the Act leaves out.",
    "La cobertura de la NLRA en el sector privado es una suposición hasta que alguien revise a quién deja fuera la ley.",
  ),
  seeCoverage: pair("Who the Act leaves out", "A quién deja fuera la ley"),
  pattern: pair("Pattern on this record", "Patrón en este expediente"),
  elements: pair("Elements to examine", "Elementos por examinar"),
  inRecord: pair("In the record", "En el expediente"),
  missing: pair("Missing", "Falta"),
  contradiction: pair("Does not match", "No coincide"),
  claims: pair("Statements", "Declaraciones"),
  literal: pair("Literal claim", "Lo que dice"),
  shape: pair("Shape", "Forma"),
  wouldTest: pair("What would test it", "Qué lo pondría a prueba"),
  preserve: pair("Preserve", "Conservar"),
  preserveBody: pair(
    "Keep originals. This vault stores a hash and, if you type it, a text copy. Do not rewrite a quote over the original.",
    "Conserve los originales. Este resguardo guarda un hash y, si usted lo escribe, una copia en texto. No reescriba una cita encima del original.",
  ),
  vaultEmpty: pair("Nothing preserved yet.", "Aún no hay nada conservado."),
  addNote: pair("Keep a note", "Guardar una nota"),
  hashFile: pair("Hash a file, without keeping it", "Hashear un archivo, sin conservarlo"),
  fileKeptOut: pair(
    "File bytes were not kept. Only the hash.",
    "Los bytes del archivo no se guardaron. Solo el hash.",
  ),
  chain: pair("Chain", "Cadena"),
  linked: pair("Linked events", "Hechos vinculados"),
  followed: pair("Followed by", "Seguido por"),
  days: pair("days", "días"),
  sameDay: pair("Same day", "El mismo día"),
  shared: pair("Shared people", "Personas en común"),
  noneShared: pair("No shared people", "Sin personas en común"),
  addDate: pair("Add a date", "Añadir una fecha"),
  save: pair("Save", "Guardar"),
  cancel: pair("Cancel", "Cancelar"),
  quotation: pair("Exact words", "Palabras exactas"),
  noneYet: pair("No events yet.", "Aún no hay hechos."),
  remove: pair("Remove this record from this device", "Quitar este expediente de este dispositivo"),
  removeArm: pair("Remove it", "Quitarlo"),
  recorded: pair("Already in the record", "Ya está en el expediente"),
  yes: pair("Yes", "Sí"),
  no: pair("No", "No"),
  unknown: pair("Not sure", "No sé"),
  handoff: pair("Handoff", "Entrega"),
  packetNote: pair(
    "For an organizer or a lawyer. It does not file anything.",
    "Para un organizador o un abogado. No presenta nada.",
  ),
  print: pair("Print or save", "Imprimir o guardar"),
  copyJson: pair("Copy JSON", "Copiar JSON"),
  escalation: pair("Human routes", "Vías humanas"),
  escalationBody: pair(
    "Nothing here contacts an agency. When a person is ready, typical routes are a union organizer, a worker center, a labor lawyer or legal aid, the NLRB, or a state agency. Public NLRB pages start at nlrb.gov.",
    "Nada de esto contacta a una agencia. Cuando una persona esté lista, las vías habituales son un organizador sindical, un centro de trabajadores, un abogado laboral o asistencia legal, el NLRB o una agencia estatal. Las páginas públicas del NLRB empiezan en nlrb.gov.",
  ),
  nlrb: pair("NLRB public site", "Sitio público del NLRB"),
  sampleBanner: pair(
    "Sample record. The workplace is fictional. The citations are not.",
    "Expediente de ejemplo. El centro de trabajo es ficticio. Las citas no.",
  ),
  stateNote: pair(
    "State law can add or subtract. This record names a state so a person remembers to check it. The library does not apply that state's statutes by itself.",
    "La ley estatal puede sumar o restar. Este expediente nombra un estado para que alguien recuerde revisarlo. La biblioteca no aplica sola las leyes de ese estado.",
  ),
  classification: pair(
    "A type is a filing label, not a verdict.",
    "Un tipo es una etiqueta de archivo, no un veredicto.",
  ),
  why: pair("Why this surfaced", "Por qué apareció"),
  authority: pair("Authority", "Autoridad"),
  openCard: pair("Open the card", "Abrir la ficha"),
  custodyNote: pair("Add a custody note", "Añadir una nota de custodia"),
  title: pair("Title", "Título"),
  note: pair("Note", "Nota"),
  workplace: pair("Workplace", "Centro de trabajo"),
  unit: pair("Department or shift", "Departamento o turno"),
  region: pair("State", "Estado"),
  when: pair("When", "Cuándo"),
  where: pair("Where", "Dónde"),
  what: pair("What happened", "Qué pasó"),
  who: pair("Who was there", "Quién estaba"),
  name: pair("Name or alias", "Nombre o alias"),
  role: pair("Role", "Rol"),
  words: pair("Exact words, if you have them", "Palabras exactas, si las tiene"),
  speaker: pair("Who said it", "Quién lo dijo"),
  types: pair("Type of event", "Tipo de hecho"),
  after: pair("What changed afterward", "Qué cambió después"),
  employerSaid: pair("What management said, if anything", "Qué dijo la dirección, si dijo algo"),
  keep: pair("A text copy to preserve", "Una copia en texto para conservar"),
  keepHint: pair(
    "Optional. It will be hashed and stored only on this device. Originals should stay with you.",
    "Opcional. Se hasheará y se guardará solo en este dispositivo. Los originales deben quedarse con usted.",
  ),
  followHint: pair(
    "Optional. A later hour change, warning, or meeting belongs on its own date.",
    "Opcional. Un cambio de horas, una amonestación o una reunión posterior va en su propia fecha.",
  ),
  selectPeople: pair("Tied to", "Vinculado a"),
  incidentStatus: pair("How sure is this event", "Qué tan seguro es este hecho"),
  language: pair("Language", "Idioma"),
  matter: pair("Record", "Expediente"),
  overview: pair("Overview", "Resumen"),
  chronology: pair("Chronology", "Cronología"),
  alleged: pair("Alleged actions", "Hechos alegados"),
  evidenceIndex: pair("Evidence index", "Índice de prueba"),
  potential: pair("Potential issues", "Posibles cuestiones"),
  missingEv: pair("Missing evidence", "Prueba que falta"),
  unresolved: pair("Unresolved questions", "Preguntas abiertas"),
  sources: pair("Sources named", "Fuentes nombradas"),
  uncertainty: pair("Uncertainty", "Incertidumbre"),
  uncertaintyBody: pair(
    "Fact confidence and record completeness are separate from the law. The legal result is not scored. Citations were reviewed for this library on October 15, 2026 and were not re-fetched from a reporter when you opened this page.",
    "La confianza en los hechos y lo completo del expediente van aparte de la ley. El resultado jurídico no se puntúa. Las citas se revisaron para esta biblioteca el 15 de octubre de 2026 y no se volvieron a descargar de un reporter al abrir esta página.",
  ),
  appendix: pair("Nothing here is advice", "Nada de esto es asesoría"),
  hash: pair("SHA-256", "SHA-256"),
  ingested: pair("Ingested", "Ingresado"),
  original: pair("Original text", "Texto original"),
  derived: pair("Derived from a description, not the original file.", "Derivado de una descripción, no del archivo original."),
  noQuote: pair("No exact words captured.", "No hay palabras exactas."),
  thin: pair("Thin", "Escaso"),
  partial: pair("Partial", "Parcial"),
  supported: pair("Supported", "Sostenido"),
  leadEmpty: pair(
    "Nothing in this record yet maps to a pattern in the library. That can mean the notes are thin, or that the situation sits outside this shelf. Add dates, exact words, and what changed afterward.",
    "Nada en este expediente corresponde aún a un patrón de la biblioteca. Puede ser que las notas sean escasas, o que la situación quede fuera de este estante. Añada fechas, palabras exactas y qué cambió después.",
  ),
  leadClose: pair(
    "None of this is a decision that anyone broke the law.",
    "Nada de esto es una decisión de que alguien violó la ley.",
  ),
  jumpTime: pair("Add it on the dates", "Añádalo en las fechas"),
  jumpVault: pair("Keep it in the vault", "Guárdelo en el resguardo"),
  answer: pair("Answer", "Respuesta"),
  savedLocal: pair("Saved on this device.", "Guardado en este dispositivo."),
  counselHint: pair(
    "Counsel view shows elements, citations, and provenance. It is still not advice from a lawyer.",
    "La vista jurídica muestra elementos, citas y procedencia. Sigue sin ser asesoría de un abogado.",
  ),
  organizeHint: pair(
    "Organize view shows who sits on the same dates. It does not tell you who should lead.",
    "La vista de organizar muestra quién coincide en las mismas fechas. No dice quién debería liderar.",
  ),
  workHint: pair(
    "Work view stays in plain language. The citations are one tab away.",
    "La vista de trabajo se queda en lenguaje llano. Las citas están a una pestaña.",
  ),
} as const;

export type CopyKey = keyof typeof ui;

export function t(lang: Lang, key: CopyKey): string {
  return ui[key][lang];
}

const TAGS: Record<Tag, Pair> = {
  concerted_talk: pair("Talking together", "Hablar juntos"),
  cards: pair("Cards signed", "Tarjetas firmadas"),
  questioning: pair("Questioned", "Preguntas"),
  mandatory_meeting: pair("Mandatory meeting", "Reunión obligatoria"),
  schedule: pair("Schedule change", "Cambio de horario"),
  discipline: pair("Discipline", "Disciplina"),
  discharge: pair("Discharge", "Despido"),
  surveillance: pair("Surveillance", "Vigilancia"),
  threat: pair("Threat-shaped", "Forma de amenaza"),
  promise: pair("Promise of a benefit", "Promesa de beneficio"),
  transfer: pair("Transfer", "Traslado"),
  policy: pair("Policy change", "Cambio de política"),
};

export function tagLabel(lang: Lang, tag: Tag): string {
  return TAGS[tag][lang];
}

const ROLES: Record<PersonRole, Pair> = {
  worker: pair("Worker", "Trabajador"),
  supervisor: pair("Supervisor", "Supervisor"),
  manager: pair("Manager", "Gerencia"),
  hr: pair("HR", "Recursos humanos"),
  consultant: pair("Consultant", "Consultor"),
  witness: pair("Witness", "Testigo"),
  other: pair("Other", "Otra persona"),
};

export function personRoleLabel(lang: Lang, role: PersonRole): string {
  return ROLES[role][lang];
}

const ISSUES: Record<IssueId, Pair> = {
  questioning: pair("Questioning about support", "Preguntas sobre el apoyo"),
  retaliation: pair("Hours, discipline, or similar changes", "Horas, disciplina o cambios parecidos"),
  captive: pair("A required meeting", "Una reunión obligatoria"),
  speech: pair("A threat-shaped or prediction-shaped statement", "Una frase con forma de amenaza o de predicción"),
  benefit: pair("A benefit or a promise", "Un beneficio o una promesa"),
  surveillance: pair("Being watched, or seeming to be", "Vigilancia, o la apariencia de ella"),
};

export function issueTitle(lang: Lang, id: IssueId): string {
  return ISSUES[id][lang];
}

const LEADS: Record<IssueId, Pair> = {
  questioning: pair(
    "A question from a supervisor about who supports the union is something the Board looks at under all the circumstances. It is not automatically against the law.",
    "Una pregunta de un supervisor sobre quién apoya al sindicato es algo que el Board mira según todas las circunstancias. No es automáticamente contrario a la ley.",
  ),
  retaliation: pair(
    "Changes to hours or discipline after people acted together can raise a retaliation question. The legal test needs facts this record may not have yet.",
    "Cambios de horario o de disciplina después de que la gente actuó junta pueden plantear una pregunta de represalia. La prueba jurídica necesita hechos que este expediente quizá aún no tiene.",
  ),
  captive: pair(
    "A required meeting about the union sits in federal law that is currently contested, and state law may not match.",
    "Una reunión obligatoria sobre el sindicato está en un área del derecho federal hoy disputada, y la ley estatal puede no coincidir.",
  ),
  speech: pair(
    "A statement about what might happen if a union comes in has to be sorted into a threat, a prediction, or an opinion. Keywords cannot finish that job.",
    "Una frase sobre lo que podría pasar si entra un sindicato hay que separarla en amenaza, predicción u opinión. Las palabras clave no pueden terminar ese trabajo.",
  ),
  benefit: pair(
    "A benefit offered while people are organizing can be interference. The timing and the reason have to be examined.",
    "Un beneficio ofrecido mientras la gente se organiza puede ser interferencia. Hay que examinar el momento y la razón.",
  ),
  surveillance: pair(
    "Being watched, or being led to believe you are watched, during protected activity is a pattern the Board has treated as interference when it is more than ordinary supervision.",
    "Ser vigilado, o creer que lo vigilan, durante actividad protegida es un patrón que el Board ha tratado como interferencia cuando va más allá de la supervisión ordinaria.",
  ),
};

const DOES_NOT: Record<IssueId, Pair> = {
  questioning: pair(
    "It does not find that the question was coercive.",
    "No concluye que la pregunta fue coercitiva.",
  ),
  retaliation: pair(
    "It does not find motive, and it does not find that the stated reason is false.",
    "No concluye el motivo, y no concluye que la razón declarada sea falsa.",
  ),
  captive: pair(
    "It does not say the meeting was unlawful. The federal rule is under challenge.",
    "No dice que la reunión fue ilegal. La regla federal está impugnada.",
  ),
  speech: pair(
    "It does not classify the sentence as a threat. That is a Gissel judgment.",
    "No clasifica la frase como amenaza. Eso es un juicio bajo Gissel.",
  ),
  benefit: pair(
    "It does not say a raise or a promise was illegal.",
    "No dice que un aumento o una promesa fue ilegal.",
  ),
  surveillance: pair(
    "It does not say a camera or a glance broke the law.",
    "No dice que una cámara o una mirada violó la ley.",
  ),
};

const WHY: Record<IssueId, Pair> = {
  questioning: pair(
    "An event is tagged as questioning.",
    "Un hecho está etiquetado como preguntas.",
  ),
  retaliation: pair(
    "Protected activity and a later schedule change, discipline, transfer, or discharge are both on the record.",
    "Hay actividad protegida y, después, un cambio de horario, disciplina, traslado o despido.",
  ),
  captive: pair(
    "An event is tagged as a mandatory meeting.",
    "Un hecho está etiquetado como reunión obligatoria.",
  ),
  speech: pair(
    "A statement is shaped like a prediction or a threat, or an event is tagged that way.",
    "Una declaración tiene forma de predicción o de amenaza, o un hecho está etiquetado así.",
  ),
  benefit: pair(
    "A statement or event mentions a benefit or a promise.",
    "Una declaración o un hecho menciona un beneficio o una promesa.",
  ),
  surveillance: pair(
    "An event is tagged as surveillance.",
    "Un hecho está etiquetado como vigilancia.",
  ),
};

export function issueLead(lang: Lang, id: IssueId): string {
  return LEADS[id][lang];
}

export function issueDoesNot(lang: Lang, id: IssueId): string {
  return DOES_NOT[id][lang];
}

export function issueWhy(lang: Lang, id: IssueId): string {
  return WHY[id][lang];
}

export function storyLead(lang: Lang, issues: IssueId[]): string {
  if (issues.length === 0) return t(lang, "leadEmpty");
  return `${issues.map((id) => LEADS[id][lang]).join(" ")} ${t(lang, "leadClose")}`;
}

const GAPS: Record<string, Pair> = {
  "exact-words": pair(
    "The exact words of the question are not in the record yet.",
    "Las palabras exactas de la pregunta aún no están en el expediente.",
  ),
  "where-asked": pair(
    "Where the question happened is blank.",
    "Falta el lugar donde ocurrió la pregunta.",
  ),
  "open-support": pair(
    "Was this person's union support already open, or were they trying to keep it quiet?",
    "¿El apoyo al sindicato ya era abierto, o intentaban mantenerlo en reserva?",
  ),
  background: pair(
    "Before this, was there a hostile campaign, or was the workplace quiet?",
    "Antes de esto, ¿había una campaña hostil o el lugar estaba en calma?",
  ),
  earshot: pair(
    "Was anyone else in a position to hear the question?",
    "¿Había alguien más en posición de oír la pregunta?",
  ),
  "when-knew": pair(
    "On what date did management first know about the organizing?",
    "¿En qué fecha supo la dirección, por primera vez, de la organización?",
  ),
  comparators: pair(
    "Did people who were not involved have their hours or discipline changed the same way?",
    "¿A quienes no participaron también les cambiaron las horas o la disciplina del mismo modo?",
  ),
  "who-decided": pair(
    "Who actually made the schedule or discipline decision?",
    "¿Quién tomó de verdad la decisión de horario o de disciplina?",
  ),
  "company-file": pair(
    "Is the employer's stated reason written down in a record you can preserve?",
    "¿La razón que da el empleador está escrita en un documento que usted puede conservar?",
  ),
  mandatory: pair(
    "Was attendance at the meeting required?",
    "¿La asistencia a la reunión era obligatoria?",
  ),
  penalty: pair(
    "Was there a stated consequence for not attending?",
    "¿Hubo una consecuencia anunciada por no asistir?",
  ),
  objective: pair(
    "Is there a documented fact, outside management's control, behind the prediction?",
    "¿Hay un hecho documentado, fuera del control de la dirección, detrás de la predicción?",
  ),
  "nothing-kept": pair(
    "Nothing has been preserved in the vault yet.",
    "Aún no hay nada conservado en el resguardo.",
  ),
};

export function gapPrompt(lang: Lang, id: string): string {
  return GAPS[id]?.[lang] ?? id;
}

const STATUS: Record<string, Pair> = {
  alleged: pair("Alleged", "Alegado"),
  documented: pair("Documented", "Documentado"),
  disputed: pair("Disputed", "Disputado"),
  controlling: pair("Controlling note", "Nota vigente"),
  contested: pair("Contested", "Disputada"),
  prior: pair("Earlier rule", "Regla anterior"),
  statute: pair("Statute", "Ley"),
  framework: pair("Framework", "Marco"),
  fact: pair("Stated as fact", "Dicho como hecho"),
  prediction: pair("Prediction-shaped", "Forma de predicción"),
  opinion: pair("Opinion-shaped", "Forma de opinión"),
  mixed: pair("Benefit-shaped", "Forma de beneficio"),
};

export function statusLabel(lang: Lang, id: string): string {
  return STATUS[id]?.[lang] ?? id;
}

export function levelLabel(lang: Lang, level: Level): string {
  if (level === "thin") return t(lang, "thin");
  if (level === "partial") return t(lang, "partial");
  return t(lang, "supported");
}

export function claimKindLabel(lang: Lang, kind: ClaimKind): string {
  return statusLabel(lang, kind);
}

const TESTS: Record<ClaimKind, Pair> = {
  fact: pair(
    "What document, witness, or data would confirm it, and what would contradict it?",
    "¿Qué documento, testigo o dato lo confirmaría, y qué lo contradiría?",
  ),
  prediction: pair(
    "Gissel asks for an objective fact and a consequence the employer does not control. Is either of those in the vault?",
    "Gissel pide un hecho objetivo y una consecuencia que el empleador no controla. ¿Está alguno de los dos en el resguardo?",
  ),
  opinion: pair(
    "Section 8(c) protects views that are not threats or promises. Is there a threat or a promise in the same breath?",
    "La Sección 8(c) protege opiniones que no son amenazas ni promesas. ¿Hay una amenaza o una promesa en la misma frase?",
  ),
  mixed: pair(
    "Exchange Parts looks at benefits timed to a campaign. What was offered, when, and what reason was given?",
    "Exchange Parts mira beneficios coincidentes con una campaña. ¿Qué se ofreció, cuándo y qué razón se dio?",
  ),
};

export function claimTest(lang: Lang, kind: ClaimKind): string {
  return TESTS[kind][lang];
}

const CONTRADICTION: Pair = pair(
  "Management's stated reason mentions attendance, and a note in the vault says there was no earlier written warning. Those point in different directions. That is a lead for a person. It does not prove why the warning happened.",
  "La razón declarada por la dirección menciona la asistencia, y una nota del resguardo dice que no hubo una amonestación escrita anterior. Apuntan en direcciones distintas. Es una pista para una persona. No prueba por qué ocurrió la amonestación.",
);

export function contradictionCopy(lang: Lang): string {
  return CONTRADICTION[lang];
}

export function patternSentence(lang: Lang, stats: PatternStats): string {
  if (stats.workers === 0) {
    return lang === "es"
      ? "No hay trabajadores marcados en este expediente, así que no hay un patrón de personas que mostrar."
      : "No workers are marked on this record, so there is no people-pattern to show.";
  }
  if (lang === "es") {
    return `En este expediente, ${stats.protectedCount} de ${stats.workers} trabajadores aparecen en una conversación o una firma, y ${stats.both} también aparecen en un cambio de horario, disciplina, traslado o despido. Quien no está anotado — incluida la gente a la que no le cambiaron el horario — es invisible aquí.`;
  }
  return `On this record, ${stats.protectedCount} of ${stats.workers} workers appear in a conversation or a card signing, and ${stats.both} of them also appear in a later schedule change, discipline, transfer, or discharge. Anyone not written down — including people whose hours did not change — is invisible here.`;
}

const TABS: Record<Role, Record<Tab, Pair>> = {
  work: {
    story: pair("Story", "Relato"),
    time: pair("Dates", "Fechas"),
    links: pair("Links", "Vínculos"),
    vault: pair("Kept", "Resguardo"),
    gaps: pair("Questions", "Preguntas"),
    issues: pair("Law", "Ley"),
    packet: pair("Handoff", "Entrega"),
  },
  organize: {
    story: pair("Story", "Relato"),
    time: pair("Timeline", "Línea"),
    links: pair("Pattern", "Patrón"),
    vault: pair("Vault", "Resguardo"),
    gaps: pair("Gaps", "Huecos"),
    issues: pair("Issues", "Cuestiones"),
    packet: pair("Packet", "Paquete"),
  },
  counsel: {
    story: pair("Facts", "Hechos"),
    time: pair("Chronology", "Cronología"),
    links: pair("Graph", "Grafo"),
    vault: pair("Evidence", "Prueba"),
    gaps: pair("Gaps", "Vacíos"),
    issues: pair("Authority", "Autoridad"),
    packet: pair("Packet", "Expediente"),
  },
};

export function tabLabel(lang: Lang, role: Role, tab: Tab): string {
  return TABS[role][tab][lang];
}

const FACTORS: Record<string, Pair> = {
  background: pair("Background, before the question", "Contexto, antes de la pregunta"),
  nature: pair("What information was sought", "Qué información se buscó"),
  identity: pair("Who asked (rank)", "Quién preguntó (rango)"),
  place: pair("Place and method", "Lugar y método"),
  openness: pair("Whether support was already open", "Si el apoyo ya era abierto"),
  protected: pair("Protected activity", "Actividad protegida"),
  knowledge: pair("When the employer knew", "Cuándo supo el empleador"),
  adverse: pair("Adverse action", "Acción adversa"),
  reason: pair("Employer's stated reason", "Razón declarada por el empleador"),
  comparators: pair("Comparators", "Comparables"),
  "same-action": pair("Proof the same action would have happened anyway", "Prueba de que la misma acción habría ocurrido igual"),
};

export function factorLabel(lang: Lang, id: string): string {
  return FACTORS[id]?.[lang] ?? id;
}

const STEPS: Pair[] = [
  pair("What happened", "Qué pasó"),
  pair("Who was there", "Quién estaba"),
  pair("Words and type", "Palabras y tipo"),
  pair("What changed", "Qué cambió"),
  pair("Keep a copy", "Guardar una copia"),
];

export function stepTitle(lang: Lang, index: number): string {
  return STEPS[index]?.[lang] ?? "";
}

export function roleHint(lang: Lang, role: Role): string {
  if (role === "counsel") return t(lang, "counselHint");
  if (role === "organize") return t(lang, "organizeHint");
  return t(lang, "workHint");
}

export const TAB_ORDER: Tab[] = [
  "story",
  "time",
  "links",
  "vault",
  "gaps",
  "issues",
  "packet",
];
