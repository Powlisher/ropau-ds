"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, CircleIcon, SignalIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const networks = [
  {
    id: "ethereum",
    name: "Ethereum",
    chainId: 1,
    symbol: "ETH",
    rpc: "mainnet",
    color: "#627EEA",
    blockTime: "~12s",
    gasPrice: "23 Gwei",
    status: "operational" as const,
  },
  {
    id: "polygon",
    name: "Polygon",
    chainId: 137,
    symbol: "MATIC",
    rpc: "polygon-rpc",
    color: "#8247E5",
    blockTime: "~2s",
    gasPrice: "34 Gwei",
    status: "operational" as const,
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    chainId: 42161,
    symbol: "ETH",
    rpc: "arb1",
    color: "#28A0F0",
    blockTime: "~0.26s",
    gasPrice: "0.1 Gwei",
    status: "operational" as const,
  },
  {
    id: "optimism",
    name: "Optimism",
    chainId: 10,
    symbol: "ETH",
    rpc: "optimism",
    color: "#FF0420",
    blockTime: "~2s",
    gasPrice: "0.05 Gwei",
    status: "degraded" as const,
  },
  {
    id: "base",
    name: "Base",
    chainId: 8453,
    symbol: "ETH",
    rpc: "base",
    color: "#0052FF",
    blockTime: "~2s",
    gasPrice: "0.02 Gwei",
    status: "operational" as const,
  },
]

const statusColors = {
  operational: "text-emerald-500",
  degraded: "text-amber-500",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3NetworkSwitcher() {
  const [selected, setSelected] = useState("ethereum")

  return (
    <motion.div
      className="mx-auto max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <SignalIcon className="size-4 text-foreground" />
              <CardTitle className="text-base font-semibold tracking-tight">Switch Network</CardTitle>
            </div>
            <CardDescription className="text-xs">Select a network for your transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5 pt-1">
            {networks.map((network, i) => {
              const isActive = selected === network.id
              return (
                <motion.button
                  key={network.id}
                  onClick={() => setSelected(network.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                    isActive
                      ? "bg-muted/80 ring-1 ring-border"
                      : "hover:bg-muted/40"
                  }`}
                  style={isActive ? { boxShadow: shadow } : undefined}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.04 * i }}
                  whileHover={{ x: 2 }}
                >
                  <div
                    className="flex size-8 items-center justify-center rounded-lg text-white text-[10px] font-bold"
                    style={{ backgroundColor: network.color }}
                  >
                    {network.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">{network.name}</span>
                      <CircleIcon className={`size-2 fill-current ${statusColors[network.status]}`} />
                    </div>
                    <div className="text-[11px] text-muted-foreground tabular-nums">
                      {network.blockTime} blocks / {network.gasPrice}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-[10px] tabular-nums font-mono">
                      {network.chainId}
                    </Badge>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                      >
                        <CheckIcon className="size-4 text-emerald-600" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}

            <div className="pt-2 text-center">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                + Add custom network
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
