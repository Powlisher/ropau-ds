"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon, ArrowDownLeftIcon, ExternalLinkIcon, FilterIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const transactions = [
  {
    hash: "0x8f4e...3a2b",
    fullHash: "0x8f4e7c91d2a3b5e6f1c8d9a0b3e4f5a6b7c8d9e03a2b",
    type: "send" as const,
    status: "confirmed" as const,
    amount: "-2.145 ETH",
    value: "$7,012.35",
    to: "0x1a2b...9f3e",
    timestamp: "12 min ago",
    gas: "0.0034 ETH",
    block: 19284731,
  },
  {
    hash: "0xb2c1...7d4f",
    fullHash: "0xb2c1e3a4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b07d4f",
    type: "receive" as const,
    status: "confirmed" as const,
    amount: "+850 USDC",
    value: "$850.00",
    to: "0x4c5d...2e1a",
    timestamp: "1h ago",
    gas: "0.0021 ETH",
    block: 19284698,
  },
  {
    hash: "0xd3f5...1c8a",
    fullHash: "0xd3f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f31c8a",
    type: "send" as const,
    status: "pending" as const,
    amount: "-0.5 ETH",
    value: "$1,635.50",
    to: "0x7e8f...5b3c",
    timestamp: "2h ago",
    gas: "0.0028 ETH",
    block: null,
  },
  {
    hash: "0xa1b2...4e6d",
    fullHash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b04e6d",
    type: "receive" as const,
    status: "confirmed" as const,
    amount: "+3,200 ARB",
    value: "$818.40",
    to: "0x9a0b...6d2e",
    timestamp: "5h ago",
    gas: "0.0008 ETH",
    block: 19284412,
  },
  {
    hash: "0xf7e8...2a9c",
    fullHash: "0xf7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e62a9c",
    type: "send" as const,
    status: "failed" as const,
    amount: "-15.7 LINK",
    value: "$224.51",
    to: "0x3b4c...8f1a",
    timestamp: "8h ago",
    gas: "0.0045 ETH",
    block: 19284201,
  },
]

const statusConfig = {
  confirmed: { label: "Confirmed", variant: "secondary" as const, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  pending: { label: "Pending", variant: "secondary" as const, className: "bg-amber-50 text-amber-700 border-amber-200" },
  failed: { label: "Failed", variant: "secondary" as const, className: "bg-red-50 text-red-700 border-red-200" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3TransactionHistory() {
  return (
    <motion.div
      className="mx-auto max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight">Transactions</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5 tabular-nums">5 transactions this week</p>
            </div>
            <Button variant="outline" size="sm">
              <FilterIcon className="size-3.5 mr-1.5" />
              Filter
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.hash}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.05 * i }}
                >
                  <div className={`flex size-9 items-center justify-center rounded-full ${tx.type === "send" ? "bg-orange-50" : "bg-emerald-50"}`}>
                    {tx.type === "send"
                      ? <ArrowUpRightIcon className="size-4 text-orange-600" />
                      : <ArrowDownLeftIcon className="size-4 text-emerald-600" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground capitalize">{tx.type}</span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusConfig[tx.status].className}`}>
                        {statusConfig[tx.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <code className="text-xs text-muted-foreground font-mono">{tx.hash}</code>
                      <ExternalLinkIcon className="size-3 text-muted-foreground/60" />
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`text-sm font-medium tabular-nums ${tx.type === "send" ? "text-foreground" : "text-emerald-600"}`}>
                      {tx.amount}
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">{tx.value}</div>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
                    <div className="text-[10px] text-muted-foreground/60 tabular-nums font-mono mt-0.5">
                      {tx.block ? `#${tx.block.toLocaleString()}` : "Pending..."}
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
