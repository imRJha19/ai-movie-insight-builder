"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <motion.button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-[var(--surface-strong)] p-6 shadow-[var(--shadow-soft)]",
              className
            )}
          >
            <header className="mb-4 space-y-1">
              <h3 id="modal-title" className="text-lg font-semibold text-white">
                {title}
              </h3>
              {description ? <p className="text-sm text-slate-300">{description}</p> : null}
            </header>

            <div className="text-sm text-slate-200">{children}</div>

            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
