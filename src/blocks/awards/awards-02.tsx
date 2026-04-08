"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CrownIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"

const leaders = [
  { rank: 1, name: "Elena Marchetti", initials: "EM", score: 12847, change: +342, dept: "Engineering" },
  { rank: 2, name: "James Okonkwo", initials: "JO", score: 11293, change: +128, dept: "Product" },
  { rank: 3, name: "Sofia Chen", initials: "SC", score: 10841, change: -47, dept: "Design" },
  { rank: 4, name: "Marcus Lindgren", initials: "ML", score: 9762, change: +215, dept: "Sales" },
  { rank: 5, name: "Ayumi Nakamura", initials: "AN", score: 9518, change: +89, dept: "Marketing" },
  { rank: 6, name: "Carlos Reyes", initials: "CR", score: 8934, change: -112, dept: "Engineering" },
  { rank: 7, name: "Priya Sharma", initials: "PS", score: 8671, change: +467, dept: "Support" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Awards02() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Leaderboard
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This quarter's top contributors ranked by cumulative points.
        </p>
      </div>

      <motion.div
        className="overflow-hidden rounded-xl ring-1 ring-border"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.name}
            variants={itemVariants}
            className={`flex items-center gap-4 px-5 py-4 ${
              i > 0 ? "border-t border-border" : ""
            } ${i === 0 ? "bg-amber-500/5" : i % 2 === 0 ? "bg-muted/20" : "bg-card"}`}
          >
            <div className="flex w-8 items-center justify-center">
              {leader.rank === 1 ? (
                <CrownIcon className="size-5 text-amber-500" />
              ) : (
                <span className="font-mono text-sm font-bold tabular-nums text-muted-foreground">
                  {leader.rank}
                </span>
              )}
            </div>
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {leader.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-foreground">{leader.name}</span>
                {leader.rank <= 3 && (
                  <Badge variant="secondary" className="text-[10px]">Top 3</Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{leader.dept}</span>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm font-bold tabular-nums tracking-tight text-foreground">
                {leader.score.toLocaleString()}
              </div>
              <div className={`flex items-center justify-end gap-0.5 text-[11px] tabular-nums ${
                leader.change >= 0 ? "text-emerald-600" : "text-red-500"
              }`}>
                {leader.change >= 0 ? (
                  <TrendingUpIcon className="size-3" />
                ) : (
                  <TrendingDownIcon className="size-3" />
                )}
                {leader.change >= 0 ? "+" : ""}{leader.change}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
