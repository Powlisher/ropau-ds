"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { MoonIcon, SunIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function OnboardingPreferences() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Preferences</CardTitle>
          <CardDescription>Customize how your workspace looks and behaves</CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Theme
              </Label>
              <div className="flex gap-2">
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${
                      theme === t
                        ? "border-primary bg-primary/[0.04] text-foreground"
                        : "border-border text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    {t === "light" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
                    {t === "light" ? "Light" : "Dark"}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notifications
              </Label>
              <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
                {[
                  { id: "email", label: "Email digests", desc: "Daily summary of activity" },
                  { id: "push", label: "Push notifications", desc: "Real-time browser alerts" },
                  { id: "mentions", label: "Mentions only", desc: "Only when someone tags you" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.id === "mentions"} />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label>Timezone</Label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-ny">America/New York</SelectItem>
                    <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
