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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { MonitorIcon, SmartphoneIcon, LogOutIcon } from "lucide-react"

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

const sessions = [
  {
    device: "MacBook Pro M4 — Chrome",
    icon: MonitorIcon,
    location: "Madrid, Spain",
    lastActive: "Now",
    current: true,
  },
  {
    device: "iPhone 16 — Safari",
    icon: SmartphoneIcon,
    location: "Madrid, Spain",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    device: "Windows Desktop — Firefox",
    icon: MonitorIcon,
    location: "Barcelona, Spain",
    lastActive: "3 days ago",
    current: false,
  },
]

export default function SettingsSecurity() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Security</CardTitle>
            <CardDescription>
              Session management, password policies, and access controls.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div
            variants={itemVariants}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <Label>Minimum password length</Label>
              <Select defaultValue="12">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8 characters</SelectItem>
                  <SelectItem value="10">10 characters</SelectItem>
                  <SelectItem value="12">12 characters</SelectItem>
                  <SelectItem value="16">16 characters</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Session timeout</Label>
              <Select defaultValue="7d">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Active Sessions
              </h3>
              <Button variant="destructive" size="xs">
                <LogOutIcon className="size-3" />
                Revoke all other sessions
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {sessions.map((session) => (
                <motion.div
                  key={session.device}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex items-center justify-between rounded-xl border px-3.5 py-3"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted/70">
                      <session.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {session.device}
                        </span>
                        {session.current && (
                          <Badge variant="secondary" className="text-[10px]">
                            This device
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {session.location} — {session.lastActive}
                      </span>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive">
                      Revoke
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
