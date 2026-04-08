"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlobeIcon, CheckCircleIcon, MinusCircleIcon } from "lucide-react"

const regions = [
  { name: "Pacific Northwest", status: "full", cities: "Portland, Seattle, Eugene", customers: 12847, coverage: 98 },
  { name: "Northern California", status: "full", cities: "San Francisco, Oakland, Sacramento", customers: 9423, coverage: 95 },
  { name: "Southern California", status: "partial", cities: "Los Angeles, San Diego", customers: 7681, coverage: 72 },
  { name: "Mountain West", status: "partial", cities: "Denver, Salt Lake City, Boise", customers: 3219, coverage: 61 },
  { name: "Southwest", status: "partial", cities: "Phoenix, Tucson, Albuquerque", customers: 2104, coverage: 45 },
  { name: "Midwest", status: "expanding", cities: "Chicago, Minneapolis, Detroit", customers: 891, coverage: 23 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

function CoverageMap() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {regions.map((region, i) => {
        const positions = [
          { left: "15%", top: "20%", size: 60 },
          { left: "18%", top: "40%", size: 52 },
          { left: "20%", top: "60%", size: 44 },
          { left: "38%", top: "35%", size: 36 },
          { left: "35%", top: "58%", size: 28 },
          { left: "55%", top: "30%", size: 24 },
        ]
        const p = positions[i]
        const opacity = region.status === "full" ? 0.25 : region.status === "partial" ? 0.15 : 0.08
        return (
          <motion.div
            key={region.name}
            className="absolute rounded-full bg-primary"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.2 + i * 0.08 }}
          />
        )
      })}
    </div>
  )
}

export default function Map09() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <GlobeIcon className="size-5 text-muted-foreground" />
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Coverage Map
          </h2>
          <p className="text-sm text-muted-foreground">
            Serving {regions.reduce((s, r) => s + r.customers, 0).toLocaleString()} customers across {regions.length} regions.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
          className="aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-border lg:aspect-auto lg:min-h-[440px]"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CoverageMap />
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {regions.map((region) => (
            <motion.div key={region.name} variants={itemVariants}>
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Card
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="py-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {region.status === "full" ? (
                          <CheckCircleIcon className="size-4 text-emerald-500" />
                        ) : region.status === "partial" ? (
                          <MinusCircleIcon className="size-4 text-amber-500" />
                        ) : (
                          <MinusCircleIcon className="size-4 text-muted-foreground/40" />
                        )}
                        <div>
                          <div className="text-sm font-semibold tracking-tight text-foreground">{region.name}</div>
                          <div className="text-[11px] text-muted-foreground">{region.cities}</div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-[9px] ${
                          region.status === "full"
                            ? "bg-emerald-500/10 text-emerald-700"
                            : region.status === "partial"
                            ? "bg-amber-500/10 text-amber-700"
                            : "text-muted-foreground"
                        }`}
                      >
                        {region.coverage}%
                      </Badge>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className={`h-full rounded-full ${
                          region.status === "full"
                            ? "bg-emerald-500"
                            : region.status === "partial"
                            ? "bg-amber-500"
                            : "bg-muted-foreground/30"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${region.coverage}%` }}
                        transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.3 }}
                      />
                    </div>
                    <div className="mt-1 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
                      {region.customers.toLocaleString()} customers
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
