"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Clock, MapPin } from "lucide-react"

const groups = [
  {
    label: "Today, April 8",
    events: [
      { time: "09:00 - 09:30", title: "Daily standup", location: "Zoom", color: "oklch(0.60 0.18 55)", tag: "recurring" },
      { time: "11:00 - 12:30", title: "Product strategy deep dive", location: "Conference Room B", color: "oklch(0.60 0.18 260)", tag: "meeting" },
      { time: "15:00 - 16:00", title: "Interview: Senior Frontend Engineer", location: "Google Meet", color: "oklch(0.60 0.18 25)", tag: "interview" },
    ],
  },
  {
    label: "Tomorrow, April 9",
    events: [
      { time: "09:00 - 09:30", title: "Daily standup", location: "Zoom", color: "oklch(0.60 0.18 55)", tag: "recurring" },
      { time: "10:00 - 11:00", title: "1:1 with Ayo", location: "Office", color: "oklch(0.60 0.18 145)", tag: "meeting" },
      { time: "14:00 - 15:30", title: "Quarterly revenue review", location: "Board Room", color: "oklch(0.60 0.18 260)", tag: "meeting" },
      { time: "16:00 - 17:00", title: "Design system sync", location: "Figma + Slack", color: "oklch(0.60 0.18 25)", tag: "meeting" },
    ],
  },
  {
    label: "Friday, April 10",
    events: [
      { time: "09:00 - 09:30", title: "Daily standup", location: "Zoom", color: "oklch(0.60 0.18 55)", tag: "recurring" },
      { time: "11:30 - 12:00", title: "Sprint demo", location: "All hands channel", color: "oklch(0.60 0.18 145)", tag: "meeting" },
    ],
  },
]

const tagColors: Record<string, { bg: string; text: string }> = {
  meeting: { bg: "oklch(0.94 0.04 260)", text: "oklch(0.42 0.12 260)" },
  recurring: { bg: "oklch(0.94 0.04 55)", text: "oklch(0.45 0.12 55)" },
  interview: { bg: "oklch(0.94 0.04 25)", text: "oklch(0.45 0.12 25)" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Calendar07() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Upcoming</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your agenda for the next few days.</p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <motion.div key={group.label} variants={itemVariants}>
            <h3 className="mb-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.events.map((ev) => {
                const tc = tagColors[ev.tag]
                return (
                  <motion.div
                    key={ev.title + ev.time}
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className="flex gap-3.5 rounded-xl bg-card p-4 ring-1 ring-foreground/[0.06]"
                    style={{
                      boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                    }}
                  >
                    <div className="mt-0.5 w-1 shrink-0 rounded-full" style={{ backgroundColor: ev.color }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold tracking-tight text-foreground/90">
                          {ev.title}
                        </p>
                        <Badge className="text-[10px]" style={{ backgroundColor: tc.bg, color: tc.text }}>
                          {ev.tag}
                        </Badge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span className="font-mono tabular-nums">{ev.time}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {ev.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
