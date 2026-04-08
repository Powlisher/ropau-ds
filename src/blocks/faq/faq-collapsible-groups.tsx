"use client"

import { motion } from "framer-motion"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ChevronRightIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const groups = [
  {
    title: "Getting Started",
    faqs: [
      { q: "How do I create an account?", a: "Click 'Sign up' on the homepage, enter your email and password, and verify your email. You can also sign up with Google or GitHub SSO." },
      { q: "What is the onboarding process?", a: "A 3-step wizard guides you through creating your first project, connecting your Git repo, and inviting team members. Takes about 2 minutes." },
      { q: "Can I try it before committing?", a: "The free tier has no time limit. Pro offers a 14-day trial with full features, no credit card required." },
    ],
  },
  {
    title: "Billing and Plans",
    faqs: [
      { q: "How does billing work?", a: "Monthly plans bill on the signup anniversary date. Annual plans bill upfront with a 20% discount. All prices are per seat." },
      { q: "Can I change plans mid-cycle?", a: "Upgrades apply immediately with prorated charges. Downgrades take effect at the end of your current billing period." },
      { q: "What payment methods are accepted?", a: "Visa, Mastercard, Amex, and PayPal for monthly. Wire transfer and purchase orders available for annual Enterprise contracts." },
    ],
  },
  {
    title: "Security and Privacy",
    faqs: [
      { q: "Where is my data stored?", a: "Primary data centers in US-East (Virginia) and EU-West (Frankfurt). Enterprise customers can choose specific regions." },
      { q: "Do you sell user data?", a: "Never. We are a subscription business, not an advertising business. Your data is yours. See our privacy policy for details." },
      { q: "What compliance certifications do you hold?", a: "SOC 2 Type II, GDPR, CCPA, and HIPAA (Enterprise only). Annual third-party security audits and penetration testing." },
    ],
  },
  {
    title: "Technical",
    faqs: [
      { q: "What is the API rate limit?", a: "Pro: 100 requests/min. Business: 1,000 requests/min. Enterprise: custom limits. All plans include burst allowances for short spikes." },
      { q: "Can I self-host?", a: "Enterprise plans include self-hosted deployment via Docker or Kubernetes. We provide Terraform modules and a deployment guide." },
      { q: "What uptime do you guarantee?", a: "Free/Pro: 99.5%. Business: 99.9% with service credits. Enterprise: 99.99% with custom SLA terms." },
    ],
  },
]

export default function FaqCollapsibleGroups() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Help center
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Organized by topic for quick navigation.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4"
      >
        {groups.map((group) => (
          <motion.div key={group.title} variants={itemVariants}>
            <Collapsible defaultOpen>
              <div
                className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <CollapsibleTrigger className="flex w-full items-center gap-2 px-5 py-3.5 text-left transition-colors hover:bg-muted/30">
                  <ChevronRightIcon className="size-4 text-muted-foreground transition-transform [[data-open]>&]:rotate-90" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {group.title}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-1">
                    <Accordion>
                      {group.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={i}>
                          <AccordionTrigger>{faq.q}</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">{faq.a}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
