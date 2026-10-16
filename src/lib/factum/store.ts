import { create } from "zustand";
import { createSample } from "@/lib/factum/sample";
import type {
  Clarifiers,
  Evidence,
  Incident,
  Lang,
  Matter,
  Person,
  Role,
  Tab,
  View,
} from "@/lib/factum/types";

const KEY = "factum.v1";

type Persisted = {
  lang: Lang;
  role: Role;
  matters: Matter[];
};

type State = {
  ready: boolean;
  lang: Lang;
  role: Role;
  matters: Matter[];
  activeId: string | null;
  view: View;
  tab: Tab;
  lawId: string | null;
  notice: string;
  hydrate: () => void;
  setLang: (lang: Lang) => void;
  setRole: (role: Role) => void;
  go: (view: View) => void;
  setTab: (tab: Tab) => void;
  openLaw: (id: string | null) => void;
  openMatter: (id: string) => void;
  openSample: () => void;
  addMatter: (matter: Matter) => void;
  patchMatter: (id: string, recipe: (matter: Matter) => Matter) => void;
  setClarifier: (id: string, key: keyof Clarifiers, value: Clarifiers[keyof Clarifiers]) => void;
  addIncident: (id: string, incident: Incident) => void;
  addPerson: (id: string, person: Person) => void;
  addEvidence: (id: string, evidence: Evidence) => void;
  addCustody: (matterId: string, evidenceId: string, detail: string) => void;
  removeMatter: (id: string) => void;
  restoreSample: () => void;
  erase: () => void;
  setNotice: (notice: string) => void;
};

function persist(state: Pick<State, "lang" | "role" | "matters">) {
  const payload: Persisted = {
    lang: state.lang,
    role: state.role,
    matters: state.matters,
  };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

function read(): Persisted | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Persisted;
    if (!parsed || !Array.isArray(parsed.matters)) return null;
    if (parsed.lang !== "en" && parsed.lang !== "es") parsed.lang = "en";
    if (parsed.role !== "work" && parsed.role !== "organize" && parsed.role !== "counsel") {
      parsed.role = "work";
    }
    return parsed;
  } catch {
    return null;
  }
}

export const useFactum = create<State>((set, get) => ({
  ready: false,
  lang: "en",
  role: "work",
  matters: [],
  activeId: null,
  view: "home",
  tab: "story",
  lawId: null,
  notice: "",
  hydrate: () => {
    if (get().ready) return;
    const saved = read();
    if (!saved) {
      const sample = createSample();
      const next = { lang: "en" as const, role: "work" as const, matters: [sample] };
      persist(next);
      set({ ready: true, ...next });
      return;
    }
    set({
      ready: true,
      lang: saved.lang,
      role: saved.role,
      matters: saved.matters,
    });
  },
  setLang: (lang) => {
    const next = { lang, role: get().role, matters: get().matters };
    persist(next);
    set({ lang });
  },
  setRole: (role) => {
    const next = { lang: get().lang, role, matters: get().matters };
    persist(next);
    set({ role });
  },
  go: (view) => set({ view, lawId: view === "law" ? get().lawId : null }),
  setTab: (tab) => set({ tab }),
  openLaw: (id) => set({ view: "law", lawId: id }),
  openMatter: (id) => set({ activeId: id, view: "matter", tab: "story" }),
  openSample: () => {
    const existing = get().matters.find((matter) => matter.sample);
    if (existing) {
      set({ activeId: existing.id, view: "matter", tab: "story" });
      return;
    }
    const sample = createSample();
    const matters = [sample, ...get().matters];
    persist({ lang: get().lang, role: get().role, matters });
    set({ matters, activeId: sample.id, view: "matter", tab: "story" });
  },
  addMatter: (matter) => {
    const matters = [matter, ...get().matters];
    persist({ lang: get().lang, role: get().role, matters });
    set({ matters, activeId: matter.id, view: "matter", tab: "story" });
  },
  patchMatter: (id, recipe) => {
    const matters = get().matters.map((matter) => (matter.id === id ? recipe(matter) : matter));
    persist({ lang: get().lang, role: get().role, matters });
    set({ matters });
  },
  setClarifier: (id, key, value) => {
    get().patchMatter(id, (matter) => ({
      ...matter,
      clarifiers: { ...matter.clarifiers, [key]: value },
    }));
  },
  addIncident: (id, incident) => {
    get().patchMatter(id, (matter) => ({
      ...matter,
      incidents: [...matter.incidents, incident],
    }));
  },
  addPerson: (id, person) => {
    get().patchMatter(id, (matter) => ({
      ...matter,
      people: [...matter.people, person],
    }));
  },
  addEvidence: (id, evidence) => {
    get().patchMatter(id, (matter) => ({
      ...matter,
      evidence: [...matter.evidence, evidence],
    }));
  },
  addCustody: (matterId, evidenceId, detail) => {
    get().patchMatter(matterId, (matter) => ({
      ...matter,
      evidence: matter.evidence.map((item) =>
        item.id === evidenceId
          ? {
              ...item,
              chain: [
                ...item.chain,
                { at: new Date().toISOString(), action: "noted" as const, detail },
              ],
            }
          : item,
      ),
    }));
  },
  removeMatter: (id) => {
    const matters = get().matters.filter((matter) => matter.id !== id);
    persist({ lang: get().lang, role: get().role, matters });
    set({ matters, view: "home", activeId: null });
  },
  restoreSample: () => {
    const sample = createSample();
    const matters = [sample, ...get().matters.filter((matter) => !matter.sample)];
    persist({ lang: get().lang, role: get().role, matters });
    set({ matters, notice: "" });
  },
  erase: () => {
    const matters: Matter[] = [];
    persist({ lang: get().lang, role: get().role, matters });
    set({ matters, view: "home", activeId: null });
  },
  setNotice: (notice) => set({ notice }),
}));

export function useActiveMatter(): Matter | null {
  return useFactum((state) => state.matters.find((matter) => matter.id === state.activeId) ?? null);
}
