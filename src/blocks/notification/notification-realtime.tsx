"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

type Notification = {
  id: number
  initials: string
  name: string
  action: string
  target: string
  time: string
  isNew: boolean
  autoDismissProgress: number | null
}

const incoming: Array<Omit<Notification, "isNew" | "autoDismissProgress">> = [
  { id: 101, initials: "CB", name: "Camille Beaumont", action: "pushed to", target: "feat/animations", time: "just now" },
  { id: 102, initials: "RG", name: "Raphael Giroud", action: "commented on", target: "PR #318", time: "just now" },
]

const staticNotifications: Notification[] = [
  { id: 1, initials: "IT", name: "Ines Takahashi", action: "resolved", target: "Tooltip overflow issue", time: "12 min ago", isNew: false, autoDismissProgress: null },
  { id: 2, initials: "HD", name: "Hugo Delacroix", action: "deployed", target: "v2.15.1 to production", time: "28 min ago", isNew: false, autoDismissProgress: null },
  { id: 3, initials: "NF", name: "Nadia Ferreira", action: "shared", target: "User research findings", time: "1h ago", isNew: false, autoDismissProgress: null },
]

const AUTO_DISMISS_MS = 8000

export default function NotificationRealtime() {
  const [notifications, setNotifications] = useState<Notification[]>(staticNotifications)
  const [nextIncoming, setNextIncoming] = useState(0)

  const simulateNewNotification = useCallback(() => {
    if (nextIncoming >= incoming.length) return
    const notif = incoming[nextIncoming]
    setNotifications((prev) => [
      { ...notif, isNew: true, autoDismissProgress: 100 },
      ...prev,
    ])
    setNextIncoming((n) => n + 1)
  }, [nextIncoming])

  useEffect(() => {
    const newNotifs = notifications.filter((n) => n.autoDismissProgress !== null && n.autoDismissProgress > 0)
    if (newNotifs.length === 0) return

    const interval = setInterval(() => {
      setNotifications((prev) =>
        prev.map((n) => {
          if (n.autoDismissProgress === null || n.autoDismissProgress <= 0) return n
          const next = n.autoDismissProgress - (100 / (AUTO_DISMISS_MS / 50))
          return next <= 0 ? { ...n, isNew: false, autoDismissProgress: null } : { ...n, autoDismissProgress: next }
        })
      )
    }, 50)

    return () => clearInterval(interval)
  }, [notifications])

  return (
    <Card
      className="mx-auto max-w-md"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <CardHeader>
        <CardTitle>Live updates</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            onClick={simulateNewNotification}
            disabled={nextIncoming >= incoming.length}
          >
            Simulate event
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              layout
              initial={notif.isNew ? { opacity: 0, y: -16, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-lg"
            >
              <div
                className={`flex items-start gap-3 px-2 py-3 transition-colors ${
                  notif.isNew ? "bg-primary/5" : ""
                }`}
              >
                <div className="relative mt-0.5">
                  <Avatar size="sm">
                    <AvatarFallback>{notif.initials}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-sm leading-snug">
                      <span className="font-medium">{notif.name}</span>{" "}
                      <span className="text-muted-foreground">{notif.action}</span>{" "}
                      <span className="font-medium">{notif.target}</span>
                    </p>
                    {notif.isNew && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Badge className="shrink-0 text-[10px]">New</Badge>
                      </motion.div>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] tabular-nums tracking-wide text-muted-foreground">{notif.time}</p>
                </div>
              </div>
              {notif.autoDismissProgress !== null && notif.autoDismissProgress > 0 && (
                <div className="absolute bottom-0 left-0 h-0.5 bg-primary/30 transition-all" style={{ width: `${notif.autoDismissProgress}%` }} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
