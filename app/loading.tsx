"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen app-grid-overlay">
      <Container size="xl" className="py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="space-y-2 text-center"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Analyzing</p>
            <h2 className="text-3xl font-semibold text-white">Preparing cinematic insights</h2>
          </motion.div>

          <Card className="space-y-5">
            <Skeleton className="h-12 w-full" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
            <Skeleton className="h-28 w-full" />
          </Card>
        </div>
      </Container>
    </main>
  );
}
