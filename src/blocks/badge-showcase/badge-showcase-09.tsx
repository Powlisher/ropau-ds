"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BadgeShowcase09() {
  const [count, setCount] = React.useState(4)

  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Animated counter
      </h3>
      <p className="mb-8 text-xs text-muted-foreground">
        Spring-animated count transitions
      </p>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
            <svg
              className="size-7 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <AnimatePresence mode="wait">
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 500,
                  damping: 20,
                }}
                className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-bold tabular-nums text-white ring-2 ring-card"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            aria-label="Decrease count"
          >
            <MinusIcon />
          </Button>
          <span className="w-8 text-center font-mono text-lg font-semibold tabular-nums text-foreground">
            {count}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCount((c) => Math.min(99, c + 1))}
            aria-label="Increase count"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
