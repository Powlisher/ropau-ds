"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { motion } from "framer-motion"

const people = [
  { name: "Camille Renard", src: "https://i.pravatar.cc/160?img=1" },
  { name: "Julien Moreau", src: "https://i.pravatar.cc/160?img=3" },
  { name: "Selma Bakri", src: "https://i.pravatar.cc/160?img=5" },
  { name: "Theo Larsson", src: "https://i.pravatar.cc/160?img=8" },
  { name: "Nadia Petrov", src: "https://i.pravatar.cc/160?img=9" },
]

const overflow = 12

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup01() {
  return (
    <div
      className="flex flex-col items-center gap-6 rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="text-center">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Active contributors
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {people.length + overflow} people working on this project
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AvatarGroup>
          {people.map((person) => (
            <motion.div key={person.name} variants={itemVariants}>
              <Avatar>
                <AvatarImage src={person.src} alt={person.name} />
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
          <motion.div variants={itemVariants}>
            <AvatarGroupCount>+{overflow}</AvatarGroupCount>
          </motion.div>
        </AvatarGroup>
      </motion.div>
    </div>
  )
}
