import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const faqs = [
  { q: "How long is the free trial?", a: "14 days with full Pro features. No credit card required to start. You can upgrade or downgrade at any point during the trial." },
  { q: "Can I change my plan later?", a: "Absolutely. Upgrades take effect immediately, downgrades apply at the end of your billing cycle. No penalties either way." },
  { q: "Is my data secure?", a: "AES-256 encryption at rest, TLS 1.3 in transit. SOC 2 Type II certified. Annual third-party penetration testing." },
  { q: "Do you support SAML SSO?", a: "SSO via SAML 2.0 and OIDC is available on Business plans and above. Setup takes about 15 minutes with our configuration wizard." },
  { q: "What is your uptime guarantee?", a: "99.9% for Business, 99.99% for Enterprise with financial credits. Current status available at status.example.com." },
  { q: "Can I self-host?", a: "Enterprise plans include a self-hosted option with Terraform modules for AWS and GCP. Docker images for local development are available on all plans." },
  { q: "How does pricing scale?", a: "Per-seat pricing with volume discounts starting at 10 seats (10% off) and 50 seats (20% off). Annual billing saves an additional 17%." },
  { q: "What support channels exist?", a: "Community forum for Free, email for Pro (24h SLA), live chat for Business (4h SLA), dedicated Slack channel and phone for Enterprise." },
]

export default function FaqCardGrid() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Common questions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Quick answers to help you decide.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2"
      >
        {faqs.map((faq) => (
          <motion.div
            key={faq.q}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Card
              className="h-full"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-sm">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
