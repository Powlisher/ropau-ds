"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SparklesIcon, GiftIcon, StarIcon, ArrowRightIcon } from "lucide-react"

const rewards = [
  { name: "Extra PTO Day", cost: 5000, icon: StarIcon },
  { name: "Team Lunch Budget", cost: 3000, icon: GiftIcon },
  { name: "Conference Pass", cost: 8000, icon: SparklesIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards04() {
  const currentPoints = 6420
  const levelThreshold = 10000
  const level = 7
  const progress = (currentPoints / levelThreshold) * 100

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card
            className="overflow-hidden"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="py-10">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Level {level}</Badge>
                    <span className="text-xs text-muted-foreground">Innovator</span>
                  </div>
                  <div>
                    <div className="font-mono text-4xl font-bold tabular-nums tracking-tight text-foreground lg:text-5xl">
                      {currentPoints.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Total Points
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Level {level}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">
                      {currentPoints.toLocaleString()} / {levelThreshold.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">Level {level + 1}</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(levelThreshold - currentPoints).toLocaleString()} points to next level
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div className="text-center">
                  <div className="font-mono text-xl font-bold tabular-nums tracking-tight">23</div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Badges Earned
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xl font-bold tabular-nums tracking-tight">142</div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Day Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xl font-bold tabular-nums tracking-tight">#4</div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Global Rank
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Available Rewards
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {rewards.map((reward) => {
              const Icon = reward.icon
              const canAfford = currentPoints >= reward.cost
              return (
                <motion.div key={reward.name} whileHover={{ y: -2 }} transition={spring}>
                  <Card
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                    }}
                  >
                    <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold tracking-tight text-foreground">{reward.name}</h4>
                        <p className="mt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                          {reward.cost.toLocaleString()} pts
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={canAfford ? "default" : "outline"}
                        disabled={!canAfford}
                        className="gap-1.5"
                      >
                        {canAfford ? "Redeem" : "Locked"}
                        {canAfford && <ArrowRightIcon className="size-3" />}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
