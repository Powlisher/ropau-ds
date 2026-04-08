"use client"

import { TrendingUp, TrendingDown, Star, MessageSquare, ThumbsUp, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const metrics = [
  {
    label: "Avg. Rating",
    value: "4.3",
    change: "+0.2",
    trend: "up" as const,
    icon: Star,
    period: "vs last month",
  },
  {
    label: "Total Feedback",
    value: "1,847",
    change: "+12%",
    trend: "up" as const,
    icon: MessageSquare,
    period: "vs last month",
  },
  {
    label: "NPS Score",
    value: "67",
    change: "-3",
    trend: "down" as const,
    icon: BarChart3,
    period: "vs last month",
  },
  {
    label: "Satisfaction",
    value: "89%",
    change: "+4%",
    trend: "up" as const,
    icon: ThumbsUp,
    period: "vs last month",
  },
]

const sentimentBreakdown = [
  { label: "Positive", pct: 64, color: "bg-emerald-400" },
  { label: "Neutral", pct: 24, color: "bg-slate-300 dark:bg-slate-600" },
  { label: "Negative", pct: 12, color: "bg-red-400" },
]

const topTopics = [
  { topic: "Onboarding flow", count: 234, sentiment: "positive" as const },
  { topic: "Pricing page clarity", count: 187, sentiment: "negative" as const },
  { topic: "API documentation", count: 156, sentiment: "positive" as const },
  { topic: "Mobile performance", count: 143, sentiment: "negative" as const },
  { topic: "Team collaboration", count: 128, sentiment: "positive" as const },
]

export default function Feedback10() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Feedback analytics</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">March 2026 overview</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="rounded-xl bg-card px-4 py-4 ring-1 ring-border/60"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="size-4 text-muted-foreground" />
                  <div className={`flex items-center gap-0.5 text-[11px] font-medium ${
                    m.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {m.trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {m.change}
                  </div>
                </div>
                <p className="font-heading text-2xl font-bold tracking-tight tabular-nums text-foreground">{m.value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{m.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
          >
            <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">Sentiment breakdown</h3>

            <div className="mt-4 flex h-3 overflow-hidden rounded-full">
              {sentimentBreakdown.map((s) => (
                <motion.div
                  key={s.label}
                  className={`${s.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ type: "spring" as const, stiffness: 80, damping: 18, delay: 0.3 }}
                />
              ))}
            </div>

            <div className="mt-3 flex gap-5">
              {sentimentBreakdown.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className={`size-2 rounded-full ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-xs font-mono tabular-nums font-medium text-foreground">{s.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
          >
            <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">Top mentioned topics</h3>

            <div className="mt-3 space-y-2">
              {topTopics.map((t) => (
                <div key={t.topic} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`size-1.5 rounded-full shrink-0 ${
                      t.sentiment === "positive" ? "bg-emerald-400" : "bg-red-400"
                    }`} />
                    <span className="text-sm text-foreground/80 truncate">{t.topic}</span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-muted-foreground shrink-0">{t.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
