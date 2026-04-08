"use client"

import { motion } from "framer-motion"
import { Zap, ArrowLeft, Settings, Trash2, ExternalLink, Check, Clock, BarChart3 } from "lucide-react"
import { useState } from "react"

const tabs = ["Overview", "Settings", "Logs"]

const integration = {
  name: "Stripe",
  description: "Payment processing, subscriptions, and revenue analytics",
  version: "v2024.3.1",
  status: "active",
  connectedSince: "Oct 14, 2023",
  stats: {
    eventsToday: "1,847",
    avgLatency: "134ms",
    successRate: "99.7%",
    lastError: "3 days ago",
  },
  settings: [
    { label: "Sync frequency", value: "Real-time (webhooks)", type: "select" },
    { label: "Environment", value: "Production", type: "select" },
    { label: "Auto-retry failed events", value: true, type: "toggle" },
    { label: "Send error notifications", value: true, type: "toggle" },
    { label: "Log raw payloads", value: false, type: "toggle" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration10() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div variants={itemVariants} className="mb-6">
        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to integrations
        </button>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 ring-1 ring-foreground/5">
              <Zap className="h-6 w-6 text-foreground/60" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  {integration.name}
                </h2>
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-200/40">
                  Active
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{integration.description}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-0.5 mb-5 border-b border-border/40">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="integration-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {activeTab === "Overview" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5">
            {Object.entries(integration.stats).map(([key, value]) => (
              <div
                key={key}
                className="rounded-xl bg-card p-3.5 ring-1 ring-foreground/5"
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-muted-foreground/40">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <p className="font-heading text-lg font-semibold tracking-tight text-foreground mt-1 tabular-nums font-mono">
                  {value}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/50">
              Connected since {integration.connectedSince}
            </span>
            <span className="text-muted-foreground/20">·</span>
            <span className="font-mono text-xs text-muted-foreground/40">{integration.version}</span>
          </motion.div>
        </motion.div>
      )}

      {activeTab === "Settings" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {integration.settings.map((setting) => (
            <motion.div
              key={setting.label}
              variants={itemVariants}
              className="flex items-center justify-between py-3 px-1"
            >
              <span className="text-sm text-foreground">{setting.label}</span>
              {setting.type === "toggle" ? (
                <div className={`h-5 w-9 rounded-full relative ${setting.value ? "bg-foreground" : "bg-muted"}`}>
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${setting.value ? "left-[18px]" : "left-1"}`} />
                </div>
              ) : (
                <span className="font-mono text-xs text-muted-foreground/50">{String(setting.value)}</span>
              )}
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="pt-4 flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" />
              Remove integration
            </button>
          </motion.div>
        </motion.div>
      )}

      {activeTab === "Logs" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1.5"
        >
          {[
            { time: "12:34:18", event: "payment.completed", status: "200", latency: "142ms" },
            { time: "12:31:05", event: "subscription.created", status: "200", latency: "98ms" },
            { time: "12:28:44", event: "charge.refunded", status: "503", latency: "timeout" },
            { time: "12:22:11", event: "payment.completed", status: "200", latency: "156ms" },
            { time: "12:18:39", event: "customer.updated", status: "200", latency: "87ms" },
          ].map((log, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <span className={`inline-flex h-5 w-10 items-center justify-center rounded text-[10px] font-mono font-medium tabular-nums ${
                log.status === "200" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}>
                {log.status}
              </span>
              <span className="text-xs text-foreground flex-1">{log.event}</span>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">{log.latency}</span>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/20">{log.time}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
