"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, HashIcon, MessageCircleIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const trends = [
  { rank: 1, topic: "Design Systems", category: "Design", posts: "24.8K", description: "The debate between monolithic and composable systems heats up" },
  { rank: 2, topic: "React Server Components", category: "Technology", posts: "18.2K", description: "New patterns emerge for data fetching in RSC" },
  { rank: 3, topic: "Spatial Computing", category: "Technology", posts: "12.7K", description: null },
  { rank: 4, topic: "Typography Trends 2026", category: "Design", posts: "9.4K", description: "Variable fonts adoption reaches mainstream" },
  { rank: 5, topic: "Remote Work Culture", category: "Business", posts: "8.1K", description: null },
  { rank: 6, topic: "AI Coding Assistants", category: "Technology", posts: "31.2K", description: "Study shows 40% productivity boost in specific tasks" },
  { rank: 7, topic: "Sustainable SaaS", category: "Business", posts: "5.6K", description: null },
]

const suggestedFollows = [
  { name: "Rasmus Andersson", handle: "@rsms", bio: "Type designer. Made Inter.", avatar: "from-slate-500 to-zinc-600" },
  { name: "Paco Coursey", handle: "@paaborbon", bio: "Building at Vercel", avatar: "from-blue-500 to-indigo-600" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialTrending() {
  return (
    <motion.div
      className="mx-auto max-w-sm space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="size-4 text-foreground" />
              <CardTitle className="text-base font-semibold tracking-tight">Trending</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {trends.map((trend, i) => (
                <motion.div
                  key={trend.topic}
                  className="px-5 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground tabular-nums">{trend.rank}</span>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{trend.category}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] tabular-nums">
                      <MessageCircleIcon className="size-2.5 mr-0.5" />
                      {trend.posts}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <HashIcon className="size-3.5 text-muted-foreground" />
                    <span className="font-semibold text-sm text-foreground">{trend.topic}</span>
                  </div>
                  {trend.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{trend.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="px-5 py-3">
              <button className="text-sm text-foreground font-medium hover:underline">Show more</button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold tracking-tight">Who to Follow</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {suggestedFollows.map((person) => (
              <div key={person.handle} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className={`size-10 rounded-full bg-gradient-to-br ${person.avatar} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground">{person.name}</div>
                  <div className="text-xs text-muted-foreground">{person.handle}</div>
                </div>
                <button className="shrink-0 rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity">
                  Follow
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
