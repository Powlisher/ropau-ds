"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function AIConversation({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = React.useState(false)
  const hasChildren = React.Children.count(children) > 0

  const scrollToBottom = React.useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [children])

  React.useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    function handleScroll() {
      if (!viewport) return
      const { scrollTop, scrollHeight, clientHeight } = viewport
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight
      setShowScrollButton(distanceFromBottom > 100)
    }

    viewport.addEventListener("scroll", handleScroll, { passive: true })
    return () => viewport.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div data-slot="ai-conversation" className={cn("relative flex-1 overflow-hidden", className)}>
      <ScrollArea className="h-full">
        <div
          ref={viewportRef as React.RefObject<HTMLDivElement>}
          className="h-full overflow-y-auto"
        >
          {hasChildren ? (
            <div className="flex flex-col gap-6 p-4 pb-6">
              {children}
              <div ref={bottomRef} aria-hidden />
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 p-8">
              <div
                className="flex size-12 items-center justify-center rounded-2xl bg-muted"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <MessageSquare className="size-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Start a conversation</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            className="absolute right-4 bottom-4"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button
              variant="outline"
              size="icon-sm"
              onClick={scrollToBottom}
              className="rounded-full bg-card"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
              aria-label="Scroll to bottom"
            >
              <ChevronDown />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { AIConversation }
