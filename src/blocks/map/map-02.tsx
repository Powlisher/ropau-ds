"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, BuildingIcon, UsersIcon } from "lucide-react"

const offices = [
  { city: "Portland", country: "United States", address: "814 NW Flanders St, OR 97209", team: 42, type: "HQ", color: "bg-primary" },
  { city: "London", country: "United Kingdom", address: "23 Shoreditch High St, E1 6PG", team: 18, type: "Engineering", color: "bg-emerald-500" },
  { city: "Tokyo", country: "Japan", address: "3-14-7 Shibuya, Tokyo 150-0002", team: 12, type: "Design", color: "bg-amber-500" },
  { city: "Berlin", country: "Germany", address: "Torstrasse 68, 10119", team: 8, type: "Sales", color: "bg-sky-500" },
  { city: "Sao Paulo", country: "Brazil", address: "R. Frei Caneca 1246, 01307-002", team: 6, type: "Support", color: "bg-violet-500" },
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

function MapPlaceholder() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {offices.map((office, i) => {
        const positions = [
          { left: "30%", top: "35%" },
          { left: "48%", top: "28%" },
          { left: "78%", top: "32%" },
          { left: "50%", top: "30%" },
          { left: "35%", top: "60%" },
        ]
        return (
          <motion.div
            key={office.city}
            className={`absolute size-3 rounded-full ${office.color} ring-2 ring-card`}
            style={positions[i]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.2 + i * 0.1 }}
          />
        )
      })}
    </div>
  )
}

export default function Map02() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <BuildingIcon className="size-5 text-muted-foreground" />
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Our Offices
          </h2>
          <p className="text-sm text-muted-foreground">
            86 people across 5 locations worldwide.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
          className="aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-border"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <MapPlaceholder />
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Locations
          </h3>
          {offices.map((office) => (
            <motion.div key={office.city} variants={itemVariants}>
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Card
                  className="cursor-pointer"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="flex items-center gap-3 py-3">
                    <div className={`size-2.5 rounded-full ${office.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-tight text-foreground">{office.city}</span>
                        {office.type === "HQ" && (
                          <Badge variant="secondary" className="text-[9px]">HQ</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPinIcon className="size-2.5" />
                        {office.country}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <UsersIcon className="size-3" />
                      <span className="font-mono tabular-nums">{office.team}</span>
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
