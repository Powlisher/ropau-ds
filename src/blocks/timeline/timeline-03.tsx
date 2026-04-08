"use client"

import { motion } from "framer-motion"

const events = [
  { time: "09:14", label: "Pull request #312 merged", detail: "feature/auth-flow into main", status: "done" as const },
  { time: "10:02", label: "Deployment started", detail: "Production v3.8.1 rolling out", status: "done" as const },
  { time: "10:07", label: "Health checks passed", detail: "All 14 endpoints responding < 200ms", status: "done" as const },
  { time: "10:23", label: "Spike in error rate detected", detail: "POST /api/checkout returning 502 for 3.2% of requests", status: "warning" as const },
  { time: "10:31", label: "Hotfix deployed", detail: "Connection pool limit increased to 50", status: "done" as const },
  { time: "10:45", label: "Error rate normalized", detail: "Back to baseline 0.04%", status: "done" as const },
  { time: "11:18", label: "Monitoring review scheduled", detail: "Postmortem with infra team at 14:00", status: "pending" as const },
]

const statusStyles = {
  done: "bg-emerald-500",
  warning: "bg-amber-500",
  pending: "bg-muted-foreground/30",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function Timeline03() {
  return (
    <div className="mx-auto max-w-lg py-8">
      <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Today's Activity</h2>
      <p className="mt-0.5 mb-6 text-sm text-muted-foreground">March 14, 2026</p>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-0">
          {events.map((event) => (
            <motion.div
              key={event.time}
              variants={itemVariants}
              className="group relative flex items-start gap-4 py-2.5"
            >
              <div className="relative z-10 mt-1.5 flex size-[11px] shrink-0 items-center justify-center">
                <div className={`size-[11px] rounded-full ${statusStyles[event.status]} ring-2 ring-background`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-mono font-medium tabular-nums text-muted-foreground tracking-wide">
                    {event.time}
                  </span>
                  <span className="text-sm font-medium text-foreground truncate">
                    {event.label}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                  {event.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
