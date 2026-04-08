"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const features = [
  { title: "Real-Time Analytics", description: "Monitor your metrics live with sub-second latency. Custom dashboards for every team.", tag: "Analytics" },
  { title: "Automated Workflows", description: "Build complex automations with a visual editor. No code required for most use cases.", tag: "Automation" },
  { title: "Team Collaboration", description: "Share insights, annotate reports, and tag team members directly in context.", tag: "Teams" },
  { title: "Custom Integrations", description: "Connect to 200+ tools via native integrations or build your own with the API.", tag: "Developers" },
  { title: "Enterprise Security", description: "SOC 2 Type II certified. Role-based access, SSO, and audit logs out of the box.", tag: "Security" },
]

export default function CarouselCard() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const handler = () => setCurrent(api.selectedScrollSnap())
    api.on("select", handler)
    return () => { api.off("select", handler) }
  }, [api])

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Platform Features
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything you need, nothing you don't.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
          <CarouselContent className="-ml-4">
            {features.map((f, i) => (
              <CarouselItem key={f.title} className="basis-full pl-4 md:basis-1/3">
                <motion.div
                  animate={{
                    scale: current === i ? 1 : 0.92,
                    opacity: current === i ? 1 : 0.6,
                  }}
                  transition={spring}
                >
                  <Card
                    style={{
                      boxShadow:
                        current === i
                          ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)"
                          : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                    }}
                  >
                    <CardContent className="space-y-3">
                      <Badge variant="secondary" className="text-[10px]">
                        {f.tag}
                      </Badge>
                      <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                        {f.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {f.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  )
}
