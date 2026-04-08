"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SparklesIcon, ArrowRightIcon } from "lucide-react"

const nextSteps = [
  "Complete your profile with a photo and bio",
  "Explore the template gallery for quick starts",
  "Invite teammates to collaborate in real-time",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 0.8,
      size: 2 + Math.random() * 4,
      color: ["bg-primary/30", "bg-accent/30", "bg-primary/15"][Math.floor(Math.random() * 3)],
      dur: 2.5 + Math.random() * 1.5,
    }))
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{ left: `${p.x}%`, width: p.size, height: p.size }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 180, opacity: [0, 1, 1, 0] }}
          transition={{ delay: p.delay, duration: p.dur, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

export default function SuccessSignup() {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(true), [])

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="relative w-full max-w-md overflow-hidden">
        {show && <FloatingParticles />}
        <CardContent className="relative z-10 py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-14 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5"
            >
              <SparklesIcon className="size-6 text-primary" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                Welcome aboard
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your account is ready. Here are a few things to do next.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <ul className="flex flex-col gap-2">
                {nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-lg bg-muted/40 px-3 py-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium tabular-nums text-primary">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button className="w-full gap-1.5">
                Get Started
                <ArrowRightIcon data-icon="inline-end" className="size-4" />
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
