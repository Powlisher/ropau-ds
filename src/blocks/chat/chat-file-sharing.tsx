"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon, FileIcon, FileTextIcon, ImageIcon, DownloadIcon, PaperclipIcon } from "lucide-react"
import { motion } from "framer-motion"

type FileAttachment = { name: string; size: string; type: "pdf" | "image" | "doc" }

type Message = {
  id: number
  sender: "user" | "other"
  text?: string
  file?: FileAttachment
  time: string
}

const messages: Message[] = [
  { id: 1, sender: "other", text: "Here are the finalized brand assets from the client call this morning.", time: "9:14 AM" },
  { id: 2, sender: "other", file: { name: "Riviera-Brand-Guide-v3.pdf", size: "4.2 MB", type: "pdf" }, time: "9:14 AM" },
  { id: 3, sender: "user", text: "Thanks! Let me review. Did they settle on the extended palette?", time: "9:18 AM" },
  { id: 4, sender: "other", text: "Yes, they went with the warmer tones. Also attached the updated hero imagery.", time: "9:22 AM" },
  { id: 5, sender: "other", file: { name: "hero-lifestyle-shoot-final.png", size: "8.7 MB", type: "image" }, time: "9:22 AM" },
  { id: 6, sender: "user", file: { name: "component-audit-notes.docx", size: "156 KB", type: "doc" }, time: "9:31 AM" },
  { id: 7, sender: "user", text: "Sent over my audit notes. The typography section needs the most work — serif fallbacks are broken on Android.", time: "9:32 AM" },
]

const fileIcons = {
  pdf: FileTextIcon,
  image: ImageIcon,
  doc: FileIcon,
}

const fileColors = {
  pdf: "bg-red-500/10 text-red-600",
  image: "bg-violet-500/10 text-violet-600",
  doc: "bg-blue-500/10 text-blue-600",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function FileCard({ file, isUser }: { file: FileAttachment; isUser: boolean }) {
  const Icon = fileIcons[file.type]
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${
        isUser ? "border-primary-foreground/20 bg-primary-foreground/10" : "border-border bg-background"
      }`}
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
    >
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${fileColors[file.type]}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${isUser ? "text-primary-foreground" : "text-foreground"}`}>
          {file.name}
        </p>
        <p className={`text-xs tabular-nums ${isUser ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
          {file.size}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className={isUser ? "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" : ""}
      >
        <DownloadIcon className="size-3.5" />
      </Button>
    </motion.div>
  )
}

export default function ChatFileSharing() {
  const [input, setInput] = useState("")

  return (
    <div
      className="mx-auto flex h-[580px] max-w-lg flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="flex items-center gap-3 border-b px-5 py-3.5">
        <Avatar size="sm">
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-sm font-medium tracking-tight">Antoine Legrand</p>
          <p className="text-xs text-muted-foreground">Creative Director</p>
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
              {(msg.id === 1 || messages[messages.indexOf(msg) - 1]?.sender !== msg.sender) && (
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>{msg.sender === "user" ? "ME" : "AL"}</AvatarFallback>
                </Avatar>
              )}
              {msg.id !== 1 && messages[messages.indexOf(msg) - 1]?.sender === msg.sender && (
                <div className="w-6 shrink-0" />
              )}
              <div className={`flex max-w-[80%] flex-col gap-1.5 ${msg.sender === "user" ? "items-end" : ""}`}>
                {msg.text && (
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                {msg.file && <FileCard file={msg.file} isUser={msg.sender === "user"} />}
                <span className="px-1 text-[11px] tabular-nums tracking-wide text-muted-foreground">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>

      <div className="flex items-center gap-2 border-t bg-muted/30 px-4 py-3">
        <Button variant="ghost" size="icon-sm">
          <PaperclipIcon />
        </Button>
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
