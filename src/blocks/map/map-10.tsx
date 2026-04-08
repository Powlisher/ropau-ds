"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ActivityIcon, TrendingUpIcon, UsersIcon, MapPinIcon } from "lucide-react"

const heatLevels = [
  { label: "Very High", color: "bg-red-500", value: "> 500 orders/day" },
  { label: "High", color: "bg-orange-400", value: "200-500 orders/day" },
  { label: "Medium", color: "bg-amber-300", value: "50-200 orders/day" },
  { label: "Low", color: "bg-yellow-200", value: "10-50 orders/day" },
  { label: "Minimal", color: "bg-emerald-200", value: "< 10 orders/day" },
]

const topZones = [
  { name: "Pearl District", orders: 847, change: 12.3, density: "Very High" },
  { name: "Hawthorne", orders: 623, change: 8.7, density: "Very High" },
  { name: "Alberta Arts", orders: 412, change: -2.1, density: "High" },
  { name: "Division St", orders: 389, change: 15.4, density: "High" },
  { name: "Mississippi Ave", orders: 234, change: 4.2, density: "Medium" },
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

function HeatMap() {
  const blobs = [
    { x: 35, y: 30, r: 45, color: "rgba(239,68,68,0.15)" },
    { x: 55, y: 50, r: 38, color: "rgba(239,68,68,0.12)" },
    { x: 30, y: 55, r: 32, color: "rgba(251,146,60,0.12)" },
    { x: 65, y: 35, r: 28, color: "rgba(251,146,60,0.10)" },
    { x: 45, y: 70, r: 24, color: "rgba(252,211,77,0.10)" },
    { x: 70, y: 65, r: 20, color: "rgba(167,243,208,0.10)" },
  ]

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: blob.r * 2,
            height: blob.r * 2,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${blob.color}, transparent)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" as const, stiffness: 150, damping: 20, delay: 0.2 + i * 0.1 }}
        />
      ))}
    </div>
  )
}

export default function Map10() {
  const totalOrders = topZones.reduce((s, z) => s + z.orders, 0)

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <ActivityIcon className="size-5 text-muted-foreground" />
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Order Density Heatmap
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time order concentration across the Portland metro area.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
          className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border lg:aspect-auto lg:min-h-[480px]"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <HeatMap />
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="py-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-2xl font-bold tabular-nums tracking-tight">
                      {totalOrders.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Orders Today
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-mono text-2xl font-bold tabular-nums tracking-tight text-emerald-600">
                      <TrendingUpIcon className="size-5" />
                      8.4%
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      vs Last Week
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Density Legend
            </h3>
            <div className="space-y-2">
              {heatLevels.map((level) => (
                <div key={level.label} className="flex items-center gap-3">
                  <div className={`size-3 rounded-sm ${level.color}`} />
                  <span className="flex-1 text-xs font-medium text-foreground">{level.label}</span>
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{level.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <MapPinIcon className="size-3" />
              Top Zones
            </h3>
            <div className="space-y-2.5">
              {topZones.map((zone, i) => (
                <motion.div
                  key={zone.name}
                  whileHover={{ x: 2 }}
                  transition={spring}
                  className="flex items-center gap-3"
                >
                  <span className="w-4 font-mono text-xs font-bold tabular-nums text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{zone.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-semibold tabular-nums">{zone.orders}</div>
                    <div className={`text-[10px] tabular-nums ${zone.change >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {zone.change >= 0 ? "+" : ""}{zone.change}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
