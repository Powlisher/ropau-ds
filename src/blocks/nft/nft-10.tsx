"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiamondIcon, SparklesIcon, StarIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const rarityTiers = {
  legendary: { label: "Legendary", color: "bg-amber-50 text-amber-700 border-amber-200", icon: DiamondIcon },
  epic: { label: "Epic", color: "bg-violet-50 text-violet-700 border-violet-200", icon: SparklesIcon },
  rare: { label: "Rare", color: "bg-blue-50 text-blue-700 border-blue-200", icon: StarIcon },
  common: { label: "Common", color: "bg-slate-50 text-slate-600 border-slate-200", icon: null },
}

type Rarity = keyof typeof rarityTiers

const nfts: { name: string; id: string; price: string; rank: number; rarity: Rarity; gradient: string; score: number }[] = [
  { name: "Prismatic Helix", id: "#247", price: "2.45 ETH", rank: 12, rarity: "legendary", gradient: "from-amber-400 via-yellow-300 to-orange-500", score: 97.2 },
  { name: "Void Walker", id: "#88", price: "1.92 ETH", rank: 34, rarity: "legendary", gradient: "from-violet-600 via-purple-500 to-fuchsia-600", score: 94.8 },
  { name: "Crystal Lattice", id: "#412", price: "1.67 ETH", rank: 89, rarity: "epic", gradient: "from-cyan-500 via-blue-400 to-indigo-500", score: 88.1 },
  { name: "Nebula Drift", id: "#1204", price: "1.12 ETH", rank: 156, rarity: "epic", gradient: "from-pink-500 via-rose-400 to-red-500", score: 82.4 },
  { name: "Quantum Fold", id: "#891", price: "0.87 ETH", rank: 423, rarity: "rare", gradient: "from-emerald-500 via-teal-400 to-cyan-500", score: 71.3 },
  { name: "Static Field", id: "#2103", price: "0.82 ETH", rank: 612, rarity: "rare", gradient: "from-slate-500 via-gray-400 to-zinc-500", score: 64.7 },
  { name: "Soft Echo", id: "#3341", price: "0.78 ETH", rank: 1847, rarity: "common", gradient: "from-stone-400 via-warmGray-300 to-gray-400", score: 42.1 },
  { name: "Dim Resonance", id: "#4012", price: "0.74 ETH", rank: 2891, rarity: "common", gradient: "from-neutral-400 via-stone-300 to-zinc-400", score: 28.9 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftCollectionRarity() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Ethereal Forms</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            <span className="tabular-nums">4,444</span> items sorted by rarity
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(Object.entries(rarityTiers) as [Rarity, typeof rarityTiers[Rarity]][]).map(([key, tier]) => (
            <Badge key={key} variant="outline" className={`text-[10px] ${tier.color}`}>
              {tier.label}
            </Badge>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {nfts.map((nft) => {
          const tier = rarityTiers[nft.rarity]
          const Icon = tier.icon
          return (
            <motion.div
              key={nft.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card
                className={`overflow-hidden ${
                  nft.rarity === "legendary" ? "ring-2 ring-amber-200" : nft.rarity === "epic" ? "ring-1 ring-violet-200" : ""
                }`}
                style={{ boxShadow: nft.rarity === "legendary"
                  ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"
                  : shadow
                }}
              >
                <div className={`aspect-square bg-gradient-to-br ${nft.gradient} relative`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 backdrop-blur-sm ${tier.color}`}>
                      {Icon && <Icon className="size-2.5 mr-0.5" />}
                      {tier.label}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/25 backdrop-blur-sm text-white border-0 text-[10px] tabular-nums">
                      #{nft.rank}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold text-foreground tracking-tight truncate">
                    {nft.name} {nft.id}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold tabular-nums tracking-tight">{nft.price}</span>
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-10 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            nft.rarity === "legendary" ? "bg-amber-500" :
                            nft.rarity === "epic" ? "bg-violet-500" :
                            nft.rarity === "rare" ? "bg-blue-500" : "bg-slate-400"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${nft.score}%` }}
                          transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-[10px] tabular-nums text-muted-foreground">{nft.score}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline">Load More</Button>
      </motion.div>
    </div>
  )
}
