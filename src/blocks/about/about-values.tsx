"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TargetIcon, SparklesIcon, ShieldIcon, LayersIcon } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  {
    icon: TargetIcon,
    title: "Focus relentlessly",
    description: "We say no to most things so we can say an emphatic yes to the few that matter. Scope creep is the enemy of great software.",
    color: "text-rose-600 bg-rose-500/10 ring-rose-500/20",
  },
  {
    icon: SparklesIcon,
    title: "Sweat the details",
    description: "The difference between good and great lives in the margins. We care about the animation curve, the error message copy, the loading skeleton.",
    color: "text-amber-600 bg-amber-500/10 ring-amber-500/20",
  },
  {
    icon: ShieldIcon,
    title: "Earn trust daily",
    description: "We don't hide behind NDAs or vague roadmaps. Our changelog is public, our decisions are documented, and our promises are kept.",
    color: "text-emerald-600 bg-emerald-500/10 ring-emerald-500/20",
  },
  {
    icon: LayersIcon,
    title: "Build on primitives",
    description: "Great systems are composable. We invest in foundational pieces that combine in unexpected ways rather than monolithic features that do one thing.",
    color: "text-sky-600 bg-sky-500/10 ring-sky-500/20",
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

export default function AboutValues() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Our Values</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          The principles that shape every decision we make.
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
    </motion.div>
  )
}
