import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const faqs = [
  { q: "How do I get started?", a: "Sign up for free, create a project, and invite your team. Takes about 2 minutes." },
  { q: "Is there a free plan?", a: "Yes. 3 projects, 1 GB storage, community support. No credit card needed, no time limit." },
  { q: "Can I import from Notion?", a: "One-click import. Your pages, databases, and file attachments transfer with structure intact." },
  { q: "What is your uptime?", a: "99.9% for Business, 99.99% for Enterprise. Real-time status at status.example.com." },
  { q: "Do you have an API?", a: "Full REST and GraphQL APIs on Pro and above. SDKs for Node, Python, Go, and Ruby." },
  { q: "How do I cancel?", a: "Settings > Billing > Cancel. Takes effect immediately for monthly, end of period for annual." },
]

export default function FaqChatbotStyle() {
  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Ask us anything
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Common questions, answered conversationally.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4"
      >
        {faqs.map((faq) => (
          <motion.div key={faq.q} variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex justify-end">
              <div
                className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                {faq.q}
              </div>
            </div>
            <div className="flex justify-start">
              <div
                className="max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground"
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                {faq.a}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
