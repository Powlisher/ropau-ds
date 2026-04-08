"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZapIcon, HeartIcon, EyeIcon, UsersIcon } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  {
    icon: ZapIcon,
    title: "Velocity with intention",
    description: "We move fast because our tools are sharp, not because we skip steps. Speed is a byproduct of clarity, not urgency.",
    color: "text-amber-600 bg-amber-500/10 ring-amber-500/20",
  },
  {
    icon: HeartIcon,
    title: "Craft over polish",
    description: "We care about the substance of our work. A well-architected system matters more than a pixel-perfect mockup that nobody ships.",
    color: "text-rose-600 bg-rose-500/10 ring-rose-500/20",
  },
  {
    icon: EyeIcon,
    title: "Radical transparency",
    description: "Decisions are documented. Mistakes are shared openly. Context is the most valuable thing we can give each other.",
    color: "text-sky-600 bg-sky-500/10 ring-sky-500/20",
  },
  {
    icon: UsersIcon,
    title: "Small teams, big leverage",
    description: "We believe 4 people with the right tools can outperform 40 without them. Every hire needs to multiply the team, not just add to it.",
    color: "text-emerald-600 bg-emerald-500/10 ring-emerald-500/20",
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

export default function TeamCulture() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8 max-w-lg">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          How we work
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Culture is not what you put on the wall. It is what happens when nobody is looking.
          These are the principles we actually use to make decisions.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <motion.div
            key={v.title}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Card
              className="h-full"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader>
                <div className={`flex size-10 items-center justify-center rounded-xl ring-1 ${v.color}`}>
                  <v.icon className="size-5" />
                </div>
                <CardTitle className="mt-3 text-base font-semibold tracking-tight">
                  {v.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-8 overflow-hidden rounded-2xl ring-1 ring-foreground/5"
        style={{
          background: "linear-gradient(135deg, oklch(0.97 0.005 3.6) 0%, oklch(0.96 0.008 25) 100%)",
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex h-48 items-center justify-center">
          <p className="max-w-sm px-6 text-center text-sm leading-relaxed text-muted-foreground">
            We are a distributed team across Lyon, Berlin, and Tokyo. We overlap 4 hours daily and make the most of it.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
