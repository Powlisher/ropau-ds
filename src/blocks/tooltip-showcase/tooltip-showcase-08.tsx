"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { FileTextIcon, LayersIcon, SettingsIcon } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  {
    icon: FileTextIcon,
    label: "Export options",
    lines: ["PDF with annotations", "CSV raw data", "JSON structured output", "PNG screenshots"],
  },
  {
    icon: LayersIcon,
    label: "Included layers",
    lines: ["Background fills", "Component outlines", "Typography tokens", "Spacing overlays"],
  },
  {
    icon: SettingsIcon,
    label: "Requirements",
    lines: ["Node.js 20+", "pnpm 9.x", "macOS or Linux"],
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

export default function TooltipShowcase08() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Multi-line tooltips
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Structured list content inside a tooltip
      </p>
      <TooltipProvider>
        <motion.div
          className="flex items-center gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <item.icon className="size-3.5" />
                    {item.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-60 py-2">
                  <ul className="space-y-0.5">
                    {item.lines.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-1.5 text-background/90"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-background/40" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
