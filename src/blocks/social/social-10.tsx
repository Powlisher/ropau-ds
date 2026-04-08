"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon, EyeIcon, HeartIcon, MessageCircleIcon, UsersIcon, BarChart3Icon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const stats = [
  { label: "Post Reach", value: "48.2K", change: "+14.3%", trend: "up" as const, icon: EyeIcon },
  { label: "Engagement", value: "6.8%", change: "+0.9%", trend: "up" as const, icon: HeartIcon },
  { label: "Comments", value: "847", change: "-2.1%", trend: "down" as const, icon: MessageCircleIcon },
  { label: "New Followers", value: "+312", change: "+28.4%", trend: "up" as const, icon: UsersIcon },
]

const topPosts = [
  { content: "Hot take: most 'AI-generated' UIs fail not because of the technology...", impressions: "42.1K", engagement: "8.4%", likes: 1842, time: "3d ago" },
  { content: "Why your component library needs fewer components", impressions: "28.7K", engagement: "7.1%", likes: 1841, time: "5d ago" },
  { content: "Just shipped the new design system components...", impressions: "12.4K", engagement: "5.2%", likes: 247, time: "12h ago" },
]

const dailyData = [
  { day: "Mon", reach: 4200, engagement: 280 },
  { day: "Tue", reach: 5800, engagement: 410 },
  { day: "Wed", reach: 3100, engagement: 190 },
  { day: "Thu", reach: 8400, engagement: 720 },
  { day: "Fri", reach: 6200, engagement: 480 },
  { day: "Sat", reach: 11800, engagement: 1240 },
  { day: "Sun", reach: 8900, engagement: 680 },
]

const maxReach = Math.max(...dailyData.map((d) => d.reach))

const timeframes = ["7d", "30d", "90d"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialAnalytics() {
  const [timeframe, setTimeframe] = useState("7d")

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Performance overview</p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                timeframe === tf ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card style={{ boxShadow: shadow }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className="size-3.5 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{stat.label}</span>
                  </div>
                  <div className="text-xl font-semibold tracking-tight tabular-nums">{stat.value}</div>
                  <Badge variant="secondary" className="mt-1.5 tabular-nums text-[10px]">
                    {stat.trend === "up" ? <TrendingUpIcon className="size-3 mr-0.5" /> : <TrendingDownIcon className="size-3 mr-0.5" />}
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart3Icon className="size-4 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold">Daily Reach</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-32">
              {dailyData.map((day, i) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full bg-foreground/10 rounded-t relative overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.reach / maxReach) * 100}%` }}
                    transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.05 * i }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-foreground/20 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.engagement / day.reach) * 100}%` }}
                      transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.1 + 0.05 * i }}
                    />
                  </motion.div>
                  <span className="text-[10px] text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-foreground/10" />
                <span className="text-[10px] text-muted-foreground">Reach</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-foreground/20" />
                <span className="text-[10px] text-muted-foreground">Engagement</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {topPosts.map((post, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.05 * i }}
                >
                  <span className="text-lg font-semibold text-muted-foreground/40 tabular-nums w-6 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground line-clamp-1">{post.content}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground"><span className="tabular-nums font-medium text-foreground">{post.impressions}</span> impressions</span>
                      <span className="text-xs text-muted-foreground"><span className="tabular-nums font-medium text-foreground">{post.engagement}</span> engagement</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <HeartIcon className="size-3" />
                      <span className="tabular-nums">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{post.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
