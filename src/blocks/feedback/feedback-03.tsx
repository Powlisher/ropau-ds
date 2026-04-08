"use client"

import { useState } from "react"
import { ChevronUp, Lightbulb, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const initialRequests = [
  {
    id: 1,
    title: "Keyboard shortcuts for bulk actions",
    description: "Being able to select multiple items and perform actions via keyboard would save a ton of time for power users managing large libraries.",
    author: "Camille Beaumont",
    initials: "CB",
    votes: 87,
    comments: 14,
    voted: false,
  },
  {
    id: 2,
    title: "Dark mode for the mobile app",
    description: "Desktop version has dark mode but mobile is stuck on light. Working late at night with the bright screen is rough.",
    author: "Nathan Royer",
    initials: "NR",
    votes: 134,
    comments: 23,
    voted: true,
  },
  {
    id: 3,
    title: "Export to CSV from analytics dashboard",
    description: "We need to pull reports into our internal BI tool. Right now we're screenshotting charts which is embarrassing.",
    author: "Elise Morvan",
    initials: "EM",
    votes: 56,
    comments: 8,
    voted: false,
  },
]

export default function Feedback03() {
  const [requests, setRequests] = useState(initialRequests)

  function toggleVote(id: number) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, voted: !r.voted, votes: r.voted ? r.votes - 1 : r.votes + 1 }
          : r
      )
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30 ring-1 ring-amber-200/60 dark:ring-amber-800/40">
          <Lightbulb className="size-4.5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Feature requests</h2>
          <p className="text-sm text-muted-foreground">Vote for what matters to you</p>
        </div>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {requests.map((req) => (
          <motion.div
            key={req.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex gap-3 rounded-xl bg-card px-4 py-4 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              onClick={() => toggleVote(req.id)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-2 ring-1 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                req.voted
                  ? "bg-primary/10 ring-primary/30 text-primary"
                  : "bg-muted/30 ring-border/40 text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <ChevronUp className="size-4" />
              <span className="text-sm font-semibold tabular-nums">{req.votes}</span>
            </motion.button>

            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-sm font-semibold tracking-tight text-foreground">{req.title}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground/75 line-clamp-2">{req.description}</p>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Avatar size="sm" className="size-5">
                    <AvatarFallback className="text-[9px]">{req.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{req.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="size-3 text-muted-foreground/60" />
                  <span className="text-xs font-mono tabular-nums text-muted-foreground">{req.comments}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
