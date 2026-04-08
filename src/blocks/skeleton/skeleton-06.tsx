"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const messages = [
  { side: "left" as const, lines: [{ w: "w-52" }, { w: "w-36" }] },
  { side: "right" as const, lines: [{ w: "w-44" }] },
  { side: "left" as const, lines: [{ w: "w-60" }, { w: "w-48" }, { w: "w-28" }] },
  { side: "right" as const, lines: [{ w: "w-40" }, { w: "w-24" }] },
  { side: "left" as const, lines: [{ w: "w-32" }] },
  { side: "right" as const, lines: [{ w: "w-56" }, { w: "w-44" }] },
]

export default function Skeleton06() {
  return (
    <div className="mx-auto max-w-md">
      <div
        className="flex h-[420px] flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-3 border-b px-5 py-3">
          <Skeleton className="size-7 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-2.5 w-14 rounded" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3 p-5"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`flex gap-2.5 ${msg.side === "right" ? "flex-row-reverse" : ""}`}
              >
                {msg.side === "left" && <Skeleton className="size-6 shrink-0 rounded-full mt-0.5" />}
                <div className={`max-w-[70%] space-y-1.5 ${msg.side === "right" ? "items-end" : ""}`}>
                  {msg.lines.map((line, j) => (
                    <Skeleton
                      key={j}
                      className={`h-8 ${line.w} ${
                        msg.side === "right"
                          ? "ml-auto rounded-2xl rounded-br-md"
                          : "rounded-2xl rounded-bl-md"
                      }`}
                    />
                  ))}
                  <Skeleton className={`h-2 w-10 rounded ${msg.side === "right" ? "ml-auto" : ""}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center gap-2 border-t px-4 py-3">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
