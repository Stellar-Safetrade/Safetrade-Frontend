import { HTMLAttributes } from "react";
import { clsx } from "@/lib/clsx";

type BadgeTone = "accent" | "warning" | "danger" | "muted" | "info" | "blue";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  accent: "bg-accent/15 text-accent border-accent/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-danger/15 text-danger border-danger/30",
  muted: "bg-muted/10 text-muted border-muted/30",
  info: "bg-stellar-glow/15 text-stellar-glow border-stellar-glow/30",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export function Badge({ tone = "muted", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
