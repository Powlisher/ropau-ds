"use client"

import { CheckIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For side projects and experiments",
    cta: "Get started",
    ctaVariant: "outline" as const,
    features: [
      { name: "Up to 3 projects", included: true },
      { name: "Community support", included: true },
      { name: "Core components", included: true },
      { name: "Custom themes", included: false },
      { name: "Priority support", included: false },
      { name: "Figma kit access", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For teams shipping production software",
    cta: "Start free trial",
    ctaVariant: "default" as const,
    featured: true,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Priority support (4h SLA)", included: true },
      { name: "All 120+ components", included: true },
      { name: "Custom themes & tokens", included: true },
      { name: "Dedicated Slack channel", included: true },
      { name: "Figma kit + updates", included: true },
    ],
  },
]

export default function HeroPricing() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:py-36">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Simple, honest pricing
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            No surprises, no hidden fees. Start free, upgrade when your
            team is ready.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid w-full gap-6 sm:grid-cols-2"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card
                className={`relative h-full ${plan.featured ? "ring-2 ring-primary" : ""}`}
                style={{
                  boxShadow: plan.featured
                    ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"
                    : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <CardDescription>{plan.description}</CardDescription>
                  <CardTitle className="flex items-baseline gap-1.5">
                    <span className="font-heading text-3xl font-bold tabular-nums tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">
                      / {plan.period}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        {feature.included ? (
                          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <CheckIcon className="size-2.5 text-primary" />
                          </span>
                        ) : (
                          <span className="flex size-4 shrink-0 items-center justify-center">
                            <XIcon className="size-3 text-muted-foreground/40" />
                          </span>
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground/60"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
