"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Code, Link, List, ListOrdered, AtSign, Paperclip, SendIcon } from "lucide-react"
import { motion } from "framer-motion"

const toolbarActions = [
  { icon: Bold, label: "Bold", shortcut: "B" },
  { icon: Italic, label: "Italic", shortcut: "I" },
  { icon: Code, label: "Code", shortcut: "E" },
  { icon: Link, label: "Link", shortcut: "K" },
  { icon: List, label: "Bullet list", shortcut: null },
  { icon: ListOrdered, label: "Numbered list", shortcut: null },
]

interface ExistingComment {
  id: number
  author: string
  initials: string
  text: string
  time: string
}

const existingComments: ExistingComment[] = [
  {
    id: 1,
    author: "Hugo Deschamps",
    initials: "HD",
    text: "The analytics dashboard needs a date range picker in the header. Right now users can only see the default 7-day window with no way to change it.",
    time: "11:04 AM",
  },
  {
    id: 2,
    author: "Ines Beaumont",
    initials: "IB",
    text: "Agreed. I'd also add preset ranges (24h, 7d, 30d, 90d) as quick-select chips before the custom picker. That covers 80% of use cases without opening the calendar.",
    time: "11:22 AM",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Comments10() {
  const [text, setText] = useState("")
  const [focused, setFocused] = useState(false)

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Discussion</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Analytics dashboard — feature request</p>
      </div>

      <motion.div
        className="space-y-2.5 mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {existingComments.map((comment) => (
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
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.2 }}
        className={`rounded-xl bg-card ring-1 transition-all ${
          focused ? "ring-primary/40 ring-2" : "ring-border/60"
        }`}
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-1 border-b border-border/50 px-3 py-1.5">
          {toolbarActions.map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title={action.shortcut ? `${action.label} (Cmd+${action.shortcut})` : action.label}
            >
              <action.icon className="size-3.5" />
            </motion.button>
          ))}
          <div className="mx-1.5 h-4 w-px bg-border/60" />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Mention someone"
          >
            <AtSign className="size-3.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Attach file"
          >
            <Paperclip className="size-3.5" />
          </motion.button>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-start gap-3">
            <Avatar size="sm" className="mt-0.5">
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Add your comment..."
              rows={3}
              className="flex-1 resize-none bg-transparent text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/50 px-4 py-2.5">
          <p className="text-[11px] text-muted-foreground">
            Markdown supported
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Preview
            </Button>
            <Button size="sm" disabled={!text.trim()} className="h-7 text-xs gap-1.5">
              <SendIcon className="size-3" />
              Comment
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
