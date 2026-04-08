"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, MailIcon } from "lucide-react"
import { motion } from "framer-motion"

const contacts = [
  {
    name: "Camille Renard",
    handle: "@camille",
    bio: "Building products that people actually use. Previously at Stripe and Figma.",
    src: "https://i.pravatar.cc/160?img=1",
    url: "#profile-camille",
    email: "camille@acme.io",
  },
  {
    name: "Julien Moreau",
    handle: "@julien.m",
    bio: "Staff engineer focused on developer experience and build tooling.",
    src: "https://i.pravatar.cc/160?img=3",
    url: "#profile-julien",
    email: "julien.m@acme.io",
  },
  {
    name: "Selma Bakri",
    handle: "@selma",
    bio: "Design systems advocate. Obsessed with typography and motion.",
    src: "https://i.pravatar.cc/160?img=5",
    url: "#profile-selma",
    email: "selma.b@acme.io",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase10() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Interactive tooltips
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Hover cards with clickable actions inside
      </p>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contacts.map((c) => (
          <motion.div key={c.name} variants={itemVariants}>
            <HoverCard>
              <HoverCardTrigger>
                <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50">
                  <Avatar size="sm">
                    <AvatarImage src={c.src} alt={c.name} />
                    <AvatarFallback>
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {c.name}
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex gap-3">
                  <Avatar size="lg">
                    <AvatarImage src={c.src} alt={c.name} />
                    <AvatarFallback>
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {c.handle}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {c.bio}
                </p>
                <div className="mt-3 flex gap-2 border-t border-border pt-3">
                  <Button
                    variant="outline"
                    size="xs"
                    className="flex-1 gap-1"
                    render={<a href={c.url} />}
                  >
                    <ExternalLinkIcon className="size-3" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="flex-1 gap-1"
                    render={<a href={`mailto:${c.email}`} />}
                  >
                    <MailIcon className="size-3" />
                    Email
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
