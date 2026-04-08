"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { motion } from "framer-motion"

const team = {
  name: "Design Systems",
  description: "Core UI components and tokens",
  members: [
    { name: "Camille Renard", src: "https://i.pravatar.cc/160?img=1" },
    { name: "Julien Moreau", src: "https://i.pravatar.cc/160?img=3" },
    { name: "Selma Bakri", src: "https://i.pravatar.cc/160?img=5" },
    { name: "Theo Larsson", src: "https://i.pravatar.cc/160?img=8" },
  ],
  extraCount: 7,
}

export default function AvatarGroup07() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mb-1">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {team.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {team.description}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <AvatarGroup>
          {team.members.map((m) => (
            <Avatar key={m.name}>
              <AvatarImage src={m.src} alt={m.name} />
              <AvatarFallback>
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+{team.extraCount}</AvatarGroupCount>
        </AvatarGroup>
        <Button variant="outline" size="sm">
          <PlusIcon data-icon="inline-start" className="size-3.5" />
          Invite
        </Button>
      </div>
    </motion.div>
  )
}
