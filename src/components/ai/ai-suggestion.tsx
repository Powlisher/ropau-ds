"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const pillVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

function AISuggestion({
  suggestions,
  onSelect,
  className,
}: {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}) {
  return (
    <motion.div
      data-slot="ai-suggestion"
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {suggestions.map((suggestion) => (
        <motion.div key={suggestion} variants={pillVariants}>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}

export { AISuggestion }
