"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon, PinIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = { id: number; sender: "user" | "other"; text: string; time: string; pinned: boolean }

const initialMessages: Message[] = [
  { id: 1, sender: "other", text: "Sprint planning notes: we're targeting 34 story points this cycle. Focus areas are auth migration and the new dashboard widgets.", time: "Mon 10:00 AM", pinned: true },
  { id: 2, sender: "user", text: "Got it. I'll take the dashboard widgets — estimated at 13 points total.", time: "Mon 10:04 AM", pinned: false },
  { id: 3, sender: "other", text: "Perfect. Lena is on auth migration (8 pts), and Marcus has the API refactor (13 pts).", time: "Mon 10:07 AM", pinned: false },
  { id: 4, sender: "user", text: "Deadline reminder: client review is next Friday at 2pm CET. Everything needs to be on staging by Thursday EOD.", time: "Mon 10:12 AM", pinned: true },
  { id: 5, sender: "other", text: "Noted. I'll set up a staging environment checkpoint for Wednesday so we have buffer.", time: "Mon 10:15 AM", pinned: false },
  { id: 6, sender: "user", text: "Smart. Also, can you share the Figma link for the updated dashboard specs?", time: "Mon 10:18 AM", pinned: false },
  { id: 7, sender: "other", text: "Sending now. The responsive breakpoints changed — mobile is now 390px instead of 375px.", time: "Mon 10:20 AM", pinned: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ChatPinned() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [showPinnedBar, setShowPinnedBar] = useState(true)

  const pinnedMessages = messages.filter((m) => m.pinned)
  const activePinned = pinnedMessages[0]

  function togglePin(id: number) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m)))
  }

  return (
    <div
      className="mx-auto flex h-[580px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <Avatar size="sm">
          <AvatarFallback>KN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-medium tracking-tight">Katarina Novak</p>
          <p className="text-xs text-muted-foreground">Engineering Manager</p>
        </div>
      </div>

      <AnimatePresence>
        {showPinnedBar && activePinned && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-2.5 border-b bg-primary/5 px-4 py-2.5">
              <PinIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <p className="flex-1 text-xs leading-relaxed text-foreground/80 line-clamp-2">{activePinned.text}</p>
              <button
                onClick={() => setShowPinnedBar(false)}
                className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                <XIcon className="size-3.5" />
              </button>
            </div>
            {pinnedMessages.length > 1 && (
              <div className="border-b px-4 py-1.5">
                <p className="text-[11px] tabular-nums text-muted-foreground">{pinnedMessages.length} pinned messages</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="flex-1">
        <motion.div
          className="flex flex-col gap-3 p-5"
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
                <AvatarFallback>{msg.sender === "user" ? "ME" : "KN"}</AvatarFallback>
              </Avatar>
              <div className={`flex max-w-[75%] flex-col gap-1 ${msg.sender === "user" ? "items-end" : ""}`}>
                <div className="relative">
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted text-foreground"
                    } ${msg.pinned ? "ring-1 ring-primary/30" : ""}`}
                  >
                    {msg.text}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => togglePin(msg.id)}
                    className={`absolute -top-1.5 ${msg.sender === "user" ? "-left-1.5" : "-right-1.5"} flex size-6 items-center justify-center rounded-full border bg-background opacity-0 transition-opacity group-hover/msg:opacity-100 ${
                      msg.pinned ? "border-primary/30 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04)" }}
                  >
                    <PinIcon className="size-3" />
                  </motion.button>
                </div>
                <div className="flex items-center gap-1.5 px-1">
                  {msg.pinned && <PinIcon className="size-2.5 text-primary" />}
                  <span className="text-[11px] tabular-nums tracking-wide text-muted-foreground">{msg.time}</span>
                </div>
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
