"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function HeroSplit() {
  return (
    <section className="w-full px-6 py-20 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Ship faster with
            <br />
            components that care
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            A design system built for teams who refuse to compromise on craft.
            Accessible, composable, and relentlessly polished.
          </motion.p>
          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button size="lg">Get started</Button>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button variant="outline" size="lg">
                View docs
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 22, delay: 0.2 }}
        >
          <div
            className="aspect-video w-full rounded-xl bg-muted ring-1 ring-foreground/5"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
