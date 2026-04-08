"use client"

import { ZapIcon, ShieldCheckIcon, GaugeIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const features = [
  {
    icon: ZapIcon,
    title: "Instant setup",
    description: "One command to scaffold. Zero config required to start building.",
  },
  {
    icon: ShieldCheckIcon,
    title: "WCAG 2.2 AA",
    description: "Every component tested with screen readers and keyboard navigation.",
  },
  {
    icon: GaugeIcon,
    title: "Sub-50kb bundle",
    description: "Tree-shakeable exports. Import only what you actually render.",
  },
]

export default function HeroWaitlist() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:py-36">
      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          The next generation
          <br />
          is almost here
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-md text-lg leading-relaxed text-muted-foreground"
        >
          Be the first to access our v2 release. Early supporters get lifetime
          access to the Pro tier.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex w-full max-w-sm items-center gap-2"
        >
          <Input
            type="email"
            placeholder="you@company.com"
            className="h-9"
          />
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button size="lg" className="shrink-0">
              Join waitlist
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm text-muted-foreground"
        >
          <span className="tabular-nums font-medium text-foreground">2,847</span>{" "}
          people on the waitlist
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-4 grid w-full max-w-2xl gap-4 sm:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -3 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card
                className="text-left"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className="flex flex-col gap-2">
                  <feature.icon className="size-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {feature.title}
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
