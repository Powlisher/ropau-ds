"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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

const steps = [
  {
    number: 1,
    title: "Install the CLI",
    description:
      "One command pulls in the core package, configures Tailwind, and scaffolds your token file.",
  },
  {
    number: 2,
    title: "Pick your components",
    description:
      "Browse the registry, select what you need. Each import is tree-shaken -- no bloat.",
  },
  {
    number: 3,
    title: "Ship with confidence",
    description:
      "Every component is tested, accessible, and production-ready. Focus on your product, not plumbing.",
  },
]

export default function HeroSteps() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:py-36">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center gap-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Up and running in minutes
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            Three steps from zero to a polished, production-grade interface.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid w-full gap-6 sm:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative flex flex-col items-center gap-4 text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+24px)] top-5 hidden w-[calc(100%-48px)] sm:block">
                  <Separator />
                </div>
              )}

              <motion.div
                className="relative z-10 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold tabular-nums text-primary-foreground"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                {step.number}
              </motion.div>

              <h3 className="font-heading text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button size="lg">Get started now</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
