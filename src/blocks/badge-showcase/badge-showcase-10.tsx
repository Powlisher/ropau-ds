"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

const visibleTags = [
  { label: "react", color: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { label: "typescript", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { label: "tailwind", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
]

const hiddenTags = [
  "framer-motion",
  "next.js",
  "radix-ui",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase10() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Badge overflow
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Collapsed tags with expandable tooltip
      </p>
      <TooltipProvider>
        <motion.div
          className="flex flex-wrap items-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleTags.map((tag) => (
            <motion.span
              key={tag.label}
              variants={itemVariants}
              className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-medium ${tag.color}`}
            >
              {tag.label}
            </motion.span>
          ))}
          <motion.div variants={itemVariants}>
            <Tooltip>
              <TooltipTrigger>
                <span className="inline-flex h-6 cursor-default items-center rounded-md bg-muted px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80">
                  +{hiddenTags.length} more
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                {hiddenTags.join(", ")}
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
