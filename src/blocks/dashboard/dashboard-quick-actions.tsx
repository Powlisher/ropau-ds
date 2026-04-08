"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  PlusIcon,
  UploadIcon,
  UsersIcon,
  BarChart3Icon,
  Settings2Icon,
  CalendarIcon,
  MessageSquareIcon,
  FileTextIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const actions = [
  { label: "New Project", icon: PlusIcon, description: "Start from scratch" },
  { label: "Upload Files", icon: UploadIcon, description: "Import documents" },
  { label: "Invite Team", icon: UsersIcon, description: "Add collaborators" },
  { label: "View Reports", icon: BarChart3Icon, description: "Analytics overview" },
  { label: "Settings", icon: Settings2Icon, description: "Account config" },
  { label: "Schedule", icon: CalendarIcon, description: "Plan meetings" },
  { label: "Messages", icon: MessageSquareIcon, description: "Team chat" },
  { label: "Templates", icon: FileTextIcon, description: "Reusable layouts" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardQuickActions() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">Quick Actions</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Jump to common tasks</p>
      </div>
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action) => (
          <motion.div
            key={action.label}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Card
              className="cursor-pointer transition-colors hover:bg-muted/40"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <action.icon className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{action.label}</div>
                  <div className="text-[11px] text-muted-foreground">{action.description}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
