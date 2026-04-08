"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const activities = [
  { user: "EM", name: "Elena Marchetti", action: "pushed 3 commits to", target: "feat/checkout-v2", time: "8 min ago", type: "commit" },
  { user: "TR", name: "Thomas Reiner", action: "reviewed and approved", target: "PR #293", time: "24 min ago", type: "review" },
  { user: "SD", name: "Sophie Duval", action: "opened a new issue:", target: "Image CDN timeout on EU regions", time: "47 min ago", type: "issue" },
  { user: "MC", name: "Marcus Chen", action: "deployed", target: "api-gateway v3.8.1", time: "1h 12min ago", type: "deploy" },
  { user: "AP", name: "Aisha Patel", action: "commented on", target: "RFC: Multi-tenant architecture", time: "2h ago", type: "comment" },
  { user: "JE", name: "Jonas Eriksson", action: "merged", target: "PR #287 into main", time: "3h ago", type: "merge" },
  { user: "CR", name: "Carolina Ruiz", action: "closed issue", target: "#412: Login redirect loop", time: "4h ago", type: "close" },
  { user: "SD", name: "Sophie Duval", action: "updated", target: "Design tokens v2.1", time: "5h ago", type: "update" },
]

const typeColors: Record<string, string> = {
  commit: "bg-primary/15",
  review: "bg-emerald-500/15",
  issue: "bg-amber-500/15",
  deploy: "bg-blue-500/15",
  comment: "bg-muted",
  merge: "bg-violet-500/15",
  close: "bg-muted",
  update: "bg-muted",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardActivityFeed() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Activity Feed</CardTitle>
        <CardDescription>Recent team activity across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-5">
            {activities.map((activity, i) => (
              <motion.div key={i} variants={itemVariants} className="relative flex items-start gap-4 pl-10">
                <div className={`absolute left-[8px] top-1 size-[15px] rounded-full ${typeColors[activity.type]} ring-2 ring-background`} />
                <Avatar size="sm">
                  <AvatarFallback>{activity.user}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{activity.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.target}</span>
                </div>
                <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
