"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  FlagIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const actions = [
  { icon: HeartIcon, label: "Like", side: "top" as const },
  { icon: BookmarkIcon, label: "Bookmark", side: "top" as const },
  { icon: ShareIcon, label: "Share", side: "top" as const },
  { icon: FlagIcon, label: "Report", side: "top" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase09() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Tooltips with arrows
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Directional arrows anchoring to trigger elements
      </p>
      <TooltipProvider>
        <motion.div
          className="flex items-center justify-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action) => (
            <motion.div key={action.label} variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon">
                    <action.icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side={action.side}>
                  {action.label}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
