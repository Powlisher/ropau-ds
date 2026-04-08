import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const features = [
  "Dedicated infrastructure",
  "Custom SLA (up to 99.99%)",
  "SSO via SAML 2.0 / OIDC",
  "Role-based access control",
  "Audit log & compliance exports",
  "Dedicated customer success manager",
  "Volume licensing & procurement",
  "Priority incident response",
]

export default function PricingEnterpriseContact() {
  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <Badge variant="outline">Custom</Badge>
            </div>
            <CardDescription className="leading-relaxed">
              Tailored pricing for organizations with 50+ seats. Volume
              discounts, multi-year contracts, and invoiced billing available.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
                Custom
              </span>
              <span className="text-sm text-muted-foreground">pricing</span>
            </div>

            <ul className="grid gap-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2.5">
              <motion.div whileHover={{ y: -2 }} transition={spring}>
                <Button size="lg" className="w-full">
                  Contact Sales
                </Button>
              </motion.div>
              <p className="text-center text-xs text-muted-foreground/60">
                Average response time: 4 business hours
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
