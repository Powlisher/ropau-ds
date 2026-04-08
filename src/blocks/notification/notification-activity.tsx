"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const activityGroups = [
  {
    date: "Today",
    items: [
      { id: 1, initials: "CB", name: "Camille Beaumont", action: "pushed 3 commits to", target: "feat/dark-mode", time: "14 min ago" },
      { id: 2, initials: "RG", name: "Raphael Giroud", action: "merged PR #312 into", target: "main", time: "42 min ago" },
      { id: 3, initials: "IT", name: "Ines Takahashi", action: "opened issue", target: "Fix tooltip z-index on mobile", time: "1h ago" },
      { id: 4, initials: "HD", name: "Hugo Delacroix", action: "deployed", target: "v2.15.0 to staging", time: "2h ago" },
    ],
  },
  {
    date: "Yesterday",
    items: [
      { id: 5, initials: "NF", name: "Nadia Ferreira", action: "updated", target: "Brand guidelines v3.2", time: "Yesterday 4:18 PM" },
      { id: 6, initials: "TM", name: "Theo Marchand", action: "resolved", target: "5 support tickets", time: "Yesterday 2:30 PM" },
      { id: 7, initials: "CB", name: "Camille Beaumont", action: "created project", target: "Meridian Mobile App", time: "Yesterday 11:05 AM" },
    ],
  },
  {
    date: "April 5",
    items: [
      { id: 8, initials: "RG", name: "Raphael Giroud", action: "completed sprint", target: "Sprint 14 — Component Library", time: "Apr 5 5:00 PM" },
      { id: 9, initials: "IT", name: "Ines Takahashi", action: "shared", target: "Accessibility audit results", time: "Apr 5 10:22 AM" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NotificationActivity() {
  return (
    <Card
      className="mx-auto max-w-md"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activityGroups.map((group) => (
            <div key={group.date}>
              <p className="mb-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">{group.date}</p>
              <div className="relative flex flex-col gap-0.5 pl-5">
                <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
                {group.items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="relative flex items-start gap-2.5 py-2"
                  >
                    <div className="absolute -left-5 top-2.5 z-10">
                      <Avatar size="sm" className="ring-2 ring-card">
                        <AvatarFallback>{item.initials}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="min-w-0 flex-1 pl-3">
                      <p className="text-sm leading-snug">
                        <span className="font-medium">{item.name}</span>{" "}
                        <span className="text-muted-foreground">{item.action}</span>{" "}
                        <span className="font-medium">{item.target}</span>
                      </p>
                      <p className="mt-0.5 text-[11px] tabular-nums tracking-wide text-muted-foreground">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
