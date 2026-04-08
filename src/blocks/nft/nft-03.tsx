"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HeartIcon, ShareIcon, ExternalLinkIcon, ShoppingCartIcon, TagIcon, RefreshCwIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const nft = {
  name: "Chromatic Drift #247",
  collection: "Ethereal Forms",
  description: "A generative exploration of light refraction through crystalline structures. Each piece is algorithmically unique, derived from a seed that maps harmonic frequencies to color gradients.",
  price: "2.45 ETH",
  priceUsd: "$8,013.95",
  owner: "pulse.eth",
  creator: "aether.eth",
  tokenId: "#247",
  contract: "0x6B17...1d0F",
  standard: "ERC-721",
  chain: "Ethereum",
  royalty: "7.5%",
  likes: 342,
  views: 2847,
}

const traits = [
  { name: "Background", value: "Deep Nebula", rarity: "3.2%" },
  { name: "Form", value: "Prismatic Helix", rarity: "8.7%" },
  { name: "Palette", value: "Violet Cascade", rarity: "5.1%" },
  { name: "Density", value: "Ultra Dense", rarity: "1.4%" },
  { name: "Motion", value: "Slow Drift", rarity: "12.3%" },
  { name: "Particle Count", value: "8,421", rarity: "2.8%" },
]

const history = [
  { event: "Listed", from: "pulse.eth", price: "2.45 ETH", time: "2h ago" },
  { event: "Transfer", from: "orbit.eth", to: "pulse.eth", price: "--", time: "3d ago" },
  { event: "Sale", from: "nova.eth", to: "orbit.eth", price: "1.80 ETH", time: "12d ago" },
  { event: "Minted", from: "aether.eth", price: "0.08 ETH", time: "47d ago" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftDetail() {
  return (
    <motion.div
      className="mx-auto max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="overflow-hidden sticky top-6" style={{ boxShadow: shadowLg }}>
            <div className="aspect-square bg-gradient-to-br from-violet-500 via-fuchsia-400 to-rose-500 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1),transparent_50%)]" />
            </div>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <HeartIcon className="size-3.5" />
                    <span className="tabular-nums">{nft.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ShareIcon className="size-3.5" />
                    Share
                  </button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <RefreshCwIcon className="size-3.5" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="lg:col-span-3 space-y-4">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{nft.collection}</span>
              <Badge variant="secondary" className="text-[10px]">Verified</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mt-1">{nft.name}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">{nft.description}</p>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="size-5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
                <span className="text-sm text-muted-foreground">Owned by <span className="font-medium text-foreground">{nft.owner}</span></span>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">{nft.views.toLocaleString()} views</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card style={{ boxShadow: shadow }}>
              <CardContent className="p-5">
                <div className="text-xs text-muted-foreground">Current Price</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">{nft.price}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">{nft.priceUsd}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button className="flex-1" size="lg">
                    <ShoppingCartIcon className="size-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" size="lg">
                    <TagIcon className="size-4 mr-2" />
                    Make Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card style={{ boxShadow: shadow }}>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Traits</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {traits.map((trait) => (
                    <div
                      key={trait.name}
                      className="rounded-lg bg-muted/50 p-2.5 text-center"
                    >
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{trait.name}</div>
                      <div className="text-sm font-medium text-foreground mt-0.5">{trait.value}</div>
                      <div className="text-[10px] text-muted-foreground tabular-nums mt-0.5">{trait.rarity} have this</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card style={{ boxShadow: shadow }}>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Activity</h3>
                <div className="space-y-3">
                  {history.map((event, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{event.event}</Badge>
                        <span className="text-muted-foreground">
                          {event.from}
                          {event.to && <span> → {event.to}</span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium tabular-nums">{event.price}</span>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card style={{ boxShadow: shadow }}>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Details</h3>
                <div className="space-y-2">
                  {[
                    ["Contract", nft.contract],
                    ["Token ID", nft.tokenId],
                    ["Standard", nft.standard],
                    ["Chain", nft.chain],
                    ["Creator", nft.creator],
                    ["Royalty", nft.royalty],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium font-mono text-xs flex items-center gap-1">
                        {value}
                        {label === "Contract" && <ExternalLinkIcon className="size-3 text-muted-foreground" />}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
