"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, ArrowRightLeftIcon, TagIcon, SparklesIcon, GavelIcon, FilterIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const eventTypes = {
  sale: { icon: ShoppingCartIcon, label: "Sale", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  transfer: { icon: ArrowRightLeftIcon, label: "Transfer", color: "bg-blue-50 text-blue-700 border-blue-200" },
  listing: { icon: TagIcon, label: "Listing", color: "bg-violet-50 text-violet-700 border-violet-200" },
  mint: { icon: SparklesIcon, label: "Mint", color: "bg-amber-50 text-amber-700 border-amber-200" },
  bid: { icon: GavelIcon, label: "Bid", color: "bg-rose-50 text-rose-700 border-rose-200" },
}

type EventType = keyof typeof eventTypes

const activities: { type: EventType; nft: string; collection: string; from: string; to: string; price: string; time: string; gradient: string }[] = [
  { type: "sale", nft: "Chromatic Drift #247", collection: "Ethereal Forms", from: "orbit.eth", to: "pulse.eth", price: "2.45 ETH", time: "3 min ago", gradient: "from-violet-500 to-fuchsia-500" },
  { type: "listing", nft: "Neon Fracture #89", collection: "Digital Ruins", from: "nova.eth", to: "--", price: "0.78 ETH", time: "11 min ago", gradient: "from-cyan-400 to-blue-500" },
  { type: "bid", nft: "Genesis Shard #3", collection: "Origin Tales", from: "apex.eth", to: "--", price: "5.80 ETH", time: "18 min ago", gradient: "from-amber-400 to-orange-500" },
  { type: "transfer", nft: "Silent Bloom #1204", collection: "Nature Coded", from: "fern.eth", to: "garden.eth", price: "--", time: "42 min ago", gradient: "from-emerald-400 to-teal-500" },
  { type: "mint", nft: "Celestial Fragment #1848", collection: "Celestial Fragments", from: "0x0000", to: "star.eth", price: "0.08 ETH", time: "1h ago", gradient: "from-indigo-500 to-purple-500" },
  { type: "sale", nft: "Prism Shift #412", collection: "Color Theory", from: "pixel.eth", to: "hue.eth", price: "1.32 ETH", time: "2h ago", gradient: "from-rose-400 to-pink-500" },
  { type: "listing", nft: "Aether Wave #31", collection: "Ethereal Forms", from: "drift.eth", to: "--", price: "3.21 ETH", time: "3h ago", gradient: "from-purple-500 to-pink-400" },
]

const filterTabs: (EventType | "all")[] = ["all", "sale", "listing", "bid", "transfer", "mint"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftActivityFeed() {
  const [filter, setFilter] = useState<EventType | "all">("all")
  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter)

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold tracking-tight">Activity</CardTitle>
              <Button variant="ghost" size="sm">
                <FilterIcon className="size-3.5 mr-1.5" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all capitalize ${
                    filter === tab ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <motion.div
              className="divide-y divide-border"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={filter}
            >
              {filtered.map((activity, i) => {
                const config = eventTypes[activity.type]
                const Icon = config.icon
                return (
                  <motion.div
                    key={`${activity.nft}-${activity.time}`}
                    variants={itemVariants}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className={`size-10 rounded-xl bg-gradient-to-br ${activity.gradient} shrink-0 relative`}>
                      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${config.color}`}>
                          <Icon className="size-2.5 mr-0.5" />
                          {config.label}
                        </Badge>
                        <span className="text-sm font-medium text-foreground truncate">{activity.nft}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate">
                        {activity.from}{activity.to !== "--" && ` → ${activity.to}`}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium tabular-nums">{activity.price}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
