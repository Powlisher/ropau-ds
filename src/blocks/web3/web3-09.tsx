"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LockIcon, UnlockIcon, TrendingUpIcon, CoinsIcon, ClockIcon, ShieldCheckIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const pools = [
  {
    name: "ETH Staking",
    apy: "4.8%",
    staked: "12.45 ETH",
    stakedUsd: "$40,723.45",
    rewards: "0.0847 ETH",
    rewardsUsd: "$277.01",
    lockPeriod: "None",
    color: "#627EEA",
    tvl: "$2.1B",
  },
  {
    name: "USDC Vault",
    apy: "7.2%",
    staked: "8,500 USDC",
    stakedUsd: "$8,500.00",
    rewards: "47.32 USDC",
    rewardsUsd: "$47.32",
    lockPeriod: "30 days",
    color: "#2775CA",
    tvl: "$840M",
  },
  {
    name: "ARB-ETH LP",
    apy: "18.4%",
    staked: "2,340 LP",
    stakedUsd: "$6,182.50",
    rewards: "142.8 ARB",
    rewardsUsd: "$36.52",
    lockPeriod: "7 days",
    color: "#28A0F0",
    tvl: "$156M",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3StakingDashboard() {
  const totalStaked = "$55,405.95"
  const totalRewards = "$360.85"

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div variants={itemVariants}>
          <Card style={{ boxShadow: shadow }}>
            <CardContent className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Total Staked</div>
              <div className="text-2xl font-semibold tracking-tight tabular-nums mt-1">{totalStaked}</div>
              <Badge variant="secondary" className="mt-1.5 tabular-nums">
                <TrendingUpIcon className="size-3 mr-1" />
                +2.4%
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card style={{ boxShadow: shadow }}>
            <CardContent className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pending Rewards</div>
              <div className="text-2xl font-semibold tracking-tight tabular-nums mt-1">{totalRewards}</div>
              <Button size="sm" variant="outline" className="mt-1.5 h-6 text-xs">
                <CoinsIcon className="size-3 mr-1" />
                Claim All
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card style={{ boxShadow: shadow }}>
            <CardContent className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Avg APY</div>
              <div className="text-2xl font-semibold tracking-tight tabular-nums mt-1">8.7%</div>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                <ShieldCheckIcon className="size-3" />
                <span>Audited protocols</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {pools.map((pool, i) => (
        <motion.div key={pool.name} variants={itemVariants}>
          <Card style={{ boxShadow: shadow }}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className="flex size-11 items-center justify-center rounded-xl text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: pool.color }}
                >
                  {pool.name.split(" ")[0].slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{pool.name}</h3>
                      <div className="flex items-center gap-3 mt-0.5">
                        <Badge variant="secondary" className="text-emerald-700 bg-emerald-50 border-emerald-200 tabular-nums">
                          {pool.apy} APY
                        </Badge>
                        <span className="text-xs text-muted-foreground tabular-nums">TVL {pool.tvl}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold tabular-nums tracking-tight">{pool.stakedUsd}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{pool.staked}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">Rewards</div>
                      <div className="text-sm font-medium tabular-nums mt-0.5">{pool.rewards}</div>
                      <div className="text-[11px] text-muted-foreground tabular-nums">{pool.rewardsUsd}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">Lock Period</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {pool.lockPeriod === "None"
                          ? <UnlockIcon className="size-3.5 text-emerald-600" />
                          : <LockIcon className="size-3.5 text-amber-600" />
                        }
                        <span className="text-sm font-medium">{pool.lockPeriod}</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <ClockIcon className="size-3 mr-1" />
                        Unstake
                      </Button>
                      <Button size="sm">
                        Stake More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
