"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SearchIcon, MapPinIcon, ClockIcon, StarIcon, NavigationIcon } from "lucide-react"

const results = [
  { name: "Pearl District", address: "814 NW Flanders St", distance: "0.8 mi", rating: 4.9, reviews: 127, open: true, hours: "Closes 7pm" },
  { name: "Hawthorne", address: "3621 SE Hawthorne Blvd", distance: "2.3 mi", rating: 4.7, reviews: 89, open: true, hours: "Closes 6pm" },
  { name: "Alberta Arts", address: "2817 NE Alberta St", distance: "3.7 mi", rating: 4.8, reviews: 64, open: false, hours: "Opens Thu 12pm" },
  { name: "Lake Oswego", address: "195 B Ave", distance: "8.1 mi", rating: 4.6, reviews: 42, open: true, hours: "Closes 6pm" },
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
    <div className="relative h-full w-full overflow-hidden bg-muted/50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {results.map((_, i) => {
        const positions = [
          { left: "40%", top: "35%" },
          { left: "60%", top: "50%" },
          { left: "35%", top: "60%" },
          { left: "55%", top: "25%" },
        ]
        return (
          <motion.div
            key={i}
            className="absolute"
            style={positions[i]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 + i * 0.1 }}
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {i + 1}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Map06() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Find a Store
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Locate the nearest showroom to experience our collections in person.
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by city, state, or zip code" className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <NavigationIcon className="size-4" />
          Use My Location
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums">{results.length}</span> stores found near Portland, OR
          </div>
          {results.map((store, i) => (
            <motion.div key={store.name} variants={itemVariants}>
              <motion.div whileHover={{ y: -2 }} transition={spring}>
                <Card
                  className="cursor-pointer"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold tracking-tight text-foreground">{store.name}</h3>
                          <span className="font-mono text-xs tabular-nums text-muted-foreground">{store.distance}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPinIcon className="size-3" />
                          {store.address}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs">
                            <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                            <span className="font-mono tabular-nums font-medium text-foreground">{store.rating}</span>
                            <span className="text-muted-foreground">({store.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <ClockIcon className="size-3" />
                            <Badge
                              variant="secondary"
                              className={`text-[9px] ${store.open ? "bg-emerald-500/10 text-emerald-700" : "text-muted-foreground"}`}
                            >
                              {store.hours}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
          className="aspect-square overflow-hidden rounded-xl ring-1 ring-border lg:aspect-auto lg:min-h-[480px]"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <MapPlaceholder />
        </motion.div>
      </div>
    </section>
  )
}
