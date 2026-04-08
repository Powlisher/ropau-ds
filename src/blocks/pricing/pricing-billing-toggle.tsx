"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const tiers = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    description: "For solo makers exploring the platform",
    features: ["3 projects", "1 GB storage", "Community support", "Basic analytics"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: 39,
    annual: 31,
    description: "For growing teams that need more power",
    features: ["Unlimited projects", "100 GB storage", "Priority email support", "Advanced analytics", "API access", "Team roles"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Scale",
    monthly: 149,
    annual: 119,
    description: "For organizations with complex needs",
    features: ["Everything in Pro", "1 TB storage", "SSO & audit logs", "Dedicated CSM", "Custom integrations", "99.9% SLA"],
    cta: "Talk to sales",
    highlighted: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function PricingBillingToggle() {
  const [annual, setAnnual] = useState(true)

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 flex flex-col items-center gap-5 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Simple, transparent pricing
        </h2>
        <div className="flex items-center gap-3">
          <Label className={annual ? "text-muted-foreground" : "text-foreground font-semibold"}>
            Monthly
          </Label>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <Label className={annual ? "text-foreground font-semibold" : "text-muted-foreground"}>
            Annual
          </Label>
          {annual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring}
            >
              <Badge variant="secondary" className="text-xs tabular-nums">Save 20%</Badge>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5 md:grid-cols-3"
      >
        {tiers.map((tier) => (
          <motion.div key={tier.name} variants={itemVariants}>
            <Card
              className={tier.highlighted ? "ring-2 ring-primary/30" : ""}
              style={{
                boxShadow: tier.highlighted
                  ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)"
                  : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{tier.name}</CardTitle>
                  {tier.highlighted && <Badge>Popular</Badge>}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={spring}
                    className="flex items-baseline gap-1"
                  >
                    <span className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground">
                      ${annual ? tier.annual : tier.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </motion.div>
                </AnimatePresence>

                <ul className="flex flex-col gap-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckIcon className="size-3.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ y: -1 }} transition={spring} className="w-full">
                  <Button
                    variant={tier.highlighted ? "default" : "outline"}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
