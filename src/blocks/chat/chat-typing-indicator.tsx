"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon } from "lucide-react"
import { motion } from "framer-motion"

const messages = [
  { id: 1, sender: "other" as const, text: "I've been thinking about the onboarding flow. The current 5-step wizard has a 38% drop-off at step 3.", time: "4:02 PM" },
  { id: 2, sender: "user" as const, text: "That's steep. What's step 3 again?", time: "4:04 PM" },
  { id: 3, sender: "other" as const, text: "It's the workspace configuration — team size, billing plan, integrations. Too much friction for a first-time user.", time: "4:05 PM" },
  { id: 4, sender: "user" as const, text: "Makes sense. What if we defer integrations to post-onboarding and collapse team size + billing into one step?", time: "4:07 PM" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block size-1.5 rounded-full bg-muted-foreground/60"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function ChatTypingIndicator() {
  const [input, setInput] = useState("")
  const [isTyping] = useState(true)

  return (
    <div
      className="mx-auto flex h-[540px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <Avatar size="sm">
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-medium tracking-tight">Sophie Vandenberg</p>
          {isTyping ? (
            <motion.p
              className="text-xs text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              typing...
            </motion.p>
          ) : (
            <p className="text-xs text-muted-foreground">Online</p>
          )}
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
              className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{msg.sender === "user" ? "ME" : "SV"}</AvatarFallback>
              </Avatar>
              <div className={`flex max-w-[75%] flex-col gap-1 ${msg.sender === "user" ? "items-end" : ""}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
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

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex gap-2.5"
            >
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>SV</AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                <TypingDots />
              </div>
            </motion.div>
          )}
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
