"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SendIcon, UsersIcon } from "lucide-react"
import { motion } from "framer-motion"

const members = [
  { initials: "CB", name: "Camille Beaumont" },
  { initials: "RG", name: "Raphael Giroud" },
  { initials: "IT", name: "Ines Takahashi" },
  { initials: "HD", name: "Hugo Delacroix" },
  { initials: "NF", name: "Nadia Ferreira" },
]

const messages = [
  { id: 1, sender: "CB", name: "Camille Beaumont", text: "Just pushed the new component library to staging. Can everyone take a look?", time: "10:32 AM" },
  { id: 2, sender: "RG", name: "Raphael Giroud", text: "On it. The button variants look really clean. Quick question — are we keeping the ghost variant or replacing it with link?", time: "10:35 AM" },
  { id: 3, sender: "IT", name: "Ines Takahashi", text: "I'd vote for keeping both. Ghost is useful for toolbars, link for inline actions. Different use cases.", time: "10:38 AM" },
  { id: 4, sender: "HD", name: "Hugo Delacroix", text: "Agreed with Ines. Also noticed the Select component doesn't handle long option text well — truncation breaks at 280px viewport.", time: "10:41 AM" },
  { id: 5, sender: "me", name: "You", text: "Good catch Hugo. I'll add a line-clamp with a tooltip on overflow. Should be a quick fix.", time: "10:43 AM" },
  { id: 6, sender: "NF", name: "Nadia Ferreira", text: "The new color tokens are gorgeous btw. The crimson primary works beautifully with the warm neutrals.", time: "10:47 AM" },
  { id: 7, sender: "CB", name: "Camille Beaumont", text: "Thanks Nadia! That was a two-day rabbit hole but worth it. The oklch approach gives us much better perceptual uniformity.", time: "10:50 AM" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ChatGroup() {
  const [input, setInput] = useState("")

  return (
    <div
      className="mx-auto flex h-[580px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center justify-between border-b px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <UsersIcon className="size-4" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold tracking-tight">Design System Team</p>
            <p className="text-xs text-muted-foreground">{members.length} members</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AvatarGroup>
            {members.slice(0, 3).map((m) => (
              <Avatar key={m.initials} size="sm">
                <AvatarFallback>{m.initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+{members.length - 3}</AvatarGroupCount>
          </AvatarGroup>
          <Badge variant="secondary">{members.length}</Badge>
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
              className={`flex gap-2.5 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
            >
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{msg.sender === "me" ? "ME" : msg.sender}</AvatarFallback>
              </Avatar>
              <div className={`flex max-w-[75%] flex-col gap-1 ${msg.sender === "me" ? "items-end" : ""}`}>
                {msg.sender !== "me" && (
                  <span className="px-1 text-xs font-medium text-foreground/70">{msg.name}</span>
                )}
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
          placeholder="Message the group..."
          className="flex-1 bg-background"
        />
        <Button size="icon" disabled={!input.trim()}>
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
