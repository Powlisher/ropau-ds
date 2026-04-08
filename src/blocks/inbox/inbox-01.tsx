"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon, PaperclipIcon } from "lucide-react"
import { motion } from "framer-motion"

const emails = [
  {
    id: 1,
    sender: "Elise Morand",
    initials: "EM",
    subject: "Q2 Campaign Brief - Review Needed",
    preview: "Hey, I've attached the updated brief for the Q2 campaign. Could you take a look at the timeline on page 3? The client moved the launch...",
    time: "10:24 AM",
    unread: true,
    starred: true,
    hasAttachment: true,
    avatarColor: "oklch(0.55 0.18 250)",
  },
  {
    id: 2,
    sender: "Thomas Vigier",
    initials: "TV",
    subject: "Re: API rate limits discussion",
    preview: "I checked the logs and we're hitting the 429 threshold around 3 PM daily. The burst pattern from the mobile app is the main culprit...",
    time: "9:47 AM",
    unread: true,
    starred: false,
    hasAttachment: false,
    avatarColor: "oklch(0.55 0.15 160)",
  },
  {
    id: 3,
    sender: "Amara Diallo",
    initials: "AD",
    subject: "Design tokens migration plan",
    preview: "Here's the migration plan for moving from CSS variables to the new design token format. Phase 1 covers the color palette and...",
    time: "Yesterday",
    unread: false,
    starred: false,
    hasAttachment: true,
    avatarColor: "oklch(0.65 0.17 82)",
  },
  {
    id: 4,
    sender: "Hugo Castellan",
    initials: "HC",
    subject: "Onboarding flow metrics",
    preview: "The new onboarding flow dropped completion from 67% to 54%. I think the additional verification step is the bottleneck. Can we...",
    time: "Yesterday",
    unread: false,
    starred: true,
    hasAttachment: false,
    avatarColor: "oklch(0.60 0.18 30)",
  },
  {
    id: 5,
    sender: "Lea Richter",
    initials: "LR",
    subject: "Invoice #INV-2847 attached",
    preview: "Please find the invoice for March services. Payment terms are net 30 as agreed. Let me know if you need the breakdown by project...",
    time: "Mar 28",
    unread: false,
    starred: false,
    hasAttachment: true,
    avatarColor: "oklch(0.55 0.12 280)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox01() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold tracking-tight">Inbox</CardTitle>
          <Badge variant="secondary" className="tabular-nums text-[10px]">
            2 unread
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {emails.map((email, i) => (
            <motion.div
              key={email.id}
              variants={itemVariants}
              whileHover={{ backgroundColor: "oklch(0.97 0 0)" }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="cursor-pointer border-b border-border/50 last:border-0"
            >
              <div className="flex gap-3 px-6 py-3.5">
                <Avatar className="size-9 shrink-0">
                  <AvatarFallback
                    className="text-[11px] font-semibold text-white"
                    style={{ backgroundColor: email.avatarColor }}
                  >
                    {email.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`truncate text-sm ${email.unread ? "font-semibold" : "font-medium text-muted-foreground"}`}>
                        {email.sender}
                      </span>
                      {email.hasAttachment && <PaperclipIcon className="size-3 shrink-0 text-muted-foreground/50" />}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {email.starred && <StarIcon className="size-3 fill-amber-400 text-amber-400" />}
                      <span className="text-[11px] tabular-nums text-muted-foreground">{email.time}</span>
                    </div>
                  </div>
                  <div className={`mt-0.5 truncate text-sm ${email.unread ? "font-medium" : "text-muted-foreground"}`}>
                    {email.subject}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground/70 leading-relaxed">
                    {email.preview}
                  </div>
                </div>
                {email.unread && (
                  <div className="mt-2 shrink-0">
                    <div className="size-2 rounded-full" style={{ backgroundColor: "oklch(0.55 0.18 250)" }} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
