import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Table({ className, children }: { className?: string; children: ReactNode }) {
  return <table className={cn("w-full border-separate border-spacing-0", className)}>{children}</table>;
}

export function TableHead({ className, children }: { className?: string; children: ReactNode }) {
  return <thead className={cn("bg-white/5", className)}>{children}</thead>;
}

export function TableHeaderCell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <th
      scope="col"
      className={cn("border-b border-white/10 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-300", className)}
    >
      {children}
    </th>
  );
}

export function TableBody({ className, children }: { className?: string; children: ReactNode }) {
  return <tbody className={cn(className)}>{children}</tbody>;
}

export function TableRow({ className, children }: { className?: string; children: ReactNode }) {
  return <tr className={cn("transition hover:bg-white/[0.03]", className)}>{children}</tr>;
}

export function TableCell({ className, children }: { className?: string; children: ReactNode }) {
  return <td className={cn("border-b border-white/10 px-4 py-3 text-sm text-slate-200", className)}>{children}</td>;
}
