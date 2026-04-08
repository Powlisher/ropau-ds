"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSignIcon, UsersIcon, PackageIcon, StarIcon } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    label: "Revenue",
    value: "$48,293",
    subtext: "+14.2% from last month",
    icon: DollarSignIcon,
    bg: "bg-primary/10",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    label: "Customers",
    value: "2,847",
    subtext: "193 joined this week",
    icon: UsersIcon,
    bg: "bg-accent/10",
    iconBg: "bg-accent/15",
    iconColor: "text-accent",
  },
  {
    label: "Orders",
    value: "1,394",
    subtext: "Avg. $34.62 per order",
    icon: PackageIcon,
    bg: "bg-chart-3/10",
    iconBg: "bg-chart-3/15",
    iconColor: "text-chart-3",
  },
  {
    label: "Reviews",
    value: "4.7",
    subtext: "Based on 823 ratings",
    icon: StarIcon,
    bg: "bg-chart-4/10",
    iconBg: "bg-chart-4/15",
    iconColor: "text-chart-4",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsColoredCards() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        >
          <Card
            className={stat.bg}
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="flex items-start gap-4 pt-1">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`size-5 ${stat.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                <div className="mt-0.5 text-2xl font-semibold tabular-nums tracking-tight">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.subtext}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
