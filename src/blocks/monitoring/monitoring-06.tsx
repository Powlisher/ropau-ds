"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Heart,
  Globe,
  Database,
  Mail,
  CreditCard,
  Search,
  Cloud,
  Lock,
  RefreshCw,
} from "lucide-react"

type HealthStatus = "healthy" | "degraded" | "unhealthy"

const statusConfig: Record<HealthStatus, { label: string; dot: string; badge: string }> = {
  healthy: { label: "Healthy", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  degraded: { label: "Degraded", dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  unhealthy: { label: "Unhealthy", dot: "bg-rose-500", badge: "bg-rose-50 text-rose-700 border-rose-200" },
}

const checks = [
  { name: "Web Application", icon: Globe, status: "healthy" as HealthStatus, responseTime: "38ms", lastCheck: "14:32:04", checks24h: 1440, failures24h: 0 },
  { name: "Primary Database", icon: Database, status: "healthy" as HealthStatus, responseTime: "4ms", lastCheck: "14:32:01", checks24h: 1440, failures24h: 2 },
  { name: "Read Replica", icon: Database, status: "degraded" as HealthStatus, responseTime: "189ms", lastCheck: "14:31:58", checks24h: 1440, failures24h: 23 },
  { name: "Auth Service", icon: Lock, status: "healthy" as HealthStatus, responseTime: "12ms", lastCheck: "14:32:02", checks24h: 1440, failures24h: 0 },
  { name: "Payment Gateway", icon: CreditCard, status: "healthy" as HealthStatus, responseTime: "67ms", lastCheck: "14:31:55", checks24h: 1440, failures24h: 1 },
  { name: "Email Provider", icon: Mail, status: "healthy" as HealthStatus, responseTime: "142ms", lastCheck: "14:32:00", checks24h: 1440, failures24h: 4 },
  { name: "Search Cluster", icon: Search, status: "healthy" as HealthStatus, responseTime: "28ms", lastCheck: "14:31:59", checks24h: 1440, failures24h: 0 },
  { name: "Object Storage", icon: Cloud, status: "healthy" as HealthStatus, responseTime: "51ms", lastCheck: "14:32:03", checks24h: 720, failures24h: 0 },
]

const healthyCount = checks.filter((c) => c.status === "healthy").length

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function Monitoring06() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
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
              <Heart className="size-4 text-emerald-500" />
              <CardTitle className="font-heading text-lg tracking-tight">Health Checks</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">
                {healthyCount}/{checks.length} healthy
              </Badge>
              <button className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw className="size-3" />
                Refresh
              </button>
            </div>
          </div>
          <CardDescription>Automated health probes running every 60 seconds</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_80px_100px_60px] gap-2 px-3 py-2 bg-muted/50 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Service</span>
              <span className="text-right">Response</span>
              <span className="text-right">Last Check</span>
              <span className="text-right">24h Success</span>
              <span className="text-right">Status</span>
            </div>

            {checks.map((check, i) => {
              const config = statusConfig[check.status]
              const Icon = check.icon
              const successRate = (((check.checks24h - check.failures24h) / check.checks24h) * 100).toFixed(2)

              return (
                <motion.div
                  key={check.name}
                  variants={itemVariants}
                  className={`grid grid-cols-[1fr_80px_80px_100px_60px] gap-2 items-center px-3 py-2.5 ${
                    i !== checks.length - 1 ? "border-b border-border" : ""
                  } ${check.status !== "healthy" ? "bg-amber-50/30" : "hover:bg-muted/30"} transition-colors`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 text-muted-foreground" />
                    <span className="text-sm text-foreground">{check.name}</span>
                  </div>
                  <span className={`text-right text-[12px] font-mono tabular-nums ${
                    parseInt(check.responseTime) > 100 ? "text-amber-600" : "text-muted-foreground"
                  }`}>
                    {check.responseTime}
                  </span>
                  <span className="text-right text-[11px] font-mono tabular-nums text-muted-foreground/70">
                    {check.lastCheck}
                  </span>
                  <span className="text-right text-[12px] font-mono tabular-nums text-muted-foreground">
                    {successRate}%
                  </span>
                  <div className="flex justify-end">
                    <div className={`size-2 rounded-full ${config.dot}`} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
