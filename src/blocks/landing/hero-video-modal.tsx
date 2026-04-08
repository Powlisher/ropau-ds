"use client"

import { PlayIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
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

export default function HeroVideoModal() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:py-36">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge variant="secondary">Watch the demo</Badge>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative w-full"
        >
          <div
            className="relative flex aspect-video w-full items-center justify-center rounded-xl bg-muted ring-1 ring-foreground/5"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
            >
              <Button
                size="icon-lg"
                variant="outline"
                className="size-14 rounded-full"
              >
                <PlayIcon className="size-5 fill-current" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          See it in action
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          Two minutes is all it takes to understand why teams switch.
          From install to production-ready in a single session.
        </motion.p>
      </motion.div>
    </section>
  )
}
