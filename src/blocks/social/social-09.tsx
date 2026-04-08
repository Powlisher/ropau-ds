"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, EditIcon, CheckCheckIcon, CheckIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const conversations = [
  {
    name: "Marcus Chen",
    avatar: "from-blue-400 to-indigo-500",
    lastMessage: "The PR looks great, just left a few comments on the spacing tokens",
    time: "2m",
    unread: 3,
    online: true,
    read: false,
  },
  {
    name: "Priya Patel",
    avatar: "from-amber-400 to-orange-500",
    lastMessage: "Can we sync on the dashboard layouts tomorrow?",
    time: "18m",
    unread: 1,
    online: true,
    read: false,
  },
  {
    name: "Design Team",
    avatar: "from-violet-400 to-fuchsia-500",
    lastMessage: "Sofia: I just pushed the updated icon set to the shared library",
    time: "1h",
    unread: 0,
    online: false,
    read: true,
    isGroup: true,
    members: 8,
  },
  {
    name: "Liam O'Brien",
    avatar: "from-emerald-400 to-teal-500",
    lastMessage: "Thanks for the feedback! I'll iterate on the prototype this weekend",
    time: "3h",
    unread: 0,
    online: false,
    read: true,
  },
  {
    name: "Sofia Andersson",
    avatar: "from-rose-400 to-pink-500",
    lastMessage: "You: Here's the Figma link for the new components",
    time: "5h",
    unread: 0,
    online: false,
    read: true,
  },
  {
    name: "Kai Nakamura",
    avatar: "from-cyan-400 to-blue-500",
    lastMessage: "That animation spring config is perfect, adding it to our utils",
    time: "1d",
    unread: 0,
    online: true,
    read: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialMessages() {
  return (
    <motion.div
      className="mx-auto max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-semibold tracking-tight">Messages</CardTitle>
                <Badge variant="secondary" className="tabular-nums">4</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <EditIcon className="size-3.5" />
              </Button>
            </div>
            <div className="relative mt-2">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {conversations.map((convo, i) => (
                <motion.div
                  key={convo.name}
                  variants={itemVariants}
                  className={`flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer ${
                    convo.unread > 0 ? "bg-muted/15" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className={`size-11 rounded-full bg-gradient-to-br ${convo.avatar}`} />
                    {convo.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm ${convo.unread > 0 ? "font-bold" : "font-medium"} text-foreground`}>
                          {convo.name}
                        </span>
                        {(convo as any).isGroup && (
                          <Badge variant="secondary" className="text-[9px] px-1 py-0">
                            {(convo as any).members}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums">{convo.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className={`text-xs truncate ${convo.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {convo.lastMessage}
                      </p>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {convo.read && convo.unread === 0 && (
                          <CheckCheckIcon className="size-3.5 text-blue-500" />
                        )}
                        {!convo.read && convo.unread === 0 && (
                          <CheckIcon className="size-3.5 text-muted-foreground" />
                        )}
                        {convo.unread > 0 && (
                          <div className="flex size-5 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold tabular-nums">
                            {convo.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
