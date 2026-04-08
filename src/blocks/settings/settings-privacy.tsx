"use client"

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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { EyeOffIcon } from "lucide-react"

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

const privacyToggles = [
  {
    label: "Share usage data",
    description: "Anonymous usage analytics to help improve the product",
    defaultChecked: true,
  },
  {
    label: "Crash reports",
    description: "Automatic error reporting when something goes wrong",
    defaultChecked: true,
  },
  {
    label: "Personalized recommendations",
    description: "Tailored suggestions based on your usage patterns",
    defaultChecked: false,
  },
  {
    label: "Third-party analytics",
    description: "Allow external analytics services to collect data",
    defaultChecked: false,
  },
]

export default function SettingsPrivacy() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <EyeOffIcon className="size-4 text-muted-foreground" />
              <CardTitle className="tracking-tight">Privacy</CardTitle>
            </div>
            <CardDescription>
              Control your data visibility and sharing preferences.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label>Profile visibility</Label>
            <Select defaultValue="team">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="team">Team only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Who can see your profile, activity, and contributions.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
              Data Sharing
            </span>
            {privacyToggles.map((toggle) => (
              <div
                key={toggle.label}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-foreground">
                    {toggle.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {toggle.description}
                  </span>
                </div>
                <Switch defaultChecked={toggle.defaultChecked} />
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end pt-1">
            <Button>Save preferences</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
