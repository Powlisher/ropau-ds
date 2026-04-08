"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Table2, Plus, FileDown } from "lucide-react"

const ghostColumns = ["Name", "Status", "Owner", "Updated"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState06() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <div
        className="overflow-hidden rounded-xl ring-1 ring-foreground/[0.06]"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <motion.div variants={itemVariants} className="grid grid-cols-4 border-b border-border/60 bg-muted/40">
          {ghostColumns.map((col) => (
            <div key={col} className="px-4 py-2.5">
              <span className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
                {col}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="opacity-[0.25]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 border-b border-border/30 last:border-b-0">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="px-4 py-3">
                  <div
                    className="h-3 rounded bg-muted"
                    style={{ width: `${55 + ((i * 3 + j) * 17) % 40}%` }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center bg-card px-6 py-10 text-center"
        >
          <div
            className="mb-5 flex size-12 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.94 0.02 260) 0%, oklch(0.92 0.03 280) 100%)",
            }}
          >
            <Table2 className="size-5 text-foreground/50" strokeWidth={1.5} />
          </div>
          <h3 className="font-heading text-base font-semibold tracking-tight">
            No records yet
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted-foreground">
            Add your first record manually or import from a CSV file to populate this table.
          </p>
          <div className="mt-5 flex gap-2.5">
            <Button size="sm" className="gap-1.5">
              <Plus className="size-3.5" />
              Add record
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <FileDown className="size-3.5" />
              Import CSV
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
