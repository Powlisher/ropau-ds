"use client"

import { motion } from "framer-motion"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const avatars = [
  { initials: "SC", bg: "bg-primary/20 text-primary" },
  { initials: "MR", bg: "bg-accent/20 text-accent" },
  { initials: "JL", bg: "bg-chart-3/20 text-chart-3" },
  { initials: "AK", bg: "bg-chart-4/20 text-chart-4" },
]

export default function HeroSocialProof() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:py-36">
      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <AvatarGroup>
            {avatars.map((a) => (
              <Avatar key={a.initials} size="sm">
                <AvatarFallback className={a.bg}>{a.initials}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <span className="text-sm font-medium text-muted-foreground">
            Trusted by <span className="tabular-nums text-foreground">4,218</span> teams
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Build interfaces
          <br />
          people remember
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          Thoughtfully crafted components with obsessive attention to detail.
          From interaction feedback to pixel-perfect spacing.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 pt-2"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button size="lg">Get started free</Button>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button variant="outline" size="lg">
              See examples
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
