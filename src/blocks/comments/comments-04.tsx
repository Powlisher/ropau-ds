"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Image, Film, Paperclip } from "lucide-react"
import { motion } from "framer-motion"

interface Attachment {
  name: string
  size: string
  type: "image" | "document" | "video"
}

interface CommentData {
  id: number
  author: string
  initials: string
  text: string
  time: string
  attachments: Attachment[]
}

const comments: CommentData[] = [
  {
    id: 1,
    author: "Agathe Perrin",
    initials: "AP",
    text: "Here are the final mockups for the billing page. I've included both the desktop and tablet variants. Let me know if the spacing on the invoice table feels right.",
    time: "3:22 PM",
    attachments: [
      { name: "billing-desktop-v3.png", size: "1.4 MB", type: "image" },
      { name: "billing-tablet-v3.png", size: "892 KB", type: "image" },
      { name: "spacing-notes.pdf", size: "234 KB", type: "document" },
    ],
  },
  {
    id: 2,
    author: "Bastien Moreau",
    initials: "BM",
    text: "Recorded a quick walkthrough of the interaction patterns. The hover states on row 3 and 7 still need work — they flash on fast mouse movement.",
    time: "4:10 PM",
    attachments: [
      { name: "interaction-review.mp4", size: "12.7 MB", type: "video" },
    ],
  },
  {
    id: 3,
    author: "Chloe Durand",
    initials: "CD",
    text: "Updated the component spec with the new token values. Also attaching the audit spreadsheet Margaux requested.",
    time: "5:48 PM",
    attachments: [
      { name: "component-spec-v2.1.pdf", size: "1.1 MB", type: "document" },
      { name: "token-audit-q1.pdf", size: "456 KB", type: "document" },
      { name: "preview-dark-mode.png", size: "2.3 MB", type: "image" },
      { name: "preview-light-mode.png", size: "2.1 MB", type: "image" },
    ],
  },
]

const typeIcon = {
  image: Image,
  document: FileText,
  video: Film,
}

const typeBg = {
  image: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  document: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  video: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Comments04() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex items-center gap-2">
        <Paperclip className="size-4 text-muted-foreground" />
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Attachments</h2>
        <span className="ml-auto text-xs font-mono tabular-nums text-muted-foreground">9 files</span>
      </div>
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            variants={itemVariants}
            className="rounded-xl bg-card px-5 py-4 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-start gap-3">
              <Avatar size="sm" className="mt-0.5">
                <AvatarFallback>{comment.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{comment.author}</span>
                  <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{comment.time}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{comment.text}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {comment.attachments.map((att) => {
                    const Icon = typeIcon[att.type]
                    return (
                      <motion.button
                        key={att.name}
                        whileHover={{ y: -1 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                        className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2 text-left ring-1 ring-border/40 hover:ring-border/70 transition-all"
                      >
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${typeBg[att.type]}`}>
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-foreground">{att.name}</p>
                          <p className="text-[11px] font-mono tabular-nums text-muted-foreground">{att.size}</p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
