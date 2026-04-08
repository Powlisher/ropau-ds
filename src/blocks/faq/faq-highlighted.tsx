import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const featured = {
  q: "What makes this different from other tools?",
  a: "We are purpose-built for the build phase of product development -- from spec to shipped feature. Unlike general-purpose project management tools, every feature is designed around the developer and designer workflow: native CI/CD integration, real-time design token syncing, and automatic deployment previews for every PR. Teams report shipping 40% faster within the first quarter.",
}

const faqs = [
  { q: "How do I get started?", a: "Create a free account, start a project, and invite your team. The setup wizard takes under 3 minutes and connects to your existing GitHub or GitLab repos." },
  { q: "Is there a free plan?", a: "Yes. 3 projects, 1 GB storage, and community support with no time limit. Upgrade when you need more." },
  { q: "Can I import my existing data?", a: "Direct imports from Notion, Linear, Jira, and CSV. Enterprise customers get a dedicated migration engineer." },
  { q: "What security certifications do you have?", a: "SOC 2 Type II, GDPR compliant, and annual third-party penetration testing. Encryption at rest and in transit on all plans." },
  { q: "Do you offer phone support?", a: "Phone and dedicated Slack channel support is available on Enterprise plans. Business gets live chat with 4-hour SLA." },
  { q: "Can I use a custom domain?", a: "Custom domains with automatic SSL are available on Pro and above. Setup takes about 5 minutes via DNS CNAME." },
]

export default function FaqHighlighted() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start with the big one, then dive deeper.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.08 }}
        className="mb-6"
      >
        <Card
          className="ring-2 ring-primary/20"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg">{featured.q}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{featured.a}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.16 }}
        className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
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
