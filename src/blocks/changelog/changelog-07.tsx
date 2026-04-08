"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const entries = [
  {
    id: "1",
    version: "7.4.0",
    date: "Apr 5, 2026",
    title: "API rate limiting is now configurable per endpoint",
    summary: "Enterprise admins can set custom rate limits for individual API endpoints, replacing the previous global cap.",
    details: "Navigate to Settings > API > Rate Limits to configure per-endpoint thresholds. Limits are enforced per API key and support burst allowances. Existing global limits remain as defaults for any endpoint without a custom rule. Rate limit headers (X-RateLimit-Remaining, X-RateLimit-Reset) are included in every response.",
  },
  {
    id: "2",
    version: "7.3.1",
    date: "Mar 30, 2026",
    title: "Fixed duplicate notifications on mention in threads",
    summary: "Users were receiving 2-3 notifications per mention when the thread had more than 8 replies.",
    details: "The deduplication logic was checking message ID but not thread context, causing the notification worker to dispatch once per thread page. We now deduplicate on the composite key of (user_id, thread_id, mention_timestamp). Affected users may have seen a brief spike in notifications between March 27-30, which has now been resolved.",
  },
  {
    id: "3",
    version: "7.3.0",
    date: "Mar 22, 2026",
    title: "New integration: Slack thread sync",
    summary: "Link a Slack channel to any project. Messages and threads are synced bidirectionally with full formatting.",
    details: "Install the updated Slack app from the integrations marketplace. Once connected, choose which channels map to which projects. Messages posted in Slack appear as comments in the project feed within 2 seconds. Replies in either platform stay threaded. Supports emoji reactions, file attachments up to 50 MB, and code blocks. Requires Slack workspace admin approval for the first connection.",
  },
  {
    id: "4",
    version: "7.2.0",
    date: "Mar 10, 2026",
    title: "Audit log export to S3 and GCS",
    summary: "Stream audit events to your own cloud storage bucket for long-term retention and compliance.",
    details: "Configure a destination bucket in Settings > Security > Audit Log Export. Events are written as newline-delimited JSON in 5-minute batches. Supports both AWS S3 and Google Cloud Storage with IAM role-based authentication. Backfill is available for the last 90 days of events.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog07() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Release notes</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Expand any entry for full details.
        </p>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => {
          const isOpen = expanded === entry.id
          return (
            <motion.div
              key={entry.id}
              variants={itemVariants}
              className="rounded-xl bg-card ring-1 ring-foreground/[0.06]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
              }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : entry.id)}
                className="flex w-full items-start gap-4 p-5 text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <Badge variant="secondary" className="font-mono text-xs tabular-nums">
                      v{entry.version}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <h3 className="mt-2 font-heading text-[15px] font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                  className="mt-1 shrink-0"
                >
                  <ChevronDown className="size-4 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/60 px-5 py-4">
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {entry.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
