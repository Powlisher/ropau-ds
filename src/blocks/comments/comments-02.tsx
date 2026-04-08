"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const reactions = ["👍", "❤️", "😂", "🎉", "😮", "🤔"] as const

interface CommentData {
  id: number
  author: string
  initials: string
  text: string
  time: string
  reactions: Record<string, number>
  userReacted: string[]
}

const initialComments: CommentData[] = [
  {
    id: 1,
    author: "Margaux Lefevre",
    initials: "ML",
    text: "Just shipped the new search indexer — latency dropped from 340ms to 89ms on the P95. The trick was switching to a trie-based prefix matcher instead of regex.",
    time: "9:48 AM",
    reactions: { "🎉": 4, "👍": 2 },
    userReacted: ["🎉"],
  },
  {
    id: 2,
    author: "Samir Kaddouri",
    initials: "SK",
    text: "Has anyone else noticed the tooltip z-index issue on the settings page? It renders behind the sticky header on scroll. Probably needs a portal.",
    time: "10:12 AM",
    reactions: { "🤔": 1 },
    userReacted: [],
  },
  {
    id: 3,
    author: "Ines Beaumont",
    initials: "IB",
    text: "The client approved the revised color system! We're going live with the warm neutrals next sprint. I'll update the Figma tokens tonight.",
    time: "11:35 AM",
    reactions: { "❤️": 3, "🎉": 7, "👍": 1 },
    userReacted: ["❤️", "🎉"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function ReactionBar({ comment, onToggle }: { comment: CommentData; onToggle: (emoji: string) => void }) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Object.entries(comment.reactions)
        .filter(([, count]) => count > 0)
        .map(([emoji, count]) => {
          const active = comment.userReacted.includes(emoji)
          return (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => onToggle(emoji)}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs tabular-nums transition-colors ${
                active
                  ? "bg-primary/10 ring-1 ring-primary/30 text-foreground"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted"
              }`}
            >
              <span>{emoji}</span>
              <span className="font-mono text-[11px]">{count}</span>
            </motion.button>
          )
        })}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          onClick={() => setShowPicker(!showPicker)}
          className="flex size-6 items-center justify-center rounded-full text-muted-foreground/60 hover:bg-muted hover:text-muted-foreground transition-colors text-xs"
        >
          +
        </motion.button>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="absolute bottom-full left-0 mb-1.5 flex gap-0.5 rounded-lg bg-card p-1.5 ring-1 ring-border/60 z-10"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
          >
            {reactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => { onToggle(emoji); setShowPicker(false) }}
                className="flex size-7 items-center justify-center rounded-md hover:bg-muted transition-colors text-sm"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function Comments02() {
  const [comments, setComments] = useState(initialComments)

  function toggleReaction(commentId: number, emoji: string) {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c
        const alreadyReacted = c.userReacted.includes(emoji)
        return {
          ...c,
          reactions: {
            ...c.reactions,
            [emoji]: (c.reactions[emoji] || 0) + (alreadyReacted ? -1 : 1),
          },
          userReacted: alreadyReacted
            ? c.userReacted.filter((e) => e !== emoji)
            : [...c.userReacted, emoji],
        }
      })
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Activity</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Recent comments from the team</p>
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
                <div className="mt-3">
                  <ReactionBar comment={comment} onToggle={(emoji) => toggleReaction(comment.id, emoji)} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
