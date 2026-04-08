"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SendIcon, PenSquareIcon } from "lucide-react"
import { motion } from "framer-motion"

const conversations = [
  { id: 1, name: "Camille Beaumont", initials: "CB", lastMessage: "I'll send the updated wireframes by 5pm", time: "3 min", unread: 2 },
  { id: 2, name: "Raphael Giroud", initials: "RG", lastMessage: "The staging deploy looks good. One small issue with the nav on mobile", time: "18 min", unread: 0 },
  { id: 3, name: "Ines Takahashi", initials: "IT", lastMessage: "Can you review the accessibility audit?", time: "1h", unread: 1 },
  { id: 4, name: "Hugo Delacroix", initials: "HD", lastMessage: "Pushed the hotfix to prod. All green.", time: "3h", unread: 0 },
  { id: 5, name: "Nadia Ferreira", initials: "NF", lastMessage: "Let me check the analytics dashboard and get back to you", time: "5h", unread: 0 },
  { id: 6, name: "Theo Marchand", initials: "TM", lastMessage: "The client approved the final mockups!", time: "Yesterday", unread: 0 },
]

const chatMessages: Record<number, Array<{ id: number; sender: string; text: string; time: string }>> = {
  1: [
    { id: 1, sender: "CB", text: "Hey, how's the dashboard redesign going?", time: "1:42 PM" },
    { id: 2, sender: "me", text: "Making good progress. The data viz components are tricky but coming together.", time: "1:45 PM" },
    { id: 3, sender: "CB", text: "Nice. I was thinking we should use a radial chart for the conversion funnel instead of the bar chart.", time: "1:47 PM" },
    { id: 4, sender: "me", text: "That could work. Can you mock it up so we can compare?", time: "1:49 PM" },
    { id: 5, sender: "CB", text: "I'll send the updated wireframes by 5pm", time: "1:51 PM" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ChatWithSidebar() {
  const [activeId, setActiveId] = useState(1)
  const [input, setInput] = useState("")
  const messages = chatMessages[activeId] || []
  const activeConvo = conversations.find((c) => c.id === activeId)

  return (
    <div
      className="mx-auto flex h-[560px] max-w-3xl overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex w-72 shrink-0 flex-col border-r">
        <div className="flex items-center justify-between border-b px-4 py-3.5">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Messages</h2>
          <Button variant="ghost" size="icon-sm">
            <PenSquareIcon />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-1">
            {conversations.map((convo) => (
              <motion.button
                key={convo.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: "var(--muted)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setActiveId(convo.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${activeId === convo.id ? "bg-muted" : ""}`}
              >
                <Avatar size="default">
                  <AvatarFallback>{convo.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{convo.name}</span>
                    <span className="shrink-0 text-[11px] tabular-nums tracking-wide text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <Badge className="h-4.5 min-w-4.5 shrink-0 px-1 text-[10px]">{convo.unread}</Badge>
                )}
              </motion.button>
            ))}
          </motion.div>
        </ScrollArea>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b px-5 py-3.5">
          <Avatar size="sm">
            <AvatarFallback>{activeConvo?.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-heading text-sm font-medium tracking-tight">{activeConvo?.name}</p>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <motion.div
            key={activeId}
            className="flex flex-col gap-3 p-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={itemVariants}
                className={`flex gap-2.5 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
              >
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>{msg.sender === "me" ? "ME" : msg.sender}</AvatarFallback>
                </Avatar>
                <div className={`flex max-w-[75%] flex-col gap-1 ${msg.sender === "me" ? "items-end" : ""}`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "me"
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
            placeholder="Type a message..."
            className="flex-1 bg-background"
          />
          <Button size="icon" disabled={!input.trim()}>
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
