"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertTriangle, RotateCcw, HelpCircle } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState07() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-sm flex-col items-center py-14 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex size-16 items-center justify-center rounded-2xl ring-1 ring-foreground/[0.06]"
        style={{
          background: "linear-gradient(135deg, oklch(0.95 0.03 25) 0%, oklch(0.92 0.05 15) 100%)",
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <AlertTriangle className="size-7" style={{ color: "oklch(0.60 0.16 30)" }} strokeWidth={1.5} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          Something went wrong
        </h3>
        <p className="mx-auto mt-2 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
          We couldn&apos;t load this page. This is usually temporary. If the problem persists, our team has been notified.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 rounded-lg bg-muted/50 px-3 py-2"
      >
        <p className="font-mono text-xs tabular-nums text-muted-foreground">
          Error ref: ERR-48291-X · 2026-04-08T14:32:07Z
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 flex gap-2.5">
        <Button size="sm" className="gap-1.5">
          <RotateCcw className="size-3.5" />
          Try again
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5">
          <HelpCircle className="size-3.5" />
          Contact support
        </Button>
      </motion.div>
    </motion.div>
  )
}
