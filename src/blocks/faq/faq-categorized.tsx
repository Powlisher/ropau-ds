"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const categories = {
  general: [
    { q: "What is this platform?", a: "A collaborative workspace for product teams to ship faster. Think of it as your team's command center for projects, tasks, and documentation." },
    { q: "Who is it for?", a: "Engineering teams of 3-50 people building software products. Particularly effective for cross-functional teams with designers, PMs, and engineers." },
    { q: "How is it different from Notion or Linear?", a: "We focus on the build phase specifically -- from spec to shipped feature. Tighter integrations with CI/CD, design tools, and observability than general-purpose tools." },
  ],
  billing: [
    { q: "What payment methods are accepted?", a: "All major credit cards, ACH transfers, and wire transfers for annual Enterprise contracts. We also support purchase orders for qualified accounts." },
    { q: "Can I switch between monthly and annual?", a: "Yes. Switching to annual applies a 20% discount immediately. Switching to monthly takes effect at the end of your current annual period." },
    { q: "Do you offer refunds?", a: "Monthly plans: no refunds but cancel anytime. Annual plans: 30-day money-back guarantee from the contract start date." },
  ],
  technical: [
    { q: "What integrations are available?", a: "GitHub, GitLab, Bitbucket, Figma, Linear, Slack, Discord, and 40+ more via our API and Zapier connector. Custom webhooks on all paid plans." },
    { q: "Is there a self-hosted option?", a: "Enterprise plans can be deployed on your own AWS or GCP infrastructure. We provide Terraform modules and a dedicated deployment engineer for setup." },
    { q: "What is the uptime SLA?", a: "Free and Pro: 99.5% uptime commitment. Business: 99.9% with credits. Enterprise: 99.99% with custom terms and dedicated incident response." },
  ],
}

type Category = keyof typeof categories

const tabLabels: Record<Category, string> = {
  general: "General",
  billing: "Billing",
  technical: "Technical",
}

export default function FaqCategorized() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Questions by topic
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse by category to find what you need.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
      >
        <Tabs defaultValue="general">
          <div className="flex justify-center">
            <TabsList>
              {(Object.keys(categories) as Category[]).map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {tabLabels[cat]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {(Object.keys(categories) as Category[]).map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-6">
              <div
                className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <Accordion>
                  {categories[cat].map((faq, i) => (
                    <AccordionItem key={i} value={i}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  )
}
