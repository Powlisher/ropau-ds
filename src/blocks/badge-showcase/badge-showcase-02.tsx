"use client"

import { Badge } from "@/components/ui/badge"
import {
  ZapIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  GlobeIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const badges = [
  { label: "Lightning fast", icon: ZapIcon, variant: "default" as const },
  { label: "Verified", icon: ShieldCheckIcon, variant: "secondary" as const },
  { label: "Pending review", icon: ClockIcon, variant: "outline" as const },
  { label: "Featured", icon: StarIcon, variant: "default" as const },
  { label: "Trending", icon: TrendingUpIcon, variant: "secondary" as const },
  { label: "Public", icon: GlobeIcon, variant: "outline" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase02() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Badges with icons
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Prepend icons for quick visual recognition
      </p>
      <motion.div
        className="flex flex-wrap gap-2.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {badges.map((b) => (
          <motion.div key={b.label} variants={itemVariants}>
            <Badge variant={b.variant}>
              <b.icon data-icon="inline-start" className="size-3" />
              {b.label}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
