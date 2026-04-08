import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const faqs = [
  { q: "Is there a free plan?", a: "Yes. The free tier includes 3 projects, 1 GB of storage, and community support. No credit card required." },
  { q: "Can I cancel anytime?", a: "Monthly subscriptions can be cancelled instantly from your billing settings. No cancellation fees." },
  { q: "Do you offer student pricing?", a: "Verified students and educators get Pro for free through our Academic program. Apply with a .edu email." },
  { q: "What happens to my data if I cancel?", a: "Your data remains accessible in read-only mode for 30 days after cancellation. You can export everything during this window." },
  { q: "How fast is support response?", a: "Community forum: best-effort. Pro email: within 24 hours. Business live chat: under 4 hours. Enterprise: under 1 hour." },
  { q: "Can I use my own domain?", a: "Custom domains are supported on Pro and above. SSL certificates are provisioned automatically via Let's Encrypt." },
]

export default function FaqCompact() {
  return (
    <section className="mx-auto w-full max-w-xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Quick answers
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col"
      >
        {faqs.map((faq, i) => (
          <motion.div key={faq.q} variants={itemVariants}>
            {i > 0 && <Separator className="my-5" />}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold text-foreground">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
