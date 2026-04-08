"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronUp, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

interface CommentData {
  id: number
  author: string
  initials: string
  text: string
  time: string
  score: number
  userVote: -1 | 0 | 1
}

const initialComments: CommentData[] = [
  {
    id: 1,
    author: "Samir Kaddouri",
    initials: "SK",
    text: "We should adopt a monorepo structure now rather than later. The shared types between API and frontend are already causing drift — I've seen 3 bugs this month from type mismatches after deploys.",
    time: "Yesterday",
    score: 14,
    userVote: 0,
  },
  {
    id: 2,
    author: "Lea Fontaine",
    initials: "LF",
    text: "Counter-proposal: keep the repos separate but use a shared package published to our private registry. Monorepos add significant CI complexity and our team is only 6 people.",
    time: "Yesterday",
    score: 9,
    userVote: 1,
  },
  {
    id: 3,
    author: "Romain Vasseur",
    initials: "RV",
    text: "I've worked with both approaches at scale. The monorepo wins for type safety but Lea's right about CI. Turborepo solves most of the pain though — the caching alone saved us 40% on build times at my last company.",
    time: "Today",
    score: 23,
    userVote: 0,
  },
  {
    id: 4,
    author: "Agathe Perrin",
    initials: "AP",
    text: "Whatever we pick, can we please also fix the deploy preview URLs? They've been broken since the Vercel migration and it's blocking design reviews.",
    time: "Today",
    score: 7,
    userVote: -1,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Comments08() {
  const [comments, setComments] = useState(initialComments)

  function vote(commentId: number, direction: 1 | -1) {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c
        const wasVote = c.userVote
        const newVote = wasVote === direction ? 0 : direction
        return {
          ...c,
          score: c.score - wasVote + newVote,
          userVote: newVote as -1 | 0 | 1,
        }
      })
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">RFC Discussion</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Monorepo vs multi-repo — 4 responses</p>
      </div>
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            variants={itemVariants}
            className="flex gap-3 rounded-xl bg-card px-4 py-4 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex flex-col items-center gap-0.5 pt-0.5">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => vote(comment.id, 1)}
                className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                  comment.userVote === 1
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <ChevronUp className="size-4" />
              </motion.button>
              <span className={`text-xs font-mono font-semibold tabular-nums ${
                comment.score > 15 ? "text-primary" : comment.score < 0 ? "text-destructive" : "text-foreground"
              }`}>
                {comment.score}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => vote(comment.id, -1)}
                className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                  comment.userVote === -1
                    ? "bg-destructive/10 text-destructive"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <ChevronDown className="size-4" />
              </motion.button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2.5">
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
