"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Terminal, Filter } from "lucide-react"

type LogLevel = "error" | "warn" | "info" | "debug"

const levelStyles: Record<LogLevel, { text: string; bg: string }> = {
  error: { text: "text-rose-600", bg: "bg-rose-500" },
  warn: { text: "text-amber-600", bg: "bg-amber-500" },
  info: { text: "text-sky-600", bg: "bg-sky-500" },
  debug: { text: "text-slate-500", bg: "bg-slate-400" },
}

const logs = [
  { time: "14:32:04.218", level: "error" as LogLevel, service: "api-gateway", message: "Connection refused to inventory-service:8080 after 3 retries" },
  { time: "14:32:04.102", level: "warn" as LogLevel, service: "auth-service", message: "Rate limit exceeded for IP 203.0.113.42 (84 requests/min, limit: 60)" },
  { time: "14:32:03.891", level: "info" as LogLevel, service: "api-gateway", message: "POST /api/v3/checkout 201 - 142ms - user:usr_8k2m9f" },
  { time: "14:32:03.744", level: "debug" as LogLevel, service: "worker-03", message: "Job queue depth: 47 pending, 3 processing, avg wait: 1.2s" },
  { time: "14:32:03.590", level: "info" as LogLevel, service: "cdn-edge", message: "Cache MISS for /assets/bundle-3.9.1.js - origin fetch: 89ms" },
  { time: "14:32:03.412", level: "error" as LogLevel, service: "payment-svc", message: "Stripe webhook signature verification failed for evt_1PkQ2x... (clock skew: 342s)" },
  { time: "14:32:03.201", level: "warn" as LogLevel, service: "db-primary", message: "Slow query detected: SELECT * FROM orders WHERE... - 2847ms (threshold: 1000ms)" },
  { time: "14:32:02.988", level: "info" as LogLevel, service: "api-gateway", message: "GET /api/v3/products?category=electronics 200 - 31ms" },
  { time: "14:32:02.801", level: "info" as LogLevel, service: "auth-service", message: "Token refresh successful for session sess_Km8n2p - TTL extended 3600s" },
  { time: "14:32:02.645", level: "debug" as LogLevel, service: "search-svc", message: "Index refresh completed: 14,823 docs, 2 shards, took 412ms" },
  { time: "14:32:02.398", level: "info" as LogLevel, service: "email-svc", message: "Batch send completed: 23/23 delivered, 0 bounced - campaign:spring_promo_2" },
  { time: "14:32:02.190", level: "warn" as LogLevel, service: "worker-03", message: "Memory usage at 78.4% (12.54 GB / 16 GB) - approaching threshold" },
]

const allLevels: LogLevel[] = ["error", "warn", "info", "debug"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -4 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } },
}

export default function Monitoring07() {
  const [activeLevel, setActiveLevel] = React.useState<LogLevel | null>(null)

  const filtered = activeLevel ? logs.filter((l) => l.level === activeLevel) : logs

  return (
    <motion.div
      className="mx-auto max-w-3xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-muted-foreground" />
              <CardTitle className="font-heading text-lg tracking-tight">Log Stream</CardTitle>
            </div>

            <div className="flex items-center gap-1.5">
              <Filter className="size-3 text-muted-foreground" />
              {allLevels.map((level) => {
                const count = logs.filter((l) => l.level === level).length
                return (
                  <motion.button
                    key={level}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveLevel(activeLevel === level ? null : level)}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                      activeLevel === level
                        ? `${levelStyles[level].text} bg-muted font-semibold`
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {level} ({count})
                  </motion.button>
                )
              })}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-border bg-slate-950 p-3 font-mono text-[12px] overflow-x-auto">
            <div className="space-y-0">
              {filtered.map((log, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-2 py-0.5 hover:bg-white/5 rounded px-1 transition-colors"
                >
                  <span className="shrink-0 tabular-nums text-slate-500">{log.time}</span>
                  <span className={`shrink-0 w-[42px] uppercase font-semibold ${
                    log.level === "error" ? "text-rose-400" :
                    log.level === "warn" ? "text-amber-400" :
                    log.level === "info" ? "text-sky-400" :
                    "text-slate-500"
                  }`}>
                    {log.level}
                  </span>
                  <span className="shrink-0 text-violet-400/80 w-[100px] truncate">{log.service}</span>
                  <span className="text-slate-300 break-all">{log.message}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
