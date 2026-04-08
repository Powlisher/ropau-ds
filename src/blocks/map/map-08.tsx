"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, NavigationIcon, ClockIcon, CarIcon, ArrowDownIcon } from "lucide-react"

const routeSteps = [
  { location: "Pearl District Studio", time: "Start", distance: null },
  { location: "I-405 S via NW Everett St", time: "4 min", distance: "1.2 mi" },
  { location: "I-5 S to Hawthorne Bridge", time: "8 min", distance: "3.4 mi" },
  { location: "Hawthorne Showroom", time: "Arrive", distance: null },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function RouteMap() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-muted/50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <motion.div
        className="absolute left-[30%] top-[25%]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 }}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">A</div>
      </motion.div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 30 28 Q 40 45 50 50 Q 60 55 65 68"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          className="text-primary/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </svg>
      <motion.div
        className="absolute left-[62%] top-[65%]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.6 }}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">B</div>
      </motion.div>
    </div>
  )
}

export default function Map08() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Route Planner
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Plan your trip between our studio locations.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Origin
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                A
              </div>
              <Input defaultValue="Pearl District Studio" className="pl-10" />
            </div>
          </div>
          <div className="flex items-end justify-center pb-2">
            <ArrowDownIcon className="size-4 rotate-0 text-muted-foreground sm:-rotate-90" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Destination
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                B
              </div>
              <Input defaultValue="Hawthorne Showroom" className="pl-10" />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <motion.div
            variants={itemVariants}
            className="aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-border lg:aspect-auto lg:min-h-[380px]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <RouteMap />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <Card
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CarIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">By Car</span>
                  </div>
                  <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">
                    Fastest
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div>
                    <div className="font-mono text-xl font-bold tabular-nums tracking-tight">12 min</div>
                    <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Duration</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <div className="font-mono text-xl font-bold tabular-nums tracking-tight">4.6 mi</div>
                    <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Distance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-0">
              {routeSteps.map((step, i) => (
                <div key={step.location} className="flex gap-3 py-2.5">
                  <div className="flex flex-col items-center">
                    <div className={`size-2.5 rounded-full ${
                      i === 0 ? "bg-primary" : i === routeSteps.length - 1 ? "bg-emerald-500" : "bg-border"
                    }`} />
                    {i < routeSteps.length - 1 && (
                      <div className="mt-1 h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="text-xs font-medium text-foreground">{step.location}</div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <ClockIcon className="size-2.5" />
                      {step.time}
                      {step.distance && (
                        <span className="font-mono tabular-nums">{step.distance}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button className="w-full gap-2">
                <NavigationIcon className="size-4" />
                Start Navigation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
