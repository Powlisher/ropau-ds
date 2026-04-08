"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClockIcon, ZapIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorRateLimit() {
  const [countdown, setCountdown] = useState(47)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-14 items-center justify-center rounded-full bg-amber-500/10 ring-4 ring-amber-500/5"
            >
              <ClockIcon className="size-6 text-amber-600" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Too many requests
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                You&apos;ve hit the rate limit for this endpoint. Please wait before trying again.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              {countdown > 0 ? (
                <div className="rounded-lg bg-muted/60 px-6 py-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Retry in</p>
                  <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">
                    {countdown}s
                  </p>
                </div>
              ) : (
                <Button>Retry Now</Button>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="w-full max-w-xs">
              <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-3">
                <div className="flex items-center gap-2">
                  <ZapIcon className="size-4 text-primary" />
                  <p className="text-sm font-medium text-foreground">Need higher limits?</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upgrade to Pro for 10x the API quota and priority support.
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Plans
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
