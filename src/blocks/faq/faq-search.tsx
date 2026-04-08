"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { SearchIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const faqs = [
  { q: "How do I reset my password?", a: "Go to Settings > Security > Change password. You can also use the 'Forgot password' link on the login page to receive a reset email." },
  { q: "Can I export my data?", a: "Yes. Navigate to Settings > Data > Export. You can export as JSON, CSV, or a full workspace backup. Enterprise plans support automated scheduled exports." },
  { q: "How do I invite team members?", a: "Open your workspace settings, click 'Members', and enter their email addresses. They will receive an invitation link valid for 7 days." },
  { q: "What browsers are supported?", a: "We support the latest two versions of Chrome, Firefox, Safari, and Edge. Mobile browsers on iOS 16+ and Android 13+ are fully supported." },
  { q: "How does billing work for added seats?", a: "New seats are prorated for the remainder of your billing cycle. If you add 3 seats on day 15 of a 30-day cycle, you pay half price for those seats that month." },
  { q: "Can I use custom domains?", a: "Custom domains are available on Pro and above. Add your domain in Settings > Domains, then update your DNS CNAME record. SSL is provisioned automatically." },
  { q: "Is there a mobile app?", a: "Native iOS and Android apps are available. They support offline mode for viewing and light editing, with full sync when you reconnect." },
  { q: "How do I contact support?", a: "Free users can post in the community forum. Pro users get email support with 24-hour response. Business and Enterprise users have access to live chat and phone support." },
]

export default function FaqSearch() {
  const [query, setQuery] = useState("")

  const filtered = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          How can we help?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Search or browse our most common questions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.08 }}
        className="mb-6"
      >
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </motion.div>

      <div
        className="rounded-xl bg-card px-5 ring-1 ring-foreground/10"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        {filtered.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm font-medium text-foreground">No matching questions</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different search term or browse all questions by clearing the filter.
            </p>
          </div>
        ) : (
          <Accordion>
            {filtered.map((faq, i) => (
              <AccordionItem key={faq.q} value={i}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  )
}
