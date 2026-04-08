"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServerCrashIcon, RefreshCwIcon, HomeIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Error500() {
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
              className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 ring-4 ring-destructive/5"
            >
              <ServerCrashIcon className="size-7 text-destructive" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="font-heading text-4xl font-bold tracking-tight text-foreground/15 tabular-nums">500</p>
              <h1 className="mt-1 font-heading text-xl font-semibold tracking-tight text-foreground">
                Something went wrong
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Our server encountered an unexpected error. The team has been notified and is investigating.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-2">
              <Button variant="outline" className="gap-1.5">
                <RefreshCwIcon data-icon="inline-start" className="size-4" />
                Retry
              </Button>
              <Button className="gap-1.5">
                <HomeIcon data-icon="inline-start" className="size-4" />
                Home
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
