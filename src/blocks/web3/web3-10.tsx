"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShieldIcon, UsersIcon, CheckCircle2Icon, ClockIcon, CopyIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const signers = [
  { name: "alice.eth", address: "0xA1b2...C3d4", signed: true, avatar: "from-violet-400 to-fuchsia-500" },
  { name: "bob.eth", address: "0xB2c3...D4e5", signed: true, avatar: "from-blue-400 to-cyan-500" },
  { name: "carol.eth", address: "0xC3d4...E5f6", signed: false, avatar: "from-emerald-400 to-teal-500" },
  { name: "dave.eth", address: "0xD4e5...F6a7", signed: false, avatar: "from-amber-400 to-orange-500" },
  { name: "eve.eth", address: "0xE5f6...A7b8", signed: false, avatar: "from-rose-400 to-pink-500" },
]

const pendingTxs = [
  { id: "TX-0x8a2f", description: "Transfer 5.2 ETH to treasury", value: "$17,009.20", confirmations: 2, required: 3, created: "14 min ago" },
  { id: "TX-0xb3c1", description: "Approve USDC spending on Aave", value: "Unlimited", confirmations: 1, required: 3, created: "2h ago" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3MultiSig() {
  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100">
                  <ShieldIcon className="size-5 text-slate-700" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight">Protocol Treasury</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <code className="text-[11px] font-mono">0x7F2c...9E1a</code>
                    <button className="hover:text-foreground transition-colors">
                      <CopyIcon className="size-3" />
                    </button>
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold tracking-tight tabular-nums">$142,871.33</div>
                <div className="text-xs text-muted-foreground">Total balance</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Threshold</span>
              </div>
              <Badge variant="secondary" className="text-sm tabular-nums font-semibold">
                3 of 5
              </Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Signers</h4>
              <div className="space-y-2">
                {signers.map((signer, i) => (
                  <motion.div
                    key={signer.name}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.04 * i }}
                  >
                    <div className={`size-7 rounded-full bg-gradient-to-br ${signer.avatar}`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">{signer.name}</span>
                      <code className="text-[11px] text-muted-foreground font-mono ml-2">{signer.address}</code>
                    </div>
                    {signer.signed ? (
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                        <CheckCircle2Icon className="size-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">Signer</Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold tracking-tight">Pending Transactions</CardTitle>
              <Badge variant="secondary" className="tabular-nums">{pendingTxs.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {pendingTxs.map((tx) => (
              <div
                key={tx.id}
                className="rounded-xl border border-border p-4 space-y-3"
                style={{ boxShadow: shadow }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-muted-foreground">{tx.id}</code>
                      <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-700 border-amber-200">
                        <ClockIcon className="size-3 mr-0.5" />
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">{tx.description}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums shrink-0">{tx.value}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Confirmations</span>
                    <span className="font-medium tabular-nums">{tx.confirmations}/{tx.required}</span>
                  </div>
                  <Progress value={(tx.confirmations / tx.required) * 100} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">{tx.created}</span>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 text-xs">
                      Reject
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      <CheckCircle2Icon className="size-3 mr-1" />
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
