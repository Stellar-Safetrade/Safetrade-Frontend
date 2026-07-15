import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:opacity-85 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,212,170,0.3)]",
  secondary:
    "bg-transparent text-text border border-border hover:border-muted hover:bg-surface",
  danger:
    "bg-transparent text-danger border border-danger/30 hover:bg-danger/10",
  ghost: "bg-transparent text-muted hover:text-text",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", isLoading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3 font-display text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? "..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
