"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { MailIcon, MapPinIcon } from "lucide-react"
import { motion } from "framer-motion"

const people = [
  {
    name: "Camille Renard",
    role: "Product Lead",
    email: "camille@acme.io",
    location: "Lyon, FR",
    department: "Product",
    src: "https://i.pravatar.cc/160?img=1",
  },
  {
    name: "Julien Moreau",
    role: "Staff Engineer",
    email: "julien.m@acme.io",
    location: "Berlin, DE",
    department: "Engineering",
    src: "https://i.pravatar.cc/160?img=3",
  },
  {
    name: "Selma Bakri",
    role: "Design Director",
    email: "selma.b@acme.io",
    location: "Lisbon, PT",
    department: "Design",
    src: "https://i.pravatar.cc/160?img=5",
  },
  {
    name: "Theo Larsson",
    role: "DevOps Engineer",
    email: "theo.l@acme.io",
    location: "Stockholm, SE",
    department: "Infrastructure",
    src: "https://i.pravatar.cc/160?img=8",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup04() {
  return (
    <div
      className="rounded-2xl bg-card p-6"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
        Hover to preview
      </h3>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {people.map((person) => (
          <motion.div key={person.name} variants={itemVariants}>
            <HoverCard>
              <HoverCardTrigger>
                <button className="rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar size="lg">
                    <AvatarImage src={person.src} alt={person.name} />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex gap-3">
                  <Avatar size="lg">
                    <AvatarImage src={person.src} alt={person.name} />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {person.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.role}
                    </p>
                    <Badge variant="secondary" className="mt-1.5">
                      {person.department}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MailIcon className="size-3 shrink-0" />
                    <span className="truncate">{person.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3 shrink-0" />
                    <span>{person.location}</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
