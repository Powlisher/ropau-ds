"use client"

import * as React from "react"
import { AlertTriangleIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerMaintenance() {
  const [visible, setVisible] = React.useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="relative overflow-hidden"
          style={{
            backgroundColor: "oklch(0.89 0.05 85)",
            borderBottom: "1px solid oklch(0.82 0.06 85)",
          }}
        >
          <div className="mx-auto flex h-10 max-w-6xl items-center justify-center gap-2.5 px-10 text-sm">
            <AlertTriangleIcon
              className="size-4 shrink-0"
              style={{ color: "oklch(0.55 0.12 65)" }}
            />
            <span style={{ color: "oklch(0.35 0.06 65)" }}>
              Scheduled maintenance on{" "}
              <span className="font-medium tabular-nums">
                April 12, 2024 from 2:00 AM to 4:00 AM UTC
              </span>
            </span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors"
            style={{ color: "oklch(0.55 0.06 65)" }}
          >
            <XIcon className="size-3.5" />
            <span className="sr-only">Dismiss</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
