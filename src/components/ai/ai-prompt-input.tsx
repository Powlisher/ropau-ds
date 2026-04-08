"use client"

import * as React from "react"
import { Paperclip, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function AIPromptInput({
  onSubmit,
  placeholder = "Send a message...",
  disabled = false,
  className,
}: {
  onSubmit: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [value, setValue] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    const lineHeight = 24
    const maxHeight = lineHeight * 5
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden"
  }, [])

  React.useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const handleSubmit = React.useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [value, disabled, onSubmit])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  const canSubmit = value.trim().length > 0 && !disabled

  return (
    <div
      data-slot="ai-prompt-input"
      className={cn(
        "rounded-2xl border border-border bg-card ring-1 ring-foreground/[0.04] transition-shadow focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        disabled && "opacity-50",
        className
      )}
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="w-full resize-none bg-transparent px-4 pt-3 pb-1 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        style={{ minHeight: "24px", maxHeight: `${24 * 5}px` }}
      />

      <div className="flex items-center justify-between px-2.5 pb-2.5">
        <Button
          variant="ghost"
          size="icon-xs"
          disabled={disabled}
          aria-label="Attach file"
          className="text-muted-foreground"
        >
          <Paperclip />
        </Button>

        <Button
          size="icon-xs"
          disabled={!canSubmit}
          onClick={handleSubmit}
          aria-label="Send message"
          className={cn(
            "rounded-lg transition-all",
            canSubmit
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp />
        </Button>
      </div>
    </div>
  )
}

export { AIPromptInput }
