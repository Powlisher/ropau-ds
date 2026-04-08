"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TruckIcon, CheckIcon, SearchIcon, MapPinIcon } from "lucide-react"

const zones = [
  { name: "Downtown Core", eta: "Same day", fee: "Free", color: "bg-emerald-500", radius: "0-3 mi", available: true },
  { name: "Inner City", eta: "Next day", fee: "$4.99", color: "bg-sky-500", radius: "3-8 mi", available: true },
  { name: "Suburban Ring", eta: "2-3 days", fee: "$9.99", color: "bg-amber-500", radius: "8-20 mi", available: true },
  { name: "Extended Metro", eta: "3-5 days", fee: "$14.99", color: "bg-violet-500", radius: "20-40 mi", available: true },
  { name: "Rural Areas", eta: "5-7 days", fee: "$19.99", color: "bg-muted-foreground/30", radius: "40+ mi", available: false },
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

function ZoneMap() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {[80, 60, 42, 26, 12].map((size, i) => (
        <motion.div
          key={size}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
            zones[i].available ? "border-current opacity-20" : "border-dashed border-muted-foreground/20"
          }`}
          style={{
            width: `${size}%`,
            height: `${size}%`,
            color: zones[i].available ? "var(--color-primary)" : undefined,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: zones[i].available ? 0.2 : 0.1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.1 + i * 0.08 }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <MapPinIcon className="size-4" />
        </div>
      </div>
    </div>
  )
}

export default function Map04() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <TruckIcon className="size-5 text-muted-foreground" />
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Delivery Zones
          </h2>
          <p className="text-sm text-muted-foreground">
            Check availability and estimated delivery times for your area.
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Enter your zip code or address" className="pl-9" />
        </div>
        <Button>Check Availability</Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
          className="overflow-hidden rounded-xl ring-1 ring-border"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <ZoneMap />
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {zones.map((zone) => (
            <motion.div key={zone.name} variants={itemVariants}>
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Card
                  className={!zone.available ? "opacity-60" : ""}
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="flex items-center gap-3 py-3.5">
                    <div className={`size-3 rounded-full ${zone.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-tight text-foreground">{zone.name}</span>
                        {zone.fee === "Free" && (
                          <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 text-[9px]">
                            Free
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{zone.radius}</span>
                        <span>ETA: {zone.eta}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {zone.available ? (
                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                          <CheckIcon className="size-3" />
                          <span className="font-mono tabular-nums">{zone.fee}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Limited</span>
                      )}
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
