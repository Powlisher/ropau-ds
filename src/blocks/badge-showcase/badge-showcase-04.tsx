"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const sizes = [
  {
    label: "Small",
    className: "h-[18px] px-1.5 text-[10px]",
    variant: "secondary" as const,
  },
  {
    label: "Default",
    className: "",
    variant: "secondary" as const,
  },
  {
    label: "Large",
    className: "h-7 px-3 text-sm",
    variant: "secondary" as const,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase04() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Badge sizes
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Three size tiers for contextual hierarchy
      </p>
      <motion.div
        className="flex flex-col gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sizes.map((size) => (
          <motion.div
            key={size.label}
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <span className="w-16 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {size.label}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="default" className={size.className}>
                Primary
              </Badge>
              <Badge variant="secondary" className={size.className}>
                Secondary
              </Badge>
              <Badge variant="outline" className={size.className}>
                Outline
              </Badge>
              <Badge variant="destructive" className={size.className}>
                Destructive
              </Badge>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
