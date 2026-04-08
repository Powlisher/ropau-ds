"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

type Presence = "online" | "away" | "busy" | "offline"

const people: { name: string; src: string; presence: Presence }[] = [
  { name: "Camille Renard", src: "https://i.pravatar.cc/160?img=1", presence: "online" },
  { name: "Julien Moreau", src: "https://i.pravatar.cc/160?img=3", presence: "away" },
  { name: "Selma Bakri", src: "https://i.pravatar.cc/160?img=5", presence: "busy" },
  { name: "Theo Larsson", src: "https://i.pravatar.cc/160?img=8", presence: "offline" },
]

const presenceConfig: Record<
  Presence,
  { ring: string; dot: string; label: string }
> = {
  online: {
    ring: "ring-emerald-400/60",
    dot: "bg-emerald-500",
    label: "Online",
  },
  away: {
    ring: "ring-amber-400/60",
    dot: "bg-amber-500",
    label: "Away",
  },
  busy: {
    ring: "ring-rose-400/60",
    dot: "bg-rose-500",
    label: "Do not disturb",
  },
  offline: {
    ring: "ring-muted-foreground/20",
    dot: "bg-muted-foreground/40",
    label: "Offline",
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup08() {
  return (
    <div
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
        Presence status
      </h3>
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {people.map((person) => {
          const config = presenceConfig[person.presence]
          return (
            <motion.div
              key={person.name}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className={`rounded-full ring-2 ${config.ring}`}>
                <Avatar size="lg">
                  <AvatarImage src={person.src} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {person.name}
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className={`inline-block size-1.5 rounded-full ${config.dot}`} />
                  <span className="text-xs text-muted-foreground">
                    {config.label}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
