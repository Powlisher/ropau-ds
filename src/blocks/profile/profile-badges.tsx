"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ZapIcon,
  ShieldCheckIcon,
  FlameIcon,
  StarIcon,
  CodeIcon,
  HeartIcon,
  TrophyIcon,
  RocketIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const badges = [
  { icon: FlameIcon, label: "30-Day Streak", description: "Committed code 30 days in a row", earned: true, color: "text-orange-600 bg-orange-500/10 ring-orange-500/20" },
  { icon: ShieldCheckIcon, label: "Security Champion", description: "Resolved 10+ vulnerability reports", earned: true, color: "text-emerald-600 bg-emerald-500/10 ring-emerald-500/20" },
  { icon: StarIcon, label: "Top Reviewer", description: "Reviewed 50+ PRs in a single quarter", earned: true, color: "text-amber-600 bg-amber-500/10 ring-amber-500/20" },
  { icon: CodeIcon, label: "Polyglot", description: "Shipped production code in 5+ languages", earned: true, color: "text-sky-600 bg-sky-500/10 ring-sky-500/20" },
  { icon: HeartIcon, label: "Mentor", description: "Onboarded 3+ new team members", earned: true, color: "text-pink-600 bg-pink-500/10 ring-pink-500/20" },
  { icon: ZapIcon, label: "Speed Demon", description: "Closed an issue within 15 minutes of creation", earned: true, color: "text-violet-600 bg-violet-500/10 ring-violet-500/20" },
  { icon: TrophyIcon, label: "Hackathon Winner", description: "Won a company hackathon event", earned: false, color: "text-muted-foreground/40 bg-muted/50 ring-border" },
  { icon: RocketIcon, label: "Launcher", description: "Led a product launch from zero to GA", earned: false, color: "text-muted-foreground/40 bg-muted/50 ring-border" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfileBadges() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Achievements
            </CardTitle>
            <Badge variant="secondary">
              <span className="tabular-nums">6</span>
              <span className="text-muted-foreground">/</span>
              <span className="tabular-nums">8</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {badges.map((badge) => (
              <motion.div
                key={badge.label}
                variants={itemVariants}
                whileHover={badge.earned ? { y: -1 } : undefined}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className={`flex items-start gap-3.5 rounded-xl p-3.5 ring-1 transition-all ${badge.earned ? "ring-foreground/5 bg-card" : "ring-border bg-muted/30 opacity-60"}`}
                style={badge.earned ? {
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                } : undefined}
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${badge.color}`}>
                  <badge.icon className="size-5" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium leading-snug">{badge.label}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {badge.description}
                  </p>
                  {!badge.earned && (
                    <span className="text-[11px] font-medium tracking-wide text-muted-foreground/60 uppercase">
                      Locked
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
