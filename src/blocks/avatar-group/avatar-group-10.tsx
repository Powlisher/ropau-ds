"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

const people = [
  { name: "Camille Renard", src: "https://i.pravatar.cc/160?img=1" },
  { name: "Julien Moreau", src: "https://i.pravatar.cc/160?img=3" },
  { name: "Selma Bakri", src: "https://i.pravatar.cc/160?img=5" },
  { name: "Theo Larsson", src: "https://i.pravatar.cc/160?img=8" },
  { name: "Nadia Petrov", src: "https://i.pravatar.cc/160?img=9" },
]

const overflowNames = ["Marco Bianchi", "Aya Tanaka", "Leo Fischer"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup10() {
  return (
    <div
      className="flex flex-col items-center gap-5 rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        Reviewers
      </h3>
      <TooltipProvider>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AvatarGroup>
            {people.map((person) => (
              <motion.div key={person.name} variants={itemVariants}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar>
                      <AvatarImage src={person.src} alt={person.name} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="top">{person.name}</TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger>
                  <AvatarGroupCount>+{overflowNames.length}</AvatarGroupCount>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {overflowNames.join(", ")}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </AvatarGroup>
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
