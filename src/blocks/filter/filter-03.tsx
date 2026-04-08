"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { motion } from "framer-motion"

const presets = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last quarter" },
  { id: "year", label: "This year" },
]

export default function Filter03() {
  const [activePreset, setActivePreset] = useState("7d")
  const [from, setFrom] = useState("2026-04-01")
  const [to, setTo] = useState("2026-04-08")

  function selectPreset(id: string) {
    setActivePreset(id)
    const today = new Date()
    const formatDate = (d: Date) => d.toISOString().split("T")[0]
    setTo(formatDate(today))

    const offsets: Record<string, number> = { today: 0, yesterday: 1, "7d": 7, "30d": 30, "90d": 90, year: 365 }
    const days = offsets[id] ?? 7
    const start = new Date(today)
    start.setDate(start.getDate() - days)
    setFrom(formatDate(start))
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="mb-4 flex items-center gap-2">
          <CalendarIcon className="size-4 text-muted-foreground" />
          <h3 className="font-heading text-sm font-semibold tracking-tight">Date Range</h3>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <motion.button
              key={preset.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => selectPreset(preset.id)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                activePreset === preset.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">From</label>
            <Input
              type="date"
              value={from}
              onChange={(e) => { setFrom(e.target.value); setActivePreset("") }}
              className="font-mono text-sm tabular-nums"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">To</label>
            <Input
              type="date"
              value={to}
              onChange={(e) => { setTo(e.target.value); setActivePreset("") }}
              className="font-mono text-sm tabular-nums"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums tracking-wide font-medium text-foreground">
              {Math.max(0, Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24)))}
            </span>{" "}
            days selected
          </p>
          <Button size="sm">Apply</Button>
        </div>
      </div>
    </div>
  )
}
