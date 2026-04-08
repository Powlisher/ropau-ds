import { motion } from "framer-motion"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  { q: "How does the free tier work?", a: "Create up to 3 projects with 1 GB storage. No time limit, no credit card. Upgrade when you need more." },
  { q: "What integrations are included?", a: "GitHub, GitLab, Figma, Slack, and 30+ more on Pro. Enterprise unlocks custom webhooks, Zapier, and our full REST API." },
  { q: "Can I migrate from another tool?", a: "We provide one-click importers for Notion, Linear, and Jira. For complex migrations, our team offers white-glove assistance on Business plans." },
  { q: "Is SOC 2 compliance available?", a: "SOC 2 Type II report is available on request for Business and Enterprise customers. We complete annual audits with a third-party firm." },
  { q: "What is the cancellation policy?", a: "Cancel monthly plans anytime, effective immediately. Annual contracts include a 30-day money-back window from the start date." },
  { q: "Do you offer volume discounts?", a: "Yes. 10+ seats: 10% off. 50+ seats: 20% off. 200+ seats: custom pricing with dedicated account management." },
]

export default function FaqDark() {
  return (
    <section
      className="w-full px-6 py-20"
      style={{ background: "linear-gradient(180deg, oklch(0.16 0.01 55), oklch(0.13 0.008 55))" }}
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="mb-8 text-center"
        >
          <h2
            className="font-heading text-2xl font-semibold tracking-tight md:text-3xl"
            style={{ color: "oklch(0.95 0.01 55)" }}
          >
            Got questions?
          </h2>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.6 0.01 55)" }}>
            Find answers to the most common ones below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
          className="rounded-xl px-5 ring-1 ring-white/10"
          style={{
            background: "oklch(0.19 0.012 55)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={i} className="border-white/5">
                <AccordionTrigger
                  className="hover:no-underline"
                  style={{ color: "oklch(0.9 0.01 55)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: "oklch(0.6 0.01 55)" }}>{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
