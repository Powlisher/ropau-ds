"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

type Setting = { id: string; label: string; description: string; enabled: boolean }

type SettingsGroup = { title: string; settings: Setting[] }

const initialGroups: SettingsGroup[] = [
  {
    title: "Notifications",
    settings: [
      { id: "email-notif", label: "Email notifications", description: "Receive updates about account activity via email", enabled: true },
      { id: "push-notif", label: "Push notifications", description: "Get browser notifications for real-time events", enabled: false },
      { id: "weekly-digest", label: "Weekly digest", description: "Receive a summary email every Monday morning", enabled: true },
      { id: "mention-alerts", label: "Mention alerts", description: "Notify when someone mentions you in a comment", enabled: true },
    ],
  },
  {
    title: "Privacy",
    settings: [
      { id: "profile-public", label: "Public profile", description: "Allow other team members to see your profile details", enabled: true },
      { id: "activity-visible", label: "Show activity status", description: "Display when you were last active on the platform", enabled: false },
      { id: "analytics-share", label: "Usage analytics", description: "Share anonymous usage data to help improve the product", enabled: true },
    ],
  },
  {
    title: "Appearance",
    settings: [
      { id: "compact-mode", label: "Compact mode", description: "Reduce spacing and padding for denser layouts", enabled: false },
      { id: "animations", label: "Interface animations", description: "Enable smooth transitions and motion effects", enabled: true },
      { id: "high-contrast", label: "High contrast", description: "Increase contrast ratios for better accessibility", enabled: false },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardSettingsPanel() {
  const [groups, setGroups] = useState(initialGroups)

  const toggle = (groupIndex: number, settingId: string) => {
    setGroups((prev) =>
      prev.map((group, gi) =>
        gi === groupIndex
          ? {
              ...group,
              settings: group.settings.map((s) =>
                s.id === settingId ? { ...s, enabled: !s.enabled } : s
              ),
            }
          : group
      )
    )
  }

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Preferences</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {groups.map((group, gi) => (
            <motion.div key={group.title} variants={itemVariants}>
              {gi > 0 && <Separator className="mb-6" />}
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.settings.map((setting) => (
                  <div key={setting.id} className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{setting.label}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{setting.description}</div>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggle(gi, setting.id)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
