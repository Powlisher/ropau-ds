"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, CalendarIcon, ClockIcon, NavigationIcon, UsersIcon, TicketIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function VenueMap() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 }}
        >
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <MapPinIcon className="size-6" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Map05() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <Card
            className="overflow-hidden"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
            }}
          >
            <div className="aspect-[21/9]">
              <VenueMap />
            </div>
            <CardContent className="space-y-5 py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/10">
                    <TicketIcon className="mr-1 size-3" />
                    Upcoming Event
                  </Badge>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                    Portland Design Conference 2026
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Oregon Convention Center, Hall C
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.div whileHover={{ y: -2 }} transition={spring}>
                    <Button variant="outline" className="gap-2">
                      <NavigationIcon className="size-4" />
                      Directions
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} transition={spring}>
                    <Button className="gap-2">
                      <TicketIcon className="size-4" />
                      Get Tickets
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <MapPinIcon className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Venue</div>
                    <div className="text-sm text-foreground">777 NE Martin Luther King Jr Blvd</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Date</div>
                    <div className="text-sm text-foreground">May 12-14, 2026</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <UsersIcon className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Capacity</div>
                    <div className="text-sm text-foreground">1,200 attendees</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ClockIcon className="size-3.5" />
                <span>Doors open at 8:30 AM. Keynote starts at 9:00 AM.</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
