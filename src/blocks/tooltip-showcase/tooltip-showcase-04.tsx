"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Kbd } from "@/components/ui/kbd"
import {
  CopyIcon,
  ScissorsIcon,
  ClipboardIcon,
  Undo2Icon,
  Redo2Icon,
  SaveIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const actions = [
  { icon: CopyIcon, label: "Copy", keys: ["C"] },
  { icon: ScissorsIcon, label: "Cut", keys: ["X"] },
  { icon: ClipboardIcon, label: "Paste", keys: ["V"] },
  { icon: Undo2Icon, label: "Undo", keys: ["Z"] },
  { icon: Redo2Icon, label: "Redo", keys: ["Shift", "Z"] },
  { icon: SaveIcon, label: "Save", keys: ["S"] },
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

export default function TooltipShowcase04() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Keyboard shortcuts
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Tooltips with keybinding hints
      </p>
      <TooltipProvider>
        <motion.div
          className="flex items-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action) => (
            <motion.div key={action.label} variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon">
                    <action.icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {action.label}
                  <Kbd>
                    <kbd className="text-[10px]">&#8984;</kbd>
                    {action.keys.map((k) => (
                      <kbd key={k} className="text-[10px]">
                        {k}
                      </kbd>
                    ))}
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
