"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UsersIcon } from "lucide-react"
import { motion } from "framer-motion"

const recentPages = [
  { path: "/pricing", users: 47 },
  { path: "/docs/getting-started", users: 32 },
  { path: "/blog/release-v4", users: 28 },
  { path: "/dashboard", users: 19 },
  { path: "/changelog", users: 14 },
]

const maxPageUsers = Math.max(...recentPages.map((p) => p.users))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics04() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardContent className="pt-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: "oklch(0.55 0.20 145)" }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 size-2.5 rounded-full"
                  style={{ backgroundColor: "oklch(0.55 0.20 145)" }}
                  animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Live</span>
            </div>
            <UsersIcon className="size-4 text-muted-foreground/50" />
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="text-6xl font-semibold tabular-nums tracking-tight">247</div>
            <div className="mt-1 text-sm text-muted-foreground">users online right now</div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Top Pages
            </div>
            <div className="space-y-2">
              {recentPages.map((page) => (
                <div key={page.path} className="flex items-center gap-3">
                  <span className="min-w-0 flex-1 truncate text-xs font-mono text-muted-foreground">
                    {page.path}
                  </span>
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: "oklch(0.55 0.18 250)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(page.users / maxPageUsers) * 100}%` }}
                      transition={{ type: "spring" as const, stiffness: 60, damping: 18 }}
                    />
                  </div>
                  <span className="text-xs font-semibold tabular-nums w-8 text-right">{page.users}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
