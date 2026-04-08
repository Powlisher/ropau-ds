"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, GridIcon, LayoutListIcon, SlidersHorizontalIcon, HeartIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const filters = ["All", "Art", "Photography", "Music", "Collectibles", "Gaming"]

const nfts = [
  { name: "Aether Wave #31", collection: "Ethereal Forms", price: "3.21 ETH", category: "Art", gradient: "from-purple-500 via-pink-400 to-red-400", likes: 218 },
  { name: "Pixelated Dawn #7", collection: "Bit Horizons", price: "0.45 ETH", category: "Art", gradient: "from-orange-400 via-amber-300 to-yellow-500", likes: 87 },
  { name: "Coastal Memory", collection: "Lens Studies", price: "0.92 ETH", category: "Photography", gradient: "from-sky-400 via-blue-500 to-indigo-500", likes: 156 },
  { name: "Synth Loop #442", collection: "Audio Artifacts", price: "0.31 ETH", category: "Music", gradient: "from-emerald-500 via-teal-400 to-cyan-500", likes: 63 },
  { name: "Rare Helm of Ages", collection: "Loot Realm", price: "1.74 ETH", category: "Gaming", gradient: "from-rose-500 via-red-400 to-orange-400", likes: 341 },
  { name: "Prism Shift #1089", collection: "Color Theory", price: "0.67 ETH", category: "Art", gradient: "from-violet-500 via-purple-400 to-fuchsia-500", likes: 94 },
  { name: "Urban Fade #22", collection: "Lens Studies", price: "1.15 ETH", category: "Photography", gradient: "from-zinc-500 via-slate-400 to-gray-500", likes: 112 },
  { name: "Genesis Shard #3", collection: "Origin Tales", price: "5.80 ETH", category: "Collectibles", gradient: "from-yellow-400 via-amber-500 to-orange-600", likes: 527 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftGallery() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filtered = activeFilter === "All" ? nfts : nfts.filter((n) => n.category === activeFilter)

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Explore</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            <span className="tabular-nums">{filtered.length}</span> items found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search collections..." className="pl-9 w-48" />
          </div>
          <Button variant="outline" size="sm" className="size-9 p-0">
            <SlidersHorizontalIcon className="size-3.5" />
          </Button>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button className="p-2 bg-muted"><GridIcon className="size-3.5 text-foreground" /></button>
            <button className="p-2 hover:bg-muted/50"><LayoutListIcon className="size-3.5 text-muted-foreground" /></button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 overflow-x-auto pb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeFilter === filter
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeFilter}
      >
        {filtered.map((nft) => (
          <motion.div
            key={nft.name}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Card className="overflow-hidden" style={{ boxShadow: shadow }}>
              <div className={`aspect-square bg-gradient-to-br ${nft.gradient} relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
                <div className="absolute top-2 right-2">
                  <button className="flex items-center gap-1 rounded-full bg-black/25 backdrop-blur-sm px-2 py-0.5 text-white text-[10px]">
                    <HeartIcon className="size-2.5" />
                    <span className="tabular-nums">{nft.likes}</span>
                  </button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">{nft.collection}</div>
                <h3 className="text-sm font-semibold text-foreground tracking-tight mt-0.5 truncate">{nft.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold tabular-nums tracking-tight">{nft.price}</span>
                  <Badge variant="secondary" className="text-[10px]">{nft.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
