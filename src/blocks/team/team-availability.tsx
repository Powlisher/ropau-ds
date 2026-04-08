"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const statuses = [
  { name: "Claire Dubois", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face", initials: "CD", status: "available" as const, text: "In the office" },
  { name: "Marco Bellini", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face", initials: "MB", status: "busy" as const, text: "In a design review until 14:30" },
  { name: "Yuki Tanaka", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face", initials: "YT", status: "available" as const, text: "Working from home" },
  { name: "Omar Hassan", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face", initials: "OH", status: "away" as const, text: "PTO until April 12" },
  { name: "Sara Lindqvist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face", initials: "SL", status: "busy" as const, text: "Pair programming session" },
  { name: "Leo Fontaine", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face", initials: "LF", status: "available" as const, text: "Heads down, Slack open" },
]

const statusConfig = {
  available: { color: "bg-emerald-500", ring: "ring-emerald-500/20" },
  busy: { color: "bg-amber-500", ring: "ring-amber-500/20" },
  away: { color: "bg-slate-400", ring: "ring-slate-400/20" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TeamAvailability() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="w-full max-w-md"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Team Status
            </CardTitle>
            <span className="text-xs tabular-nums text-muted-foreground">
              {statuses.filter((s) => s.status === "available").length}/{statuses.length} available
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            {statuses.map((person) => (
              <motion.div
                key={person.name}
                variants={itemVariants}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/50"
              >
                <div className="relative">
                  <Avatar className="size-9">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="text-xs">{person.initials}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-card ${statusConfig[person.status].color}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{person.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{person.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
