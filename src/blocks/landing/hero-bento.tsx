"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const cells = [
  {
    title: "Analytics",
    description: "Real-time metrics across every touchpoint",
    span: "sm:col-span-2 sm:row-span-2",
    height: "min-h-[240px]",
  },
  {
    title: "Integrations",
    description: "Connect with 47 tools out of the box",
    span: "sm:col-span-1",
    height: "min-h-[112px]",
  },
  {
    title: "API",
    description: "REST and GraphQL, your choice",
    span: "sm:col-span-1",
    height: "min-h-[112px]",
  },
  {
    title: "Collaboration",
    description: "Multiplayer editing with conflict resolution",
    span: "sm:col-span-1",
    height: "min-h-[112px]",
  },
  {
    title: "Security",
    description: "SOC 2 Type II certified, E2E encrypted",
    span: "sm:col-span-1",
    height: "min-h-[112px]",
  },
  {
    title: "Workflows",
    description: "Automate repetitive processes in minutes",
    span: "sm:col-span-1",
    height: "min-h-[112px]",
  },
]

export default function HeroBento() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:py-36">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Everything you need,
            <br />
            nothing you don&apos;t
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            A complete platform that grows with your team. Each piece is
            designed to work independently or in concert.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 pt-2"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button size="lg">Explore features</Button>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button variant="outline" size="lg">
                View pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid w-full gap-3 sm:grid-cols-3"
        >
          {cells.map((cell) => (
            <motion.div
              key={cell.title}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cell.span}
            >
              <Card
                className={`h-full ${cell.height}`}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <CardTitle>{cell.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {cell.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
