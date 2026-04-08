"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { MousePointerClickIcon } from "lucide-react"
import { motion } from "framer-motion"

const delays = [
  { ms: 0, label: "Instant" },
  { ms: 200, label: "200ms" },
  { ms: 500, label: "500ms" },
  { ms: 1000, label: "1 second" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase05() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Delay showcase
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Hover each button to compare open delays
      </p>
      <motion.div
        className="flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {delays.map((d) => (
          <motion.div
            key={d.ms}
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <span className="w-20 text-right font-mono text-xs tabular-nums text-muted-foreground">
              {d.ms}ms
            </span>
            <TooltipProvider delay={d.ms}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <MousePointerClickIcon className="size-3.5" />
                    {d.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Appeared after {d.label.toLowerCase()}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
