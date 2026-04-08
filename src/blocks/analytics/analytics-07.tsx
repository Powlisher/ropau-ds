"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const events = [
  { date: "Mon", bars: [
    { event: "page_view", count: 4821, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 1247, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 89, color: "oklch(0.65 0.17 82)" },
  ]},
  { date: "Tue", bars: [
    { event: "page_view", count: 5132, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 1389, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 112, color: "oklch(0.65 0.17 82)" },
  ]},
  { date: "Wed", bars: [
    { event: "page_view", count: 4673, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 1182, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 74, color: "oklch(0.65 0.17 82)" },
  ]},
  { date: "Thu", bars: [
    { event: "page_view", count: 5847, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 1561, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 143, color: "oklch(0.65 0.17 82)" },
  ]},
  { date: "Fri", bars: [
    { event: "page_view", count: 5293, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 1428, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 97, color: "oklch(0.65 0.17 82)" },
  ]},
  { date: "Sat", bars: [
    { event: "page_view", count: 3127, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 824, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 51, color: "oklch(0.65 0.17 82)" },
  ]},
  { date: "Sun", bars: [
    { event: "page_view", count: 2841, color: "oklch(0.55 0.18 250)" },
    { event: "click", count: 712, color: "oklch(0.55 0.15 160)" },
    { event: "signup", count: 38, color: "oklch(0.65 0.17 82)" },
  ]},
]

const maxTotal = Math.max(...events.map((d) => d.bars.reduce((s, b) => s + b.count, 0)))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const barVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
}

export default function Analytics07() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Event Timeline</CardTitle>
        <CardDescription>Event frequency over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex items-end gap-3"
          style={{ height: 160 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((day) => {
            const total = day.bars.reduce((s, b) => s + b.count, 0)
            const heightPercent = (total / maxTotal) * 100
            return (
              <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  className="flex w-full flex-col overflow-hidden rounded-t-lg"
                  style={{ height: `${heightPercent}%`, originY: 1 }}
                  variants={barVariants}
                >
                  {day.bars.map((bar) => (
                    <div
                      key={bar.event}
                      className="w-full"
                      style={{
                        flex: bar.count,
                        backgroundColor: bar.color,
                      }}
                    />
                  ))}
                </motion.div>
                <span className="text-[10px] font-medium text-muted-foreground">{day.date}</span>
              </div>
            )
          })}
        </motion.div>

        <div className="mt-5 flex items-center justify-center gap-5">
          {[
            { label: "Page views", color: "oklch(0.55 0.18 250)" },
            { label: "Clicks", color: "oklch(0.55 0.15 160)" },
            { label: "Sign-ups", color: "oklch(0.65 0.17 82)" },
          ].map((legend) => (
            <div key={legend.label} className="flex items-center gap-1.5">
              <div className="size-2 rounded-full" style={{ backgroundColor: legend.color }} />
              <span className="text-[10px] font-medium text-muted-foreground">{legend.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
