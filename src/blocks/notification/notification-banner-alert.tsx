"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { XIcon, CheckCircle2Icon, AlertTriangleIcon, InfoIcon, AlertCircleIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type BannerVariant = "success" | "warning" | "error" | "info"

type Banner = {
  id: number
  variant: BannerVariant
  text: string
}

const variantStyles: Record<BannerVariant, { icon: typeof InfoIcon; bg: string; ring: string; iconColor: string; textColor: string }> = {
  success: { icon: CheckCircle2Icon, bg: "bg-emerald-500/8", ring: "ring-emerald-500/20", iconColor: "text-emerald-600", textColor: "text-emerald-900" },
  warning: { icon: AlertTriangleIcon, bg: "bg-amber-500/8", ring: "ring-amber-500/20", iconColor: "text-amber-600", textColor: "text-amber-900" },
  error: { icon: AlertCircleIcon, bg: "bg-red-500/8", ring: "ring-red-500/20", iconColor: "text-red-600", textColor: "text-red-900" },
  info: { icon: InfoIcon, bg: "bg-blue-500/8", ring: "ring-blue-500/20", iconColor: "text-blue-600", textColor: "text-blue-900" },
}

const initialBanners: Banner[] = [
  { id: 1, variant: "success", text: "Migration complete. All 2,847 records transferred successfully to the new database cluster." },
  { id: 2, variant: "warning", text: "Your trial ends in 3 days. Upgrade to Pro to keep access to advanced analytics and team features." },
  { id: 3, variant: "error", text: "Payment failed for invoice #INV-2847. Please update your card to avoid service interruption." },
  { id: 4, variant: "info", text: "New feature: AI-powered component suggestions are now available in the editor. Try it out." },
]

export default function NotificationBannerAlert() {
  const [banners, setBanners] = useState(initialBanners)

  function dismiss(id: number) {
    setBanners((prev) => prev.filter((b) => b.id !== id))
  }

  function reset() {
    setBanners(initialBanners)
  }

  return (
    <div className="mx-auto flex min-h-[400px] max-w-xl flex-col items-center justify-center gap-4">
      {banners.length === 0 && (
        <Button variant="outline" onClick={reset}>Show banners again</Button>
      )}
      <div className="flex w-full flex-col gap-2.5">
        <AnimatePresence>
          {banners.map((banner) => {
            const config = variantStyles[banner.variant]
            const Icon = config.icon
            return (
              <motion.div
                key={banner.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="overflow-hidden"
              >
                <div className={`flex items-start gap-3 rounded-xl ${config.bg} p-4 ring-1 ${config.ring}`}>
                  <Icon className={`mt-0.5 size-4 shrink-0 ${config.iconColor}`} />
                  <p className={`flex-1 text-sm leading-relaxed ${config.textColor}`}>{banner.text}</p>
                  <button
                    onClick={() => dismiss(banner.id)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
