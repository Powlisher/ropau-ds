import { motion } from "framer-motion"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const leftColumn = [
  { q: "What is included in the free plan?", a: "3 projects, 1 GB storage, community support, and basic analytics. No credit card required, no expiration." },
  { q: "How do I upgrade my plan?", a: "Go to Settings > Billing and select your new plan. Upgrades take effect immediately with prorated billing." },
  { q: "Can I invite external collaborators?", a: "Guest access is available on Pro and above. Guests can view and comment but cannot modify project settings." },
  { q: "Is there a mobile app?", a: "Native iOS and Android apps with offline support for viewing. Push notifications for mentions and assignments." },
]

const rightColumn = [
  { q: "What integrations are supported?", a: "GitHub, GitLab, Slack, Figma, Linear, Jira, and 30+ more. Custom webhooks available on Business plans." },
  { q: "How is my data backed up?", a: "Continuous replication across 3 availability zones. Point-in-time recovery for the last 30 days on all paid plans." },
  { q: "Do you offer an on-premise version?", a: "Enterprise plans include self-hosted deployment via Docker or Kubernetes. Terraform modules for AWS and GCP provided." },
  { q: "What is the cancellation policy?", a: "Cancel monthly plans anytime from your dashboard. Annual plans include a 30-day money-back guarantee." },
]

export default function FaqDualColumn() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Questions and answers
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse our most frequently asked questions.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <Accordion>
            {leftColumn.map((faq, i) => (
              <AccordionItem key={i} value={i}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <Accordion>
            {rightColumn.map((faq, i) => (
              <AccordionItem key={i} value={i}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  )
}
