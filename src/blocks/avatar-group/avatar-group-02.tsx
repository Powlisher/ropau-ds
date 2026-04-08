"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const team = [
  { name: "Camille Renard", role: "Product Lead", src: "https://i.pravatar.cc/160?img=1" },
  { name: "Julien Moreau", role: "Staff Engineer", src: "https://i.pravatar.cc/160?img=3" },
  { name: "Selma Bakri", role: "Design Director", src: "https://i.pravatar.cc/160?img=5" },
  { name: "Theo Larsson", role: "DevOps", src: "https://i.pravatar.cc/160?img=8" },
  { name: "Nadia Petrov", role: "Frontend Engineer", src: "https://i.pravatar.cc/160?img=9" },
  { name: "Marco Bianchi", role: "Data Analyst", src: "https://i.pravatar.cc/160?img=11" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup02() {
  return (
    <div
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
        Team members
      </h3>
      <motion.ul
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {team.map((person) => (
          <motion.li
            key={person.name}
            variants={itemVariants}
            className="flex items-center gap-3"
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
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {person.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {person.role}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
