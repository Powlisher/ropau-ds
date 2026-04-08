"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Activity, Globe, Database, Mail, CreditCard, Search, Cloud, Lock } from "lucide-react"

type Status = "operational" | "degraded" | "outage"

const statusConfig: Record<Status, { label: string; dot: string; bg: string }> = {
  operational: { label: "Operational", dot: "bg-emerald-500", bg: "" },
  degraded: { label: "Degraded", dot: "bg-amber-500", bg: "bg-amber-50/50 ring-1 ring-amber-200/60" },
  outage: { label: "Major Outage", dot: "bg-rose-500", bg: "bg-rose-50/50 ring-1 ring-rose-200/60" },
}

const services = [
  { name: "Web Application", icon: Globe, status: "operational" as Status, latency: "42ms" },
  { name: "API Gateway", icon: Activity, status: "operational" as Status, latency: "18ms" },
  { name: "Database Cluster", icon: Database, status: "degraded" as Status, latency: "234ms" },
  { name: "Email Service", icon: Mail, status: "operational" as Status, latency: "87ms" },
  { name: "Payment Processing", icon: CreditCard, status: "operational" as Status, latency: "56ms" },
  { name: "Search Index", icon: Search, status: "operational" as Status, latency: "31ms" },
  { name: "CDN / Storage", icon: Cloud, status: "operational" as Status, latency: "12ms" },
  { name: "Authentication", icon: Lock, status: "operational" as Status, latency: "23ms" },
]

const overallStatus = services.some((s) => s.status === "outage")
  ? "outage"
  : services.some((s) => s.status === "degraded")
    ? "degraded"
    : "operational"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring01() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <Card
          className={overallStatus !== "operational" ? statusConfig[overallStatus as Status].bg : ""}
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardContent className="flex items-center gap-3 p-5">
            <div className="relative">
              <div className={`size-3 rounded-full ${statusConfig[overallStatus as Status].dot}`} />
              {overallStatus === "operational" && (
                <div className="absolute inset-0 size-3 animate-ping rounded-full bg-emerald-500/40" />
              )}
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold tracking-tight text-foreground">
                {overallStatus === "operational" ? "All Systems Operational" : overallStatus === "degraded" ? "Partial System Degradation" : "Major Service Outage"}
              </h2>
              <p className="text-xs text-muted-foreground font-mono tabular-nums">
                Last checked: Apr 8, 2026 at 14:32 UTC
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="font-heading text-lg tracking-tight">Service Status</CardTitle>
          <CardDescription>Current health of all platform components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0.5">
            {services.map((service) => {
              const config = statusConfig[service.status]
              const Icon = service.icon

              return (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/40 ${config.bg}`}
                >
                  <Icon className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium text-foreground flex-1">{service.name}</span>
                  <span className="text-[11px] font-mono tabular-nums text-muted-foreground mr-2">{service.latency}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className={`size-2 rounded-full ${config.dot}`} />
                    <span className={`text-[11px] font-medium ${service.status === "operational" ? "text-muted-foreground" : service.status === "degraded" ? "text-amber-600" : "text-rose-600"}`}>
                      {config.label}
                    </span>
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
