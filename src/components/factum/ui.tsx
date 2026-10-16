import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M11 6.5h13M8.5 6.5v19h15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M13 16.5h11" fill="none" stroke="var(--color-brass)" strokeWidth="1.7" />
    </svg>
  );
}

export function Button({
  variant = "quiet",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "quiet" | "ghost";
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium transition-colors duration-200 disabled:opacity-40",
        variant === "primary" && "bg-brass text-brass-ink hover:bg-brass/90",
        variant === "quiet" && "border border-line bg-surface text-fg hover:bg-surface-2",
        variant === "ghost" && "text-muted hover:text-fg",
        className,
      )}
      {...props}
    />
  );
}

export function Chip({
  tone = "quiet",
  children,
}: {
  tone?: "quiet" | "brass" | "sage" | "clay";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 text-xs tracking-wide",
        tone === "quiet" && "border-line text-muted",
        tone === "brass" && "border-brass/50 text-brass",
        tone === "sage" && "border-sage/50 text-sage",
        tone === "clay" && "border-clay/50 text-clay",
      )}
    >
      {children}
    </span>
  );
}

export const fieldClass =
  "w-full min-h-11 rounded-sm border border-line bg-bg px-3 text-base text-fg outline-none placeholder:text-faint focus-visible:border-brass";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}

export function Rule({ className }: { className?: string }) {
  return <hr className={cn("border-line", className)} />;
}
