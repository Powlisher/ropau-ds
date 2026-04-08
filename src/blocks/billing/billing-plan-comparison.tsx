import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckIcon, XIcon } from "lucide-react"

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

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "For individuals and small projects",
    current: false,
    features: [
      { name: "5,000 API calls/mo", included: true },
      { name: "2 GB storage", included: true },
      { name: "3 team members", included: true },
      { name: "Email support", included: true },
      { name: "Custom domain", included: false },
      { name: "Priority support", included: false },
      { name: "SSO / SAML", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams with advanced needs",
    current: true,
    features: [
      { name: "25,000 API calls/mo", included: true },
      { name: "10 GB storage", included: true },
      { name: "15 team members", included: true },
      { name: "Priority support", included: true },
      { name: "Custom domain", included: true },
      { name: "Advanced analytics", included: true },
      { name: "SSO / SAML", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$89",
    period: "/month",
    description: "For organizations with compliance needs",
    current: false,
    features: [
      { name: "Unlimited API calls", included: true },
      { name: "100 GB storage", included: true },
      { name: "Unlimited members", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Custom domain", included: true },
      { name: "Advanced analytics", included: true },
      { name: "SSO / SAML", included: true },
    ],
  },
]

export default function BillingPlanComparison() {
  return (
    <Card
      className="w-full max-w-4xl"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Compare Plans</CardTitle>
            <CardDescription>
              Find the right plan for your team. All plans include core features.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className={`flex flex-col rounded-xl border p-5 ${
                  plan.current
                    ? "bg-primary/3 ring-2 ring-primary/20"
                    : "bg-card"
                }`}
                style={{
                  boxShadow: premiumShadow,
                }}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    {plan.current && (
                      <Badge variant="secondary" className="text-[10px]">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-5 flex items-baseline gap-0.5">
                  <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <div className="mb-5 flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-center gap-2"
                    >
                      {feature.included ? (
                        <CheckIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XIcon className="size-3.5 text-muted-foreground/40" />
                      )}
                      <span
                        className={`text-xs ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {plan.current ? (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Current plan
                    </Button>
                  ) : plan.name === "Enterprise" ? (
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full">
                      Downgrade
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
