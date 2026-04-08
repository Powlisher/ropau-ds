"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { CheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const tiers = [
  {
    name: "Starter",
    price: "$0",
    features: ["3 projects", "Community support", "1 GB storage"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    features: ["Unlimited projects", "Priority support", "100 GB storage", "API access"],
    cta: "Upgrade",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Everything in Pro", "SSO & audit", "Dedicated CSM", "SLA"],
    cta: "Contact sales",
    highlighted: false,
  },
]

const faqs = [
  {
    question: "Can I switch plans mid-cycle?",
    answer: "Yes. Upgrades take effect immediately and we prorate the difference. Downgrades apply at the end of your current billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), wire transfers for annual Enterprise contracts, and can issue invoices with NET-30 terms for qualified accounts.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Pro includes a 14-day free trial with full access. No credit card required upfront. Enterprise trials are available upon request with a solutions engineer walkthrough.",
  },
  {
    question: "What happens if I exceed my storage limit?",
    answer: "We will notify you at 80% and 95% usage. You can upgrade at any time. We never delete data without explicit confirmation, even if you exceed your limit temporarily.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Monthly plans can be cancelled anytime with no refund for the current month. Annual plans include a 30-day money-back guarantee from the start of the contract.",
  },
]

export default function PricingFaqCombo() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Pricing that grows with you
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start free, upgrade when you are ready.
        </p>
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
              className={`h-full ${tier.highlighted ? "ring-2 ring-primary/30" : ""}`}
              style={{
                boxShadow: tier.highlighted
                  ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
                  : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{tier.name}</CardTitle>
                  {tier.highlighted && <Badge>Popular</Badge>}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <span className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground">
                  {tier.price}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </span>
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.3 }}
        className="mt-16"
      >
        <h3 className="mb-6 text-center font-heading text-lg font-semibold tracking-tight text-foreground">
          Frequently asked questions
        </h3>
        <div
          className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
          }}
        >
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={i}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  )
}
