"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XIcon, SparklesIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerFeatureFlag() {
  const [visible, setVisible] = React.useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="relative overflow-hidden border-b border-border/60 bg-muted/30"
        >
          <div className="mx-auto flex h-11 max-w-6xl items-center justify-center gap-3 px-10 text-sm">
            <SparklesIcon className="size-3.5 text-primary" />
            <Badge variant="secondary" className="h-[18px] text-[10px] font-semibold uppercase tracking-wider">
              Beta
            </Badge>
            <span className="text-foreground/80">
              AI-powered search is now available for early access
            </span>
            <div className="flex items-center gap-1.5">
              <Button size="sm" className="h-6 px-2 text-xs">
                Try it
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-muted-foreground"
                onClick={() => setVisible(false)}
              >
                Dismiss
              </Button>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground/60 transition-colors hover:text-foreground sm:hidden"
          >
            <XIcon className="size-3.5" />
            <span className="sr-only">Dismiss</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
