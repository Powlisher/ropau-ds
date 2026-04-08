"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function BannerProductLaunch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="relative w-full overflow-hidden border-b border-primary/10"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.478 0.227 3.6 / 0.06), oklch(0.95 0.02 350 / 0.3), oklch(0.519 0.292 25.1 / 0.06))",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.478 0.227 3.6) 1px, transparent 1px), radial-gradient(circle at 80% 30%, oklch(0.519 0.292 25.1) 1px, transparent 1px), radial-gradient(circle at 60% 70%, oklch(0.478 0.227 3.6) 0.5px, transparent 0.5px)",
          backgroundSize: "40px 40px, 60px 60px, 30px 30px",
        }}
      />
      <div className="relative mx-auto flex h-10 max-w-6xl items-center justify-center gap-3 px-6 text-sm">
        <Badge variant="default" className="h-[18px] text-[10px] font-semibold uppercase tracking-wider">
          Launch
        </Badge>
        <span className="font-medium text-foreground/80">
          Ropau Studio is here — design, prototype, and ship in one tool
        </span>
        <a
          href="#product-launch"
          className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
        >
          Explore
          <ArrowRightIcon className="size-3" />
        </a>
      </div>
    </motion.div>
  )
}
