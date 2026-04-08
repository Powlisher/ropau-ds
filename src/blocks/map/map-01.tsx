"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, NavigationIcon, ClockIcon, PhoneIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

function MapPlaceholder() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPinIcon className="size-5" />
          </div>
        </motion.div>
        <div className="mx-auto mt-1 h-2 w-6 rounded-full bg-foreground/5" />
      </div>
    </div>
  )
}

export default function Map01() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          className="overflow-hidden"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <div className="grid lg:grid-cols-[1fr_320px]">
            <div className="aspect-[16/10] lg:aspect-auto">
              <MapPlaceholder />
            </div>
            <CardContent className="flex flex-col justify-center gap-5 py-8 lg:py-10">
              <div>
                <Badge variant="secondary" className="mb-3 text-[10px]">Headquarters</Badge>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  Luminary Studio
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our main design studio and showroom in the Pearl District.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPinIcon className="mt-0.5 size-4 flex-shrink-0" />
                  <span>814 NW Flanders St<br />Portland, OR 97209</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <ClockIcon className="size-4 flex-shrink-0" />
                  <span>Mon-Sat 10am-7pm</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <PhoneIcon className="size-4 flex-shrink-0" />
                  <span>(503) 555-0147</span>
                </div>
              </div>

              <motion.div whileHover={{ y: -2 }} transition={spring}>
                <Button className="w-full gap-2">
                  <NavigationIcon className="size-4" />
                  Get Directions
                </Button>
              </motion.div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
