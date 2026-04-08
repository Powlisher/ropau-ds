"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HeartIcon, UserPlusIcon, AtSignIcon, RepeatIcon, MessageCircleIcon, StarIcon, SettingsIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const notificationTypes = {
  like: { icon: HeartIcon, color: "text-rose-500", bg: "bg-rose-50" },
  follow: { icon: UserPlusIcon, color: "text-blue-500", bg: "bg-blue-50" },
  mention: { icon: AtSignIcon, color: "text-violet-500", bg: "bg-violet-50" },
  repost: { icon: RepeatIcon, color: "text-emerald-500", bg: "bg-emerald-50" },
  reply: { icon: MessageCircleIcon, color: "text-amber-500", bg: "bg-amber-50" },
  featured: { icon: StarIcon, color: "text-amber-500", bg: "bg-amber-50" },
}

type NotifType = keyof typeof notificationTypes

const notifications: { type: NotifType; users: { name: string; avatar: string }[]; text: string; time: string; preview?: string; isNew: boolean }[] = [
  {
    type: "like",
    users: [
      { name: "Marcus Chen", avatar: "from-blue-400 to-indigo-500" },
      { name: "Priya Patel", avatar: "from-amber-400 to-orange-500" },
      { name: "Kai Nakamura", avatar: "from-cyan-400 to-blue-500" },
    ],
    text: "and 14 others liked your post",
    time: "12m",
    preview: "Just shipped the new design system components...",
    isNew: true,
  },
  {
    type: "follow",
    users: [{ name: "Sofia Andersson", avatar: "from-violet-400 to-fuchsia-500" }],
    text: "started following you",
    time: "38m",
    isNew: true,
  },
  {
    type: "mention",
    users: [{ name: "Liam O'Brien", avatar: "from-emerald-400 to-teal-500" }],
    text: "mentioned you",
    time: "1h",
    preview: "@elenamarchetti your take on composable components was spot on. We just adopted...",
    isNew: true,
  },
  {
    type: "repost",
    users: [
      { name: "Nora Williams", avatar: "from-rose-300 to-red-400" },
      { name: "Amir Hassan", avatar: "from-lime-400 to-green-500" },
    ],
    text: "reposted your article",
    time: "3h",
    preview: "Why your component library needs fewer components",
    isNew: false,
  },
  {
    type: "reply",
    users: [{ name: "Yuki Tanaka", avatar: "from-purple-400 to-indigo-500" }],
    text: "replied to your post",
    time: "5h",
    preview: "This is exactly the approach we took at our company. The constraint of fewer...",
    isNew: false,
  },
  {
    type: "featured",
    users: [],
    text: "Your post was featured in the Design weekly digest",
    time: "8h",
    isNew: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialNotifications() {
  return (
    <motion.div
      className="mx-auto max-w-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-semibold tracking-tight">Notifications</CardTitle>
                <Badge variant="secondary" className="tabular-nums">3 new</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <SettingsIcon className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {notifications.map((notif, i) => {
                const config = notificationTypes[notif.type]
                const Icon = config.icon
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`flex gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer ${
                      notif.isNew ? "bg-muted/20" : ""
                    }`}
                  >
                    <div className={`flex size-8 items-center justify-center rounded-full shrink-0 ${config.bg}`}>
                      <Icon className={`size-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {notif.users.length > 0 && (
                              <div className="flex -space-x-1.5">
                                {notif.users.slice(0, 3).map((user) => (
                                  <div
                                    key={user.name}
                                    className={`size-5 rounded-full bg-gradient-to-br ${user.avatar} ring-2 ring-card`}
                                  />
                                ))}
                              </div>
                            )}
                            <span className="text-sm text-foreground">
                              {notif.users.length > 0 && (
                                <span className="font-semibold">{notif.users[0].name} </span>
                              )}
                              {notif.text}
                            </span>
                          </div>
                          {notif.preview && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{notif.preview}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {notif.isNew && <div className="size-2 rounded-full bg-blue-500" />}
                          <span className="text-xs text-muted-foreground tabular-nums">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
