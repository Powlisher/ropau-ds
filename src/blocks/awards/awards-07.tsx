"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrophyIcon } from "lucide-react"

const hallOfFame = [
  { year: "2026", name: "Elena Marchetti", initials: "EM", award: "Innovator of the Year", dept: "Engineering" },
  { year: "2025", name: "James Okonkwo", initials: "JO", award: "Leadership Excellence", dept: "Product" },
  { year: "2024", name: "Ayumi Nakamura", initials: "AN", award: "Customer Champion", dept: "Support" },
  { year: "2023", name: "Carlos Reyes", initials: "CR", award: "Technical Pioneer", dept: "Engineering" },
  { year: "2022", name: "Priya Sharma", initials: "PS", award: "Culture Builder", dept: "People Ops" },
  { year: "2021", name: "Marcus Lindgren", initials: "ML", award: "Revenue Architect", dept: "Sales" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards07() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-12 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10">
          <TrophyIcon className="size-6 text-amber-600" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Hall of Fame
          </h2>
          <p className="text-sm text-muted-foreground">
            Every year's most exceptional contributor, dating back to our founding.
          </p>
        </div>
      </div>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[23px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-8">
          {hallOfFame.map((entry, i) => (
            <motion.div key={entry.year} variants={itemVariants} className="relative flex gap-6 pl-1">
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={spring}
                  className={`flex size-[46px] items-center justify-center rounded-full ring-4 ring-card ${
                    i === 0 ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="font-mono text-xs font-bold tabular-nums">{entry.year.slice(2)}</span>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={spring}
                className="flex-1 rounded-xl bg-card p-5 ring-1 ring-border"
                style={{
                  boxShadow: i === 0
                    ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
                    : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {entry.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{entry.name}</h3>
                      <Badge variant="secondary" className="text-[10px]">{entry.dept}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{entry.award}</p>
                  </div>
                  <span className="hidden font-mono text-lg font-bold tabular-nums tracking-tight text-muted-foreground/30 sm:block">
                    {entry.year}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
