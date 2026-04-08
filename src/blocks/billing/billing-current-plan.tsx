import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { SparklesIcon } from "lucide-react"

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

const usageMetrics = [
  { label: "API Calls", current: 18742, limit: 25000, unit: "calls" },
  { label: "Storage", current: 3.7, limit: 10, unit: "GB" },
  { label: "Team members", current: 7, limit: 15, unit: "seats" },
]

export default function BillingCurrentPlan() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <CardTitle className="tracking-tight">Current Plan</CardTitle>
              <Badge>Pro</Badge>
            </div>
            <CardDescription>
              Renews on May 12, 2026. Billed annually.
            </CardDescription>
          </motion.div>
          <CardAction>
            <motion.div variants={itemVariants}>
              <Button size="sm">
                <SparklesIcon className="size-3.5" />
                Upgrade
              </Button>
            </motion.div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              $29
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
            <span className="ml-2 text-xs text-muted-foreground tabular-nums">
              ($348/year)
            </span>
          </motion.div>

          <div className="flex flex-col gap-4">
            {usageMetrics.map((metric) => {
              const percentage = (metric.current / metric.limit) * 100
              return (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      {metric.label}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {typeof metric.current === "number" && metric.current % 1 !== 0
                        ? metric.current.toFixed(1)
                        : metric.current.toLocaleString()}{" "}
                      / {typeof metric.limit === "number" && metric.limit % 1 !== 0
                        ? metric.limit.toFixed(1)
                        : metric.limit.toLocaleString()}{" "}
                      {metric.unit}
                    </span>
                  </div>
                  <Progress value={Math.min(percentage, 100)} />
                  {percentage > 80 && (
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      Approaching limit — consider upgrading
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
