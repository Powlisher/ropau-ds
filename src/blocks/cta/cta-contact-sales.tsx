import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaContactSales() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-xs font-medium tracking-wide text-primary">
          ENTERPRISE
        </div>

        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Built for teams that
          <br />
          move fast at scale
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          SSO, audit logs, dedicated infrastructure, and a support SLA
          that matches your uptime requirements. Custom contracts for 50+ seat deployments.
        </p>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ y: -2 }} transition={spring}>
            <Button size="lg">Talk to sales</Button>
          </motion.div>
          <Button variant="ghost" size="lg" className="text-muted-foreground">
            See pricing
          </Button>
        </div>

        <p className="text-xs tabular-nums text-muted-foreground/60">
          Trusted by 340+ companies including 12 Fortune 500
        </p>
      </motion.div>
    </section>
  )
}
