"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPinIcon, DropletsIcon, WindIcon } from "lucide-react"
import { motion } from "framer-motion"

const cities = [
  {
    name: "Bordeaux",
    country: "FR",
    temp: 23,
    condition: "Partly Cloudy",
    humidity: 58,
    wind: 14,
    high: 26,
    low: 16,
    color: "oklch(0.82 0.17 82)",
  },
  {
    name: "Porto",
    country: "PT",
    temp: 19,
    condition: "Overcast",
    humidity: 72,
    wind: 22,
    high: 21,
    low: 14,
    color: "oklch(0.65 0.10 250)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function CityCard({ city }: { city: (typeof cities)[0] }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <MapPinIcon className="size-3" />
        <span className="text-xs font-medium uppercase tracking-wide">
          {city.name}, {city.country}
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tabular-nums tracking-tight">{city.temp}</span>
        <span className="text-2xl text-muted-foreground/50">°</span>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{city.condition}</div>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <DropletsIcon className="size-3" />
          <span className="tabular-nums">{city.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <WindIcon className="size-3" />
          <span className="tabular-nums">{city.wind} km/h</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${((city.temp - city.low) / (city.high - city.low)) * 100}%`,
              backgroundColor: city.color,
            }}
          />
        </div>
        <span className="text-[10px] tabular-nums text-muted-foreground">
          {city.low}° / {city.high}°
        </span>
      </div>
    </div>
  )
}

export default function Weather07() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">City Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex-1">
            <CityCard city={cities[0]} />
          </motion.div>
          <Separator orientation="vertical" className="h-auto" />
          <motion.div variants={itemVariants} className="flex-1">
            <CityCard city={cities[1]} />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
