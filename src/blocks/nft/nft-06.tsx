"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SparklesIcon, MinusIcon, PlusIcon, WalletIcon, InfoIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const mint = {
  collection: "Celestial Fragments",
  description: "2,222 unique fragments of a shattered celestial body. Holding 3+ fragments unlocks the Constellation reward.",
  price: "0.08",
  maxPerWallet: 5,
  totalSupply: 2222,
  minted: 1847,
  phase: "Public Sale",
  endsIn: "18h 42m",
}

const phases = [
  { name: "OG Holders", status: "complete" as const, price: "Free" },
  { name: "Allowlist", status: "complete" as const, price: "0.05 ETH" },
  { name: "Public Sale", status: "active" as const, price: "0.08 ETH" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NftMinting() {
  const [quantity, setQuantity] = useState(1)
  const mintedPct = Math.round((mint.minted / mint.totalSupply) * 100)
  const totalCost = (quantity * parseFloat(mint.price)).toFixed(2)

  return (
    <motion.div
      className="mx-auto max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden" style={{ boxShadow: shadowLg }}>
          <div className="aspect-[16/9] bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.2 }}
              className="text-center relative z-10"
            >
              <SparklesIcon className="size-12 text-white/80 mx-auto" />
              <div className="text-white/90 text-sm font-medium mt-2">{mint.collection}</div>
            </motion.div>
          </div>

          <CardContent className="p-5 space-y-5">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{mint.collection}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">{mint.description}</p>
            </div>

            <div className="flex items-center gap-2">
              {phases.map((phase) => (
                <div
                  key={phase.name}
                  className={`flex-1 rounded-lg p-2.5 text-center text-xs border transition-all ${
                    phase.status === "active"
                      ? "border-foreground/20 bg-muted/60 ring-1 ring-foreground/10"
                      : phase.status === "complete"
                        ? "border-border bg-muted/30 opacity-60"
                        : "border-border bg-card"
                  }`}
                >
                  <div className="font-medium text-foreground">{phase.name}</div>
                  <div className="text-muted-foreground tabular-nums mt-0.5">{phase.price}</div>
                  {phase.status === "active" && (
                    <Badge variant="secondary" className="text-[9px] mt-1">Active</Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Minted</span>
                <span className="font-medium tabular-nums">
                  {mint.minted.toLocaleString()} / {mint.totalSupply.toLocaleString()}
                </span>
              </div>
              <Progress value={mintedPct} className="h-2" />
              <div className="text-xs text-muted-foreground tabular-nums text-right">{mintedPct}%</div>
            </div>

            <div className="rounded-xl bg-muted/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <span className="text-xs text-muted-foreground">Max {mint.maxPerWallet} per wallet</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="size-10 p-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="size-4" />
                </Button>
                <span className="text-3xl font-semibold tabular-nums tracking-tight w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="size-10 p-0"
                  onClick={() => setQuantity(Math.min(mint.maxPerWallet, quantity + 1))}
                  disabled={quantity >= mint.maxPerWallet}
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-semibold tabular-nums tracking-tight">{totalCost} ETH</span>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <WalletIcon className="size-4 mr-2" />
              Mint Now
            </Button>

            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <InfoIcon className="size-3" />
              <span>Ends in {mint.endsIn}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
