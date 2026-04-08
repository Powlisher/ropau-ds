"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPinIcon, ClockIcon, PhoneIcon, SearchIcon, NavigationIcon } from "lucide-react"

const stores = [
  {
    name: "Pearl District Studio",
    address: "814 NW Flanders St, Portland, OR 97209",
    phone: "(503) 555-0147",
    hours: "Mon-Sat 10am-7pm, Sun 11am-5pm",
    distance: "0.8 mi",
    open: true,
  },
  {
    name: "Hawthorne Showroom",
    address: "3621 SE Hawthorne Blvd, Portland, OR 97214",
    phone: "(503) 555-0293",
    hours: "Mon-Fri 11am-6pm, Sat 10am-5pm",
    distance: "2.3 mi",
    open: true,
  },
  {
    name: "Alberta Arts Workshop",
    address: "2817 NE Alberta St, Portland, OR 97211",
    phone: "(503) 555-0418",
    hours: "Thu-Sun 12pm-6pm",
    distance: "3.7 mi",
    open: false,
  },
  {
    name: "Lake Oswego Gallery",
    address: "195 B Ave, Lake Oswego, OR 97034",
    phone: "(503) 555-0562",
    hours: "Mon-Sat 10am-6pm",
    distance: "8.1 mi",
    open: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront09() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Visit Our Stores
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Experience our collections in person. Each location features exclusive local pieces.
        </p>
      </div>

      <div className="mb-8 flex gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Enter city or zip code" className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <NavigationIcon className="size-4" />
          Near Me
        </Button>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stores.map((store) => (
          <motion.div key={store.name} variants={itemVariants}>
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Card
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{store.name}</h3>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${store.open ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`}
                      >
                        {store.open ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPinIcon className="size-3 flex-shrink-0" />
                        {store.address}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ClockIcon className="size-3 flex-shrink-0" />
                        {store.hours}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <PhoneIcon className="size-3 flex-shrink-0" />
                        {store.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="font-mono text-xs tabular-nums tracking-wide text-muted-foreground">
                      {store.distance}
                    </span>
                    <Button variant="outline" size="sm">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
