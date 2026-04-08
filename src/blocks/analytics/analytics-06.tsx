"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2Icon, FlaskConicalIcon } from "lucide-react"
import { motion } from "framer-motion"

const variants = [
  {
    name: "Control (A)",
    conversions: 1247,
    visitors: 14832,
    rate: 8.41,
    color: "oklch(0.65 0.05 260)",
    confidence: null,
  },
  {
    name: "Variant B",
    conversions: 1489,
    visitors: 14918,
    rate: 9.98,
    color: "oklch(0.55 0.18 160)",
    confidence: 96.3,
  },
]

const uplift = (((variants[1].rate - variants[0].rate) / variants[0].rate) * 100).toFixed(1)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics06() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <FlaskConicalIcon className="size-4 text-muted-foreground/60" />
              Checkout CTA Test
            </CardTitle>
            <CardDescription>Running since Mar 12 - 29,750 visitors</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1 text-[10px]">
            <CheckCircle2Icon className="size-3" />
            Significant
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {variants.map((v) => (
              <div
                key={v.name}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: v.confidence ? "oklch(0.96 0.02 160)" : "oklch(0.97 0 0)",
                  boxShadow: v.confidence
                    ? "0 0 0 1px oklch(0.55 0.15 160 / 0.15)"
                    : "0 0 0 1px oklch(0.90 0 0)",
                }}
              >
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {v.name}
                </div>
                <div className="mt-2 text-3xl font-semibold tabular-nums tracking-tight">
                  {v.rate}%
                </div>
                <div className="mt-1 text-xs tabular-nums text-muted-foreground">
                  {v.conversions.toLocaleString()} / {v.visitors.toLocaleString()}
                </div>
                {v.confidence && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-[10px] font-medium">
                      {v.confidence}% confidence
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Uplift</div>
              <div className="text-2xl font-semibold tabular-nums tracking-tight" style={{ color: "oklch(0.55 0.15 160)" }}>
                +{uplift}%
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Ship Variant B
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
