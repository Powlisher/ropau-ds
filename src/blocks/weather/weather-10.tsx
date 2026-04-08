"use client"

import { MapPinIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function Weather10() {
  return (
    <motion.div
      className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5"
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      whileHover={{ y: -1 }}
    >
      <div className="flex items-center gap-1.5">
        <MapPinIcon className="size-3 text-muted-foreground/60" />
        <span className="text-xs font-medium text-muted-foreground">Bordeaux</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-2">
        <motion.div
          className="size-2 rounded-full"
          style={{ backgroundColor: "oklch(0.82 0.17 82)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-sm font-semibold tabular-nums tracking-tight">23°</span>
      </div>
      <span className="text-xs text-muted-foreground">Partly Cloudy</span>
    </motion.div>
  )
}
