import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const plans = [
  { name: "Free", description: "For personal projects", price: "$0", period: "/mo", badge: null, cta: "Get started", variant: "ghost" as const },
  { name: "Pro", description: "For professional teams", price: "$39", period: "/mo", badge: "Popular", cta: "Upgrade", variant: "default" as const },
  { name: "Business", description: "For scaling organizations", price: "$99", period: "/mo", badge: null, cta: "Start trial", variant: "outline" as const },
  { name: "Enterprise", description: "For global deployments", price: "Custom", period: "", badge: null, cta: "Contact sales", variant: "outline" as const },
]

export default function PricingCompactRows() {
  return (
    <section className="mx-auto w-full max-w-xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Plans
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Simple options, no hidden fees.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        {plans.map((plan, i) => (
          <motion.div key={plan.name} variants={itemVariants}>
            {i > 0 && <Separator />}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                  {plan.badge && (
                    <Badge variant="secondary" className="text-[10px]">
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{plan.description}</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Button variant={plan.variant} size="sm" className="min-w-[100px]">
                  {plan.cta}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
