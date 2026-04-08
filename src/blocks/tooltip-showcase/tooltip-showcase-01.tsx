"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const directions = [
  { side: "top" as const, icon: ArrowUpIcon, label: "Top" },
  { side: "bottom" as const, icon: ArrowDownIcon, label: "Bottom" },
  { side: "left" as const, icon: ArrowLeftIcon, label: "Left" },
  { side: "right" as const, icon: ArrowRightIcon, label: "Right" },
]

export default function TooltipShowcase01() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Tooltip directions
      </h3>
      <p className="mb-8 text-xs text-muted-foreground">
        All four placement positions
      </p>
      <TooltipProvider>
        <div className="flex items-center justify-center gap-4">
          {directions.map((d) => (
            <Tooltip key={d.side}>
              <TooltipTrigger>
                <Button variant="outline" size="icon">
                  <d.icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={d.side}>
                Tooltip on {d.label.toLowerCase()}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </motion.div>
  )
}
