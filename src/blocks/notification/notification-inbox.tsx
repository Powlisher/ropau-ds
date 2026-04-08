"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArchiveIcon, Trash2Icon } from "lucide-react"
import { motion } from "framer-motion"

type Notification = {
  id: number
  initials: string
  name: string
  action: string
  target: string
  time: string
  read: boolean
  archived: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, initials: "CB", name: "Camille Beaumont", action: "requested review on", target: "Button component refactor", time: "8 min ago", read: false, archived: false },
  { id: 2, initials: "RG", name: "Raphael Giroud", action: "commented on", target: "Typography scale RFC", time: "25 min ago", read: false, archived: false },
  { id: 3, initials: "IT", name: "Ines Takahashi", action: "assigned you", target: "Audit color contrast ratios", time: "1h ago", read: false, archived: false },
  { id: 4, initials: "HD", name: "Hugo Delacroix", action: "mentioned you in", target: "Sprint planning thread", time: "2h ago", read: true, archived: false },
  { id: 5, initials: "NF", name: "Nadia Ferreira", action: "shared", target: "Competitor analysis deck", time: "5h ago", read: true, archived: false },
  { id: 6, initials: "TM", name: "Theo Marchand", action: "closed issue", target: "Fix card shadow on Safari", time: "Yesterday", read: true, archived: true },
  { id: 7, initials: "CB", name: "Camille Beaumont", action: "approved", target: "PR #298 — Spacing tokens", time: "2 days ago", read: true, archived: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NotificationInbox() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const all = notifications.filter((n) => !n.archived)
  const unread = notifications.filter((n) => !n.read && !n.archived)
  const archived = notifications.filter((n) => n.archived)

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function archiveSelected() {
    setNotifications((prev) => prev.map((n) => (selected.has(n.id) ? { ...n, archived: true, read: true } : n)))
    setSelected(new Set())
  }

  function deleteSelected() {
    setNotifications((prev) => prev.filter((n) => !selected.has(n.id)))
    setSelected(new Set())
  }

  function renderList(items: Notification[]) {
    return (
      <motion.div
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={items.map((i) => i.id).join(",")}
      >
        {items.map((notif) => (
          <motion.div
            key={notif.id}
            variants={itemVariants}
            whileHover={{ backgroundColor: "var(--muted)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-start gap-3 rounded-lg px-2 py-2.5"
          >
            <Checkbox
              checked={selected.has(notif.id)}
              onCheckedChange={() => toggleSelect(notif.id)}
              className="mt-1"
            />
            <div className="relative">
              <Avatar size="sm">
                <AvatarFallback>{notif.initials}</AvatarFallback>
              </Avatar>
              {!notif.read && (
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary ring-2 ring-card" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                <span className="font-medium">{notif.name}</span>{" "}
                <span className="text-muted-foreground">{notif.action}</span>{" "}
                <span className="font-medium">{notif.target}</span>
              </p>
              <p className="mt-0.5 text-[11px] tabular-nums tracking-wide text-muted-foreground">{notif.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <Card
      className="mx-auto max-w-md"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <CardAction>
          {selected.size > 0 && (
            <div className="flex items-center gap-1">
              <Badge variant="secondary">{selected.size}</Badge>
              <Button variant="ghost" size="icon-xs" onClick={archiveSelected}>
                <ArchiveIcon />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={deleteSelected}>
                <Trash2Icon />
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All
              {all.length > 0 && <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">{all.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unread.length > 0 && <Badge className="ml-1 h-4 px-1 text-[10px]">{unread.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-3">
            {renderList(all)}
          </TabsContent>
          <TabsContent value="unread" className="mt-3">
            {renderList(unread)}
          </TabsContent>
          <TabsContent value="archived" className="mt-3">
            {renderList(archived)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
