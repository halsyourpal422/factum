import type { Lang } from "@/lib/factum/types";

const MONTHS: Record<Lang, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  es: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
};

export function formatDate(iso: string, lang: Lang): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const name = MONTHS[lang][month - 1] ?? iso;
  if (lang === "es") return `${day} de ${name} de ${year}`;
  return `${name} ${day}, ${year}`;
}

export function dayDiff(earlier: string, later: string): number {
  const a = Date.parse(`${earlier}T00:00:00Z`);
  const b = Date.parse(`${later}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

export function formatStamp(iso: string, lang: Lang): string {
  const date = iso.slice(0, 10);
  const time = iso.slice(11, 16);
  const shown = formatDate(date, lang);
  return time ? `${shown} · ${time} UTC` : shown;
}

export function uid(): string {
  return crypto.randomUUID();
}
