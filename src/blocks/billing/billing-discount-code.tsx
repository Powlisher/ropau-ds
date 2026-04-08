"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { TagIcon, XIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

export default function BillingDiscountCode() {
  const [code, setCode] = useState("")
  const hasActiveDiscount = true

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Discount Code</CardTitle>
            <CardDescription>
              Apply a promo or referral code to your subscription.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 uppercase tracking-wider"
            />
            <Button variant="outline" disabled={!code}>
              Apply
            </Button>
          </motion.div>

          {hasActiveDiscount && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between rounded-xl bg-emerald-50/80 px-4 py-3.5 ring-1 ring-emerald-200/50 dark:bg-emerald-950/20 dark:ring-emerald-800/30"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                  <TagIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      EARLYBIRD2026
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      -20%
                    </Badge>
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    Expires Jun 30, 2026 — saves $5.80/mo
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-destructive">
                <XIcon className="size-3" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </motion.div>
    </Card>
  )
}
