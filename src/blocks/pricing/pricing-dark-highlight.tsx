import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const plans = [
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For teams building production products",
    features: ["Unlimited projects", "100 GB storage", "Priority support", "Advanced analytics", "API access"],
    highlighted: false,
  },
  {
    name: "Scale",
    price: "$149",
    period: "/mo",
    description: "For high-growth organizations at scale",
    features: ["Everything in Pro", "1 TB storage", "SSO & SAML", "Dedicated CSM", "99.9% SLA", "Custom integrations"],
    highlighted: true,
  },
]

export default function PricingDarkHighlight() {
  return (
    <section
      className="w-full px-6 py-20"
      style={{ background: "linear-gradient(180deg, oklch(0.16 0.01 55), oklch(0.13 0.008 55))" }}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="mb-10 text-center"
        >
          <h2
            className="font-heading text-2xl font-semibold tracking-tight md:text-3xl"
            style={{ color: "oklch(0.95 0.01 55)" }}
          >
            Choose your plan
          </h2>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.6 0.01 55)" }}>
            Start with Pro, upgrade to Scale when you need it.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 md:grid-cols-2"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <div
                className={`flex h-full flex-col gap-6 rounded-2xl p-7 ${
                  plan.highlighted ? "ring-2 ring-primary" : "ring-1 ring-white/10"
                }`}
                style={{
                  background: plan.highlighted
                    ? "oklch(0.22 0.018 55)"
                    : "oklch(0.19 0.012 55)",
                  boxShadow: plan.highlighted
                    ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"
                    : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold" style={{ color: "oklch(0.95 0.01 55)" }}>
                      {plan.name}
                    </span>
                    {plan.highlighted && <Badge>Recommended</Badge>}
                  </div>
                  <p className="text-sm" style={{ color: "oklch(0.55 0.01 55)" }}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span
                    className="font-heading text-3xl font-bold tabular-nums tracking-tight"
                    style={{ color: "oklch(0.95 0.01 55)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: "oklch(0.5 0.01 55)" }}>
                    {plan.period}
                  </span>
                </div>

                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.8 0.01 55)" }}>
                      <CheckIcon className="size-3.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ y: -2 }} transition={spring}>
                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    className={`w-full ${!plan.highlighted ? "border-white/20 text-white/80 hover:bg-white/5 hover:text-white" : ""}`}
                  >
                    Get started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
