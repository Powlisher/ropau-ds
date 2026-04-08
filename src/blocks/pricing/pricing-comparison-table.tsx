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
import { CheckIcon, XIcon } from "lucide-react"

const plans = ["Starter", "Pro", "Scale"] as const

const features = [
  { category: "Core", items: [
    { name: "Projects", values: ["3", "Unlimited", "Unlimited"] },
    { name: "Team members", values: ["1", "Up to 15", "Unlimited"] },
    { name: "Storage", values: ["5 GB", "100 GB", "1 TB"] },
    { name: "API access", values: [false, true, true] },
  ]},
  { category: "Collaboration", items: [
    { name: "Real-time editing", values: [false, true, true] },
    { name: "Guest access", values: [false, "5 guests", "Unlimited"] },
    { name: "Shared workspaces", values: [false, true, true] },
    { name: "Audit log", values: [false, false, true] },
  ]},
  { category: "Support", items: [
    { name: "Community support", values: [true, true, true] },
    { name: "Email support", values: [false, true, true] },
    { name: "Priority support", values: [false, false, true] },
    { name: "Dedicated CSM", values: [false, false, true] },
  ]},
]

const prices = ["$0", "$39", "$149"]

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="size-4 text-primary" />
    ) : (
      <XIcon className="size-3.5 text-muted-foreground/30" />
    )
  }
  return <span className="tabular-nums">{value}</span>
}

export default function PricingComparisonTable() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Compare plans in detail
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything you need to pick the right tier for your team.
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
              <TableHead className="w-[200px] font-medium">Feature</TableHead>
              {plans.map((plan, i) => (
                <TableHead key={plan} className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">{plan}</span>
                      {i === 1 && <Badge variant="secondary" className="text-[10px]">Popular</Badge>}
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
            {features.map((group) => (
              <>
                <TableRow key={group.category} className="bg-muted/20 hover:bg-muted/20">
                  <TableCell colSpan={4} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {group.category}
                  </TableCell>
                </TableRow>
                {group.items.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="text-sm text-foreground">{feature.name}</TableCell>
                    {feature.values.map((val, i) => (
                      <TableCell key={i} className="text-center text-sm text-foreground">
                        <div className="flex justify-center">
                          <CellValue value={val} />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ))}
            <TableRow className="hover:bg-transparent">
              <TableCell />
              {plans.map((plan, i) => (
                <TableCell key={plan} className="text-center">
                  <Button variant={i === 1 ? "default" : "outline"} size="sm" className="w-full max-w-[120px]">
                    {i === 0 ? "Get started" : i === 1 ? "Upgrade" : "Contact us"}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </motion.div>
    </section>
  )
}
