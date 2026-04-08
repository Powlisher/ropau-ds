"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  LinkIcon,
  ListIcon,
  ImageIcon,
  CodeIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const tools = [
  { icon: BoldIcon, label: "Bold" },
  { icon: ItalicIcon, label: "Italic" },
  { icon: UnderlineIcon, label: "Underline" },
  { icon: StrikethroughIcon, label: "Strikethrough" },
  null,
  { icon: LinkIcon, label: "Insert link" },
  { icon: ImageIcon, label: "Insert image" },
  { icon: ListIcon, label: "Bullet list" },
  { icon: CodeIcon, label: "Code block" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase03() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Toolbar tooltips
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Icon buttons with descriptive labels on hover
      </p>
      <TooltipProvider>
        <motion.div
          className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-muted/30 p-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tools.map((tool, i) =>
            tool === null ? (
              <div
                key={`sep-${i}`}
                className="mx-1 h-5 w-px bg-border"
              />
            ) : (
              <motion.div key={tool.label} variants={itemVariants}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon-xs">
                      <tool.icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{tool.label}</TooltipContent>
                </Tooltip>
              </motion.div>
            )
          )}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
