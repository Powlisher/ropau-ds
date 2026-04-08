"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

const counters = [
  { label: "Projects Delivered", target: 1247, prefix: "", suffix: "" },
  { label: "Hours Saved", target: 38420, prefix: "", suffix: "h" },
  { label: "Team Members", target: 186, prefix: "", suffix: "" },
  { label: "Client Satisfaction", target: 98.7, prefix: "", suffix: "%" },
]

function AnimatedCounter({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    target % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString()
  )
  const [display, setDisplay] = useState(prefix + "0" + suffix)

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    const unsub = rounded.on("change", (v) => setDisplay(prefix + v + suffix))
    return () => {
      controls.stop()
      unsub()
    }
  }, [count, target, rounded, prefix, suffix])

  return (
    <motion.span className="text-3xl font-bold tabular-nums tracking-tight lg:text-4xl">
      {display}
    </motion.span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsCounters() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">Performance Metrics</h2>
        <p className="mt-1 text-sm text-muted-foreground">Real-time team performance overview</p>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {counters.map((counter) => (
          <motion.div key={counter.label} variants={itemVariants}>
            <Card
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {counter.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedCounter target={counter.target} prefix={counter.prefix} suffix={counter.suffix} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
