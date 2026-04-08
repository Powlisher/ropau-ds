"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ReplyIcon, ForwardIcon, MoreHorizontalIcon, ArrowLeftIcon } from "lucide-react"
import { motion } from "framer-motion"

const thread = [
  {
    id: 1,
    sender: "Elise Morand",
    initials: "EM",
    email: "elise@studio-morand.fr",
    time: "Mar 28, 2:14 PM",
    body: "Hey, I've attached the updated brief for the Q2 campaign. Could you take a look at the timeline on page 3? The client moved the launch date up by two weeks, which affects the creative handoff.\n\nI've already flagged it with the dev team but wanted your input before we commit to the compressed schedule.",
    avatarColor: "oklch(0.55 0.18 250)",
  },
  {
    id: 2,
    sender: "You",
    initials: "PD",
    email: "paul@ropau.io",
    time: "Mar 28, 4:32 PM",
    body: "Thanks for the heads up. I reviewed the timeline and the creative handoff on April 8 is tight but doable if we skip the second review round and go straight to client presentation.\n\nOne concern: the motion design deliverables on page 5 assume 3 days, which isn't realistic for the complexity level. Can we negotiate 5 days there?",
    avatarColor: "oklch(0.55 0.15 160)",
  },
  {
    id: 3,
    sender: "Elise Morand",
    initials: "EM",
    email: "elise@studio-morand.fr",
    time: "Today, 10:24 AM",
    body: "Good call on the motion timeline. I pushed it to 5 days and the client agreed. Updated brief attached.\n\nCan we sync briefly tomorrow to align on the asset specs? I want to make sure we're not duplicating work with the illustration team.",
    avatarColor: "oklch(0.55 0.18 250)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox02() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="size-8">
              <ArrowLeftIcon className="size-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Q2 Campaign Brief - Review Needed</h2>
              <p className="text-xs text-muted-foreground">3 messages in thread</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {thread.map((msg, i) => (
            <motion.div key={msg.id} variants={itemVariants}>
              <div className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback
                      className="text-[11px] font-semibold text-white"
                      style={{ backgroundColor: msg.avatarColor }}
                    >
                      {msg.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold">{msg.sender}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{msg.email}</span>
                      </div>
                      <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">{msg.time}</span>
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                      {msg.body}
                    </div>
                  </div>
                </div>
              </div>
              {i < thread.length - 1 && <Separator />}
            </motion.div>
          ))}

          <Separator />
          <div className="flex items-center gap-2 px-6 py-3">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ReplyIcon className="size-3.5" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <ForwardIcon className="size-3.5" />
              Forward
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
