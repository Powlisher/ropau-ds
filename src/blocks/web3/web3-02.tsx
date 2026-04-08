"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, TrendingDownIcon, EyeIcon, EyeOffIcon, SendIcon, ArrowDownIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: "4.2381", value: "$13,847.22", change: "+3.7%", trend: "up" as const, color: "#627EEA", allocation: 52 },
  { symbol: "USDC", name: "USD Coin", balance: "6,240.00", value: "$6,240.00", change: "+0.01%", trend: "up" as const, color: "#2775CA", allocation: 23 },
  { symbol: "ARB", name: "Arbitrum", balance: "12,450", value: "$3,182.72", change: "-2.1%", trend: "down" as const, color: "#28A0F0", allocation: 12 },
  { symbol: "LINK", name: "Chainlink", balance: "187.5", value: "$2,681.25", change: "+8.4%", trend: "up" as const, color: "#2A5ADA", allocation: 10 },
  { symbol: "UNI", name: "Uniswap", balance: "94.3", value: "$821.06", change: "-0.9%", trend: "down" as const, color: "#FF007A", allocation: 3 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3TokenBalance() {
  const [visible, setVisible] = useState(true)

  return (
    <motion.div
      className="mx-auto max-w-lg space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardDescription className="text-xs uppercase tracking-wide font-medium">Total Portfolio</CardDescription>
                <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums mt-1">
                  {visible ? "$26,772.25" : "********"}
                </CardTitle>
              </div>
              <button onClick={() => setVisible(!visible)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                {visible ? <EyeIcon className="size-4 text-muted-foreground" /> : <EyeOffIcon className="size-4 text-muted-foreground" />}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="tabular-nums">
                <TrendingUpIcon className="size-3 mr-1" />
                +$842.19 (3.2%)
              </Badge>
              <span className="text-xs text-muted-foreground">24h</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mb-6">
              {tokens.map((token) => (
                <motion.div
                  key={token.symbol}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ backgroundColor: token.color, width: `${token.allocation}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.3 }}
                />
              ))}
            </div>

            <div className="flex gap-2 mb-5">
              <Button size="sm" className="flex-1">
                <SendIcon className="size-3.5 mr-1.5" />
                Send
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <ArrowDownIcon className="size-3.5 mr-1.5" />
                Receive
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {tokens.map((token, i) => (
                <motion.div
                  key={token.symbol}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 * i }}
                >
                  <div
                    className="flex size-9 items-center justify-center rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: token.color }}
                  >
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground">{token.name}</div>
                    <div className="text-xs text-muted-foreground tabular-nums">{visible ? `${token.balance} ${token.symbol}` : "***"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium tabular-nums text-foreground">{visible ? token.value : "***"}</div>
                    <div className={`text-xs tabular-nums flex items-center justify-end gap-0.5 ${token.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                      {token.trend === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                      {token.change}
                    </div>
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
