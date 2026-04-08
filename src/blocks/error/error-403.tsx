"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LockIcon, HomeIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Error403() {
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
              <LockIcon className="size-6 text-amber-600" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Access denied
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                You don&apos;t have permission to view this resource. Contact your workspace admin to request access.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-2">
              <Button variant="outline" className="gap-1.5">
                <HomeIcon data-icon="inline-start" className="size-4" />
                Go Home
              </Button>
              <Button>Request Access</Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
