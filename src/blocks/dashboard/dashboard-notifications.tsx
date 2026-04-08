"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BellIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon, MessageSquareIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  icon: typeof BellIcon
  read: boolean
  type: "alert" | "success" | "info" | "message"
}

const initialNotifications: Notification[] = [
  { id: "1", title: "Deployment failed on staging", description: "Build #4821 timed out after 12 minutes. Check CI logs for details.", time: "3 min ago", icon: AlertTriangleIcon, read: false, type: "alert" },
  { id: "2", title: "New team member joined", description: "Luisa Fernandez accepted the invitation and joined the Engineering team.", time: "18 min ago", icon: CheckCircleIcon, read: false, type: "success" },
  { id: "3", title: "Monthly usage report ready", description: "Your March 2026 infrastructure usage report is available for download.", time: "1h ago", icon: InfoIcon, read: false, type: "info" },
  { id: "4", title: "Comment on your PR", description: "Thomas Reiner left feedback on PR #293: checkout-v2 refactor.", time: "2h ago", icon: MessageSquareIcon, read: true, type: "message" },
  { id: "5", title: "SSL certificate expiring", description: "The certificate for api.example.com expires in 14 days. Renew now.", time: "4h ago", icon: AlertTriangleIcon, read: true, type: "alert" },
  { id: "6", title: "Backup completed", description: "Database backup completed successfully. 2.4 GB stored in eu-west-1.", time: "6h ago", icon: CheckCircleIcon, read: true, type: "success" },
]

const typeStyles: Record<string, string> = {
  alert: "text-amber-600 bg-amber-500/10",
  success: "text-emerald-600 bg-emerald-500/10",
  info: "text-blue-600 bg-blue-500/10",
  message: "text-primary bg-primary/10",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
}

export default function DashboardNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold tracking-tight">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge>{unreadCount} new</Badge>
          )}
        </div>
        <CardDescription>Stay updated on important events</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
          >
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                layout
                className={`flex items-start gap-3 rounded-lg px-3 py-3 transition-colors ${
                  !notification.read ? "bg-muted/50" : "hover:bg-muted/30"
                }`}
              >
                <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${typeStyles[notification.type]}`}>
                  <notification.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"}`}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="size-1.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="xs"
                      className="mt-1.5"
                      onClick={() => markRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </CardContent>
    </Card>
  )
}
