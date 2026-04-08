"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClockIcon, GavelIcon, UsersIcon, TrendingUpIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const auction = {
  name: "Genesis Shard #3",
  collection: "Origin Tales",
  currentBid: "5.80",
  bidCount: 23,
  watchers: 187,
  minIncrement: "0.1",
  endTime: new Date(Date.now() + 4 * 3600000 + 27 * 60000 + 14000),
}

const bids = [
  { bidder: "apex.eth", amount: "5.80 ETH", time: "4 min ago" },
  { bidder: "drift.eth", amount: "5.42 ETH", time: "18 min ago" },
  { bidder: "wave.eth", amount: "5.10 ETH", time: "1h ago" },
  { bidder: "apex.eth", amount: "4.75 ETH", time: "2h ago" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
  const diff = Math.max(0, target.getTime() - now.getTime())
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { hours, minutes, seconds }
}

export default function NftAuction() {
  const countdown = useCountdown(auction.endTime)

  return (
    <motion.div
      className="mx-auto max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden" style={{ boxShadow: shadowLg }}>
          <div className="aspect-[4/3] bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]" />
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/30 backdrop-blur-sm text-white border-0 text-xs">
                <ClockIcon className="size-3 mr-1" />
                Live Auction
              </Badge>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-2xl bg-black/40 backdrop-blur-md px-6 py-3">
              {[
                { value: String(countdown.hours).padStart(2, "0"), label: "HRS" },
                { value: String(countdown.minutes).padStart(2, "0"), label: "MIN" },
                { value: String(countdown.seconds).padStart(2, "0"), label: "SEC" },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white tabular-nums tracking-tight">{unit.value}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/60">{unit.label}</div>
                  </div>
                  {i < 2 && <span className="text-white/40 text-xl font-light">:</span>}
                </div>
              ))}
            </div>
          </div>

          <CardContent className="p-5 space-y-4">
            <div>
              <div className="text-xs text-muted-foreground">{auction.collection}</div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground mt-0.5">{auction.name}</h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Current Bid</div>
                <div className="text-2xl font-semibold tracking-tight tabular-nums">{auction.currentBid} ETH</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-sm font-medium tabular-nums">{auction.bidCount}</div>
                  <div className="text-[10px] text-muted-foreground">Bids</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium tabular-nums">{auction.watchers}</div>
                  <div className="text-[10px] text-muted-foreground">Watching</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder={`Min ${(parseFloat(auction.currentBid) + parseFloat(auction.minIncrement)).toFixed(2)}`}
                  className="pr-12 tabular-nums font-medium"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">ETH</span>
              </div>
              <Button size="lg">
                <GavelIcon className="size-4 mr-2" />
                Place Bid
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent Bids</h3>
              {bids.map((bid, i) => (
                <motion.div
                  key={`${bid.bidder}-${bid.time}`}
                  className="flex items-center justify-between py-1.5"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.05 * i }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                    <span className="text-sm text-foreground">{bid.bidder}</span>
                    {i === 0 && (
                      <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                        <TrendingUpIcon className="size-2.5 mr-0.5" />
                        Highest
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium tabular-nums">{bid.amount}</span>
                    <span className="text-xs text-muted-foreground ml-2">{bid.time}</span>
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
