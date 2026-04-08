import { motion } from "framer-motion"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  { q: "How do I get started?", a: "Sign up for a free account, create your first project, and invite your team. The onboarding wizard walks you through the core setup in under 3 minutes." },
  { q: "Can I import data from other tools?", a: "Yes. We support direct imports from Notion, Airtable, Google Sheets, and CSV files. Enterprise plans include a dedicated migration engineer for complex setups." },
  { q: "Is my data encrypted?", a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We also support customer-managed encryption keys on Business and Enterprise plans." },
  { q: "What happens when my trial ends?", a: "Your workspace downgrades to the free tier automatically. No data is lost -- you keep read access to everything. Upgrade anytime to restore full functionality." },
  { q: "Do you offer team discounts?", a: "Teams of 10+ on annual plans receive 15% off. Larger organizations should contact sales for custom volume pricing with NET-30 invoicing." },
  { q: "Can I cancel anytime?", a: "Monthly plans can be cancelled at any time from your billing settings. Annual plans include a 30-day satisfaction guarantee. No cancellation fees, no lock-in." },
  { q: "How does version control work?", a: "Every change is automatically versioned with a 90-day history on Pro and unlimited history on Business. You can compare, restore, or fork from any point in time." },
  { q: "Is there an API?", a: "A full REST and GraphQL API is available on Pro and above. Rate limits scale with your plan -- 100 req/min on Pro, 1,000 on Business, custom on Enterprise." },
]

export default function FaqAccordion() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything you need to know before getting started.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
        className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={i}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
