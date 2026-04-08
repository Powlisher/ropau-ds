"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

const leaders = [
  { rank: 1, name: "Elena Marchetti", avatar: "EM", value: "$142,380", progress: 94 },
  { rank: 2, name: "Thomas Reiner", avatar: "TR", value: "$128,750", progress: 85 },
  { rank: 3, name: "Sophie Duval", avatar: "SD", value: "$97,420", progress: 64 },
  { rank: 4, name: "Marcus Chen", avatar: "MC", value: "$89,100", progress: 59 },
  { rank: 5, name: "Aisha Patel", avatar: "AP", value: "$76,830", progress: 51 },
  { rank: 6, name: "Jonas Eriksson", avatar: "JE", value: "$64,290", progress: 42 },
  { rank: 7, name: "Carolina Ruiz", avatar: "CR", value: "$51,470", progress: 34 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsLeaderboard() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Sales Leaderboard</CardTitle>
        <CardDescription>Top performers this quarter</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {leaders.map((leader) => (
            <motion.div
              key={leader.rank}
              variants={itemVariants}
              whileHover={{ y: -1 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex items-center gap-4 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums ${
                  leader.rank <= 3
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "text-muted-foreground"
                }`}
              >
                {leader.rank}
              </span>
              <Avatar size="sm">
                <AvatarImage src="" alt={leader.name} />
                <AvatarFallback>{leader.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm font-medium">{leader.name}</span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums">{leader.value}</span>
                </div>
                <Progress value={leader.progress} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
