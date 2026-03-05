import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-slate-950 hover:bg-[var(--accent-hover)] focus-visible:ring-[var(--accent)]",
  secondary:
    "bg-white/10 text-slate-100 hover:bg-white/20 focus-visible:ring-white/40",
  ghost:
    "bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-white/30",
  danger: "bg-rose-500 text-white hover:bg-rose-400 focus-visible:ring-rose-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 rounded-lg px-3 text-sm",
  md: "h-11 rounded-xl px-4 text-sm",
  lg: "h-12 rounded-xl px-6 text-base",
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
