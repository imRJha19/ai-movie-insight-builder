"use client";

import { motion } from "framer-motion";

export function TypewriterQuote({ text = "" }: { text?: string }) {
  return (
    <motion.p
      key={text}
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="leading-relaxed text-slate-200"
    >
      {text}
    </motion.p>
  );
}
