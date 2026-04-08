import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BannerSplit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row">
        <div
          className="flex flex-1 items-center justify-center px-6 py-3"
          style={{
            backgroundColor: "oklch(0.478 0.227 3.6 / 0.06)",
            borderBottom: "1px solid oklch(0.478 0.227 3.6 / 0.1)",
          }}
        >
          <p className="text-sm text-foreground/80">
            <span className="font-semibold">Enterprise plans</span> now include
            unlimited seats and priority support
          </p>
        </div>
        <div
          className="flex items-center justify-center px-6 py-3 sm:px-8"
          style={{
            backgroundColor: "oklch(0.478 0.227 3.6)",
          }}
        >
          <Button
            size="sm"
            className="border border-white/20 bg-white/15 text-white hover:bg-white/25"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
