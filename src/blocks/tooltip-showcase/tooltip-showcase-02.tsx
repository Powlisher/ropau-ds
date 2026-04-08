"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { InfoIcon, ShieldCheckIcon, ZapIcon } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  {
    icon: ShieldCheckIcon,
    title: "End-to-end encrypted",
    description: "All data is encrypted in transit and at rest using AES-256.",
  },
  {
    icon: ZapIcon,
    title: "Edge-cached",
    description: "Responses served from the nearest CDN node for sub-50ms latency.",
  },
  {
    icon: InfoIcon,
    title: "Rate limited",
    description: "API calls are capped at 1,200 req/min per organization.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase02() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Rich tooltips
      </h3>
      <p className="mb-8 text-xs text-muted-foreground">
        Title and description for contextual help
      </p>
      <TooltipProvider>
        <motion.div
          className="flex items-center justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon">
                    <item.icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-56 py-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-background">
                      {item.title}
                    </span>
                    <span className="text-background/70">
                      {item.description}
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
