"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { GitCommit, GitMerge, GitPullRequest, MessageSquare, Tag } from "lucide-react"

type EventType = "commit" | "merge" | "pr" | "comment" | "release"

const typeConfig: Record<EventType, { icon: typeof GitCommit; color: string }> = {
  commit: { icon: GitCommit, color: "text-foreground" },
  merge: { icon: GitMerge, color: "text-violet-600" },
  pr: { icon: GitPullRequest, color: "text-emerald-600" },
  comment: { icon: MessageSquare, color: "text-sky-600" },
  release: { icon: Tag, color: "text-amber-600" },
}

const events = [
  { type: "release" as EventType, user: "AP", time: "14:22", hash: "v3.9.0", message: "Release v3.9.0 — real-time collaboration, new billing flow", branch: "main" },
  { type: "merge" as EventType, user: "LN", time: "14:18", hash: "", message: "Merged #294 feature/collab-cursors into main", branch: "main" },
  { type: "comment" as EventType, user: "TR", time: "13:55", hash: "", message: "\"LGTM, nice edge-case handling on the reconnect logic\"", branch: "feature/collab-cursors" },
  { type: "commit" as EventType, user: "LN", time: "13:41", hash: "a7c3f1e", message: "fix: debounce cursor broadcast to 60fps cap", branch: "feature/collab-cursors" },
  { type: "commit" as EventType, user: "LN", time: "12:08", hash: "e92d4b8", message: "feat: presence indicators with idle detection", branch: "feature/collab-cursors" },
  { type: "pr" as EventType, user: "MC", time: "11:32", hash: "#297", message: "chore: migrate Stripe SDK to v14, update webhook signatures", branch: "chore/stripe-v14" },
  { type: "commit" as EventType, user: "AP", time: "10:56", hash: "f41a09c", message: "refactor: extract billing computation into pure functions", branch: "feature/billing-v2" },
  { type: "commit" as EventType, user: "SD", time: "09:47", hash: "c8b21d3", message: "test: add integration tests for multi-currency checkout", branch: "feature/billing-v2" },
  { type: "merge" as EventType, user: "AP", time: "09:15", hash: "", message: "Merged #291 fix/webhook-retry-logic into main", branch: "main" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function Timeline05() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Activity</h2>
        <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">ropau/platform</Badge>
      </div>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border" />

        <div className="space-y-0.5">
          {events.map((event, i) => {
            const config = typeConfig[event.type]
            const Icon = config.icon

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative flex items-start gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-muted/50"
              >
                <div className="relative z-10 flex size-[31px] shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                  <Icon className={`size-3.5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Avatar className="size-5">
                      <AvatarFallback className="text-[9px] font-medium">{event.user}</AvatarFallback>
                    </Avatar>
                    <span className="truncate text-foreground">
                      {event.type === "comment" ? (
                        <span className="italic text-muted-foreground">{event.message}</span>
                      ) : (
                        <>
                          {event.hash && (
                            <code className="mr-1.5 rounded bg-muted px-1 py-0.5 font-mono text-xs text-muted-foreground">
                              {event.hash}
                            </code>
                          )}
                          <span className="text-[13px]">{event.message}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-mono tabular-nums">{event.time}</span>
                    <span className="font-mono opacity-60">{event.branch}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
