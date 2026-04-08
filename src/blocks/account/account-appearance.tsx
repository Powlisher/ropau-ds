"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react"

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

const themes = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
]

const accentColors = [
  { name: "Crimson", value: "#DC2626" },
  { name: "Ocean", value: "#2563EB" },
  { name: "Forest", value: "#16A34A" },
  { name: "Amber", value: "#D97706" },
  { name: "Violet", value: "#7C3AED" },
]

export default function AccountAppearance() {
  const [selectedTheme, setSelectedTheme] = useState("system")
  const [selectedAccent, setSelectedAccent] = useState("#DC2626")
  const [fontSize, setFontSize] = useState([15])

  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of your workspace.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
            <Label>Theme</Label>
            <div className="flex gap-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.value}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => setSelectedTheme(theme.value)}
                  className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
                    selectedTheme === theme.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <theme.icon
                    className={`size-5 ${
                      selectedTheme === theme.value
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-xs font-medium">{theme.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
            <Label>Accent color</Label>
            <div className="flex gap-2">
              {accentColors.map((color) => (
                <motion.button
                  key={color.value}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => setSelectedAccent(color.value)}
                  className={`size-8 rounded-full ring-offset-2 ring-offset-background transition-shadow ${
                    selectedAccent === color.value ? "ring-2 ring-foreground/30" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label>Font size</Label>
              <span className="text-xs tabular-nums text-muted-foreground">
                {fontSize[0]}px
              </span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={(val) => setFontSize(val as number[])}
              min={12}
              max={20}
              defaultValue={[15]}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Preview
              </span>
              <div
                className="rounded-xl border bg-muted/30 p-5"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <p
                  className="text-foreground"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  The quick brown fox jumps over the lazy dog. This is how your
                  content will appear across the workspace.
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
