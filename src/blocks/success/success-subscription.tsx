"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, LayoutDashboardIcon } from "lucide-react"

const features = [
  "Unlimited team members",
  "Custom integrations (API access)",
  "Priority support (4h SLA)",
  "Advanced analytics dashboard",
  "SSO / SAML authentication",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessSubscription() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    Subscription activated
                  </h2>
                  <Badge>Pro</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Next billing date: <span className="tabular-nums">May 8, 2026</span>
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Features enabled
              </p>
              <ul className="flex flex-col gap-1.5">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-foreground">
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                      <CheckIcon className="size-3 text-primary" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button className="w-full gap-1.5">
            <LayoutDashboardIcon data-icon="inline-start" className="size-4" />
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
