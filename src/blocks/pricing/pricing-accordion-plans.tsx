"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { CheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const plans = [
  {
    name: "Hobby",
    price: "$0",
    period: "/mo",
    badge: null,
    features: ["1 project", "500 MB storage", "Community support", "Basic analytics"],
    cta: "Get started free",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/mo",
    badge: "Most popular",
    features: ["Unlimited projects", "50 GB storage", "Email support", "Advanced analytics", "API access", "Team roles"],
    cta: "Upgrade to Pro",
    variant: "default" as const,
  },
  {
    name: "Business",
    price: "$99",
    period: "/mo",
    badge: null,
    features: ["Everything in Pro", "500 GB storage", "Priority support", "SSO", "Audit logs", "Custom integrations", "SLA guarantee"],
    cta: "Start Business trial",
    variant: "outline" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    badge: "Contact us",
    features: ["Everything in Business", "Unlimited storage", "Dedicated CSM", "On-premise option", "Custom SLA", "Procurement support"],
    cta: "Talk to sales",
    variant: "outline" as const,
  },
]

export default function PricingAccordionPlans() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Pick your plan
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Expand each tier to see what is included.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
        className="rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Accordion defaultValue={[1]}>
          {plans.map((plan, i) => (
            <AccordionItem key={plan.name} value={i} className="px-5">
              <AccordionTrigger className="py-4">
                <div className="flex flex-1 items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                  {plan.badge && (
                    <Badge variant="secondary" className="text-[10px]">
                      {plan.badge}
                    </Badge>
                  )}
                  <span className="ml-auto mr-3 font-mono text-sm tabular-nums text-muted-foreground">
                    {plan.price}
                    <span className="text-xs">{plan.period}</span>
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 pb-2">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckIcon className="size-3.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ y: -1 }} transition={spring}>
                    <Button variant={plan.variant} size="sm">
                      {plan.cta}
                    </Button>
                  </motion.div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
