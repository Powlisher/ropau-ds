"use client"

import { motion } from "framer-motion"
import { Webhook, Copy, RotateCcw, Check, AlertTriangle } from "lucide-react"
import { useState } from "react"

const webhook = {
  url: "https://api.acme.co/webhooks/stripe",
  secret: "rpwh_3sJ8kW2mN7xQpR4vL6tY9bA5cD1eF2gH",
  events: [
    { name: "payment.completed", enabled: true },
    { name: "subscription.created", enabled: true },
    { name: "subscription.canceled", enabled: true },
    { name: "invoice.paid", enabled: false },
    { name: "customer.updated", enabled: false },
    { name: "charge.refunded", enabled: true },
  ],
  recentDeliveries: [
    { event: "payment.completed", status: "success", timestamp: "12:34:18", responseTime: "142ms" },
    { event: "subscription.created", status: "success", timestamp: "12:31:05", responseTime: "98ms" },
    { event: "charge.refunded", status: "failed", timestamp: "12:28:44", responseTime: "timeout" },
    { event: "payment.completed", status: "success", timestamp: "12:22:11", responseTime: "156ms" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration05() {
  const [events, setEvents] = useState(webhook.events)

  const toggleEvent = (name: string) => {
    setEvents((prev) => prev.map((e) => (e.name === name ? { ...e, enabled: !e.enabled } : e)))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
          <Webhook className="h-5 w-5 text-foreground/60" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Webhook Configuration
          </h2>
          <p className="text-xs text-muted-foreground/60">Stripe webhook endpoint</p>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-card p-5 ring-1 ring-foreground/5 space-y-5"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div>
          <label className="text-xs font-medium text-muted-foreground/70 mb-1.5 block">Endpoint URL</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-xs tabular-nums text-foreground bg-muted/30 px-3 py-2 rounded-lg ring-1 ring-foreground/5 truncate">
              {webhook.url}
            </code>
            <button className="p-2 text-muted-foreground/30 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground/70 mb-1.5 block">Signing secret</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-xs tabular-nums text-muted-foreground/50 bg-muted/30 px-3 py-2 rounded-lg ring-1 ring-foreground/5">
              rpwh_...gH
            </code>
            <button className="p-2 text-muted-foreground/30 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground/70 mb-2 block">Subscribed events</label>
          <div className="grid grid-cols-2 gap-1.5">
            {events.map((event) => (
              <button
                key={event.name}
                onClick={() => toggleEvent(event.name)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ring-1 ${
                  event.enabled
                    ? "bg-foreground/5 ring-foreground/10 text-foreground font-medium"
                    : "bg-transparent ring-foreground/5 text-muted-foreground/40"
                }`}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${event.enabled ? "bg-foreground" : "bg-muted-foreground/20"}`} />
                {event.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground/70 mb-2 block">Recent deliveries</label>
          <div className="space-y-1">
            {webhook.recentDeliveries.map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 py-1.5 px-2 rounded-md">
                {d.status === "success" ? (
                  <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
                )}
                <span className="text-xs text-foreground flex-1 truncate">{d.event}</span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">
                  {d.responseTime}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/20">
                  {d.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
