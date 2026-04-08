import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, XIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const beforeFeatures = [
  { label: "Manual data entry across 4 tools", included: false },
  { label: "Weekly reports compiled by hand", included: false },
  { label: "Insights buried in spreadsheets", included: false },
  { label: "3-day delay on critical metrics", included: false },
]

const afterFeatures = [
  { label: "Single source of truth, auto-synced", included: true },
  { label: "Real-time dashboards, always current", included: true },
  { label: "AI-surfaced signals in your inbox", included: true },
  { label: "Anomaly alerts within 12 minutes", included: true },
]

export default function CtaComparison() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          The difference is night and day
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          See what changes when your data pipeline actually works.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full bg-muted/30">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Before</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {beforeFeatures.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <XIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/50" />
                    {f.label}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            className="h-full ring-2 ring-primary/20"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <CardTitle className="text-primary">After</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {afterFeatures.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {f.label}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex justify-center"
      >
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
          <Button size="lg">Start your migration</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
