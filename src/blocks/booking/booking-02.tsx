"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ScissorsIcon, SparklesIcon, PaletteIcon, HeartIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const services = [
  {
    id: "haircut",
    name: "Classic Haircut",
    description: "Wash, cut, and style with finishing product",
    duration: "45 min",
    price: 38,
    icon: ScissorsIcon,
  },
  {
    id: "color",
    name: "Full Color Treatment",
    description: "Custom color mix, application, and toning",
    duration: "1h 30min",
    price: 125,
    icon: PaletteIcon,
  },
  {
    id: "facial",
    name: "Signature Facial",
    description: "Deep cleanse, exfoliation, mask, and moisturize",
    duration: "1h 15min",
    price: 89,
    icon: SparklesIcon,
  },
  {
    id: "massage",
    name: "Therapeutic Massage",
    description: "Targeted tension relief for back, neck, and shoulders",
    duration: "50 min",
    price: 72,
    icon: HeartIcon,
  },
]

export default function Booking02() {
  const [selected, setSelected] = useState<string | null>(null)

  const total = services.filter((s) => s.id === selected).reduce((sum, s) => sum + s.price, 0)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Select a Service</CardTitle>
            <CardDescription>
              Choose the service you'd like to book. Duration and pricing shown.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selected === service.id
            return (
              <motion.button
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setSelected(isSelected ? null : service.id)}
                className={`
                  flex items-start gap-4 rounded-xl border p-4 text-left transition-colors
                  ${isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/30 bg-card"
                  }
                `}
                style={{ boxShadow: isSelected ? premiumShadow : undefined }}
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-foreground">{service.name}</span>
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      ${service.price}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {service.description}
                  </p>
                  <Badge variant="secondary" className="mt-2 text-[10px] tabular-nums">
                    {service.duration}
                  </Badge>
                </div>
              </motion.button>
            )
          })}

          <motion.div variants={itemVariants} className="flex items-center justify-between pt-3 border-t border-border/50">
            <div>
              {total > 0 ? (
                <>
                  <span className="text-xs text-muted-foreground">Total</span>
                  <p className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                    ${total}.00
                  </p>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Select a service to continue</span>
              )}
            </div>
            <Button disabled={!selected} size="sm">
              Choose Date
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
