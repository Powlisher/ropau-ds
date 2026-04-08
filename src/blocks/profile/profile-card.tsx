"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const person = {
  name: "Raphael Mendes",
  role: "Staff Engineer",
  company: "Vercel",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face",
  socials: [
    { label: "GitHub", href: "#", icon: "GH" },
    { label: "LinkedIn", href: "#", icon: "LI" },
    { label: "X", href: "#", icon: "X" },
  ],
}

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="w-full max-w-xs"
    >
      <Card
        className="items-center text-center"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardContent className="flex flex-col items-center gap-4 pt-2">
          <Avatar className="size-20 ring-2 ring-foreground/5">
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback className="text-xl font-semibold">RM</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <h3 className="font-heading text-base font-semibold tracking-tight">
              {person.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {person.role} at {person.company}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {person.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex size-8 items-center justify-center rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <Separator />

          <Button className="w-full">Contact</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
