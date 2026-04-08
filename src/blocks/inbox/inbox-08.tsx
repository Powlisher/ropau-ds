"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SparklesIcon } from "lucide-react"
import { motion } from "framer-motion"

const labels = [
  { name: "Action Required", color: "oklch(0.58 0.22 25)", bg: "oklch(0.95 0.04 25)" },
  { name: "Waiting Reply", color: "oklch(0.70 0.17 82)", bg: "oklch(0.96 0.04 82)" },
  { name: "FYI Only", color: "oklch(0.55 0.18 250)", bg: "oklch(0.95 0.03 250)" },
  { name: "Scheduled", color: "oklch(0.55 0.15 160)", bg: "oklch(0.95 0.03 160)" },
]

const emails = [
  {
    sender: "Hugo Castellan",
    initials: "HC",
    subject: "Review PR #247 before EOD",
    preview: "The auth middleware refactor is ready for review. High priority since it blocks the release...",
    time: "11:02 AM",
    label: "Action Required",
    confidence: 94,
    avatarColor: "oklch(0.60 0.18 30)",
  },
  {
    sender: "Lea Richter",
    initials: "LR",
    subject: "Re: Invoice reconciliation",
    preview: "Thanks for flagging the discrepancy. I'll check with accounting and get back to you by Thursday...",
    time: "10:38 AM",
    label: "Waiting Reply",
    confidence: 88,
    avatarColor: "oklch(0.55 0.12 280)",
  },
  {
    sender: "Thomas Vigier",
    initials: "TV",
    subject: "Deployment notification - staging v2.4.1",
    preview: "Automated: staging environment updated. All 147 tests passing. No breaking changes detected...",
    time: "9:15 AM",
    label: "FYI Only",
    confidence: 97,
    avatarColor: "oklch(0.55 0.15 160)",
  },
  {
    sender: "Amara Diallo",
    initials: "AD",
    subject: "Weekly design sync - tomorrow 3 PM",
    preview: "Calendar invite sent. Agenda: token migration progress, component audit results, Q2 roadmap...",
    time: "Yesterday",
    label: "Scheduled",
    confidence: 91,
    avatarColor: "oklch(0.65 0.17 82)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox08() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <SparklesIcon className="size-4" style={{ color: "oklch(0.55 0.18 250)" }} />
              Smart Inbox
            </CardTitle>
            <CardDescription>AI-categorized by intent and urgency</CardDescription>
          </div>
          <div className="flex gap-1.5">
            {labels.map((l) => (
              <div
                key={l.name}
                className="size-2 rounded-full"
                style={{ backgroundColor: l.color }}
                title={l.name}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {emails.map((email) => {
            const label = labels.find((l) => l.name === email.label)!
            return (
              <motion.div
                key={email.subject}
                variants={itemVariants}
                whileHover={{ backgroundColor: "oklch(0.97 0 0)" }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="flex cursor-pointer gap-3 border-b border-border/50 px-6 py-3.5 last:border-0"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="text-[10px] font-semibold text-white" style={{ backgroundColor: email.avatarColor }}>
                    {email.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate text-sm font-semibold">{email.sender}</span>
                      <Badge
                        className="shrink-0 text-[9px] font-semibold border-0"
                        style={{ backgroundColor: label.bg, color: label.color }}
                      >
                        {email.label}
                      </Badge>
                    </div>
                    <span className="text-[10px] tabular-nums text-muted-foreground shrink-0">{email.time}</span>
                  </div>
                  <div className="truncate text-sm font-medium mt-0.5">{email.subject}</div>
                  <div className="truncate text-xs text-muted-foreground/70 mt-0.5">{email.preview}</div>
                </div>
                <div className="flex flex-col items-end justify-center shrink-0">
                  <span className="text-[9px] tabular-nums text-muted-foreground/50">{email.confidence}%</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </CardContent>
    </Card>
  )
}
