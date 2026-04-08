"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AlertOctagon, Eye, Wrench, CheckCircle2, Clock } from "lucide-react"

type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved"

const statusConfig: Record<IncidentStatus, { icon: typeof Eye; color: string; bg: string }> = {
  investigating: { icon: Eye, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
  identified: { icon: AlertOctagon, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  monitoring: { icon: Wrench, color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
  resolved: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
}

const incident = {
  title: "Elevated API Error Rates",
  opened: "Apr 8, 2026 at 10:14 UTC",
  severity: "Major",
  updates: [
    {
      status: "resolved" as IncidentStatus,
      time: "12:47 UTC",
      message: "Error rates have returned to baseline (0.04%). The connection pool fix has been verified across all nodes. This incident is resolved. A full postmortem will follow within 48 hours.",
    },
    {
      status: "monitoring" as IncidentStatus,
      time: "11:52 UTC",
      message: "The fix has been deployed to all 8 production nodes. Error rates are trending down. Currently at 0.8% and declining. We are monitoring for the next 30 minutes before marking resolved.",
    },
    {
      status: "identified" as IncidentStatus,
      time: "11:18 UTC",
      message: "Root cause identified: the connection pool for the inventory service was configured with a max of 20 connections, which was insufficient for the traffic spike after the newsletter campaign. Fix is being deployed now.",
    },
    {
      status: "investigating" as IncidentStatus,
      time: "10:42 UTC",
      message: "We are seeing elevated 502/503 error rates on API endpoints that depend on the inventory service. Checkout, cart, and product detail pages are affected. Other services remain operational.",
    },
    {
      status: "investigating" as IncidentStatus,
      time: "10:14 UTC",
      message: "We are investigating reports of increased error rates on our API. Monitoring dashboards show a spike in 5xx responses starting at approximately 10:08 UTC.",
    },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring05() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] uppercase tracking-wider font-medium">
                    Resolved
                  </Badge>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-medium">
                    {incident.severity}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-lg tracking-tight">{incident.title}</CardTitle>
                <CardDescription className="font-mono tabular-nums text-xs">{incident.opened}</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="size-3" />
                <span className="font-mono tabular-nums">2h 33m</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="relative">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border" />

              <div className="space-y-5">
                {incident.updates.map((update, i) => {
                  const config = statusConfig[update.status]
                  const Icon = config.icon

                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="relative flex gap-3"
                    >
                      <div className={`relative z-10 flex size-[23px] shrink-0 items-center justify-center rounded-full border ${config.bg}`}>
                        <Icon className={`size-3 ${config.color}`} />
                      </div>

                      <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold capitalize ${config.color}`}>
                            {update.status}
                          </span>
                          <span className="text-[11px] font-mono tabular-nums text-muted-foreground">
                            {update.time}
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-muted-foreground">
                          {update.message}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
