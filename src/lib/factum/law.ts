import type { DoctrineStatus, IssueId, Lang } from "@/lib/factum/types";

export const REVIEWED = "2026-10-15";

export type L10n = { en: string; es: string };

export type Rule = {
  id: string;
  status: DoctrineStatus;
  citation: string;
  sourceLabel: L10n;
  sourceUrl: string | null;
  title: L10n;
  holds: L10n;
  doesNot: L10n;
  statusNote: L10n;
};

export const RULES: Rule[] = [
  {
    id: "coverage",
    status: "statute",
    citation: "NLRA § 2(3), 29 U.S.C. § 152(3)",
    sourceLabel: {
      en: "Statute text (Cornell LII)",
      es: "Texto de la ley (Cornell LII)",
    },
    sourceUrl: "https://www.law.cornell.edu/uscode/text/29/152",
    title: {
      en: "Who the Act even covers",
      es: "A quién cubre la ley",
    },
    holds: {
      en: "The National Labor Relations Act's definition of “employee” leaves some people out. The statutory exclusions include agricultural laborers, domestic workers employed in a home, people employed by a parent or spouse, independent contractors, supervisors, and others named in the section. Most public employees are outside this Act. Airlines and railroads are generally under the Railway Labor Act instead.",
      es: "La definición de “employee” en la Ley Nacional de Relaciones del Trabajo deja fuera a algunas personas. Las exclusiones incluyen trabajadores agrícolas, trabajadores domésticos en un hogar, personas empleadas por un padre o cónyuge, contratistas independientes, supervisores y otras categorías nombradas en la sección. La mayoría de los empleados públicos quedan fuera de esta ley. Aerolíneas y ferrocarriles suelen regirse por la Railway Labor Act.",
    },
    doesNot: {
      en: "Being outside the NLRA does not mean no law applies. Wage, discrimination, safety, and state labor rules can still matter. This library does not cover those regimes.",
      es: "Quedar fuera de la NLRA no significa que ninguna ley aplique. Normas de salario, discriminación, seguridad y leyes estatales pueden importar. Esta biblioteca no cubre esos regímenes.",
    },
    statusNote: {
      en: "Coverage is a legal conclusion about a job, not a setting in the app. Confirm it before using any card below.",
      es: "La cobertura es una conclusión jurídica sobre un puesto, no un ajuste de la aplicación. Confírmela antes de usar cualquier ficha.",
    },
  },
  {
    id: "sec7",
    status: "statute",
    citation: "NLRA § 7, 29 U.S.C. § 157",
    sourceLabel: {
      en: "Statute text (Cornell LII)",
      es: "Texto de la ley (Cornell LII)",
    },
    sourceUrl: "https://www.law.cornell.edu/uscode/text/29/157",
    title: {
      en: "Section 7 rights",
      es: "Derechos de la Sección 7",
    },
    holds: {
      en: "Covered employees have the right to self-organize; to form, join, or assist labor organizations; to bargain collectively; and to engage in other concerted activities for mutual aid or protection. They also have the right to refrain from those activities.",
      es: "Las personas empleadas cubiertas tienen derecho a organizarse; a formar, afiliarse o ayudar a organizaciones laborales; a negociar colectivamente; y a otras actividades concertadas para ayuda o protección mutua. También tienen derecho a abstenerse.",
    },
    doesNot: {
      en: "It does not protect every complaint one person makes about a purely personal gripe. “Concerted” is a legal term that has to be applied to the facts. It does not, by itself, say what remedy follows.",
      es: "No protege toda queja de una sola persona sobre un agravio puramente personal. “Concerted” es un término jurídico que hay que aplicar a los hechos. Por sí sola no dice qué remedio corresponde.",
    },
    statusNote: {
      en: "The statute is the base. Board and court decisions decide how it applies, and those decisions change.",
      es: "La ley es la base. El Board y los tribunales deciden cómo se aplica, y esas decisiones cambian.",
    },
  },
  {
    id: "sec8a1",
    status: "statute",
    citation: "NLRA § 8(a)(1), 29 U.S.C. § 158(a)(1)",
    sourceLabel: {
      en: "Statute text (Cornell LII)",
      es: "Texto de la ley (Cornell LII)",
    },
    sourceUrl: "https://www.law.cornell.edu/uscode/text/29/158",
    title: {
      en: "Interference with Section 7",
      es: "Interferencia con la Sección 7",
    },
    holds: {
      en: "It is an unfair labor practice for a covered employer to interfere with, restrain, or coerce employees in the exercise of Section 7 rights.",
      es: "Es una práctica laboral injusta que un empleador cubierto interfiera, restrinja o coaccione a las personas empleadas en el ejercicio de los derechos de la Sección 7.",
    },
    doesNot: {
      en: "The sentence does not list which questions, meetings, or glances count. That is decided case by case. A tense conversation is not automatically coercion.",
      es: "La frase no enumera qué preguntas, reuniones o miradas cuentan. Eso se decide caso por caso. Una conversación tensa no es coacción de forma automática.",
    },
    statusNote: {
      en: "Most of the cards below are ways the Board has applied this section. They are not extra statutes.",
      es: "La mayoría de las fichas de abajo son formas en que el Board ha aplicado esta sección. No son leyes adicionales.",
    },
  },
  {
    id: "sec8a3",
    status: "statute",
    citation: "NLRA § 8(a)(3), 29 U.S.C. § 158(a)(3)",
    sourceLabel: {
      en: "Statute text (Cornell LII)",
      es: "Texto de la ley (Cornell LII)",
    },
    sourceUrl: "https://www.law.cornell.edu/uscode/text/29/158",
    title: {
      en: "Discrimination to encourage or discourage a union",
      es: "Discriminación para impulsar o desalentar un sindicato",
    },
    holds: {
      en: "It is an unfair labor practice for a covered employer to discriminate in hire, tenure, or any term or condition of employment in order to encourage or discourage membership in a labor organization.",
      es: "Es una práctica laboral injusta que un empleador cubierto discrimine en la contratación, la permanencia o cualquier condición de empleo para impulsar o desalentar la afiliación a una organización laboral.",
    },
    doesNot: {
      en: "It does not make every schedule change or warning unlawful. Motive is contested. The Wright Line card is the usual framework, not a shortcut around it.",
      es: "No vuelve ilegal todo cambio de horario o amonestación. El motivo se disputa. La ficha Wright Line es el marco habitual, no un atajo.",
    },
    statusNote: {
      en: "Hours, discipline, transfers, and discharge are the kinds of terms this section can reach when the evidence supports it.",
      es: "Horarios, disciplina, traslados y despido son el tipo de condiciones que esta sección puede alcanzar cuando la prueba lo sostiene.",
    },
  },
  {
    id: "sec8c",
    status: "statute",
    citation: "NLRA § 8(c), 29 U.S.C. § 158(c)",
    sourceLabel: {
      en: "Statute text (Cornell LII)",
      es: "Texto de la ley (Cornell LII)",
    },
    sourceUrl: "https://www.law.cornell.edu/uscode/text/29/158",
    title: {
      en: "Employer speech that the Act protects",
      es: "Expresión del empleador que la ley protege",
    },
    holds: {
      en: "Expressing views, argument, or opinion is not an unfair labor practice if the expression contains no threat of reprisal or force, or promise of benefit.",
      es: "Expresar opiniones, argumentos o puntos de vista no es una práctica laboral injusta si la expresión no contiene amenaza de represalia o fuerza, ni promesa de beneficio.",
    },
    doesNot: {
      en: "It does not bless a threat because it was polite, and it does not ban criticism of a union. The line between a view and a threat is the whole question.",
      es: "No bendice una amenaza porque fue cortés, y no prohíbe criticar a un sindicato. La línea entre una opinión y una amenaza es toda la cuestión.",
    },
    statusNote: {
      en: "Read this with the Gissel card. Section 8(c) is the speech rule. Gissel is how the Supreme Court drew the threat-and-prediction line.",
      es: "Léala con la ficha Gissel. La Sección 8(c) es la regla de expresión. Gissel es cómo la Corte Suprema trazó la línea entre amenaza y predicción.",
    },
  },
  {
    id: "rossmore",
    status: "controlling",
    citation:
      "Rossmore House, 269 NLRB No. 198 (1984), enforced sub nom. Hotel Employees Local 11 v. NLRB, 760 F.2d 1006 (9th Cir. 1985)",
    sourceLabel: {
      en: "Look up the citation in the NLRB decision search",
      es: "Busque la cita en el buscador de decisiones del NLRB",
    },
    sourceUrl: "https://www.nlrb.gov/cases-decisions/decisions",
    title: {
      en: "Questioning is judged by all the circumstances",
      es: "Las preguntas se juzgan según todas las circunstancias",
    },
    holds: {
      en: "An employer's questions about union activity are not unlawful per se. The Board asks whether, under all the circumstances, the questioning reasonably tends to restrain, coerce, or interfere with Section 7 rights. In Rossmore House the Board found the questioning lawful. The employee was an open union supporter, and the conversations were not coercive. The Ninth Circuit enforced that decision.",
      es: "Las preguntas de un empleador sobre actividad sindical no son ilegales por sí solas. El Board pregunta si, bajo todas las circunstancias, tienden razonablemente a restringir, coaccionar o interferir con los derechos de la Sección 7. En Rossmore House el Board encontró lícitas las preguntas. La persona era un apoyo sindical abierto y las conversaciones no fueron coercitivas. El Noveno Circuito confirmó esa decisión.",
    },
    doesNot: {
      en: "It does not mean a supervisor may freely ask who signed a card. Asking who else supports the union, in private, by a boss, is a different set of circumstances than Rossmore House. The case is a test, not a permission slip.",
      es: "No significa que un supervisor pueda preguntar libremente quién firmó una tarjeta. Preguntar quién más apoya al sindicato, en privado, por parte de un jefe, es un conjunto de circunstancias distinto al de Rossmore House. El caso es una prueba, no un permiso.",
    },
    statusNote: {
      en: "Reviewed October 15, 2026 as the Board's totality test for interrogation. Confirm the opinion before you quote it. This app does not re-fetch the reporter.",
      es: "Revisada el 15 de octubre de 2026 como la prueba de totalidad del Board para interrogatorios. Confirme el texto antes de citarlo. Esta aplicación no vuelve a descargar el reporter.",
    },
  },
  {
    id: "bourne",
    status: "framework",
    citation: "Bourne v. NLRB, 332 F.2d 47 (2d Cir. 1964)",
    sourceLabel: {
      en: "Citation only — confirm in a reporter or citator",
      es: "Solo la cita — confirme en un reporter o citador",
    },
    sourceUrl: null,
    title: {
      en: "Bourne factors",
      es: "Factores Bourne",
    },
    holds: {
      en: "Courts and the Board often look at a few circumstances when judging questions: the background, the nature of the information sought, the identity of the questioner, and the place and method. Whether the employee was an open supporter also matters under Rossmore House. The factors are a lens, not a score.",
      es: "Los tribunales y el Board suelen mirar algunas circunstancias al juzgar preguntas: el contexto, la naturaleza de la información buscada, la identidad de quien pregunta, y el lugar y el método. Si el apoyo era abierto también importa bajo Rossmore House. Los factores son una lente, no un puntaje.",
    },
    doesNot: {
      en: "Checking every box does not prove a violation, and missing a box does not clear one. A later court has warned against turning the factors into a rigid hurdle.",
      es: "Marcar cada casilla no prueba una violación, y que falte una no la descarta. Un tribunal posterior advirtió contra convertir los factores en un obstáculo rígido.",
    },
    statusNote: {
      en: "Use the factors to see what this record is missing. Do not add them up.",
      es: "Use los factores para ver qué le falta a este expediente. No los sume.",
    },
  },
  {
    id: "wright",
    status: "controlling",
    citation:
      "Wright Line, 251 NLRB 1083 (1980), enforced 662 F.2d 899 (1st Cir. 1981); approved in NLRB v. Transportation Management Corp., 462 U.S. 393 (1983)",
    sourceLabel: {
      en: "Supreme Court opinion (Justia)",
      es: "Opinión de la Corte Suprema (Justia)",
    },
    sourceUrl: "https://supreme.justia.com/cases/federal/us/462/393/",
    title: {
      en: "Mixed-motive discrimination",
      es: "Discriminación con motivos mixtos",
    },
    holds: {
      en: "When a charge says someone was punished for union activity and the employer offers another reason, Wright Line splits the proof. The General Counsel must show that protected activity was a motivating factor in the decision. That burden does not move. The employer can still avoid liability by showing it would have taken the same action anyway. The Supreme Court approved that allocation.",
      es: "Cuando una carga dice que alguien fue sancionado por actividad sindical y el empleador ofrece otra razón, Wright Line reparte la prueba. El Consejero General debe mostrar que la actividad protegida fue un factor motivante. Esa carga no se traslada. El empleador aún puede evitar responsabilidad si demuestra que habría tomado la misma medida de todos modos. La Corte Suprema aprobó ese reparto.",
    },
    doesNot: {
      en: "Close timing does not prove motive. A real performance problem can still be real. This card does not find that any warning or hour cut in your record was unlawful.",
      es: "La cercanía en el tiempo no prueba el motivo. Un problema real de desempeño puede seguir siendo real. Esta ficha no concluye que una amonestación o un recorte de horas en su expediente fue ilegal.",
    },
    statusNote: {
      en: "The Board decision is Wright Line, 251 NLRB 1083 (1980). The Supreme Court case to read with it is Transportation Management, 462 U.S. 393 (1983).",
      es: "La decisión del Board es Wright Line, 251 NLRB 1083 (1980). El caso de la Corte Suprema para leer junto es Transportation Management, 462 U.S. 393 (1983).",
    },
  },
  {
    id: "gissel",
    status: "controlling",
    citation: "NLRB v. Gissel Packing Co., 395 U.S. 575 (1969)",
    sourceLabel: {
      en: "Supreme Court opinion (Justia)",
      es: "Opinión de la Corte Suprema (Justia)",
    },
    sourceUrl: "https://supreme.justia.com/cases/federal/us/395/575/",
    title: {
      en: "Threats, predictions, and opinions",
      es: "Amenazas, predicciones y opiniones",
    },
    holds: {
      en: "An employer may share views and opinions. A threat of reprisal is not protected. A prediction of what a union would force the employer to do must rest on objective fact and convey demonstrable consequences beyond the employer's control. Otherwise it can be heard as a threat.",
      es: "Un empleador puede compartir opiniones. Una amenaza de represalia no está protegida. Una predicción de lo que un sindicato obligaría a hacer al empleador debe apoyarse en un hecho objetivo y comunicar consecuencias demostrables fuera del control del empleador. Si no, puede oírse como amenaza.",
    },
    doesNot: {
      en: "It does not turn every grim sentence into a violation, and it does not let a threat through because it used the word “might.” Sorting threat, prediction, and opinion is a judgment about context.",
      es: "No convierte toda frase sombría en una violación, y no deja pasar una amenaza porque usó la palabra “quizá”. Separar amenaza, predicción y opinión es un juicio sobre el contexto.",
    },
    statusNote: {
      en: "Pair this with Section 8(c). The app can flag the shape of a sentence. It cannot finish the Gissel question.",
      es: "Léala con la Sección 8(c). La aplicación puede marcar la forma de una frase. No puede cerrar la pregunta de Gissel.",
    },
  },
  {
    id: "exchange",
    status: "controlling",
    citation: "NLRB v. Exchange Parts Co., 375 U.S. 405 (1964)",
    sourceLabel: {
      en: "Supreme Court opinion (Justia)",
      es: "Opinión de la Corte Suprema (Justia)",
    },
    sourceUrl: "https://supreme.justia.com/cases/federal/us/375/405/",
    title: {
      en: "Benefits during a campaign",
      es: "Beneficios durante una campaña",
    },
    holds: {
      en: "A grant of benefits timed to influence employees' choice during an organizing campaign can violate the Act. The classic danger is a favor the employer would not otherwise have given, offered so people will vote no.",
      es: "Otorgar beneficios en el momento justo para influir en la elección durante una campaña de organización puede violar la ley. El peligro clásico es un favor que el empleador no habría dado, ofrecido para que la gente vote no.",
    },
    doesNot: {
      en: "It does not forbid every raise that happens to fall during a campaign. Business reasons can exist. The reason, the timing, and what was said have to be examined.",
      es: "No prohíbe todo aumento que coincide con una campaña. Pueden existir razones de negocio. Hay que examinar el motivo, el momento y lo que se dijo.",
    },
    statusNote: {
      en: "This card is about benefits and promises, not about discipline. Discipline follows the Wright Line card.",
      es: "Esta ficha trata de beneficios y promesas, no de disciplina. La disciplina sigue la ficha Wright Line.",
    },
  },
  {
    id: "captive",
    status: "contested",
    citation:
      "Amazon.com Services LLC, 373 NLRB No. 136 (Nov. 13, 2024); earlier rule associated with Babcock & Wilcox Co., 77 NLRB 577 (1948)",
    sourceLabel: {
      en: "Look up the 2024 citation in the NLRB decision search",
      es: "Busque la cita de 2024 en el buscador del NLRB",
    },
    sourceUrl: "https://www.nlrb.gov/cases-decisions/decisions",
    title: {
      en: "Mandatory meetings about unionization",
      es: "Reuniones obligatorias sobre sindicalización",
    },
    holds: {
      en: "In November 2024 the Board held that requiring employees to attend a meeting where the employer speaks about unionization violates Section 8(a)(1). Voluntary meetings were treated differently. For decades before that, the Board's Babcock & Wilcox rule had allowed mandatory meetings that did not include threats, promises, or interrogation.",
      es: "En noviembre de 2024 el Board sostuvo que obligar a asistir a una reunión en la que el empleador habla de sindicalización viola la Sección 8(a)(1). Las reuniones voluntarias se trataron de otro modo. Durante décadas, la regla Babcock & Wilcox había permitido reuniones obligatorias sin amenazas, promesas ni interrogatorio.",
    },
    doesNot: {
      en: "It does not mean every conversation about a union is unlawful. It does not decide a workplace in a state with its own statute. It is not a stable “yes, illegal” switch. The General Counsel has asked the current Board to restore the earlier rule.",
      es: "No significa que toda conversación sobre un sindicato sea ilegal. No decide un centro de trabajo en un estado con su propia ley. No es un interruptor estable de “sí, ilegal”. El Consejero General ha pedido al Board actual que restaure la regla anterior.",
    },
    statusNote: {
      en: "As of October 15, 2026, secondary legal reports described a May 2026 motion and GC 26-04 (August 26, 2026) urging reversal of Amazon.com Services LLC. This build did not find a Board decision overruling that case on the review date. Treat the federal rule as contested. State law diverges: Delaware HB 84, signed September 30, 2026, restricts mandatory meetings about unionization, and some other state statutes are in litigation. Do not export one state's statute to another state. Confirm Babcock's reporter page before quoting it.",
      es: "Al 15 de octubre de 2026, informes jurídicos secundarios describían una moción de mayo de 2026 y el GC 26-04 (26 de agosto de 2026) pidiendo revocar Amazon.com Services LLC. Esta versión no encontró una decisión del Board que revocara ese caso en la fecha de revisión. Trate la regla federal como disputada. La ley estatal diverge: Delaware HB 84, firmada el 30 de septiembre de 2026, restringe reuniones obligatorias sobre sindicalización, y otras leyes estatales están en litigio. No exporte la ley de un estado a otro. Confirme la página del reporter de Babcock antes de citarla.",
    },
  },
  {
    id: "watch",
    status: "framework",
    citation: "Doctrine under NLRA § 8(a)(1) — no lead case pinned here",
    sourceLabel: {
      en: "Statute text (Cornell LII)",
      es: "Texto de la ley (Cornell LII)",
    },
    sourceUrl: "https://www.law.cornell.edu/uscode/text/29/158",
    title: {
      en: "Impression of surveillance",
      es: "Impresión de vigilancia",
    },
    holds: {
      en: "The Board has long treated creating the impression that protected activity is under surveillance as a form of Section 8(a)(1) interference, when employees would reasonably believe their organizing is being watched. Ordinary supervision of the work itself is not the same thing.",
      es: "El Board ha tratado durante mucho tiempo la impresión de que la actividad protegida está bajo vigilancia como una forma de interferencia de la Sección 8(a)(1), cuando las personas empleadas creerían razonablemente que se vigila su organización. La supervisión ordinaria del trabajo no es lo mismo.",
    },
    doesNot: {
      en: "This card deliberately names no lead case. A camera, a glance, or a rumor is not automatically unlawful. Name a current case from a citator before you rely on one.",
      es: "Esta ficha a propósito no nombra un caso principal. Una cámara, una mirada o un rumor no son ilegales de forma automática. Nombre un caso vigente desde un citador antes de apoyarse en uno.",
    },
    statusNote: {
      en: "Left without a reporter pin so the app does not invent a citation. That is a gap in this library, not a gap in the law.",
      es: "Quedó sin pin de reporter para que la aplicación no invente una cita. Es un vacío de esta biblioteca, no un vacío de la ley.",
    },
  },
  {
    id: "republic",
    status: "controlling",
    citation: "Republic Aviation Corp. v. NLRB, 324 U.S. 793 (1945)",
    sourceLabel: {
      en: "Supreme Court opinion (Justia)",
      es: "Opinión de la Corte Suprema (Justia)",
    },
    sourceUrl: "https://supreme.justia.com/cases/federal/us/324/793/",
    title: {
      en: "Talking and leafleting on your own time",
      es: "Hablar y repartir hojas en tiempo propio",
    },
    holds: {
      en: "The Supreme Court upheld the Board's presumption that a rule banning union solicitation during employees' non-work time, or distribution of literature in non-work areas, is unlawful unless special circumstances justify it.",
      es: "La Corte Suprema confirmó la presunción del Board de que una regla que prohíbe la solicitación sindical en tiempo no laboral, o el reparto de literatura en áreas no laborales, es ilegal salvo circunstancias especiales.",
    },
    doesNot: {
      en: "It does not mean every conversation during a shift is protected. Later cases change the picture for insignia, email, and property. Do not stop at 1945.",
      es: "No significa que toda conversación durante un turno esté protegida. Casos posteriores cambian el cuadro para insignias, correo y propiedad. No se detenga en 1945.",
    },
    statusNote: {
      en: "Included because organizing often collides with a handbook rule. It does not auto-attach to a record unless someone opens it.",
      es: "Incluida porque organizar suele chocar con una regla del manual. No se adjunta sola a un expediente salvo que alguien la abra.",
    },
  },
];

export const ISSUE_RULES: Record<IssueId, string[]> = {
  questioning: ["rossmore", "bourne", "sec8a1", "sec7"],
  retaliation: ["wright", "sec8a3", "sec8a1", "sec7"],
  captive: ["captive", "sec8c", "sec8a1"],
  speech: ["gissel", "sec8c"],
  benefit: ["exchange", "sec8a1"],
  surveillance: ["watch", "sec8a1"],
};

export function ruleById(id: string): Rule | undefined {
  return RULES.find((rule) => rule.id === id);
}

export function tx(lang: Lang, copy: L10n): string {
  return copy[lang];
}
