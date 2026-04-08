"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

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

const notificationGroups = [
  {
    category: "Security Alerts",
    description: "Critical notifications about your account security",
    channels: [
      { label: "Email", defaultChecked: true },
      { label: "Push", defaultChecked: true },
      { label: "SMS", defaultChecked: true },
    ],
  },
  {
    category: "Product Updates",
    description: "New features, improvements, and changelog",
    channels: [
      { label: "Email", defaultChecked: true },
      { label: "Push", defaultChecked: false },
      { label: "SMS", defaultChecked: false },
    ],
  },
  {
    category: "Usage & Billing",
    description: "Invoices, quota warnings, and payment confirmations",
    channels: [
      { label: "Email", defaultChecked: true },
      { label: "Push", defaultChecked: true },
      { label: "SMS", defaultChecked: false },
    ],
  },
  {
    category: "Marketing",
    description: "Tips, case studies, and community highlights",
    channels: [
      { label: "Email", defaultChecked: false },
      { label: "Push", defaultChecked: false },
      { label: "SMS", defaultChecked: false },
    ],
  },
]

export default function AccountNotifications() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how and when you want to be notified.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          {notificationGroups.map((group, groupIndex) => (
            <motion.div key={group.category} variants={itemVariants}>
              {groupIndex > 0 && <Separator className="my-1" />}
              <div className="rounded-xl px-1 py-4">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-foreground">
                    {group.category}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {group.description}
                  </p>
                </div>
                <div className="flex gap-6">
                  {group.channels.map((channel) => (
                    <div
                      key={`${group.category}-${channel.label}`}
                      className="flex items-center gap-2"
                    >
                      <Switch defaultChecked={channel.defaultChecked} size="sm" />
                      <span className="text-sm text-muted-foreground">
                        {channel.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </motion.div>
    </Card>
  )
}
