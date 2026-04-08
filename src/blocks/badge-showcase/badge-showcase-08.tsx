"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const assignments = [
  {
    name: "Camille R.",
    src: "https://i.pravatar.cc/160?img=1",
    label: "Lead reviewer",
    color: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  },
  {
    name: "Julien M.",
    src: "https://i.pravatar.cc/160?img=3",
    label: "Assigned",
    color: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    name: "Selma B.",
    src: "https://i.pravatar.cc/160?img=5",
    label: "Design QA",
    color: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  },
  {
    name: "Theo L.",
    src: "https://i.pravatar.cc/160?img=8",
    label: "Watcher",
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase08() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Avatar badges
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Inline avatar prefix for identity context
      </p>
      <motion.div
        className="flex flex-wrap gap-2.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {assignments.map((a) => (
          <motion.div key={a.name} variants={itemVariants}>
            <span
              className={`inline-flex h-7 items-center gap-1.5 rounded-full pl-0.5 pr-2.5 text-xs font-medium ${a.color}`}
            >
              <Avatar size="sm">
                <AvatarImage src={a.src} alt={a.name} />
                <AvatarFallback>
                  {a.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {a.name}
              <span className="opacity-60">{a.label}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
