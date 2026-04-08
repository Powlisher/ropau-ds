"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState02() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-sm flex-col items-center py-16 text-center"
    >
      <motion.div variants={itemVariants} className="relative mb-6">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-16 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.94 0.015 50) 0%, oklch(0.91 0.025 35) 100%)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <Mail className="size-7 text-foreground/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          Your inbox is clear
        </h3>
        <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
          When teammates mention you or respond to your threads, their messages will appear here.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <Button size="sm" className="gap-1.5">
          <Send className="size-3.5" />
          Compose message
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-10 w-full space-y-2.5 opacity-[0.3]"
      >
        {[
          { w: "w-3/4", from: "Lena V.", time: "2m" },
          { w: "w-full", from: "Marcus C.", time: "14m" },
          { w: "w-5/6", from: "Ayo O.", time: "1h" },
        ].map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-muted/70 px-3.5 py-2.5 ring-1 ring-foreground/[0.03]"
          >
            <div className="size-6 shrink-0 rounded-full bg-muted" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground/60">{row.from}</span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{row.time}</span>
              </div>
              <div className={`mt-1 ${row.w} h-2 rounded bg-muted`} />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
