"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface CommentData {
  id: number
  author: string
  initials: string
  time: string
  segments: Array<{ type: "text"; content: string } | { type: "mention"; name: string }>
}

const comments: CommentData[] = [
  {
    id: 1,
    author: "Antoine Marchand",
    initials: "AM",
    time: "2:14 PM",
    segments: [
      { type: "mention", name: "Lea" },
      { type: "text", content: " can you take a look at the sidebar refactor? I moved the nav items into a config array but the active state detection for nested routes is off. " },
      { type: "mention", name: "Hugo" },
      { type: "text", content: " also flagged this yesterday." },
    ],
  },
  {
    id: 2,
    author: "Lea Fontaine",
    initials: "LF",
    time: "2:31 PM",
    segments: [
      { type: "text", content: "On it. " },
      { type: "mention", name: "Antoine" },
      { type: "text", content: " — are you using " },
      { type: "text", content: "pathname.startsWith() or exact match? The nested routes under /settings/* need startsWith but the top-level ones should be exact." },
    ],
  },
  {
    id: 3,
    author: "Hugo Deschamps",
    initials: "HD",
    time: "2:45 PM",
    segments: [
      { type: "text", content: "Yeah, the issue is specifically with /settings/billing vs /settings/billing/invoices — both highlight. " },
      { type: "mention", name: "Lea" },
      { type: "text", content: " I'd suggest a depth check: match the segment count, not just the prefix. Worked well in the previous project " },
      { type: "mention", name: "Samir" },
      { type: "text", content: " and I did together." },
    ],
  },
  {
    id: 4,
    author: "Samir Kaddouri",
    initials: "SK",
    time: "3:08 PM",
    segments: [
      { type: "text", content: "Confirmed. The pattern was: split both paths by /, compare lengths, and only match if route depth equals or exceeds the nav item depth. " },
      { type: "mention", name: "Antoine" },
      { type: "text", content: " happy to pair on this if you want." },
    ],
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

function RenderSegments({ segments }: { segments: CommentData["segments"] }) {
  return (
    <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
      {segments.map((seg, i) =>
        seg.type === "mention" ? (
          <span
            key={i}
            className="inline-flex items-baseline rounded-sm bg-primary/10 px-1 py-px text-[13px] font-medium text-primary cursor-pointer hover:bg-primary/15 transition-colors"
          >
            @{seg.name}
          </span>
        ) : (
          <span key={i}>{seg.content}</span>
        )
      )}
    </p>
  )
}

export default function Comments05() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Mentions</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">4 comments mentioning team members</p>
      </div>
      <motion.div
        className="space-y-2.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
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
                <RenderSegments segments={comment.segments} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
