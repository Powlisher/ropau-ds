"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Workspace", value: "Ropau Studio" },
  { label: "Team members", value: "4 invited" },
  { label: "Integrations", value: "3 connected" },
  { label: "Plan", value: "Pro trial (14 days)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function ConfettiDots() {
  const [dots] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: 3 + Math.random() * 5,
      color: ["bg-primary", "bg-accent", "bg-primary/40", "bg-accent/40", "bg-muted-foreground/20"][
        Math.floor(Math.random() * 5)
      ],
      duration: 1.8 + Math.random() * 1.2,
    }))
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${dot.color}`}
          style={{ left: `${dot.x}%`, width: dot.size, height: dot.size }}
          initial={{ y: -20, opacity: 0, scale: 0 }}
          animate={{ y: 200, opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5] }}
          transition={{ delay: dot.delay, duration: dot.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

export default function OnboardingComplete() {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(true), [])

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="relative w-full max-w-md overflow-hidden">
        {show && <ConfettiDots />}

        <CardContent className="relative z-10 py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5"
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-8 text-primary"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                />
              </motion.svg>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                You&apos;re all set
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your workspace is ready. Here&apos;s a summary of what was configured.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <div className="rounded-lg bg-muted/50 divide-y divide-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button className="w-full h-10">Go to Dashboard</Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
