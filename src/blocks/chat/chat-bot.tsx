"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon, SparklesIcon } from "lucide-react"
import { motion } from "framer-motion"

type Message = {
  id: number
  role: "user" | "bot"
  text: string
  time: string
  isStreaming?: boolean
}

const initialMessages: Message[] = [
  {
    id: 1, role: "bot",
    text: "Hello! I'm your design system assistant. I can help you find components, explain usage patterns, or generate code snippets. What are you working on?",
    time: "Now",
  },
  {
    id: 2, role: "user",
    text: "I need a responsive card grid that handles variable-height content without layout shifts. What's the best approach?",
    time: "Now",
  },
  {
    id: 3, role: "bot",
    text: "For variable-height cards without layout shifts, I recommend CSS Grid with `grid-template-rows: masonry` if you're targeting modern browsers, or a column-based approach with `columns: 3` as a fallback. For React specifically, use `grid-auto-rows: 1fr` to equalize row heights within each implicit row — this prevents the jarring jumps you see with flexbox wrap. Here's the pattern:\n\n`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3` with each card using `flex flex-col` internally so content stretches naturally.",
    time: "Now",
  },
  {
    id: 4, role: "user",
    text: "What about infinite scroll with that grid? I'm worried about performance with 500+ cards.",
    time: "Now",
  },
  {
    id: 5, role: "bot",
    text: "At 500+ items, virtual scrolling is essential. Use `@tanstack/react-virtual` with a grid layout estimator. The key trick: set `estimateSize` based on your average card height (measure the first 10 renders) and use `overscan: 3` to prevent visible pop-in. Combined with React.memo on each card component, this should keep your DOM node count under 50 regardless of dataset size.",
    time: "Now",
    isStreaming: true,
  },
]

const suggestedReplies = [
  "Show me the code",
  "What about accessibility?",
  "Compare with Masonry.js",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function StreamingIndicator() {
  return (
    <motion.span
      className="ml-1 inline-block size-1.5 rounded-full bg-primary"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

export default function ChatBot() {
  const [input, setInput] = useState("")

  return (
    <div
      className="mx-auto flex h-[600px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SparklesIcon className="size-4" />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold tracking-tight">Design System AI</p>
          <p className="text-xs text-muted-foreground">Always available</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          className="flex flex-col gap-4 p-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {initialMessages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "bot" ? (
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <SparklesIcon className="size-3" />
                </div>
              ) : (
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex max-w-[80%] flex-col gap-1 ${msg.role === "user" ? "items-end" : ""}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && <StreamingIndicator />}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>

      <div className="border-t bg-muted/30 px-4 pt-3 pb-3">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {suggestedReplies.map((reply) => (
            <motion.button
              key={reply}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => setInput(reply)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/30 hover:text-primary"
            >
              {reply}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about components, patterns, tokens..."
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
