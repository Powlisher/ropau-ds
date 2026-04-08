"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

interface CommentData {
  id: number
  author: string
  initials: string
  text: string
  time: string
  resolved: boolean
  resolvedBy?: string
}

const initialComments: CommentData[] = [
  {
    id: 1,
    author: "Bastien Moreau",
    initials: "BM",
    text: "The contrast ratio on the muted labels fails WCAG AA at 3.8:1. Needs to be at least 4.5:1 for text this small. Suggest darkening to slate-500 from slate-400.",
    time: "Mar 14",
    resolved: true,
    resolvedBy: "Chloe Durand",
  },
  {
    id: 2,
    author: "Chloe Durand",
    initials: "CD",
    text: "The loading skeleton doesn't match the actual layout — the card heights are different, causing a visible jump when data arrives. We need to measure and sync them.",
    time: "Mar 15",
    resolved: false,
  },
  {
    id: 3,
    author: "Antoine Marchand",
    initials: "AM",
    text: "Focus ring on the dropdown is invisible in dark mode. It's using ring-primary which maps to a dark blue on dark backgrounds. Need a separate dark mode token.",
    time: "Mar 15",
    resolved: true,
    resolvedBy: "Antoine Marchand",
  },
  {
    id: 4,
    author: "Elise Garnier",
    initials: "EG",
    text: "The date picker's month navigation buttons are only 24px — below our 32px minimum touch target for desktop. Mobile is even worse at 24px vs the 44px requirement.",
    time: "Mar 16",
    resolved: false,
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

export default function Comments09() {
  const [comments, setComments] = useState(initialComments)
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all")

  function toggleResolved(id: number) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, resolved: !c.resolved, resolvedBy: !c.resolved ? "You" : undefined }
          : c
      )
    )
  }

  const filtered = comments.filter((c) => {
    if (filter === "open") return !c.resolved
    if (filter === "resolved") return c.resolved
    return true
  })

  const openCount = comments.filter((c) => !c.resolved).length
  const resolvedCount = comments.filter((c) => c.resolved).length

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Review Comments</h2>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">Design audit — accessibility pass</p>
      </div>

      <div className="mb-4 flex items-center gap-1.5">
        {[
          { key: "all" as const, label: "All", count: comments.length },
          { key: "open" as const, label: "Open", count: openCount },
          { key: "resolved" as const, label: "Resolved", count: resolvedCount },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
            <span className="font-mono tabular-nums">{f.count}</span>
          </button>
        ))}
      </div>

      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((comment) => (
          <motion.div
            key={comment.id}
            variants={itemVariants}
            layout
            className={`rounded-xl px-5 py-4 ring-1 transition-colors ${
              comment.resolved
                ? "bg-card/60 ring-border/40"
                : "bg-card ring-border/60"
            }`}
            style={{ boxShadow: comment.resolved ? "none" : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-start gap-3">
              <Avatar size="sm" className={`mt-0.5 ${comment.resolved ? "opacity-50" : ""}`}>
                <AvatarFallback>{comment.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={`font-heading text-sm font-semibold tracking-tight ${comment.resolved ? "text-muted-foreground" : "text-foreground"}`}>
                    {comment.author}
                  </span>
                  <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{comment.time}</span>
                  {comment.resolved && comment.resolvedBy && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-2.5" />
                      Resolved by {comment.resolvedBy}
                    </span>
                  )}
                </div>
                <p className={`mt-1.5 text-sm leading-relaxed ${comment.resolved ? "text-muted-foreground line-through decoration-muted-foreground/20" : "text-foreground/90"}`}>
                  {comment.text}
                </p>
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant={comment.resolved ? "outline" : "default"}
                    onClick={() => toggleResolved(comment.id)}
                    className="h-7 text-xs gap-1.5"
                  >
                    {comment.resolved ? (
                      <>
                        <Circle className="size-3" />
                        Reopen
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-3" />
                        Resolve
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
