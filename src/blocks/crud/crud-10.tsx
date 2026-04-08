"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { HistoryIcon, PencilIcon, PlusCircleIcon, Trash2Icon, SettingsIcon, ToggleRightIcon } from "lucide-react"

type AuditEntry = {
  id: string
  user: { name: string; initials: string }
  action: "created" | "updated" | "deleted" | "toggled" | "configured"
  target: string
  field?: string
  oldValue?: string
  newValue?: string
  timestamp: string
  relativeTime: string
}

const auditLog: AuditEntry[] = [
  { id: "a1", user: { name: "Elara Fontaine", initials: "EF" }, action: "updated", target: "Pricing Plans", field: "Pro Plan price", oldValue: "$79/mo", newValue: "$89/mo", timestamp: "2025-04-08 14:23", relativeTime: "12 min ago" },
  { id: "a2", user: { name: "Kai Nakamura", initials: "KN" }, action: "created", target: "Feature Flag", field: "dark-mode-v2", newValue: "Enabled for 10% rollout", timestamp: "2025-04-08 13:47", relativeTime: "48 min ago" },
  { id: "a3", user: { name: "Soren Lindqvist", initials: "SL" }, action: "deleted", target: "API Key", field: "staging-test-key-old", oldValue: "rpk_test_7b1d...pQ9s", timestamp: "2025-04-08 11:02", relativeTime: "3h ago" },
  { id: "a4", user: { name: "Amara Diallo", initials: "AD" }, action: "updated", target: "Team Member", field: "Role", oldValue: "Viewer", newValue: "Editor", timestamp: "2025-04-08 09:18", relativeTime: "5h ago" },
  { id: "a5", user: { name: "Lucian Brandt", initials: "LB" }, action: "configured", target: "SMTP Settings", field: "Outbound server", newValue: "smtp.resend.com:587", timestamp: "2025-04-07 17:45", relativeTime: "21h ago" },
  { id: "a6", user: { name: "Elara Fontaine", initials: "EF" }, action: "toggled", target: "Maintenance Mode", field: "Status", oldValue: "On", newValue: "Off", timestamp: "2025-04-07 16:30", relativeTime: "22h ago" },
  { id: "a7", user: { name: "Kai Nakamura", initials: "KN" }, action: "updated", target: "Landing Page", field: "Hero headline", oldValue: "Ship faster with AI", newValue: "Build products that matter", timestamp: "2025-04-07 14:12", relativeTime: "1d ago" },
  { id: "a8", user: { name: "Soren Lindqvist", initials: "SL" }, action: "created", target: "Webhook", field: "stripe-events-v2", newValue: "https://api.app.dev/webhooks/stripe", timestamp: "2025-04-07 10:05", relativeTime: "1d ago" },
  { id: "a9", user: { name: "Amara Diallo", initials: "AD" }, action: "deleted", target: "Blog Post", field: "Draft: Why we pivoted (unpublished)", timestamp: "2025-04-06 18:22", relativeTime: "2d ago" },
  { id: "a10", user: { name: "Lucian Brandt", initials: "LB" }, action: "updated", target: "DNS Record", field: "A record", oldValue: "143.244.33.21", newValue: "143.244.33.87", timestamp: "2025-04-06 11:40", relativeTime: "2d ago" },
]

const actionConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  created: { icon: <PlusCircleIcon className="size-3.5" />, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-950/40" },
  updated: { icon: <PencilIcon className="size-3.5" />, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-950/40" },
  deleted: { icon: <Trash2Icon className="size-3.5" />, color: "text-red-600", bg: "bg-red-100 dark:bg-red-950/40" },
  toggled: { icon: <ToggleRightIcon className="size-3.5" />, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-950/40" },
  configured: { icon: <SettingsIcon className="size-3.5" />, color: "text-violet-600", bg: "bg-violet-100 dark:bg-violet-950/40" },
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud10() {
  const [filter, setFilter] = useState<string | null>(null)

  const filtered = filter ? auditLog.filter((e) => e.action === filter) : auditLog

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Audit Log</h2>
          <p className="text-sm text-muted-foreground">Track every change made to your workspace</p>
        </div>
        <div className="flex items-center gap-1">
          <HistoryIcon className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Last 30 days</span>
        </div>
      </div>

      <div className="flex gap-1.5">
        {["created", "updated", "deleted", "toggled", "configured"].map((action) => {
          const cfg = actionConfig[action]
          return (
            <button
              key={action}
              onClick={() => setFilter(filter === action ? null : action)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === action
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {action}
            </button>
          )
        })}
        {filter && (
          <button onClick={() => setFilter(null)} className="px-2 text-xs text-muted-foreground hover:text-foreground">
            Clear
          </button>
        )}
      </div>

      <Card style={{ boxShadow: premiumShadow }}>
        <CardContent className="p-0">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" key={filter ?? "all"}>
            {filtered.map((entry, i) => {
              const cfg = actionConfig[entry.action]
              return (
                <motion.div
                  key={entry.id}
                  variants={itemVariants}
                  className={`flex items-start gap-3 px-5 py-4 ${i < filtered.length - 1 ? "border-b border-border/30" : ""}`}
                >
                  <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[9px]">{entry.user.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{entry.user.name}</span>
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold capitalize ${cfg.bg} ${cfg.color}`}>
                        {entry.action}
                      </span>
                      <span className="text-sm text-muted-foreground">{entry.target}</span>
                    </div>

                    {entry.field && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="font-medium text-foreground">{entry.field}</span>
                        {entry.oldValue && (
                          <>
                            <span className="rounded bg-red-50 px-1 py-0.5 font-mono text-[11px] line-through text-red-600 dark:bg-red-950/30">{entry.oldValue}</span>
                            <span className="text-muted-foreground">-&gt;</span>
                          </>
                        )}
                        {entry.newValue && (
                          <span className="rounded bg-emerald-50 px-1 py-0.5 font-mono text-[11px] text-emerald-700 dark:bg-emerald-950/30">{entry.newValue}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[10px] tabular-nums text-muted-foreground">{entry.relativeTime}</p>
                    <p className="mt-0.5 font-mono text-[9px] tabular-nums text-muted-foreground/60">{entry.timestamp}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-foreground">No matching entries</p>
              <p className="mt-1 text-xs text-muted-foreground">Try a different filter to find what you are looking for</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
