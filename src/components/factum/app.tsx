import { useEffect } from "react";
import { Library, Lock, Plus } from "lucide-react";
import { t } from "@/lib/factum/copy";
import type { Role } from "@/lib/factum/types";
import { useFactum } from "@/lib/factum/store";
import { HomeView } from "@/components/factum/home-view";
import { IntakeView } from "@/components/factum/intake-view";
import { MatterView } from "@/components/factum/matter-view";
import { LawView } from "@/components/factum/law-view";
import { PrivacyView } from "@/components/factum/privacy-view";
import { cn, Mark } from "@/components/factum/ui";

const ROLES: Role[] = ["work", "organize", "counsel"];

export function FactumApp() {
  const hydrate = useFactum((state) => state.hydrate);
  const lang = useFactum((state) => state.lang);
  const view = useFactum((state) => state.view);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <div className="h-0.5 bg-brass" />
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-bg px-5 py-6 lg:flex">
        <Brand />
        <div className="mt-8">
          <RoleSwitch />
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          <RailLink id="home" label={t(lang, "records")} />
          <RailLink id="intake" label={t(lang, "recordCta")} />
          <RailLink id="law" label={t(lang, "law")} />
          <RailLink id="privacy" label={t(lang, "device")} />
        </nav>
        <div className="mt-auto">
          <LangSwitch />
          <p className="mt-4 text-xs leading-relaxed text-faint">{t(lang, "notAdvice")}</p>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="no-print sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Brand compact />
            <LangSwitch />
          </div>
          <div className="px-4 pb-3">
            <RoleSwitch />
          </div>
        </header>
        <main className="pb-dock">
          <div className="mx-auto w-full max-w-3xl px-4 py-6 lg:px-10 lg:py-10">
            {view === "home" ? <HomeView /> : null}
            {view === "intake" ? <IntakeView /> : null}
            {view === "matter" ? <MatterView /> : null}
            {view === "law" ? <LawView /> : null}
            {view === "privacy" ? <PrivacyView /> : null}
          </div>
        </main>
        <nav className="dock no-print fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-bg/95 backdrop-blur lg:hidden">
          <DockButton view="home" label={t(lang, "records")} icon="records" />
          <DockButton view="intake" label={t(lang, "add")} icon="add" />
          <DockButton view="law" label={t(lang, "law")} icon="law" />
          <DockButton view="privacy" label={t(lang, "device")} icon="device" />
        </nav>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  const lang = useFactum((state) => state.lang);
  const go = useFactum((state) => state.go);
  return (
    <button type="button" onClick={() => go("home")} className="flex items-center gap-3 text-left">
      <Mark className={compact ? "h-7 w-7" : "h-8 w-8"} />
      <span>
        <span className="block font-serif text-xl leading-none tracking-wide text-fg">Factum</span>
        {compact ? null : (
          <span className="mt-1 block text-xs text-muted">{t(lang, "kicker")}</span>
        )}
      </span>
    </button>
  );
}

function RoleSwitch() {
  const lang = useFactum((state) => state.lang);
  const role = useFactum((state) => state.role);
  const setRole = useFactum((state) => state.setRole);
  return (
    <div className="grid grid-cols-3 gap-1 rounded-sm border border-line p-1" role="group" aria-label={t(lang, "reading")}>
      {ROLES.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={role === item}
          onClick={() => setRole(item)}
          className={cn(
            "min-h-11 rounded-sm text-sm",
            role === item ? "bg-surface-2 text-fg" : "text-muted",
          )}
        >
          {t(lang, item)}
        </button>
      ))}
    </div>
  );
}

function LangSwitch() {
  const lang = useFactum((state) => state.lang);
  const setLang = useFactum((state) => state.setLang);
  return (
    <div className="flex gap-3 text-sm" aria-label={t(lang, "language")}>
      {(["en", "es"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLang(item)}
          className={cn(
            "min-h-11 min-w-11 uppercase tracking-wide",
            lang === item ? "text-brass" : "text-faint",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function RailLink({ id, label }: { id: "home" | "intake" | "law" | "privacy"; label: string }) {
  const view = useFactum((state) => state.view);
  const go = useFactum((state) => state.go);
  const openLaw = useFactum((state) => state.openLaw);
  const active = view === id || (id === "law" && view === "law");
  return (
    <button
      type="button"
      onClick={() => (id === "law" ? openLaw(null) : go(id))}
      className={cn(
        "min-h-11 rounded-sm px-2 text-left text-sm",
        active ? "text-brass" : "text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}

function DockButton({
  view,
  label,
  icon,
}: {
  view: "home" | "intake" | "law" | "privacy";
  label: string;
  icon: "records" | "add" | "law" | "device";
}) {
  const current = useFactum((state) => state.view);
  const go = useFactum((state) => state.go);
  const openLaw = useFactum((state) => state.openLaw);
  const active = current === view;
  const Icon = icon === "add" ? Plus : icon === "law" ? Library : icon === "device" ? Lock : null;
  return (
    <button
      type="button"
      onClick={() => (view === "law" ? openLaw(null) : go(view))}
      className={cn(
        "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs",
        active ? "text-brass" : "text-muted",
      )}
    >
      {Icon ? <Icon size={18} strokeWidth={1.5} /> : <Mark className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );
}
