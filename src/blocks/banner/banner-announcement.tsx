"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { XIcon, ArrowRightIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerAnnouncement() {
  const [visible, setVisible] = React.useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="relative overflow-hidden border-b border-primary/10 bg-primary/[0.04]"
        >
          <div className="mx-auto flex h-10 max-w-6xl items-center justify-center gap-3 px-10 text-sm">
            <Badge variant="default" className="h-[18px] text-[10px] font-semibold uppercase tracking-wider">
              New
            </Badge>
            <span className="text-foreground/80">
              Introducing real-time collaboration for teams
            </span>
            <a
              href="#learn-more"
              className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
            >
              Learn more
              <ArrowRightIcon className="size-3" />
            </a>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            <XIcon className="size-3.5" />
            <span className="sr-only">Dismiss</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
