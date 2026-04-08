import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { ActivityIcon, HardDriveIcon, ZapIcon } from "lucide-react"

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

const metrics = [
  {
    icon: ZapIcon,
    label: "API Requests",
    current: 18742,
    limit: 25000,
    unit: "requests",
    period: "this billing cycle",
  },
  {
    icon: HardDriveIcon,
    label: "Storage Used",
    current: 3.7,
    limit: 10,
    unit: "GB",
    period: "of allocated storage",
  },
  {
    icon: ActivityIcon,
    label: "Compute Minutes",
    current: 847,
    limit: 1000,
    unit: "min",
    period: "this billing cycle",
  },
]

export default function BillingUsageDashboard() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Usage Overview</CardTitle>
            <CardDescription>
              Resource consumption for the current billing period (Apr 1 - Apr 30, 2026).
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {metrics.map((metric) => {
            const percentage = (metric.current / metric.limit) * 100
            const isWarning = percentage > 80
            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className={`rounded-xl border px-4 py-4 ${
                  isWarning
                    ? "bg-amber-50/50 ring-1 ring-amber-200/60 dark:bg-amber-950/20 dark:ring-amber-800/40"
                    : "bg-card"
                }`}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted/70">
                      <metric.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">
                        {metric.label}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {metric.period}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                    {typeof metric.current === "number" && metric.current % 1 !== 0
                      ? metric.current.toFixed(1)
                      : metric.current.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}
                      / {typeof metric.limit === "number" && metric.limit % 1 !== 0
                        ? metric.limit.toFixed(1)
                        : metric.limit.toLocaleString()}{" "}
                      {metric.unit}
                    </span>
                  </span>
                </div>
                <Progress value={Math.min(percentage, 100)} />
                {isWarning && (
                  <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                    {Math.round(percentage)}% used — approaching your plan limit
                  </p>
                )}
              </motion.div>
            )
          })}
        </CardContent>
      </motion.div>
    </Card>
  )
}
