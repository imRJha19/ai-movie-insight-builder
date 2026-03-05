import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-8",
        className
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <header className={cn("mb-6 space-y-2", className)}>{children}</header>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-balance text-2xl font-semibold tracking-tight text-white", className)}>{children}</h2>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-slate-300", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <footer className={cn("mt-6", className)}>{children}</footer>;
}
