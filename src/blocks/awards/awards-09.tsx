"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ZapIcon, StarIcon, TrendingUpIcon, ShieldIcon, TargetIcon } from "lucide-react"

const stats = [
  { label: "Total XP", value: "24,817", icon: ZapIcon, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Level", value: "12", sub: "Strategist", icon: StarIcon, color: "text-primary", bg: "bg-primary/10" },
  { label: "Global Rank", value: "#47", sub: "of 3,241", icon: TrendingUpIcon, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { label: "Win Rate", value: "73%", sub: "last 30d", icon: TargetIcon, color: "text-sky-600", bg: "bg-sky-500/10" },
]

const recentXP = [
  { action: "Completed Q1 OKR review", xp: 450, time: "2h ago" },
  { action: "Shipped feature flag system", xp: 800, time: "Yesterday" },
  { action: "Mentored new hire through first PR", xp: 200, time: "2 days ago" },
  { action: "Won design challenge sprint", xp: 1200, time: "Last week" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards09() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              EM
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Elena Marchetti
              </h2>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                <ShieldIcon className="mr-1 size-3" />
                Lvl 12
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Strategist rank since March 2026</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} whileHover={{ y: -2 }} transition={spring}>
                <Card
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="py-5">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-9 items-center justify-center rounded-lg ${stat.bg}`}>
                        <Icon className={`size-4 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="font-mono text-xl font-bold tabular-nums tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                    {stat.sub && (
                      <p className="mt-2 text-xs text-muted-foreground">{stat.sub}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-1 py-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Recent XP Gains
              </h3>
              {recentXP.map((entry, i) => (
                <div
                  key={entry.action}
                  className={`flex items-center justify-between py-3 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">{entry.action}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{entry.time}</span>
                  </div>
                  <Badge variant="secondary" className="font-mono tabular-nums">
                    +{entry.xp} XP
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
