"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitCommitHorizontalIcon, MessageSquareIcon, EyeIcon } from "lucide-react"
import { motion } from "framer-motion"

const activities = [
  {
    type: "commit" as const,
    message: "fix: resolve race condition in WebSocket reconnect logic",
    repo: "ropau/sync-engine",
    time: "23 min ago",
    icon: GitCommitHorizontalIcon,
  },
  {
    type: "comment" as const,
    message: "Suggested using a discriminated union instead of the enum approach for better type narrowing",
    repo: "ropau/design-system",
    time: "1h ago",
    icon: MessageSquareIcon,
  },
  {
    type: "review" as const,
    message: "Approved PR #847 -- Add stagger animations to dashboard cards",
    repo: "ropau/web-app",
    time: "3h ago",
    icon: EyeIcon,
  },
  {
    type: "commit" as const,
    message: "feat: add spring-based page transitions with shared layout",
    repo: "ropau/web-app",
    time: "5h ago",
    icon: GitCommitHorizontalIcon,
  },
  {
    type: "comment" as const,
    message: "We should benchmark this against the previous SSR approach before merging",
    repo: "ropau/sync-engine",
    time: "yesterday",
    icon: MessageSquareIcon,
  },
]

const typeColors: Record<string, string> = {
  commit: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  comment: "bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20",
  review: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/20",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfileActivity() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              {i < activities.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-0 w-px bg-border" />
              )}

              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${typeColors[activity.type]}`}>
                <activity.icon className="size-4" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <p className="text-sm leading-snug text-foreground">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[11px]">
                    {activity.repo}
                  </Badge>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
