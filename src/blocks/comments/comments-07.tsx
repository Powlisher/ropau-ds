"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Pencil, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface EditHistory {
  text: string
  editedAt: string
}

interface CommentData {
  id: number
  author: string
  initials: string
  text: string
  time: string
  edited: boolean
  editHistory: EditHistory[]
}

const comments: CommentData[] = [
  {
    id: 1,
    author: "Elise Garnier",
    initials: "EG",
    text: "The auth middleware needs to check for both the session cookie and the Bearer token. Currently it only validates the cookie, which breaks API consumers.",
    time: "10:23 AM",
    edited: false,
    editHistory: [],
  },
  {
    id: 2,
    author: "Theo Blanchard",
    initials: "TB",
    text: "Updated: we also need to handle the case where the token is expired but the refresh token is still valid. I've added a silent refresh flow in the PR.",
    time: "10:47 AM",
    edited: true,
    editHistory: [
      { text: "We also need to handle the case where the token is expired.", editedAt: "10:47 AM" },
      { text: "Updated: we also need to handle the case where the token is expired but the refresh token is still valid. I've added a silent refresh flow in the PR.", editedAt: "11:02 AM" },
    ],
  },
  {
    id: 3,
    author: "Margaux Lefevre",
    initials: "ML",
    text: "Good call. I tested the refresh flow locally — works for same-origin requests. Cross-origin will need the CORS headers updated on the auth service. I'll handle that in a follow-up.",
    time: "11:19 AM",
    edited: true,
    editHistory: [
      { text: "Good call. I tested the refresh flow locally — works for same-origin requests.", editedAt: "11:19 AM" },
      { text: "Good call. I tested the refresh flow locally — works for same-origin requests. Cross-origin will need the CORS headers updated.", editedAt: "11:24 AM" },
      { text: "Good call. I tested the refresh flow locally — works for same-origin requests. Cross-origin will need the CORS headers updated on the auth service. I'll handle that in a follow-up.", editedAt: "11:31 AM" },
    ],
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

function CommentCard({ comment }: { comment: CommentData }) {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      className="rounded-xl bg-card px-5 py-4 ring-1 ring-border/60"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-start gap-3">
        <Avatar size="sm" className="mt-0.5">
          <AvatarFallback>{comment.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{comment.author}</span>
            <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{comment.time}</span>
            {comment.edited && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/8 px-1.5 py-px text-[10px] font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/15 transition-colors"
              >
                <Pencil className="size-2.5" />
                edited
                {comment.editHistory.length > 1 && (
                  <span className="font-mono tabular-nums">({comment.editHistory.length}x)</span>
                )}
              </button>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{comment.text}</p>

          <AnimatePresence>
            {showHistory && comment.editHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="rounded-lg bg-muted/50 px-3.5 py-3 ring-1 ring-border/40">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2">Edit history</p>
                  <div className="space-y-2.5">
                    {comment.editHistory.map((edit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Clock className="mt-0.5 size-3 shrink-0 text-muted-foreground/60" />
                        <div className="min-w-0">
                          <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{edit.editedAt}</span>
                          <p className={`text-xs leading-relaxed ${i < comment.editHistory.length - 1 ? "text-muted-foreground line-through decoration-muted-foreground/30" : "text-foreground/80"}`}>
                            {edit.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function Comments07() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Thread</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Auth middleware discussion</p>
      </div>
      <motion.div
        className="space-y-2.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </motion.div>
    </div>
  )
}
