"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const entries = [
  {
    title: "Multi-region data residency",
    description: "Enterprise customers can now pin their data to EU, US-East, or APAC regions. Migration happens in the background with zero downtime.",
    version: "6.3.0",
    date: "Apr 3, 2026",
    authors: [
      { name: "Elise Moreau", initials: "EM", color: "oklch(0.85 0.06 280)" },
      { name: "Karim Haddad", initials: "KH", color: "oklch(0.85 0.06 145)" },
    ],
  },
  {
    title: "Figma plugin: sync design tokens to code",
    description: "Push color, spacing, and typography tokens from Figma directly into your codebase. Supports CSS custom properties and Tailwind config.",
    version: "6.2.0",
    date: "Mar 26, 2026",
    authors: [
      { name: "Lena Vogt", initials: "LV", color: "oklch(0.85 0.06 30)" },
    ],
  },
  {
    title: "Granular webhook event filters",
    description: "Subscribe to specific event subtypes instead of broad categories. Reduces noise by up to 80% for high-volume integrations.",
    version: "6.1.2",
    date: "Mar 19, 2026",
    authors: [
      { name: "Marcus Chen", initials: "MC", color: "oklch(0.85 0.06 200)" },
      { name: "Elise Moreau", initials: "EM", color: "oklch(0.85 0.06 280)" },
      { name: "Ayo Okonkwo", initials: "AO", color: "oklch(0.85 0.06 55)" },
    ],
  },
  {
    title: "Conditional automation rules",
    description: "Build if/then workflows with up to 12 conditions per rule. Supports field comparisons, date ranges, and custom formula evaluation.",
    version: "6.1.0",
    date: "Mar 9, 2026",
    authors: [
      { name: "Ayo Okonkwo", initials: "AO", color: "oklch(0.85 0.06 55)" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog06() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Shipped by the team</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Every release, attributed to the people who built it.
        </p>
      </div>

      <div className="space-y-5">
        {entries.map((entry) => (
          <motion.div
            key={entry.version}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <Badge variant="secondary" className="font-mono text-xs tabular-nums">
                    v{entry.version}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <h3 className="mt-2.5 font-heading text-[15px] font-semibold tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4">
              <div className="flex -space-x-2">
                {entry.authors.map((author) => (
                  <Avatar key={author.initials} className="size-7 ring-2 ring-card">
                    <AvatarFallback
                      className="text-[10px] font-semibold"
                      style={{ backgroundColor: author.color }}
                    >
                      {author.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {entry.authors.map((a) => a.name).join(", ")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
