"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Rocket, Award, Code } from "lucide-react"

const events = [
  {
    date: "Mar 2026",
    title: "VP of Engineering at Solstice",
    description: "Leading a team of 34 engineers across 3 product verticals. Shipped the real-time collaboration engine that reduced churn by 23%.",
    icon: Briefcase,
    color: "bg-amber-100 text-amber-700",
  },
  {
    date: "Sep 2024",
    title: "Acquired by Solstice for $18.7M",
    description: "Omen Analytics was acquired after 26 months. All 12 team members transitioned into the Solstice platform org.",
    icon: Award,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    date: "Jun 2022",
    title: "Founded Omen Analytics",
    description: "Co-founded with Laura Nguyen. Built a predictive churn platform for mid-market SaaS companies. Raised a $2.4M seed round.",
    icon: Rocket,
    color: "bg-violet-100 text-violet-700",
  },
  {
    date: "Jan 2020",
    title: "Senior Engineer at Meridian",
    description: "Owned the billing and subscription infrastructure. Migrated 140k accounts to a new payment provider with zero downtime.",
    icon: Code,
    color: "bg-sky-100 text-sky-700",
  },
  {
    date: "May 2018",
    title: "MSc Computer Science, ETH Zurich",
    description: "Thesis on distributed consensus mechanisms. Published 2 papers on Byzantine fault tolerance in heterogeneous networks.",
    icon: GraduationCap,
    color: "bg-rose-100 text-rose-700",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 22 } },
}

export default function Timeline01() {
  return (
    <motion.div
      className="mx-auto max-w-3xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:hidden" />

        <div className="space-y-8 md:space-y-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0
            const Icon = event.icon

            return (
              <motion.div
                key={event.date}
                variants={itemVariants}
                className="relative"
              >
                <div className="absolute left-6 z-10 hidden size-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:left-1/2 md:block" />
                <div className="absolute left-6 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:hidden" />

                <div className={`md:flex md:items-start ${isLeft ? "md:flex-row-reverse" : ""}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    >
                      <Card
                        style={{
                          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                        }}
                      >
                        <CardContent className="p-5">
                          <div className="mb-3 flex items-center gap-2.5">
                            <div className={`flex size-8 items-center justify-center rounded-lg ${event.color}`}>
                              <Icon className="size-4" />
                            </div>
                            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase font-mono">
                              {event.date}
                            </span>
                          </div>
                          <h3 className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
                            {event.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {event.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
