"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, BedDoubleIcon, BathIcon, RulerIcon, HeartIcon } from "lucide-react"

const properties = [
  {
    title: "Modern Loft on Alberta",
    address: "2847 NE Alberta St, Portland",
    price: 425000,
    beds: 2,
    baths: 1,
    sqft: 1180,
    tag: "New Listing",
  },
  {
    title: "Victorian Craftsman",
    address: "1923 SE Hawthorne Blvd, Portland",
    price: 687000,
    beds: 3,
    baths: 2,
    sqft: 2240,
    tag: "Open House",
  },
  {
    title: "Pearl District Studio",
    address: "820 NW Flanders St, Portland",
    price: 318000,
    beds: 1,
    baths: 1,
    sqft: 640,
    tag: null,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

function PropertyMap() {
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
      {properties.map((_, i) => {
        const positions = [
          { left: "35%", top: "30%" },
          { left: "60%", top: "55%" },
          { left: "45%", top: "40%" },
        ]
        return (
          <motion.div
            key={i}
            className="absolute"
            style={positions[i]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.2 + i * 0.1 }}
          >
            <div
              className="rounded-lg bg-card px-2 py-1 font-mono text-[11px] font-bold tabular-nums text-foreground ring-1 ring-border"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              ${(properties[i].price / 1000).toFixed(0)}k
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Map07() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Properties Near You
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          3 listings matching your criteria in the Portland metro area.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
          className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border lg:aspect-auto lg:min-h-[520px]"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <PropertyMap />
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {properties.map((prop) => (
            <motion.div key={prop.title} variants={itemVariants}>
              <motion.div whileHover={{ y: -2 }} transition={spring}>
                <Card
                  className="overflow-hidden"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="relative aspect-[16/9] bg-secondary">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
                    {prop.tag && (
                      <Badge className="absolute left-3 top-3 bg-card/90 text-foreground text-[10px] backdrop-blur-sm hover:bg-card/90">
                        {prop.tag}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-3 size-8 rounded-full bg-card/80 p-0 backdrop-blur-sm hover:bg-card"
                    >
                      <HeartIcon className="size-4" />
                    </Button>
                  </div>
                  <CardContent className="space-y-3 pt-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight text-foreground">{prop.title}</h3>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPinIcon className="size-3" />
                          {prop.address}
                        </div>
                      </div>
                      <div className="font-mono text-base font-bold tabular-nums tracking-tight text-foreground">
                        ${prop.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BedDoubleIcon className="size-3.5" />
                        <span className="font-mono tabular-nums">{prop.beds}</span> bed
                      </div>
                      <div className="flex items-center gap-1">
                        <BathIcon className="size-3.5" />
                        <span className="font-mono tabular-nums">{prop.baths}</span> bath
                      </div>
                      <div className="flex items-center gap-1">
                        <RulerIcon className="size-3.5" />
                        <span className="font-mono tabular-nums">{prop.sqft.toLocaleString()}</span> sqft
                      </div>
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
