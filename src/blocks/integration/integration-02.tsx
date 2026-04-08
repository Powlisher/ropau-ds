"use client"

import { motion } from "framer-motion"
import { Zap, Database, GitBranch, Settings, ExternalLink } from "lucide-react"
import { useState } from "react"

const connected = [
  { name: "Stripe", description: "Payment processing", icon: Zap, status: "healthy", lastSync: "2 min ago", enabled: true },
  { name: "PostgreSQL", description: "Primary database", icon: Database, status: "healthy", lastSync: "Real-time", enabled: true },
  { name: "GitHub", description: "Repository webhooks", icon: GitBranch, status: "degraded", lastSync: "14 min ago", enabled: true },
]

const statusColors: Record<string, { dot: string; bg: string; label: string }> = {
  healthy: { dot: "bg-emerald-500", bg: "bg-emerald-50", label: "Healthy" },
  degraded: { dot: "bg-amber-500", bg: "bg-amber-50", label: "Degraded" },
  error: { dot: "bg-red-500", bg: "bg-red-50", label: "Error" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-foreground" : "bg-muted"}`}
    >
      <motion.div
        className="absolute top-1 h-4 w-4 rounded-full bg-background"
        animate={{ left: enabled ? 24 : 4 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      />
    </button>
  )
}

export default function Integration02() {
  const [integrations, setIntegrations] = useState(connected)

  const toggleIntegration = (name: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.name === name ? { ...i, enabled: !i.enabled } : i))
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div variants={itemVariants} className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Connected Integrations
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {integrations.filter((i) => i.enabled).length} of {integrations.length} active
        </p>
      </motion.div>

      <div className="space-y-2">
        {integrations.map((integration) => {
          const status = statusColors[integration.status]
          return (
            <motion.div
              key={integration.name}
              variants={itemVariants}
              className="rounded-xl bg-card p-4 ring-1 ring-foreground/5"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50">
                  <integration.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">{integration.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      <span className="text-[10px] font-medium text-muted-foreground/50">{status.label}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground/50">{integration.description}</p>
                    <span className="text-[10px] text-muted-foreground/30">·</span>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">
                      Synced {integration.lastSync}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="p-1.5 text-muted-foreground/30 hover:text-foreground transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                  <Toggle
                    enabled={integration.enabled}
                    onToggle={() => toggleIntegration(integration.name)}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
