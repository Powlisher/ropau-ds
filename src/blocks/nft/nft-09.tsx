"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, TrendingDownIcon, EyeIcon, EyeOffIcon, LayersIcon, ImageIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const portfolio = {
  totalValue: "$48,291.40",
  totalChange: "+$3,412.80",
  totalChangePct: "+7.6%",
  nftCount: 23,
  collections: 8,
}

const holdings = [
  { collection: "Ethereal Forms", count: 4, floorValue: "3.28 ETH", totalValue: "$42,891.20", change: "+12.4%", trend: "up" as const, gradient: "from-violet-500 to-fuchsia-500" },
  { collection: "Origin Tales", count: 2, floorValue: "5.80 ETH", totalValue: "$37,926.00", change: "+4.1%", trend: "up" as const, gradient: "from-amber-400 to-orange-500" },
  { collection: "Digital Ruins", count: 7, floorValue: "0.34 ETH", totalValue: "$7,786.80", change: "-3.8%", trend: "down" as const, gradient: "from-cyan-400 to-blue-500" },
  { collection: "Nature Coded", count: 3, floorValue: "0.92 ETH", totalValue: "$9,021.60", change: "+1.2%", trend: "up" as const, gradient: "from-emerald-400 to-teal-500" },
  { collection: "Celestial Fragments", count: 5, floorValue: "0.14 ETH", totalValue: "$2,288.00", change: "+28.7%", trend: "up" as const, gradient: "from-indigo-500 to-purple-500" },
]

const timeframes = ["24h", "7d", "30d", "All"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftPortfolio() {
  const [visible, setVisible] = useState(true)
  const [timeframe, setTimeframe] = useState("7d")

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardDescription className="text-xs uppercase tracking-wide font-medium">Portfolio Value</CardDescription>
                <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums mt-1">
                  {visible ? portfolio.totalValue : "********"}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="tabular-nums">
                    <TrendingUpIcon className="size-3 mr-1" />
                    {portfolio.totalChangePct}
                  </Badge>
                  <span className="text-xs text-muted-foreground tabular-nums">{visible ? portfolio.totalChange : "***"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setVisible(!visible)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  {visible ? <EyeIcon className="size-4 text-muted-foreground" /> : <EyeOffIcon className="size-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ImageIcon className="size-3.5" />
                <span className="tabular-nums font-medium text-foreground">{portfolio.nftCount}</span>
                <span>NFTs</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <LayersIcon className="size-3.5" />
                <span className="tabular-nums font-medium text-foreground">{portfolio.collections}</span>
                <span>collections</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 w-fit">
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

            <div className="h-24 mt-4 flex items-end gap-1">
              {[34, 38, 36, 42, 39, 45, 43, 48, 46, 51, 49, 53].map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-foreground/10 rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${v * 1.8}%` }}
                  transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.03 * i }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Holdings by Collection</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {holdings.map((h, i) => (
                <motion.div
                  key={h.collection}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.05 * i }}
                >
                  <div className={`size-9 rounded-lg bg-gradient-to-br ${h.gradient} shrink-0 relative`}>
                    <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{h.collection}</div>
                    <div className="text-xs text-muted-foreground tabular-nums">{h.count} items / Floor {h.floorValue}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-medium tabular-nums">{visible ? h.totalValue : "***"}</div>
                    <div className={`text-xs tabular-nums flex items-center justify-end gap-0.5 ${h.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                      {h.trend === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                      {h.change}
                    </div>
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
