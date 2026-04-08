"use client"

import { Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function AIActions({
  onCopy,
  onRegenerate,
  onLike,
  onDislike,
  className,
}: {
  onCopy?: () => void
  onRegenerate?: () => void
  onLike?: () => void
  onDislike?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="ai-actions"
      className={cn(
        "flex items-center gap-0.5 opacity-0 transition-opacity group-hover/message:opacity-100 focus-within:opacity-100",
        className
      )}
    >
      {onCopy && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onCopy}
          aria-label="Copy message"
        >
          <Copy />
        </Button>
      )}
      {onRegenerate && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onRegenerate}
          aria-label="Regenerate response"
        >
          <RefreshCw />
        </Button>
      )}
      {onLike && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onLike}
          aria-label="Good response"
        >
          <ThumbsUp />
        </Button>
      )}
      {onDislike && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onDislike}
          aria-label="Poor response"
        >
          <ThumbsDown />
        </Button>
      )}
    </div>
  )
}

export { AIActions }
