"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Database, Plus } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState01() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-md flex-col items-center py-16 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="relative mb-6"
      >
        <div
          className="flex size-16 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.94 0.02 220) 0%, oklch(0.91 0.03 250) 100%)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <Database className="size-7 text-foreground/50" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-card ring-2 ring-card">
          <div
            className="flex size-5 items-center justify-center rounded-full"
            style={{ backgroundColor: "oklch(0.65 0.18 260)" }}
          >
            <Plus className="size-3 text-white" strokeWidth={3} />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          No data sources connected
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Connect your first data source to start building dashboards. We support PostgreSQL, MySQL, BigQuery, and 20 more.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 flex gap-3">
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Add data source
        </Button>
        <Button size="sm" variant="outline">
          View documentation
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-10 grid w-full grid-cols-3 gap-3 opacity-[0.35]"
      >
        {[
          { h: "h-20", label: "172" },
          { h: "h-28", label: "3.4k" },
          { h: "h-16", label: "89" },
        ].map((block, i) => (
          <div
            key={i}
            className={`${block.h} flex items-end justify-center rounded-lg bg-muted/80 pb-2 ring-1 ring-foreground/[0.04]`}
          >
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {block.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
