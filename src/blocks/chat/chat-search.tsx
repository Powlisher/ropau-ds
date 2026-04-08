"use client"

import { useState, useMemo } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SearchIcon, XIcon, SendIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const allMessages = [
  { id: 1, sender: "other" as const, initials: "VK", name: "Valeria Kozlov", text: "The typography scale needs work. I think we should switch to a modular scale with a 1.25 ratio instead of the current linear spacing.", time: "9:15 AM" },
  { id: 2, sender: "user" as const, initials: "ME", name: "You", text: "Good call. A modular scale will give us better visual hierarchy, especially at larger sizes. Let me prototype it.", time: "9:18 AM" },
  { id: 3, sender: "other" as const, initials: "VK", name: "Valeria Kozlov", text: "Also, the line-height feels too loose on body text. 1.6 is standard but 1.5 might work better with our font choice.", time: "9:22 AM" },
  { id: 4, sender: "user" as const, initials: "ME", name: "You", text: "I'll test both. The font we're using has a tall x-height so 1.5 should still be readable.", time: "9:25 AM" },
  { id: 5, sender: "other" as const, initials: "VK", name: "Valeria Kozlov", text: "Exactly. Also want to revisit the spacing tokens. The 4px base grid is fine but we need half-steps for compact UI elements like data tables.", time: "9:30 AM" },
  { id: 6, sender: "user" as const, initials: "ME", name: "You", text: "Makes sense. I'll add 2px increments for the compact variants. Should we document this in the design system guidelines?", time: "9:33 AM" },
  { id: 7, sender: "other" as const, initials: "VK", name: "Valeria Kozlov", text: "Yes please. Also include examples of when to use which spacing variant. Context helps other designers adopt it faster.", time: "9:36 AM" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded-sm bg-primary/20 px-0.5 text-inherit">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export default function ChatSearch() {
  const [input, setInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const matchCount = useMemo(() => {
    if (!searchQuery.trim()) return 0
    return allMessages.filter((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase())).length
  }, [searchQuery])

  return (
    <div
      className="mx-auto flex h-[560px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        {isSearching ? (
          <AnimatePresence>
            <motion.div
              className="flex flex-1 items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="h-7 flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                autoFocus
              />
              {searchQuery && (
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {matchCount} {matchCount === 1 ? "match" : "matches"}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => { setIsSearching(false); setSearchQuery("") }}
              >
                <XIcon />
              </Button>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <Avatar size="sm">
              <AvatarFallback>VK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-heading text-sm font-medium tracking-tight">Valeria Kozlov</p>
              <p className="text-xs text-muted-foreground">Design Lead</p>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={() => setIsSearching(true)}>
              <SearchIcon />
            </Button>
          </>
        )}
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          className="flex flex-col gap-3 p-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allMessages.map((msg) => {
            const isMatch = searchQuery.trim() && msg.text.toLowerCase().includes(searchQuery.toLowerCase())
            return (
              <motion.div
                key={msg.id}
                variants={itemVariants}
                className={`flex gap-2.5 rounded-lg p-1 transition-colors ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                } ${isMatch ? "bg-primary/5 ring-1 ring-primary/20" : ""}`}
              >
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>{msg.initials}</AvatarFallback>
                </Avatar>
                <div className={`flex max-w-[75%] flex-col gap-1 ${msg.sender === "user" ? "items-end" : ""}`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted text-foreground"
                    }`}
                  >
                    <HighlightedText text={msg.text} query={searchQuery} />
                  </div>
                  <span className="px-1 text-[11px] tabular-nums tracking-wide text-muted-foreground">{msg.time}</span>
                </div>
              </motion.div>
            )
          })}
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
