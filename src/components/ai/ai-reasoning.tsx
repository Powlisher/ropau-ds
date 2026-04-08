"use client"

import * as React from "react"
import { Brain, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

function AIReasoning({
  content,
  duration,
  isStreaming = false,
  className,
}: {
  content: string
  duration?: number
  isStreaming?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(isStreaming)

  React.useEffect(() => {
    if (isStreaming) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [isStreaming])

  const label = duration
    ? `Thought for ${duration}s`
    : isStreaming
      ? "Thinking..."
      : "Thought process"

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={className}>
      <div
        data-slot="ai-reasoning"
        className="border-l-2 border-primary/20 pl-3"
      >
        <CollapsibleTrigger
          className={cn(
            "flex items-center gap-1.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
            "cursor-pointer select-none"
          )}
        >
          <Brain className="size-3.5" />
          <span className="font-medium">{label}</span>
          <ChevronRight
            className={cn(
              "size-3 transition-transform duration-200",
              open && "rotate-90"
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div
            className={cn(
              "relative mt-1 rounded-md py-2 text-sm text-muted-foreground",
              "whitespace-pre-wrap leading-relaxed"
            )}
          >
            {isStreaming && (
              <div
                className="pointer-events-none absolute inset-0 rounded-md"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.04) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "ai-shimmer 2s ease-in-out infinite",
                }}
              />
            )}
            {content}
          </div>
        </CollapsibleContent>
      </div>

      <style>{`
        @keyframes ai-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </Collapsible>
  )
}

export { AIReasoning }
