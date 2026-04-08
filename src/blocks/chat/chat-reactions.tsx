"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon, PlusIcon } from "lucide-react"
import { motion } from "framer-motion"

type Reaction = { emoji: string; count: number; reacted: boolean }

type Message = {
  id: number
  sender: "user" | "other"
  text: string
  time: string
  reactions: Reaction[]
}

const initialMessages: Message[] = [
  {
    id: 1, sender: "other",
    text: "Just shipped the new pricing page. Conversion is up 12% in the first hour compared to the old one.",
    time: "11:08 AM",
    reactions: [{ emoji: "\uD83D\uDD25", count: 4, reacted: true }, { emoji: "\uD83D\uDE4C", count: 2, reacted: false }],
  },
  {
    id: 2, sender: "user",
    text: "That's incredible for an hour of data. Which variant won — the side-by-side comparison or the feature grid?",
    time: "11:11 AM",
    reactions: [],
  },
  {
    id: 3, sender: "other",
    text: "Side-by-side, by a wide margin. The feature grid confused users — too many checkmarks, no clear hierarchy.",
    time: "11:13 AM",
    reactions: [{ emoji: "\uD83D\uDC4D", count: 3, reacted: false }, { emoji: "\uD83D\uDCA1", count: 1, reacted: true }],
  },
  {
    id: 4, sender: "user",
    text: "Makes sense. We should apply that insight to the comparison page too. Less is more.",
    time: "11:15 AM",
    reactions: [{ emoji: "\u2764\uFE0F", count: 1, reacted: false }],
  },
  {
    id: 5, sender: "other",
    text: "Already on it. I'm restructuring the comparison to use a progressive disclosure pattern — show 3 key differences upfront, expandable for the full list.",
    time: "11:18 AM",
    reactions: [{ emoji: "\uD83D\uDE80", count: 2, reacted: true }, { emoji: "\uD83D\uDC4D", count: 5, reacted: false }, { emoji: "\u2764\uFE0F", count: 1, reacted: false }],
  },
]

const quickReactions = ["\uD83D\uDC4D", "\u2764\uFE0F", "\uD83D\uDE02", "\uD83D\uDE2E", "\uD83D\uDE22", "\uD83D\uDD25"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ChatReactions() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [activeReactionPicker, setActiveReactionPicker] = useState<number | null>(null)

  function toggleReaction(msgId: number, emoji: string) {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg
        const existing = msg.reactions.find((r) => r.emoji === emoji)
        if (existing) {
          const updated = existing.reacted
            ? { ...existing, count: existing.count - 1, reacted: false }
            : { ...existing, count: existing.count + 1, reacted: true }
          const reactions = updated.count === 0
            ? msg.reactions.filter((r) => r.emoji !== emoji)
            : msg.reactions.map((r) => (r.emoji === emoji ? updated : r))
          return { ...msg, reactions }
        }
        return { ...msg, reactions: [...msg.reactions, { emoji, count: 1, reacted: true }] }
      })
    )
    setActiveReactionPicker(null)
  }

  return (
    <div
      className="mx-auto flex h-[580px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <Avatar size="sm">
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-medium tracking-tight">Jules Renard</p>
          <p className="text-xs text-muted-foreground">Product Lead</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          className="flex flex-col gap-4 p-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              className={`group/msg flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{msg.sender === "user" ? "ME" : "JR"}</AvatarFallback>
              </Avatar>
              <div className={`relative flex max-w-[75%] flex-col gap-1 ${msg.sender === "user" ? "items-end" : ""}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {msg.reactions.map((r) => (
                    <motion.button
                      key={r.emoji}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => toggleReaction(msg.id, r.emoji)}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs tabular-nums transition-colors ${
                        r.reacted
                          ? "border-primary/30 bg-primary/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-foreground/20"
                      }`}
                    >
                      <span>{r.emoji}</span>
                      <span>{r.count}</span>
                    </motion.button>
                  ))}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => setActiveReactionPicker(activeReactionPicker === msg.id ? null : msg.id)}
                      className="inline-flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover/msg:opacity-100"
                    >
                      <PlusIcon className="size-3" />
                    </motion.button>
                    {activeReactionPicker === msg.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute bottom-full z-10 mb-1 flex gap-0.5 rounded-lg border bg-popover p-1 ring-1 ring-foreground/5"
                        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
                      >
                        {quickReactions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => toggleReaction(msg.id, emoji)}
                            className="flex size-8 items-center justify-center rounded-md text-base transition-colors hover:bg-muted"
                          >
                            {emoji}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                <span className="px-1 text-[11px] tabular-nums tracking-wide text-muted-foreground">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>

      <div className="flex items-center gap-2 border-t bg-muted/30 px-4 py-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-background"
        />
        <Button size="icon" disabled={!input.trim()}>
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
