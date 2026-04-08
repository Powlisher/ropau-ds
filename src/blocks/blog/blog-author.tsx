"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const author = {
  name: "Sofia Petrovska",
  initials: "SP",
  bio: "Staff engineer focused on distributed systems and developer tooling. Previously at Stripe and Vercel. Writes about performance, reliability, and the craft of building software that lasts.",
  articles: 37,
  socials: [
    { label: "Twitter", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogAuthor() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants}>
          <Avatar className="size-20">
            <AvatarFallback className="text-xl font-semibold">
              {author.initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-6 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {author.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          {author.bio}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center gap-3"
        >
          <Badge variant="secondary">
            <span className="tabular-nums">{author.articles}</span> articles
          </Badge>
          {author.socials.map((social) => (
            <a key={social.label} href={social.href} className="inline-flex h-7 items-center justify-center rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {social.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
