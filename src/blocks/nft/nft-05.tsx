"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, TrendingDownIcon, UsersIcon, LayersIcon, ExternalLinkIcon, ShareIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const collection = {
  name: "Ethereal Forms",
  creator: "aether.eth",
  description: "A curated collection of 4,444 generative artworks exploring the boundaries of computational aesthetics. Each piece is unique, derived from on-chain randomness.",
  verified: true,
  items: 4444,
  owners: 2891,
  listed: 312,
  floorPrice: "0.82",
  floorChange: "+14.2%",
  floorTrend: "up" as const,
  totalVolume: "12,480",
  volumeChange: "+8.7%",
  bestOffer: "0.74",
  avgPrice24h: "1.13",
  sales24h: 47,
}

const stats = [
  { label: "Floor Price", value: `${collection.floorPrice} ETH`, change: collection.floorChange, trend: collection.floorTrend },
  { label: "Total Volume", value: `${collection.totalVolume} ETH`, change: collection.volumeChange, trend: "up" as const },
  { label: "Best Offer", value: `${collection.bestOffer} ETH`, change: null, trend: null },
  { label: "24h Avg Price", value: `${collection.avgPrice24h} ETH`, change: null, trend: null },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftCollectionHeader() {
  return (
    <motion.div
      className="mx-auto max-w-4xl space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden" style={{ boxShadow: shadow }}>
          <div className="h-32 bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-rose-500/20 relative">
            <div className="absolute -bottom-10 left-6">
              <div className="size-20 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-400 to-rose-500 ring-4 ring-card" style={{ boxShadow: shadow }}>
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_60%)]" />
              </div>
            </div>
          </div>
          <CardContent className="pt-14 pb-5 px-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">{collection.name}</h1>
                  {collection.verified && (
                    <Badge variant="secondary" className="text-[10px]">Verified</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm text-muted-foreground">by</span>
                  <div className="size-4 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
                  <span className="text-sm font-medium text-foreground">{collection.creator}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-2xl">{collection.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="sm">
                  <ShareIcon className="size-3.5 mr-1.5" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLinkIcon className="size-3.5 mr-1.5" />
                  Etherscan
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <LayersIcon className="size-3.5" />
                <span className="tabular-nums font-medium text-foreground">{collection.items.toLocaleString()}</span>
                <span>items</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <UsersIcon className="size-3.5" />
                <span className="tabular-nums font-medium text-foreground">{collection.owners.toLocaleString()}</span>
                <span>owners</span>
              </div>
              <div className="text-muted-foreground">
                <span className="tabular-nums font-medium text-foreground">{collection.listed}</span>
                <span className="ml-1">listed</span>
              </div>
              <div className="text-muted-foreground">
                <span className="tabular-nums font-medium text-foreground">{collection.sales24h}</span>
                <span className="ml-1">sales (24h)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card style={{ boxShadow: shadow }}>
              <CardContent className="p-4">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{stat.label}</div>
                <div className="text-xl font-semibold tracking-tight tabular-nums mt-1">{stat.value}</div>
                {stat.change && (
                  <Badge variant="secondary" className="mt-1.5 tabular-nums text-[10px]">
                    {stat.trend === "up" ? <TrendingUpIcon className="size-3 mr-0.5" /> : <TrendingDownIcon className="size-3 mr-0.5" />}
                    {stat.change}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
