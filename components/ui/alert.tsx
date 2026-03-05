import { cn } from "@/lib/cn";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantStyles: Record<AlertVariant, string> = {
  info: "border-cyan-300/35 bg-cyan-500/10 text-cyan-100",
  success: "border-emerald-300/35 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-300/35 bg-amber-500/10 text-amber-100",
  error: "border-rose-300/35 bg-rose-500/10 text-rose-100",
};

export function Alert({
  title,
  description,
  variant = "info",
  className,
}: {
  title: string;
  description?: string;
  variant?: AlertVariant;
  className?: string;
}) {
  return (
    <div role="alert" className={cn("rounded-xl border px-4 py-3", variantStyles[variant], className)}>
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm/relaxed opacity-90">{description}</p> : null}
    </div>
  );
}
