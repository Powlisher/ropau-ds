"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TimerIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorExpired() {
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
              className="flex size-14 items-center justify-center rounded-full bg-orange-500/10 ring-4 ring-orange-500/5"
            >
              <TimerIcon className="size-6 text-orange-600" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                This link has expired
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                The link you followed is no longer valid. It may have been a one-time use link or exceeded its expiration window.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
              <Button>Request a New Link</Button>
              <Button variant="ghost" size="sm">
                Return to login
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
