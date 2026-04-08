"use client"

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { motion } from "framer-motion"

const previews = [
  {
    label: "Dashboard",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=180&fit=crop&q=80",
    desc: "Analytics overview with KPIs and charts",
  },
  {
    label: "Profile",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&h=180&fit=crop&q=80",
    desc: "User settings and account management",
  },
  {
    label: "Workspace",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=320&h=180&fit=crop&q=80",
    desc: "Collaborative project environment",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TooltipShowcase06() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Image preview tooltips
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Rich hover cards with thumbnail previews
      </p>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {previews.map((p) => (
          <motion.div key={p.label} variants={itemVariants}>
            <HoverCard>
              <HoverCardTrigger>
                <button className="rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/60">
                  {p.label}
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 p-0 overflow-hidden">
                <img
                  src={p.src}
                  alt={p.label}
                  className="h-36 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
