"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { TrashIcon, LockIcon, SendIcon } from "lucide-react"
import { motion } from "framer-motion"

const actions = [
  {
    icon: TrashIcon,
    label: "Delete project",
    reason: "You need admin permissions to delete projects",
  },
  {
    icon: LockIcon,
    label: "Manage access",
    reason: "Contact your workspace owner to change access settings",
  },
  {
    icon: SendIcon,
    label: "Publish",
    reason: "Complete all required fields before publishing",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase07() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Disabled element tooltips
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Explain why an action is unavailable
      </p>
      <TooltipProvider>
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action) => (
            <motion.div
              key={action.label}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <Tooltip>
                <TooltipTrigger>
                  <span className="inline-flex">
                    <Button variant="outline" size="sm" disabled className="gap-1.5">
                      <action.icon className="size-3.5" />
                      {action.label}
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-52">
                  {action.reason}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
