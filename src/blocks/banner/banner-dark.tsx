"use client"

import * as React from "react"
import { XIcon, ArrowRightIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerDark() {
  const [visible, setVisible] = React.useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: "oklch(0.17 0.01 285)" }}
        >
          <div className="mx-auto flex h-10 max-w-6xl items-center justify-center gap-3 px-10 text-sm">
            <span style={{ color: "oklch(0.85 0 0)" }}>
              Join us at DevConf 2024 in Paris — April 18-20
            </span>
            <a
              href="#devconf"
              className="inline-flex items-center gap-1 font-medium transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.75 0.12 3.6)" }}
            >
              Register now
              <ArrowRightIcon className="size-3" />
            </a>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            <XIcon className="size-3.5" />
            <span className="sr-only">Close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
