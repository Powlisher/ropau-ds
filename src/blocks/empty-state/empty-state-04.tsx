"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FolderOpen, FileText, Users, Blocks } from "lucide-react"

const quickActions = [
  { icon: FileText, label: "Create a document", description: "Start with a blank page or template" },
  { icon: Users, label: "Invite your team", description: "Collaborate in real time" },
  { icon: Blocks, label: "Connect an integration", description: "Slack, GitHub, Figma, and more" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState04() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-lg flex-col items-center py-14 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex size-16 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, oklch(0.94 0.03 145) 0%, oklch(0.91 0.04 165) 100%)",
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <FolderOpen className="size-7 text-foreground/50" strokeWidth={1.5} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          This workspace is empty
        </h3>
        <p className="mx-auto mt-2 max-w-[320px] text-sm leading-relaxed text-muted-foreground">
          Get started by creating your first document, inviting teammates, or connecting the tools you already use.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 w-full space-y-2.5">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.label}
              whileHover={{ y: -1, scale: 1.005 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex w-full items-center gap-4 rounded-xl bg-card p-4 text-left ring-1 ring-foreground/[0.06] transition-colors hover:bg-card/80"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/80">
                <Icon className="size-5 text-foreground/60" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <Button size="sm" variant="outline">
          Browse templates
        </Button>
      </motion.div>
    </motion.div>
  )
}
