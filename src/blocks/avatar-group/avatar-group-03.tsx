"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar"
import { motion } from "framer-motion"

const people = [
  { name: "Camille Renard", src: "https://i.pravatar.cc/160?img=1", online: true },
  { name: "Julien Moreau", src: "https://i.pravatar.cc/160?img=3", online: true },
  { name: "Selma Bakri", src: "https://i.pravatar.cc/160?img=5", online: false },
  { name: "Theo Larsson", src: "https://i.pravatar.cc/160?img=8", online: true },
  { name: "Nadia Petrov", src: "https://i.pravatar.cc/160?img=9", online: false },
  { name: "Marco Bianchi", src: "https://i.pravatar.cc/160?img=11", online: true },
  { name: "Aya Tanaka", src: "https://i.pravatar.cc/160?img=16", online: false },
  { name: "Leo Fischer", src: "https://i.pravatar.cc/160?img=12", online: true },
  { name: "Ines Almeida", src: "https://i.pravatar.cc/160?img=20", online: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup03() {
  const onlineCount = people.filter((p) => p.online).length

  return (
    <div
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Team
        </h3>
        <span className="text-xs tabular-nums text-muted-foreground">
          {onlineCount} online
        </span>
      </div>
      <motion.div
        className="grid grid-cols-3 gap-4 sm:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {people.map((person) => (
          <motion.div
            key={person.name}
            variants={itemVariants}
            className="flex flex-col items-center gap-1.5"
          >
            <Avatar size="lg">
              <AvatarImage src={person.src} alt={person.name} />
              <AvatarFallback>
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
              <AvatarBadge
                className={
                  person.online
                    ? "bg-emerald-500"
                    : "bg-muted-foreground/40"
                }
              />
            </Avatar>
            <span className="max-w-full truncate text-xs text-muted-foreground">
              {person.name.split(" ")[0]}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
