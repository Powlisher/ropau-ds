"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  id: number
  author: string
  initials: string
  text: string
  time: string
}

const initialMessages: Message[] = [
  { id: 1, author: "Nolan Mercier", initials: "NM", text: "Deployed to staging", time: "9:41" },
  { id: 2, author: "Ines Beaumont", initials: "IB", text: "Build looks green, checking the preview now", time: "9:42" },
  { id: 3, author: "Nolan Mercier", initials: "NM", text: "The webhook endpoint is still returning 502 on the health check", time: "9:44" },
  { id: 4, author: "Camille Renard", initials: "CR", text: "That's the cold start issue — give it 30 seconds after first request", time: "9:44" },
  { id: 5, author: "Ines Beaumont", initials: "IB", text: "Confirmed, it's up now. Preview looks correct on desktop, testing mobile", time: "9:46" },
  { id: 6, author: "Nolan Mercier", initials: "NM", text: "Thanks. I'll tag the release once you give the go-ahead", time: "9:47" },
  { id: 7, author: "Ines Beaumont", initials: "IB", text: "Mobile is good. Ship it", time: "9:51" },
  { id: 8, author: "Camille Renard", initials: "CR", text: "Nice work team", time: "9:52" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Comments06() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  function handleSend() {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "You",
        initials: "YU",
        text: input,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      },
    ])
    setInput("")
  }

  return (
    <div
      className="mx-auto flex h-[420px] max-w-md flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border/60"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="border-b px-4 py-2.5">
        <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">#deployments</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <motion.div
          className="space-y-0.5 px-3 py-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((msg, i) => {
            const prevMsg = messages[i - 1]
            const sameAuthor = prevMsg?.author === msg.author
            return (
              <motion.div
                key={msg.id}
                variants={itemVariants}
                className={`flex items-start gap-2 rounded-md px-2 py-1 hover:bg-muted/40 transition-colors ${sameAuthor ? "mt-0" : "mt-1.5"}`}
              >
                {sameAuthor ? (
                  <div className="size-5 shrink-0" />
                ) : (
                  <Avatar size="sm" className="mt-0.5 size-5">
                    <AvatarFallback className="text-[9px]">{msg.initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 min-w-0">
                  {!sameAuthor && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-foreground">{msg.author}</span>
                      <span className="text-[10px] font-mono tabular-nums text-muted-foreground">{msg.time}</span>
                    </div>
                  )}
                  <p className="text-[13px] leading-snug text-foreground/90">{msg.text}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="flex items-center gap-2 border-t px-3 py-2.5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Message #deployments"
          className="flex-1 h-8 text-sm bg-muted/30"
        />
        <Button size="icon" variant="ghost" onClick={handleSend} disabled={!input.trim()} className="size-8">
          <SendIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
