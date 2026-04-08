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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { MailIcon, MailXIcon } from "lucide-react"

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

const emailPrefs = [
  { label: "Weekly digest", description: "Summary of workspace activity", defaultChecked: true },
  { label: "Deploy notifications", description: "Alerts for successful and failed deploys", defaultChecked: true },
  { label: "Security alerts", description: "Login attempts and suspicious activity", defaultChecked: true },
  { label: "Product updates", description: "New features and release notes", defaultChecked: false },
  { label: "Tips & tutorials", description: "Getting the most out of the platform", defaultChecked: false },
]

export default function SettingsEmail() {
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
              <MailIcon className="size-4 text-muted-foreground" />
              <CardTitle className="tracking-tight">Email Preferences</CardTitle>
            </div>
            <CardDescription>
              Control which emails you receive and how often.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label>Digest frequency</Label>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            {emailPrefs.map((pref) => (
              <div
                key={pref.label}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-foreground">{pref.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {pref.description}
                  </span>
                </div>
                <Switch defaultChecked={pref.defaultChecked} />
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <Button variant="destructive" size="sm">
              <MailXIcon className="size-3.5" />
              Unsubscribe from all emails
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
