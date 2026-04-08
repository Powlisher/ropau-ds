"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownIcon, SettingsIcon, RefreshCwIcon, InfoIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const tokens = {
  ETH: { symbol: "ETH", name: "Ethereum", balance: "4.2381", price: 3271, color: "#627EEA" },
  USDC: { symbol: "USDC", name: "USD Coin", balance: "6,240.00", price: 1, color: "#2775CA" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3TokenSwap() {
  const [fromAmount, setFromAmount] = useState("1.5")
  const estimatedOut = (parseFloat(fromAmount || "0") * 3271).toFixed(2)

  return (
    <motion.div
      className="mx-auto max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold tracking-tight">Swap</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <RefreshCwIcon className="size-3.5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <SettingsIcon className="size-3.5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-xl bg-muted/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">You pay</span>
                <span className="text-xs text-muted-foreground tabular-nums">Balance: {tokens.ETH.balance}</span>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="border-0 bg-transparent text-2xl font-semibold tabular-nums tracking-tight p-0 h-auto focus-visible:ring-0 flex-1"
                  placeholder="0"
                />
                <div className="flex items-center gap-2 shrink-0 rounded-full bg-card border border-border px-3 py-1.5">
                  <div className="size-5 rounded-full" style={{ backgroundColor: tokens.ETH.color }} />
                  <span className="text-sm font-semibold">{tokens.ETH.symbol}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                ~${(parseFloat(fromAmount || "0") * tokens.ETH.price).toLocaleString()}
              </div>
            </div>

            <div className="flex justify-center -my-1 relative z-10">
              <motion.button
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-card"
                whileHover={{ rotate: 180 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                <ArrowDownIcon className="size-4 text-muted-foreground" />
              </motion.button>
            </div>

            <div className="rounded-xl bg-muted/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">You receive</span>
                <span className="text-xs text-muted-foreground tabular-nums">Balance: {tokens.USDC.balance}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-semibold tabular-nums tracking-tight flex-1 text-foreground">
                  {parseFloat(fromAmount || "0") > 0 ? Number(estimatedOut).toLocaleString() : "0"}
                </div>
                <div className="flex items-center gap-2 shrink-0 rounded-full bg-card border border-border px-3 py-1.5">
                  <div className="size-5 rounded-full" style={{ backgroundColor: tokens.USDC.color }} />
                  <span className="text-sm font-semibold">{tokens.USDC.symbol}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                ~${Number(estimatedOut).toLocaleString()}
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  Rate <InfoIcon className="size-3" />
                </span>
                <span className="tabular-nums font-medium">1 ETH = 3,271 USDC</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Price Impact</span>
                <span className="tabular-nums text-emerald-600 font-medium">&lt;0.01%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Slippage</span>
                <Badge variant="secondary" className="text-[10px] tabular-nums">0.5%</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="tabular-nums font-medium">~$2.84</span>
              </div>
            </div>

            <Button className="w-full mt-3" size="lg">
              Swap
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
