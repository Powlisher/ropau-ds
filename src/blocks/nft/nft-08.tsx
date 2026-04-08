"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightLeftIcon, CheckIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const nftA = {
  name: "Chromatic Drift #247",
  collection: "Ethereal Forms",
  price: "2.45 ETH",
  rank: 342,
  gradient: "from-violet-500 via-fuchsia-400 to-rose-500",
  traits: [
    { name: "Background", value: "Deep Nebula", rarity: "3.2%" },
    { name: "Form", value: "Prismatic Helix", rarity: "8.7%" },
    { name: "Palette", value: "Violet Cascade", rarity: "5.1%" },
    { name: "Density", value: "Ultra Dense", rarity: "1.4%" },
    { name: "Motion", value: "Slow Drift", rarity: "12.3%" },
    { name: "Particle Count", value: "8,421", rarity: "2.8%" },
  ],
}

const nftB = {
  name: "Chromatic Drift #891",
  collection: "Ethereal Forms",
  price: "1.87 ETH",
  rank: 1204,
  gradient: "from-cyan-400 via-blue-500 to-indigo-600",
  traits: [
    { name: "Background", value: "Warm Void", rarity: "7.8%" },
    { name: "Form", value: "Lattice Grid", rarity: "14.2%" },
    { name: "Palette", value: "Ocean Dusk", rarity: "6.4%" },
    { name: "Density", value: "Medium", rarity: "22.1%" },
    { name: "Motion", value: "Rapid Pulse", rarity: "4.3%" },
    { name: "Particle Count", value: "3,218", rarity: "11.7%" },
  ],
}

function rarityScore(rarity: string) {
  return parseFloat(rarity)
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftComparison() {
  return (
    <motion.div
      className="mx-auto max-w-3xl space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Compare NFTs</h2>
        <Button variant="outline" size="sm">
          <ArrowRightLeftIcon className="size-3.5 mr-1.5" />
          Swap
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {[nftA, nftB].map((nft, idx) => (
          <motion.div key={nft.name} variants={itemVariants}>
            <Card className="overflow-hidden" style={{ boxShadow: shadow }}>
              <div className={`aspect-[4/3] bg-gradient-to-br ${nft.gradient} relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-black/30 backdrop-blur-sm text-white border-0 text-[10px] tabular-nums">
                    Rank #{nft.rank}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">{nft.collection}</div>
                <h3 className="font-semibold text-foreground tracking-tight mt-0.5">{nft.name}</h3>
                <div className="text-lg font-semibold tabular-nums tracking-tight mt-1">{nft.price}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Trait Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {nftA.traits.map((traitA, i) => {
                const traitB = nftB.traits[i]
                const aRarer = rarityScore(traitA.rarity) < rarityScore(traitB.rarity)
                const bRarer = rarityScore(traitB.rarity) < rarityScore(traitA.rarity)
                return (
                  <motion.div
                    key={traitA.name}
                    className="grid grid-cols-[1fr_auto_1fr] gap-4 px-5 py-3 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <div className={`text-right ${aRarer ? "" : "opacity-60"}`}>
                      <div className="text-sm font-medium text-foreground">{traitA.value}</div>
                      <div className="text-[10px] text-muted-foreground tabular-nums flex items-center justify-end gap-0.5">
                        {aRarer && <CheckIcon className="size-2.5 text-emerald-500" />}
                        {traitA.rarity}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                        {traitA.name}
                      </div>
                    </div>
                    <div className={`text-left ${bRarer ? "" : "opacity-60"}`}>
                      <div className="text-sm font-medium text-foreground">{traitB.value}</div>
                      <div className="text-[10px] text-muted-foreground tabular-nums flex items-center gap-0.5">
                        {bRarer && <CheckIcon className="size-2.5 text-emerald-500" />}
                        {traitB.rarity}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Rarity Score</div>
                <div className="text-2xl font-semibold tabular-nums tracking-tight mt-1">87.4</div>
                <Badge variant="secondary" className="text-[10px] mt-1">Top 8%</Badge>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Rarity Score</div>
                <div className="text-2xl font-semibold tabular-nums tracking-tight mt-1">62.1</div>
                <Badge variant="secondary" className="text-[10px] mt-1">Top 27%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
