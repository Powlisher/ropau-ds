"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, CornerDownRight } from "lucide-react"
import { motion } from "framer-motion"

interface Reply {
  id: number
  author: string
  initials: string
  text: string
  time: string
}

interface Comment {
  id: number
  author: string
  initials: string
  text: string
  time: string
  replies: Reply[]
}

const threads: Comment[] = [
  {
    id: 1,
    author: "Camille Renard",
    initials: "CR",
    text: "The onboarding flow feels sluggish after step 3 — I think the animation duration on the progress bar is too long. Users are clicking next before it finishes.",
    time: "11:42 AM",
    replies: [
      { id: 11, author: "Nolan Mercier", initials: "NM", text: "Good catch. I measured it at 800ms which is way too much for a micro-interaction. Dropping to 280ms with a spring easing should feel snappier.", time: "11:58 AM" },
      { id: 12, author: "Camille Renard", initials: "CR", text: "Perfect — also worth checking the mobile variant, it felt even worse on my Pixel.", time: "12:03 PM" },
    ],
  },
  {
    id: 2,
    author: "Elise Garnier",
    initials: "EG",
    text: "Can we revisit the empty state on the dashboard? Right now it just shows a gray box with no guidance. New users won't know what to do.",
    time: "1:17 PM",
    replies: [
      { id: 21, author: "Theo Blanchard", initials: "TB", text: "Agreed. I'll draft something with an illustration and a CTA pointing to the setup wizard.", time: "1:34 PM" },
    ],
  },
  {
    id: 3,
    author: "Nolan Mercier",
    initials: "NM",
    text: "Heads up — the API response shape changed for /v2/metrics. The `trend` field is now nested under `meta`. I've updated the types but frontend needs to adapt the chart component.",
    time: "3:05 PM",
    replies: [],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function ThreadItem({ comment }: { comment: Comment }) {
  const [expanded, setExpanded] = useState(true)
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  return (
    <motion.div
      variants={itemVariants}
      className="rounded-xl bg-card ring-1 ring-border/60"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
    >
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-start gap-3">
          <Avatar size="sm" className="mt-0.5">
            <AvatarFallback>{comment.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{comment.author}</span>
              <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{comment.time}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{comment.text}</p>
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="border-t border-border/50 px-5 py-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 space-y-3 pl-2"
            >
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2.5">
                  <CornerDownRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/50" />
                  <Avatar size="sm" className="mt-0.5">
                    <AvatarFallback>{reply.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-[13px] font-medium tracking-tight text-foreground">{reply.author}</span>
                      <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{reply.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-foreground/85">{reply.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      <div className="border-t border-border/50 px-5 py-2.5">
        {replyOpen ? (
          <div className="flex items-center gap-2">
            <Input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 h-8 text-sm bg-muted/40"
            />
            <Button size="sm" variant="ghost" onClick={() => { setReplyOpen(false); setReplyText("") }}>
              Cancel
            </Button>
            <Button size="sm" disabled={!replyText.trim()}>
              Reply
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setReplyOpen(true)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Reply
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function Comments01() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Discussion</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">3 threads, 4 participants</p>
      </div>
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {threads.map((thread) => (
          <ThreadItem key={thread.id} comment={thread} />
        ))}
      </motion.div>
    </div>
  )
}
