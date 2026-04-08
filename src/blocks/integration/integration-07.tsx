"use client"

import { motion } from "framer-motion"
import { Activity, ArrowDownLeft, ArrowUpRight, AlertCircle, Check, Clock } from "lucide-react"

const activities = [
  { id: 1, type: "sync", direction: "inbound", integration: "Stripe", event: "Payment received", detail: "$247.50 from Erika Tanaka", timestamp: "2 min ago", status: "success" },
  { id: 2, type: "sync", direction: "outbound", integration: "Slack", event: "Notification sent", detail: "#alerts — New signup from enterprise plan", timestamp: "8 min ago", status: "success" },
  { id: 3, type: "error", direction: "inbound", integration: "GitHub", event: "Webhook delivery failed", detail: "HTTP 503 — retrying in 30s", timestamp: "14 min ago", status: "error" },
  { id: 4, type: "sync", direction: "inbound", integration: "Stripe", event: "Subscription updated", detail: "Pro plan -> Enterprise for Wavelength Inc.", timestamp: "23 min ago", status: "success" },
  { id: 5, type: "sync", direction: "outbound", integration: "PostgreSQL", event: "Record synced", detail: "customers table — 3 rows updated", timestamp: "31 min ago", status: "success" },
  { id: 6, type: "sync", direction: "inbound", integration: "GitHub", event: "Webhook recovered", detail: "Connection restored, queue flushed (4 events)", timestamp: "38 min ago", status: "success" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration07() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
            <Activity className="h-5 w-5 text-foreground/60" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Activity Log
            </h2>
            <p className="text-xs text-muted-foreground/60">Real-time integration events</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-600">Live</span>
        </div>
      </motion.div>

      <div
        className="rounded-2xl bg-card ring-1 ring-foreground/5 overflow-hidden"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="divide-y divide-border/30">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className="flex items-start gap-3 px-4 py-3.5 group hover:bg-muted/20 transition-colors"
            >
              <div className="mt-0.5 shrink-0">
                {activity.status === "error" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-200/50">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  </div>
                ) : activity.direction === "inbound" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/50">
                    <ArrowDownLeft className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/50">
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{activity.integration}</span>
                  <span className="text-muted-foreground/20">·</span>
                  <span className="text-xs text-muted-foreground/60">{activity.event}</span>
                </div>
                <p className="text-xs text-muted-foreground/40 mt-0.5 truncate">{activity.detail}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Clock className="h-2.5 w-2.5 text-muted-foreground/20" />
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">
                  {activity.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
