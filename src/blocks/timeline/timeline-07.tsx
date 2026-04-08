"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Check, Loader2, Circle } from "lucide-react"

type Status = "done" | "in-progress" | "planned"

const statusConfig: Record<Status, { icon: typeof Check; bg: string; ring: string; badge: string; label: string }> = {
  done: {
    icon: Check,
    bg: "bg-emerald-500",
    ring: "ring-emerald-100",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Shipped",
  },
  "in-progress": {
    icon: Loader2,
    bg: "bg-amber-500",
    ring: "ring-amber-100",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    label: "In Progress",
  },
  planned: {
    icon: Circle,
    bg: "bg-muted-foreground/30",
    ring: "ring-muted/50",
    badge: "bg-muted text-muted-foreground border-border",
    label: "Planned",
  },
}

const roadmap = [
  {
    quarter: "Q1 2026",
    items: [
      { title: "Real-time collaboration", description: "Multi-cursor editing with presence indicators and conflict resolution", status: "done" as Status },
      { title: "Custom workflows", description: "Visual workflow builder with conditional branching and webhook triggers", status: "done" as Status },
      { title: "Audit log", description: "Immutable event log with filtering, export, and 90-day retention", status: "done" as Status },
    ],
  },
  {
    quarter: "Q2 2026",
    items: [
      { title: "AI-powered summaries", description: "Automatic meeting notes, thread digests, and decision extraction", status: "in-progress" as Status },
      { title: "Advanced permissions", description: "Attribute-based access control with team hierarchies and guest roles", status: "in-progress" as Status },
      { title: "API v3", description: "GraphQL API with real-time subscriptions and rate limiting per workspace", status: "planned" as Status },
    ],
  },
  {
    quarter: "Q3 2026",
    items: [
      { title: "White-label support", description: "Custom domains, branding, and email templates for enterprise clients", status: "planned" as Status },
      { title: "Mobile app", description: "Native iOS and Android with offline-first architecture", status: "planned" as Status },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Timeline07() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Product Roadmap</h2>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">What we have shipped, what we are building, and what comes next</p>

      <motion.div
        className="relative space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[15px] top-8 bottom-8 w-px bg-border" />

        {roadmap.map((section) => (
          <motion.div key={section.quarter} variants={itemVariants}>
            <div className="relative mb-4 flex items-center gap-3">
              <div className="relative z-10 flex size-[31px] items-center justify-center rounded-full bg-foreground ring-4 ring-background">
                <span className="text-[10px] font-bold text-background font-mono">
                  {section.quarter.slice(0, 2)}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                {section.quarter}
              </h3>
            </div>

            <div className="ml-[39px] space-y-3">
              {section.items.map((item) => {
                const config = statusConfig[item.status]
                const Icon = config.icon

                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  >
                    <Card
                      className={item.status === "in-progress" ? "ring-1 ring-amber-200" : ""}
                      style={{
                        boxShadow: item.status === "in-progress"
                          ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
                          : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`flex size-5 items-center justify-center rounded-full ${config.bg}`}>
                                <Icon className={`size-3 text-white ${item.status === "in-progress" ? "animate-spin" : ""}`} />
                              </div>
                              <h4 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                                {item.title}
                              </h4>
                            </div>
                            <p className="ml-7 text-[13px] text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <Badge variant="outline" className={`shrink-0 text-[10px] uppercase tracking-wider font-medium ${config.badge}`}>
                            {config.label}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
