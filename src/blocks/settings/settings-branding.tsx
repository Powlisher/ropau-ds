"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { UploadIcon } from "lucide-react"

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

export default function SettingsBranding() {
  const [primaryColor, setPrimaryColor] = useState("#DC2626")
  const [secondaryColor, setSecondaryColor] = useState("#1E293B")
  const [accentColor, setAccentColor] = useState("#F59E0B")

  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Branding</CardTitle>
            <CardDescription>
              Customize your workspace appearance with your brand assets.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div
            variants={itemVariants}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-2.5">
              <Label>Logo</Label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-muted/30 transition-colors hover:border-border hover:bg-muted/50"
              >
                <UploadIcon className="size-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  SVG, PNG or WebP. Max 1 MB.
                </span>
              </motion.div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Favicon</Label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-muted/30 transition-colors hover:border-border hover:bg-muted/50"
              >
                <UploadIcon className="size-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  32x32 or 16x16 px. ICO or PNG.
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <Label>Brand colors</Label>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Primary", value: primaryColor, onChange: setPrimaryColor },
                { label: "Secondary", value: secondaryColor, onChange: setSecondaryColor },
                { label: "Accent", value: accentColor, onChange: setAccentColor },
              ].map((color) => (
                <div key={color.label} className="flex flex-col gap-1.5">
                  <span className="text-xs text-muted-foreground">
                    {color.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-8 shrink-0 rounded-lg ring-1 ring-border"
                      style={{ backgroundColor: color.value }}
                    />
                    <Input
                      value={color.value}
                      onChange={(e) => color.onChange(e.target.value)}
                      className="flex-1 font-mono text-xs uppercase"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Preview
              </span>
              <div
                className="overflow-hidden rounded-xl ring-1 ring-border"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-2.5"
                  style={{ backgroundColor: secondaryColor }}
                >
                  <div
                    className="size-5 rounded"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span className="text-sm font-medium text-white/90">
                    Cordoba Engineering
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-3">
                  <div
                    className="h-6 w-16 rounded"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div
                    className="h-6 w-12 rounded"
                    style={{
                      backgroundColor: accentColor,
                      opacity: 0.8,
                    }}
                  />
                  <span className="text-xs text-muted-foreground ml-auto">
                    Brand preview
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end pt-1">
            <Button>Save branding</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
