"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BellIcon, CheckCheckIcon } from "lucide-react"
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
  { id: 1, initials: "CB", name: "Camille B.", action: "requested review on", target: "PR #312", time: "3 min ago", read: false },
  { id: 2, initials: "RG", name: "Raphael G.", action: "mentioned you in", target: "Design sync notes", time: "22 min ago", read: false },
  { id: 3, initials: "IT", name: "Ines T.", action: "assigned", target: "Icon audit task", time: "1h ago", read: false },
  { id: 4, initials: "HD", name: "Hugo D.", action: "completed", target: "Staging deploy", time: "2h ago", read: true },
  { id: 5, initials: "NF", name: "Nadia F.", action: "shared", target: "Q4 roadmap draft", time: "4h ago", read: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" className="relative" />
          }
        >
          <BellIcon />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px]">
              {unreadCount}
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <PopoverHeader className="flex items-center justify-between border-b p-3">
            <PopoverTitle className="flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold tabular-nums text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </PopoverTitle>
            <Button variant="ghost" size="xs" onClick={markAllRead} disabled={unreadCount === 0}>
              <CheckCheckIcon data-icon="inline-start" />
              Read all
            </Button>
          </PopoverHeader>
          <ScrollArea className="max-h-80">
            <motion.div
              className="flex flex-col py-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {notifications.map((notif) => (
                <motion.button
                  key={notif.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "var(--muted)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left"
                >
                  <div className="relative mt-0.5">
                    <Avatar size="sm">
                      <AvatarFallback>{notif.initials}</AvatarFallback>
                    </Avatar>
                    {!notif.read && (
                      <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary ring-2 ring-popover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-snug">
                      <span className="font-medium">{notif.name}</span>{" "}
                      <span className="text-muted-foreground">{notif.action}</span>{" "}
                      <span className="font-medium">{notif.target}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] tabular-nums tracking-wide text-muted-foreground">{notif.time}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </ScrollArea>
          <div className="border-t p-2">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
