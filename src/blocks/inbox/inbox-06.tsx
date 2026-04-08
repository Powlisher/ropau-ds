"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SparklesIcon, SettingsIcon } from "lucide-react"
import { motion } from "framer-motion"

const ghostEmails = [
  { opacity: 0.06, width: "85%" },
  { opacity: 0.04, width: "92%" },
  { opacity: 0.03, width: "78%" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox06() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardContent className="relative overflow-hidden py-12 px-8">
        <div className="absolute inset-0 pointer-events-none">
          {ghostEmails.map((ghost, i) => (
            <div
              key={i}
              className="mx-6 mb-2 h-16 rounded-xl"
              style={{
                opacity: ghost.opacity,
                width: ghost.width,
                backgroundColor: "currentColor",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex size-16 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.94 0.04 160), oklch(0.96 0.02 200))",
              boxShadow: "0 0 0 1px oklch(0.55 0.15 160 / 0.1), 0 2px 8px oklch(0.55 0.15 160 / 0.08)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <SparklesIcon className="size-7" style={{ color: "oklch(0.50 0.18 160)" }} />
            </motion.div>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="mt-6 text-xl font-semibold tracking-tight"
          >
            Inbox Zero
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="mt-2 max-w-[280px] text-sm text-muted-foreground leading-relaxed"
          >
            You've processed every message. Enjoy the calm -- your next batch arrives around 2 PM based on your usual pattern.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-2 flex items-center gap-1.5 text-xs tabular-nums text-muted-foreground/60"
          >
            <div className="size-1.5 rounded-full" style={{ backgroundColor: "oklch(0.55 0.18 160)" }} />
            247 emails processed this week
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center gap-3"
          >
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <SettingsIcon className="size-3.5" />
              Manage Filters
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
