"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrophyIcon, MedalIcon } from "lucide-react"

const winners = [
  {
    name: "Elena Marchetti",
    title: "Outstanding Engineering Lead",
    category: "Technical Excellence",
    year: "2026",
    initials: "EM",
    highlight: true,
  },
  {
    name: "James Okonkwo",
    title: "Product Innovation Award",
    category: "Product",
    year: "2026",
    initials: "JO",
    highlight: false,
  },
  {
    name: "Sofia Chen",
    title: "Customer Impact Champion",
    category: "Customer Success",
    year: "2026",
    initials: "SC",
    highlight: false,
  },
  {
    name: "Marcus Lindgren",
    title: "Rising Star Award",
    category: "Growth",
    year: "2025",
    initials: "ML",
    highlight: false,
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

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards01() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-12 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10">
          <TrophyIcon className="size-6 text-amber-600" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Trophy Showcase
          </h2>
          <p className="text-sm text-muted-foreground">
            Celebrating outstanding contributions across the organization.
          </p>
        </div>
      </div>

      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {winners.map((winner) => (
          <motion.div key={winner.name} variants={itemVariants}>
            <motion.div whileHover={{ y: -3 }} transition={spring}>
              <Card
                className={winner.highlight ? "ring-2 ring-amber-500/20" : ""}
                style={{
                  boxShadow: winner.highlight
                    ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)"
                    : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className={`flex gap-5 ${winner.highlight ? "py-8" : "py-6"}`}>
                  <div className="relative">
                    <Avatar className={winner.highlight ? "size-16" : "size-12"}>
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {winner.initials}
                      </AvatarFallback>
                    </Avatar>
                    {winner.highlight && (
                      <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-amber-500 text-white">
                        <MedalIcon className="size-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold tracking-tight text-foreground ${winner.highlight ? "text-lg" : "text-sm"}`}>
                        {winner.name}
                      </h3>
                      <Badge variant="secondary" className="text-[10px]">{winner.year}</Badge>
                    </div>
                    <p className={`font-medium ${winner.highlight ? "text-sm text-foreground" : "text-xs text-muted-foreground"}`}>
                      {winner.title}
                    </p>
                    <Badge variant="outline" className="text-[10px] font-medium">
                      {winner.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
