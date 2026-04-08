"use client"

import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const features = [
  { name: "Real-time collaboration", us: true, compA: false, compB: true },
  { name: "Edge function runtime", us: true, compA: true, compB: false },
  { name: "Auto-instrumented tracing", us: true, compA: false, compB: false },
  { name: "Sub-5s rollbacks", us: true, compA: false, compB: true },
  { name: "SOC 2 Type II audit logs", us: true, compA: true, compB: false },
  { name: "Preview deployments", us: true, compA: true, compB: true },
  { name: "Custom RBAC policies", us: true, compA: false, compB: false },
  { name: "Zero-config monitoring", us: true, compA: false, compB: false },
]

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <path d="M3.5 8.5l3 3 6-6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground/30"
    >
      <path d="M4 4l8 8m0-8l-8 8" />
    </svg>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function FeaturesComparisonTable() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          How we compare
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Feature-by-feature, against the alternatives you have probably
          evaluated.
        </p>
      </div>

      <div
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[40%]">Feature</TableHead>
              <TableHead className="text-center">
                <Badge variant="default" className="text-xs">
                  Us
                </Badge>
              </TableHead>
              <TableHead className="text-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Competitor A
                </span>
              </TableHead>
              <TableHead className="text-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Competitor B
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            {...({ variants: containerVariants, initial: "hidden", animate: "visible" } as object)}
          >
            {features.map((f) => (
              <motion.tr
                key={f.name}
                variants={rowVariants}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">{f.name}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex justify-center">
                    {f.us ? <CheckIcon /> : <XIcon />}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex justify-center">
                    {f.compA ? <CheckIcon /> : <XIcon />}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex justify-center">
                    {f.compB ? <CheckIcon /> : <XIcon />}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      </div>
    </section>
  )
}
