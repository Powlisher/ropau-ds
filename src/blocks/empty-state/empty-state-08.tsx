"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShieldOff, ArrowLeft } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState08() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-sm flex-col items-center py-16 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex size-16 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, oklch(0.94 0.01 0) 0%, oklch(0.92 0.02 340) 100%)",
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <ShieldOff className="size-7 text-foreground/40" strokeWidth={1.5} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          Access restricted
        </h3>
        <p className="mx-auto mt-2 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
          You don&apos;t have permission to view this resource. If you believe this is a mistake, contact your workspace administrator.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 w-full rounded-xl bg-muted/40 p-4 ring-1 ring-foreground/[0.04]"
      >
        <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          Required role
        </p>
        <p className="mt-1 text-sm font-medium text-foreground/80">
          Editor or above on &quot;Q2 Product Roadmap&quot;
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Your current role: <span className="font-mono tabular-nums">Viewer</span>
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 flex gap-2.5">
        <Button size="sm" variant="outline" className="gap-1.5">
          <ArrowLeft className="size-3.5" />
          Go back
        </Button>
        <Button size="sm">
          Request access
        </Button>
      </motion.div>
    </motion.div>
  )
}
