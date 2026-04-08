"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Upload, FileText, Image } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState10() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="font-heading text-lg font-semibold tracking-tight">Upload files</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag and drop files here, or click to browse.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
        className={`relative flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
          isDragging
            ? "border-foreground/20 bg-muted/60"
            : "border-border/60 bg-card hover:border-foreground/10 hover:bg-muted/30"
        }`}
        style={{
          boxShadow: isDragging
            ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
            : undefined,
        }}
      >
        <motion.div
          animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          className="mb-5 flex size-14 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.94 0.02 260) 0%, oklch(0.91 0.035 280) 100%)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <Upload className="size-6 text-foreground/50" strokeWidth={1.5} />
        </motion.div>

        <p className="text-sm font-medium text-foreground/80">
          Drop files to upload
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse your computer
        </p>

        <Button size="sm" variant="outline" className="mt-5">
          Browse files
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 flex items-center justify-between rounded-lg bg-muted/40 px-4 py-2.5"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1">
            <div className="flex size-7 items-center justify-center rounded bg-muted ring-1 ring-foreground/[0.06]">
              <FileText className="size-3.5 text-muted-foreground" />
            </div>
            <div className="flex size-7 items-center justify-center rounded bg-muted ring-1 ring-foreground/[0.06]">
              <Image className="size-3.5 text-muted-foreground" />
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            PDF, PNG, JPG, CSV, XLSX
          </span>
        </div>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          Max 100 MB
        </span>
      </motion.div>
    </motion.div>
  )
}
