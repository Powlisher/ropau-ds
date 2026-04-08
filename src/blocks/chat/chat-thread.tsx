"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon, MessageSquareIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Reply = { id: number; sender: string; initials: string; text: string; time: string }
type Message = {
  id: number
  sender: "user" | "other"
  initials: string
  name: string
  text: string
  time: string
  replies: Reply[]
}

const messages: Message[] = [
  {
    id: 1, sender: "other", initials: "EL", name: "Elena Lorca",
    text: "We need to decide on the auth strategy before the sprint ends. Currently evaluating three options: session-based, JWT stateless, and a hybrid approach.",
    time: "2:30 PM",
    replies: [
      { id: 101, sender: "MP", initials: "MP", text: "JWT stateless has been painful in previous projects — token revocation is a nightmare. I'd lean hybrid.", time: "2:34 PM" },
      { id: 102, sender: "user", initials: "ME", text: "Hybrid +1. Short-lived JWT for API, httpOnly cookie for session. Best of both worlds.", time: "2:37 PM" },
      { id: 103, sender: "EL", initials: "EL", text: "Good consensus. I'll draft the RFC tonight.", time: "2:40 PM" },
    ],
  },
  {
    id: 2, sender: "user", initials: "ME", name: "You",
    text: "Separate topic — the CI pipeline is taking 14 minutes. That's way too slow for our iteration speed.",
    time: "2:45 PM",
    replies: [
      { id: 201, sender: "EL", initials: "EL", text: "Agreed. Most of the time is in the e2e suite. We could parallelize the Playwright tests across 3 workers.", time: "2:48 PM" },
    ],
  },
  {
    id: 3, sender: "other", initials: "EL", name: "Elena Lorca",
    text: "Also — client demo is Thursday at 3pm CET. Everyone please have their sections ready by Wednesday EOD.",
    time: "3:02 PM",
    replies: [],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function ThreadReplies({ replies, isOpen, onToggle }: { replies: Reply[]; isOpen: boolean; onToggle: () => void }) {
  if (replies.length === 0) return null

  return (
    <div className="mt-1">
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
      >
        <MessageSquareIcon className="size-3" />
        {replies.length} {replies.length === 1 ? "reply" : "replies"}
        {isOpen ? <ChevronUpIcon className="size-3" /> : <ChevronDownIcon className="size-3" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="overflow-hidden"
          >
            <div className="mt-2 flex flex-col gap-2.5 border-l-2 border-muted pl-3">
              {replies.map((reply) => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex gap-2"
                >
                  <Avatar size="sm" className="mt-0.5 shrink-0">
                    <AvatarFallback>{reply.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-medium">{reply.initials === "ME" ? "You" : reply.sender}</span>
                      <span className="text-[11px] tabular-nums tracking-wide text-muted-foreground">{reply.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">{reply.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ChatThread() {
  const [input, setInput] = useState("")
  const [openThreads, setOpenThreads] = useState<Set<number>>(new Set([1]))

  function toggleThread(id: number) {
    setOpenThreads((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div
      className="mx-auto flex h-[600px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <Avatar size="sm">
          <AvatarFallback>EL</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-medium tracking-tight">Engineering Channel</p>
          <p className="text-xs text-muted-foreground">3 members</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          className="flex flex-col gap-5 p-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              className="flex gap-2.5"
            >
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{msg.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{msg.name}</span>
                  <span className="text-[11px] tabular-nums tracking-wide text-muted-foreground">{msg.time}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">{msg.text}</p>
                <ThreadReplies
                  replies={msg.replies}
                  isOpen={openThreads.has(msg.id)}
                  onToggle={() => toggleThread(msg.id)}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>

      <div className="flex items-center gap-2 border-t bg-muted/30 px-4 py-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply to thread..."
          className="flex-1 bg-background"
        />
        <Button size="icon" disabled={!input.trim()}>
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
