"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { WrenchIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorMaintenance() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

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
              className="flex size-14 items-center justify-center rounded-full bg-blue-500/10 ring-4 ring-blue-500/5"
            >
              <motion.div
                animate={{ rotate: [0, -15, 15, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <WrenchIcon className="size-6 text-blue-600" />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Scheduled Maintenance
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;re performing upgrades to improve performance. Expected completion:
              </p>
              <p className="mt-1 text-sm font-medium tabular-nums text-foreground">
                April 8, 2026 at 14:30 UTC
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full max-w-xs">
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                  className="rounded-lg bg-primary/5 px-4 py-3 text-sm font-medium text-primary ring-1 ring-primary/10"
                >
                  You&apos;ll be notified when we&apos;re back
                </motion.p>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => email.includes("@") && setSubscribed(true)}>
                    Notify Me
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
