"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WifiOffIcon, RefreshCwIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorOffline() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="flex size-16 items-center justify-center rounded-2xl bg-muted ring-4 ring-border/30"
        >
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <WifiOffIcon className="size-7 text-muted-foreground" />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            No internet connection
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Check your network settings or try reconnecting. Your unsaved work is preserved locally.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button className="gap-1.5">
            <RefreshCwIcon data-icon="inline-start" className="size-4" />
            Try Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
