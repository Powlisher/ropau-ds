"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCheckIcon } from "lucide-react"
import { motion } from "framer-motion"

type Notification = {
  id: number
  initials: string
  name: string
  action: string
  target: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, initials: "CB", name: "Camille Beaumont", action: "commented on", target: "Dashboard wireframe", time: "2 min ago", read: false },
  { id: 2, initials: "RG", name: "Raphael Giroud", action: "approved", target: "PR #284 — Auth migration", time: "14 min ago", read: false },
  { id: 3, initials: "IT", name: "Ines Takahashi", action: "mentioned you in", target: "Sprint retro notes", time: "47 min ago", read: false },
  { id: 4, initials: "HD", name: "Hugo Delacroix", action: "assigned you to", target: "Fix mobile nav overflow", time: "1h ago", read: true },
  { id: 5, initials: "NF", name: "Nadia Ferreira", action: "shared", target: "Q3 analytics report", time: "3h ago", read: true },
  { id: 6, initials: "TM", name: "Theo Marchand", action: "completed", target: "Component audit task", time: "5h ago", read: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <Card className="mx-auto max-w-md" style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Notifications
          {unreadCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold tabular-nums text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            <CheckCheckIcon data-icon="inline-start" />
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              variants={itemVariants}
              whileHover={{ backgroundColor: "var(--muted)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-start gap-3 rounded-lg px-2 py-3"
            >
              <div className="relative">
                <Avatar size="sm">
                  <AvatarFallback>{notif.initials}</AvatarFallback>
                </Avatar>
                {!notif.read && (
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary ring-2 ring-card" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug">
                  <span className="font-medium">{notif.name}</span>{" "}
                  <span className="text-muted-foreground">{notif.action}</span>{" "}
                  <span className="font-medium">{notif.target}</span>
                </p>
                <p className="mt-0.5 text-xs tabular-nums tracking-wide text-muted-foreground">{notif.time}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
