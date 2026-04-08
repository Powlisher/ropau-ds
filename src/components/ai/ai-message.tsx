"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, FileText, Image, FileCode, File } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const messageSpring = { type: "spring" as const, stiffness: 300, damping: 24 }

function getAttachmentIcon(type: string) {
  if (type.startsWith("image/")) return Image
  if (type.includes("pdf") || type.includes("document")) return FileText
  if (type.includes("code") || type.includes("javascript") || type.includes("typescript"))
    return FileCode
  return File
}

function AIMessage({
  role,
  content,
  attachments,
  isStreaming = false,
  className,
  children,
}: {
  role: "user" | "assistant"
  content: string
  attachments?: { name: string; type: string }[]
  isStreaming?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const isUser = role === "user"

  return (
    <motion.div
      data-slot="ai-message"
      className={cn(
        "group/message flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={messageSpring}
    >
      <Avatar size="sm" className="mt-1 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isUser ? (
            <span className="text-[10px] font-semibold tracking-wide">U</span>
          ) : (
            <Sparkles className="size-3" />
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1.5",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "relative px-3.5 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-2xl rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-2xl rounded-bl-sm bg-muted text-foreground"
          )}
          style={{
            boxShadow: isUser
              ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)"
              : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <span className="whitespace-pre-wrap">{content}</span>
          {isStreaming && (
            <span
              className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse rounded-full bg-current"
              aria-label="Typing"
            />
          )}
        </div>

        {attachments && attachments.length > 0 && (
          <div className={cn("flex flex-wrap gap-1.5", isUser ? "justify-end" : "justify-start")}>
            {attachments.map((attachment) => {
              const Icon = getAttachmentIcon(attachment.type)
              return (
                <span
                  key={attachment.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <Icon className="size-3 shrink-0" />
                  <span className="max-w-[120px] truncate">{attachment.name}</span>
                </span>
              )
            })}
          </div>
        )}

        {children}
      </div>
    </motion.div>
  )
}

export { AIMessage }
