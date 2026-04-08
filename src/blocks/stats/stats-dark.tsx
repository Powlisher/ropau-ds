"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { label: "Monthly Active Users", value: "184,293", change: "+12.8%", trend: "up" as const },
  { label: "Avg. Session Duration", value: "6m 42s", change: "+3.1%", trend: "up" as const },
  { label: "Revenue per User", value: "$4.87", change: "-1.2%", trend: "down" as const },
  { label: "Feature Adoption", value: "73.4%", change: "+5.6%", trend: "up" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsDark() {
  return (
    <div
      className="rounded-2xl px-6 py-8 lg:px-10 lg:py-10"
      style={{
        background: "linear-gradient(135deg, oklch(0.18 0.01 3.6), oklch(0.14 0.005 3.6))",
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight text-white/90">Platform Analytics</h2>
        <p className="mt-1 text-sm text-white/50">Last 30 days performance snapshot</p>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={itemVariants} className="flex items-start gap-6">
            {i > 0 && (
              <Separator
                orientation="vertical"
                className="hidden h-16 xl:block"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              />
            )}
            <div className="flex-1">
              <div className="text-xs font-medium uppercase tracking-widest text-white/40">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-white/95">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                {stat.trend === "up" ? (
                  <TrendingUpIcon className="size-3.5 text-emerald-400" />
                ) : (
                  <TrendingDownIcon className="size-3.5 text-red-400" />
                )}
                <span
                  className={`text-sm font-medium tabular-nums ${
                    stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-white/30">vs prior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
