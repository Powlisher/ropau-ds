"use client"

import { motion } from "framer-motion"
import { RefreshCw, Check, AlertTriangle, Clock, Zap, Database, GitBranch, MessageSquare } from "lucide-react"

const syncs = [
  { name: "Stripe", icon: Zap, status: "synced", lastSync: "Apr 8, 2024 12:34:18", nextSync: "in 4 min", records: "14,293", direction: "bidirectional" },
  { name: "PostgreSQL", icon: Database, status: "syncing", lastSync: "Apr 8, 2024 12:35:02", nextSync: "continuous", records: "892,041", direction: "inbound" },
  { name: "GitHub", icon: GitBranch, status: "stale", lastSync: "Apr 8, 2024 11:48:33", nextSync: "retrying...", records: "2,847", direction: "inbound" },
  { name: "Slack", icon: MessageSquare, status: "synced", lastSync: "Apr 8, 2024 12:30:00", nextSync: "in 14 min", records: "156", direction: "outbound" },
]

const statusConfig: Record<string, { icon: typeof Check; color: string; bg: string; label: string }> = {
  synced: { icon: Check, color: "text-emerald-600", bg: "bg-emerald-50 ring-emerald-200/40", label: "Synced" },
  syncing: { icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-50 ring-blue-200/40", label: "Syncing" },
  stale: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 ring-amber-200/40", label: "Stale" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration08() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-xl mx-auto">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Data Sync Status
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">All connectors operating normally</p>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
          className="p-2 text-muted-foreground/40 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
        >
          <RefreshCw className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <div className="space-y-2">
        {syncs.map((sync) => {
          const config = statusConfig[sync.status]
          const StatusIcon = config.icon
          return (
            <motion.div
              key={sync.name}
              variants={itemVariants}
              className="rounded-xl bg-card ring-1 ring-foreground/5 overflow-hidden"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center gap-3.5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50">
                  <sync.icon className="h-5 w-5 text-foreground/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-medium text-foreground">{sync.name}</h3>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${config.bg} ${config.color}`}>
                      <StatusIcon className={`h-2.5 w-2.5 ${sync.status === "syncing" ? "animate-spin" : ""}`} />
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {sync.lastSync}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                    {sync.records}
                  </span>
                  <p className="text-[10px] text-muted-foreground/40 mt-0.5">records</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t border-border/30">
                <span className="text-[10px] text-muted-foreground/40">
                  Next sync: <span className="font-mono tabular-nums">{sync.nextSync}</span>
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground/30">
                  {sync.direction}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
