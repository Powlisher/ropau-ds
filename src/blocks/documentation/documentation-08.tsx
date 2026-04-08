"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How does billing work for the analytics API?",
    answer:
      "You're billed based on the number of events ingested per month. The free tier includes 50,000 events. Beyond that, pricing scales at $4 per additional 100k events. There are no charges for read queries — only ingestion counts.",
  },
  {
    question: "Can I self-host the SDK backend?",
    answer:
      "Yes. We provide Docker images and Helm charts for self-hosted deployments. The setup guide covers single-node and distributed configurations. Self-hosted instances require a valid enterprise license key.",
  },
  {
    question: "What data retention policies are available?",
    answer:
      "Free plans retain data for 90 days. Pro plans offer 12-month retention. Enterprise customers can configure custom retention periods up to 7 years, with automatic archival to cold storage after 24 months.",
  },
  {
    question: "Is the SDK compatible with edge runtimes?",
    answer:
      "Since v3.1.0, the SDK fully supports Vercel Edge, Cloudflare Workers, and Deno Deploy. The transport layer auto-detects the runtime and uses the appropriate fetch implementation. No additional configuration needed.",
  },
  {
    question: "How do I handle rate limiting in production?",
    answer:
      "The SDK includes built-in retry logic with exponential backoff. If you exceed 1,000 requests per minute, responses include Retry-After headers. For higher throughput, contact us about dedicated rate limit tiers.",
  },
  {
    question: "Do you support GDPR and SOC 2 compliance?",
    answer:
      "We are SOC 2 Type II certified and fully GDPR compliant. Data processing agreements are available on request. EU customers can choose the Frankfurt data center for data residency. PII redaction is configurable per-event.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function Documentation08() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Common questions about pricing, infrastructure, and compliance.
        </p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
              style={{
                boxShadow: isOpen
                  ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
                  : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted">
                  {isOpen ? (
                    <Minus className="h-3 w-3 text-foreground" />
                  ) : (
                    <Plus className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <span className="flex-1 text-sm font-medium">{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                  >
                    <div className="border-t px-5 py-4 pl-14">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
