import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckIcon, XIcon, MinusIcon } from "lucide-react"

const plans = ["Free", "Team", "Business", "Enterprise"] as const

const categories = [
  {
    name: "Infrastructure",
    features: [
      { name: "Environments", values: ["1", "3", "10", "Unlimited"] },
      { name: "Build minutes/mo", values: ["500", "3,000", "10,000", "Custom"] },
      { name: "Concurrent builds", values: ["1", "5", "20", "Unlimited"] },
      { name: "Edge regions", values: [false, "3", "12", "All 34"] },
      { name: "Custom domains", values: ["1", "10", "Unlimited", "Unlimited"] },
    ],
  },
  {
    name: "Security",
    features: [
      { name: "SSL certificates", values: [true, true, true, true] },
      { name: "DDoS protection", values: ["Basic", "Basic", "Advanced", "Enterprise"] },
      { name: "SSO / SAML", values: [false, false, true, true] },
      { name: "SOC 2 report", values: [false, false, true, true] },
      { name: "IP allowlisting", values: [false, false, false, true] },
    ],
  },
  {
    name: "Observability",
    features: [
      { name: "Log retention", values: ["1 day", "7 days", "30 days", "1 year"] },
      { name: "Alerting", values: [false, "Email", "Multi-channel", "Custom"] },
      { name: "Tracing", values: [false, false, true, true] },
      { name: "Custom dashboards", values: [false, false, "5", "Unlimited"] },
    ],
  },
]

const prices = ["$0", "$29", "$99", "Custom"]

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <CheckIcon className="size-4 text-primary" />
  if (value === false) return <MinusIcon className="size-3 text-muted-foreground/25" />
  return <span className="tabular-nums text-sm">{value}</span>
}

export default function PricingFeatureMatrix() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Full feature breakdown
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every capability across every plan, no surprises.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-[200px]" />
              {plans.map((plan, i) => (
                <TableHead key={plan} className="text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">{plan}</span>
                      {i === 2 && <Badge variant="secondary" className="text-[10px]">Popular</Badge>}
                    </div>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      {prices[i]}/mo
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <>
                <TableRow key={cat.name} className="bg-muted/20 hover:bg-muted/20">
                  <TableCell
                    colSpan={5}
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    {cat.name}
                  </TableCell>
                </TableRow>
                {cat.features.map((f) => (
                  <TableRow key={f.name}>
                    <TableCell className="text-sm text-foreground">{f.name}</TableCell>
                    {f.values.map((val, i) => (
                      <TableCell key={i} className="text-center">
                        <div className="flex justify-center">
                          <CellValue value={val} />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </section>
  )
}
