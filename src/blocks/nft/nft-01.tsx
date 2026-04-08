"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HeartIcon, ShoppingCartIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const nfts = [
  {
    name: "Chromatic Drift #247",
    collection: "Ethereal Forms",
    price: "2.45 ETH",
    priceUsd: "$8,013.95",
    lastSale: "1.8 ETH",
    likes: 342,
    gradient: "from-violet-500 via-fuchsia-400 to-rose-500",
    owner: "pulse.eth",
  },
  {
    name: "Neon Fracture #89",
    collection: "Digital Ruins",
    price: "0.78 ETH",
    priceUsd: "$2,551.38",
    lastSale: "0.52 ETH",
    likes: 128,
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    owner: "orbit.eth",
  },
  {
    name: "Silent Bloom #1204",
    collection: "Nature Coded",
    price: "1.12 ETH",
    priceUsd: "$3,663.52",
    lastSale: "0.94 ETH",
    likes: 89,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    owner: "fern.eth",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftCard() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {nfts.map((nft) => (
        <motion.div
          key={nft.name}
          variants={itemVariants}
          whileHover={{ y: -4 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        >
          <Card className="overflow-hidden" style={{ boxShadow: shadow }}>
            <div className={`aspect-square bg-gradient-to-br ${nft.gradient} relative`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute top-3 right-3">
                <button className="flex items-center gap-1 rounded-full bg-black/30 backdrop-blur-sm px-2.5 py-1 text-white text-xs">
                  <HeartIcon className="size-3" />
                  <span className="tabular-nums">{nft.likes}</span>
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-black/30 backdrop-blur-sm text-white border-0 text-[10px]">
                  {nft.collection}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground tracking-tight">{nft.name}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="size-4 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="text-xs text-muted-foreground">{nft.owner}</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Price</div>
                  <div className="text-lg font-semibold tracking-tight tabular-nums">{nft.price}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{nft.priceUsd}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Last Sale</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{nft.lastSale}</div>
                </div>
              </div>
              <Button className="w-full" size="sm">
                <ShoppingCartIcon className="size-3.5 mr-1.5" />
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
