"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { Calendar, Star, Zap, Target, Flag, Sparkles, TrendingUp, Users, Rocket } from "lucide-react"

const milestones = [
  { month: "Jan", year: "2025", title: "Series A Close", amount: "$8.2M raised", icon: TrendingUp, accent: "bg-emerald-500" },
  { month: "Feb", year: "2025", title: "Team Expansion", amount: "12 new hires", icon: Users, accent: "bg-sky-500" },
  { month: "Apr", year: "2025", title: "Beta Launch", amount: "1,847 signups", icon: Rocket, accent: "bg-violet-500" },
  { month: "Jun", year: "2025", title: "Product Hunt #2", amount: "1,203 upvotes", icon: Star, accent: "bg-amber-500" },
  { month: "Aug", year: "2025", title: "Enterprise Tier", amount: "First 3 contracts", icon: Target, accent: "bg-rose-500" },
  { month: "Oct", year: "2025", title: "Platform V2", amount: "Real-time collab", icon: Zap, accent: "bg-indigo-500" },
  { month: "Dec", year: "2025", title: "ARR Milestone", amount: "$1.4M ARR", icon: Flag, accent: "bg-teal-500" },
  { month: "Mar", year: "2026", title: "AI Features", amount: "Smart summaries", icon: Sparkles, accent: "bg-orange-500" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Timeline02() {
  return (
    <div className="py-8">
      <div className="mb-6 px-1">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Company Journey</h2>
        <p className="mt-1 text-sm text-muted-foreground">Key milestones from founding to today</p>
      </div>

      <ScrollArea className="w-full">
        <motion.div
          className="flex gap-4 pb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {milestones.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.month + m.year}
                variants={itemVariants}
                className="relative shrink-0"
              >
                {i < milestones.length - 1 && (
                  <div className="absolute top-[28px] left-[calc(50%+20px)] h-px w-[calc(100%-8px)] bg-border" />
                )}

                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                >
                  <Card
                    className="w-[180px]"
                    style={{
                      boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className={`size-2.5 rounded-full ${m.accent}`} />
                        <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase font-mono">
                          {m.month} {m.year}
                        </span>
                      </div>
                      <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4 text-foreground" />
                      </div>
                      <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                        {m.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{m.amount}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </ScrollArea>
    </div>
  )
}
