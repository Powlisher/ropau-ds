"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BellOff, Settings } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState05() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-sm flex-col items-center py-16 text-center"
    >
      <motion.div variants={itemVariants} className="relative mb-6">
        <motion.div
          animate={{ rotate: [0, -6, 6, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          className="flex size-14 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.95 0.01 220) 0%, oklch(0.92 0.02 240) 100%)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <BellOff className="size-6 text-foreground/45" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          All caught up
        </h3>
        <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
          You have no unread notifications. We&apos;ll let you know when something needs your attention.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <Button size="sm" variant="outline" className="gap-1.5">
          <Settings className="size-3.5" />
          Notification preferences
        </Button>
      </motion.div>
    </motion.div>
  )
}
