"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2Icon, UndoIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessDelete() {
  return (
    <div className="flex min-h-[480px] items-center justify-center bg-muted/40 p-6 md:p-12">
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
              className="flex size-14 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/5"
            >
              <Trash2Icon className="size-6 text-destructive" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Account scheduled for deletion
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Your account and all associated data will be permanently removed in{" "}
                <span className="font-medium tabular-nums text-foreground">30 days</span>.
                You can still undo this action during the grace period.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-lg bg-amber-500/5 p-4 ring-1 ring-amber-500/15 text-left w-full">
              <p className="text-sm font-medium text-foreground">What happens next</p>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                <li>Your profile is hidden immediately</li>
                <li>Workspace ownership transfers to the next admin</li>
                <li>Data export is available for 7 days</li>
                <li>Permanent deletion on <span className="tabular-nums">May 8, 2026</span></li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button variant="outline" className="gap-1.5">
                <UndoIcon data-icon="inline-start" className="size-4" />
                Undo Deletion
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
