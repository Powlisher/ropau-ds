"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { XIcon, CheckCircle2Icon, AlertTriangleIcon, InfoIcon, AlertCircleIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type ToastVariant = "success" | "error" | "warning" | "info"

type Toast = {
  id: number
  variant: ToastVariant
  title: string
  description: string
}

const variantConfig: Record<ToastVariant, { icon: typeof CheckCircle2Icon; ringClass: string; bgClass: string; iconClass: string }> = {
  success: { icon: CheckCircle2Icon, ringClass: "ring-emerald-500/20", bgClass: "bg-emerald-500/10", iconClass: "text-emerald-600" },
  error: { icon: AlertCircleIcon, ringClass: "ring-destructive/20", bgClass: "bg-destructive/10", iconClass: "text-destructive" },
  warning: { icon: AlertTriangleIcon, ringClass: "ring-amber-500/20", bgClass: "bg-amber-500/10", iconClass: "text-amber-600" },
  info: { icon: InfoIcon, ringClass: "ring-blue-500/20", bgClass: "bg-blue-500/10", iconClass: "text-blue-600" },
}

const initialToasts: Toast[] = [
  { id: 1, variant: "success", title: "Deployment successful", description: "v2.14.3 is now live on production. All health checks passed." },
  { id: 2, variant: "error", title: "Build failed", description: "TypeScript error in src/components/nav.tsx:47. Missing required prop 'variant'." },
  { id: 3, variant: "warning", title: "API rate limit approaching", description: "You've used 87% of your hourly API quota. Consider batching requests." },
  { id: 4, variant: "info", title: "Scheduled maintenance", description: "Database migration planned for Saturday 3am UTC. Expect 2-5 min downtime." },
]

export default function NotificationToastStack() {
  const [toasts, setToasts] = useState(initialToasts)

  function dismiss(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  function reset() {
    setToasts(initialToasts)
  }

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-6">
      {toasts.length === 0 && (
        <Button variant="outline" onClick={reset}>Show toasts again</Button>
      )}
      <div className="flex w-full max-w-sm flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((toast) => {
            const config = variantConfig[toast.variant]
            const Icon = config.icon
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className={`flex items-start gap-3 rounded-xl bg-card p-4 ring-1 ${config.ringClass}`}
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
              >
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${config.bgClass}`}>
                  <Icon className={`size-4 ${config.iconClass}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-medium tracking-tight">{toast.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{toast.description}</p>
                </div>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <XIcon className="size-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
