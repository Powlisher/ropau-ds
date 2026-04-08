"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, FileText, Link2, Users } from "lucide-react"

const events = [
  {
    date: "Apr 7, 2026",
    title: "Quarterly business review",
    summary: "Presented Q1 results to leadership. Revenue up 28% QoQ.",
    details: [
      "Net revenue: $2.37M (+28% QoQ, +114% YoY)",
      "Gross margin improved from 71% to 76% after infrastructure optimization",
      "Customer acquisition cost dropped to $847 from $1,230",
      "NPS score: 62 (industry avg: 38)",
    ],
    attachments: 3,
    participants: 8,
  },
  {
    date: "Mar 28, 2026",
    title: "Infrastructure migration complete",
    summary: "Moved from multi-tenant Heroku to dedicated Kubernetes cluster.",
    details: [
      "P99 latency reduced from 420ms to 89ms",
      "Monthly infra cost reduced by $3,800",
      "Zero downtime during migration (blue-green deployment)",
      "Auto-scaling configured for 2-12 pods based on CPU/memory",
    ],
    attachments: 1,
    participants: 4,
  },
  {
    date: "Mar 15, 2026",
    title: "Design system V3 shipped",
    summary: "New component library with dark mode, RTL support, and accessibility audit.",
    details: [
      "47 components migrated to Radix UI primitives",
      "WCAG 2.1 AA compliance verified across all components",
      "Bundle size reduced 34% with tree-shaking improvements",
      "Storybook documentation updated with interaction tests",
    ],
    attachments: 5,
    participants: 3,
  },
  {
    date: "Feb 22, 2026",
    title: "SOC 2 Type II audit initiated",
    summary: "Engaged with Vanta for continuous monitoring and evidence collection.",
    details: [
      "Gap analysis identified 7 medium-priority controls to implement",
      "Estimated completion: 14 weeks",
      "Policy documentation 80% complete",
    ],
    attachments: 2,
    participants: 5,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function ExpandableEvent({ event }: { event: typeof events[0] }) {
  const [open, setOpen] = React.useState(false)

  return (
    <motion.div variants={itemVariants}>
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-mono font-medium tabular-nums tracking-wide text-muted-foreground uppercase">
                {event.date}
              </span>
              <h3 className="mt-1 font-heading text-[15px] font-semibold tracking-tight text-foreground">
                {event.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {event.summary}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              onClick={() => setOpen(!open)}
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                <ChevronDown className="size-4 text-muted-foreground" />
              </motion.div>
            </Button>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="size-3" />
              {event.attachments} files
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              {event.participants} people
            </span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-lg bg-muted/50 p-3.5">
                  <ul className="space-y-1.5">
                    {event.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Timeline06() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Project Log</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">Detailed history with expandable context</p>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event) => (
          <ExpandableEvent key={event.title} event={event} />
        ))}
      </motion.div>
    </div>
  )
}
