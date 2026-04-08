"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZapIcon, ArrowRightIcon } from "lucide-react"

const targetDate = new Date(Date.now() + 4 * 60 * 60 * 1000 + 23 * 60 * 1000 + 47 * 1000)

function useCountdown(target: Date) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
  const diff = Math.max(0, target.getTime() - now.getTime())
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { hours, minutes, seconds }
}

const flashItems = [
  { name: "Kyoto Matcha Set", original: 145, sale: 87, savings: 40 },
  { name: "Oslo Carafe", original: 78, sale: 49, savings: 37 },
  { name: "Lisbon Tile Trivet", original: 34, sale: 19, savings: 44 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex size-14 items-center justify-center rounded-xl bg-card font-mono text-2xl font-bold tabular-nums tracking-tight text-foreground sm:size-16 sm:text-3xl"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}

export default function Storefront04() {
  const { hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 via-primary/3 to-transparent ring-1 ring-primary/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="gap-1 bg-primary/15 text-primary hover:bg-primary/15">
                  <ZapIcon className="size-3" />
                  Flash Sale
                </Badge>
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Spring Studio Clearance
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Up to 44% off select pieces. Each item is a one-of-a-kind production run --
                once they are gone, they will not return.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <TimeBlock value={hours} label="Hours" />
              <span className="mt-[-16px] text-xl font-bold text-muted-foreground/50">:</span>
              <TimeBlock value={minutes} label="Min" />
              <span className="mt-[-16px] text-xl font-bold text-muted-foreground/50">:</span>
              <TimeBlock value={seconds} label="Sec" />
            </div>
          </div>

          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {flashItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={spring}
                  className="flex flex-col gap-3 rounded-xl bg-card p-5 ring-1 ring-border"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="aspect-[4/3] rounded-lg bg-secondary" />
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">{item.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-base font-bold tabular-nums tracking-tight text-primary">
                        ${item.sale}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground line-through">
                        ${item.original}
                      </span>
                      <Badge variant="secondary" className="ml-auto text-[10px]">
                        -{item.savings}%
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center">
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button size="lg" className="gap-2">
                View All Deals
                <ArrowRightIcon className="size-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
