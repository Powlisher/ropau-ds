"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Trash2Icon, ArchiveIcon, CheckCircleIcon } from "lucide-react"

type Notification = {
  id: string
  title: string
  source: string
  time: string
  type: "mention" | "update" | "alert" | "request"
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: "n1", title: "Elara commented on your PR: 'Looks good, minor nit on line 42'", source: "GitHub", time: "5 min ago", type: "mention", read: false },
  { id: "n2", title: "Deployment to production completed successfully (v2.14.7)", source: "Vercel", time: "23 min ago", type: "update", read: false },
  { id: "n3", title: "CPU usage exceeded 85% on api-worker-03 for 15 minutes", source: "Datadog", time: "1h ago", type: "alert", read: false },
  { id: "n4", title: "Kai requested access to the Prism Design System repository", source: "GitHub", time: "2h ago", type: "request", read: true },
  { id: "n5", title: "Invoice #INV-2847 for $3,420 is overdue by 3 days", source: "Stripe", time: "4h ago", type: "alert", read: true },
  { id: "n6", title: "New feature flag 'dark-mode-v2' enabled for 10% of users", source: "LaunchDarkly", time: "6h ago", type: "update", read: true },
  { id: "n7", title: "Soren mentioned you in #engineering: 'Can you review the migration plan?'", source: "Slack", time: "8h ago", type: "mention", read: true },
]

const typeStyles: Record<string, string> = {
  mention: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  update: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  alert: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  request: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const DRAG_THRESHOLD = 100

function SwipeableItem({ notification, onDelete, onArchive }: { notification: Notification; onDelete: (id: string) => void; onArchive: (id: string) => void }) {
  const x = useMotionValue(0)
  const bgLeft = useTransform(x, [-DRAG_THRESHOLD, 0], [1, 0])
  const bgRight = useTransform(x, [0, DRAG_THRESHOLD], [0, 1])

  return (
    <div className="relative overflow-hidden rounded-xl">
      <motion.div className="absolute inset-0 flex items-center justify-start rounded-xl bg-red-100 px-5 dark:bg-red-950/40" style={{ opacity: bgLeft }}>
        <Trash2Icon className="size-4 text-red-600" />
      </motion.div>
      <motion.div className="absolute inset-0 flex items-center justify-end rounded-xl bg-blue-100 px-5 dark:bg-blue-950/40" style={{ opacity: bgRight }}>
        <ArchiveIcon className="size-4 text-blue-600" />
      </motion.div>

      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={(_, info) => {
          if (info.offset.x < -DRAG_THRESHOLD) onDelete(notification.id)
          else if (info.offset.x > DRAG_THRESHOLD) onArchive(notification.id)
        }}
        whileHover={{ y: -1 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      >
        <Card className="cursor-grab border-border/40" style={{ boxShadow: premiumShadow }}>
          <CardContent className="flex items-start gap-3 p-4">
            {!notification.read && (
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
            )}
            <div className="min-w-0 flex-1">
              <p className={`text-sm leading-snug ${notification.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                {notification.title}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold capitalize ${typeStyles[notification.type]}`}>
                  {notification.type}
                </span>
                <span className="text-[11px] text-muted-foreground">{notification.source}</span>
                <span className="ml-auto font-mono text-[10px] tabular-nums text-muted-foreground">{notification.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function Crud05() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const remove = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id))
  const archive = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id))

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            {" -- "}Swipe left to delete, right to archive
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <CheckCircleIcon className="size-3.5" />
            Mark all read
          </button>
        )}
      </motion.div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -200, transition: { duration: 0.2 } }}
            >
              <SwipeableItem notification={n} onDelete={remove} onArchive={archive} />
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <p className="text-sm font-medium text-foreground">Inbox zero</p>
            <p className="mt-1 text-xs text-muted-foreground">No pending notifications. Check back later.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
