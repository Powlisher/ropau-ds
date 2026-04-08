"use client"

import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CheckIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const assignees = [
  { id: "1", name: "Camille Renard", role: "Product Lead", src: "https://i.pravatar.cc/160?img=1" },
  { id: "2", name: "Julien Moreau", role: "Staff Engineer", src: "https://i.pravatar.cc/160?img=3" },
  { id: "3", name: "Selma Bakri", role: "Design Director", src: "https://i.pravatar.cc/160?img=5" },
  { id: "4", name: "Theo Larsson", role: "DevOps", src: "https://i.pravatar.cc/160?img=8" },
  { id: "5", name: "Nadia Petrov", role: "Frontend Engineer", src: "https://i.pravatar.cc/160?img=9" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup09() {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(["1", "3"])
  )

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Assign to
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        {selected.size} {selected.size === 1 ? "person" : "people"} selected
      </p>
      <motion.ul
        className="space-y-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {assignees.map((person) => {
          const isSelected = selected.has(person.id)
          return (
            <motion.li key={person.id} variants={itemVariants}>
              <button
                onClick={() => toggle(person.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                  isSelected
                    ? "bg-primary/[0.06]"
                    : "hover:bg-muted"
                }`}
              >
                <Avatar>
                  <AvatarImage src={person.src} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {person.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {person.role}
                  </p>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    >
                      <CheckIcon className="size-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
