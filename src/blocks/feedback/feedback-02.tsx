"use client"

import { useState } from "react"
import { Bug, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const severities = [
  { value: "low", label: "Low", description: "Minor inconvenience", bg: "bg-sky-50 dark:bg-sky-950/20", ring: "ring-sky-200 dark:ring-sky-800/40", dot: "bg-sky-400" },
  { value: "medium", label: "Medium", description: "Affects workflow", bg: "bg-amber-50 dark:bg-amber-950/20", ring: "ring-amber-200 dark:ring-amber-800/40", dot: "bg-amber-400" },
  { value: "high", label: "High", description: "Major blocker", bg: "bg-orange-50 dark:bg-orange-950/20", ring: "ring-orange-200 dark:ring-orange-800/40", dot: "bg-orange-400" },
  { value: "critical", label: "Critical", description: "Data loss risk", bg: "bg-red-50 dark:bg-red-950/20", ring: "ring-red-200 dark:ring-red-800/40", dot: "bg-red-400" },
]

export default function Feedback02() {
  const [severity, setSeverity] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/30 ring-1 ring-red-200/60 dark:ring-red-800/40">
            <Bug className="size-4.5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">Report a bug</h3>
            <p className="text-sm text-muted-foreground">Help us squash it quickly</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5">
          <label className="text-sm font-medium text-foreground">Severity</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {severities.map((s) => (
              <motion.button
                key={s.value}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
                onClick={() => setSeverity(s.value)}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2.5 ring-1 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  severity === s.value
                    ? `${s.bg} ${s.ring} ring-2`
                    : "bg-transparent ring-border/40 hover:bg-muted/40"
                }`}
              >
                <div className={`size-2 rounded-full ${s.dot}`} />
                <span className="text-xs font-medium text-foreground">{s.label}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{s.description}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <label className="text-sm font-medium text-foreground">Bug title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of the issue"
            className="mt-1.5 bg-muted/30"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <label className="text-sm font-medium text-foreground">Steps to reproduce</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
            className="mt-1.5 min-h-[100px] bg-muted/30 text-sm"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <motion.button
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/60 py-6 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <ImageIcon className="size-4" />
            Attach screenshot
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm" disabled={!severity || !title.trim()}>Submit bug report</Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
