"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon, UsersIcon, DollarSignIcon, ActivityIcon, ShoppingCartIcon } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { label: "Total Revenue", value: "$48,293", change: "+14.2%", trend: "up" as const, icon: DollarSignIcon },
  { label: "Active Users", value: "2,847", change: "+7.8%", trend: "up" as const, icon: UsersIcon },
  { label: "Conversion Rate", value: "3.24%", change: "-0.4%", trend: "down" as const, icon: ActivityIcon },
  { label: "Avg. Order Value", value: "$67.50", change: "+2.1%", trend: "up" as const, icon: ShoppingCartIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsCardsRow() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={itemVariants}>
          <Card
            className="@container/card transition-all"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className="size-4 text-muted-foreground/60" />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums @[250px]/card:text-3xl">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={stat.trend === "up" ? "secondary" : "destructive"}>
                {stat.trend === "up" ? (
                  <TrendingUpIcon className="size-3" />
                ) : (
                  <TrendingDownIcon className="size-3" />
                )}
                {stat.change}
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">vs last month</span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
