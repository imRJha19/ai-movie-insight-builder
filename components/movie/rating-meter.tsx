"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion } from "framer-motion";

const verdicts = [
  { min: 8, label: "Highly recommended", tone: "text-emerald-300" },
  { min: 7, label: "Strong watch", tone: "text-cyan-300" },
  { min: 5, label: "Worth trying", tone: "text-amber-300" },
  { min: 0.1, label: "May not be for everyone", tone: "text-rose-300" },
] as const;

function getVerdict(value: number) {
  return verdicts.find((item) => value >= item.min) ?? null;
}

export function RatingMeter({ value }: { value?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const normalizedValue = Number.parseFloat(value || "0") || 0;
  const clampedValue = Math.max(0, Math.min(10, normalizedValue));
  const percentage = (clampedValue / 10) * 100;

  const verdict = useMemo(() => getVerdict(clampedValue), [clampedValue]);

  useEffect(() => {
    const controls = animate(0, clampedValue, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [clampedValue]);

  return (
    <div className="space-y-3">
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-800/80" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-300"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-white">
            {displayValue.toFixed(1)}
            <span className="ml-2 text-base font-medium text-slate-400">/ 10 IMDb</span>
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Audience signal</p>
        </div>

        {verdict ? <p className={`text-sm font-medium ${verdict.tone}`}>{verdict.label}</p> : null}
      </div>
    </div>
  );
}
