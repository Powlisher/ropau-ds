"use client"

import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PencilIcon, Trash2Icon, UserPlusIcon } from "lucide-react"
import { motion } from "framer-motion"

const people = [
  { name: "Camille Renard", role: "Admin", src: "https://i.pravatar.cc/160?img=1" },
  { name: "Julien Moreau", role: "Editor", src: "https://i.pravatar.cc/160?img=3" },
  { name: "Selma Bakri", role: "Viewer", src: "https://i.pravatar.cc/160?img=5" },
  { name: "Theo Larsson", role: "Editor", src: "https://i.pravatar.cc/160?img=8" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup06() {
  return (
    <div
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Manage members
        </h3>
        <Button variant="default" size="sm">
          <UserPlusIcon data-icon="inline-start" className="size-3.5" />
          Invite
        </Button>
      </div>
      <motion.ul
        className="divide-y divide-border"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {people.map((person) => (
          <motion.li
            key={person.name}
            variants={itemVariants}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
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
              <p className="text-xs text-muted-foreground">{person.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-xs" aria-label={`Edit ${person.name}`}>
                <PencilIcon />
              </Button>
              <Button variant="ghost" size="icon-xs" aria-label={`Remove ${person.name}`}>
                <Trash2Icon className="text-destructive" />
              </Button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
