"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

const totalPages = 8

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Pagination06() {
  const [current, setCurrent] = useState(3)

  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="inline-flex items-center gap-3"
      >
        <motion.div
          whileHover={{ x: -2 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={current === 1}
            onClick={() => setCurrent((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
        </motion.div>

        <span className="min-w-[80px] text-center text-sm tabular-nums text-muted-foreground">
          <span className="font-medium text-foreground">{current}</span>
          {" / "}
          {totalPages}
        </span>

        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={current === totalPages}
            onClick={() => setCurrent((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
