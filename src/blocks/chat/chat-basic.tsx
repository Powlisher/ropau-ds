"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon } from "lucide-react"
import { motion } from "framer-motion"

const initialMessages = [
  { id: 1, role: "assistant" as const, text: "Hey Margaux, I reviewed the brand guidelines you sent over. The color palette works well but I think we should reconsider the serif for body text.", time: "2:14 PM" },
  { id: 2, role: "user" as const, text: "Agreed. I was leaning toward Inter for body and keeping the serif just for display headings. What do you think about the spacing system?", time: "2:16 PM" },
  { id: 3, role: "assistant" as const, text: "The 8px base grid makes sense. I'd add a 4px half-step for tighter elements like badges and inline labels. Want me to put together a quick token sheet?", time: "2:18 PM" },
  { id: 4, role: "user" as const, text: "Yes please. Also include the responsive breakpoints we discussed last week.", time: "2:21 PM" },
  { id: 5, role: "assistant" as const, text: "Will do. I'll have it ready by end of day. One more thing — should we align the icon set to Lucide or keep the custom ones from the Figma file?", time: "2:23 PM" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ChatBasic() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  function handleSend() {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user" as const, text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ])
    setInput("")
  }

  return (
    <div
      className="mx-auto flex h-[540px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <Avatar size="sm">
          <AvatarFallback>LC</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-medium tracking-tight">Lucie Carpentier</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

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
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{msg.role === "user" ? "MG" : "LC"}</AvatarFallback>
              </Avatar>
              <div className={`flex max-w-[75%] flex-col gap-1 ${msg.role === "user" ? "items-end" : ""}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
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
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-background"
        />
        <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
