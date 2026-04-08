"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const sections = [
  {
    title: "Notifications",
    items: [
      { id: "email-digest", label: "Weekly email digest", description: "Summary of activity every Monday" },
      { id: "push-mentions", label: "Push for mentions", description: "Get notified when someone tags you" },
      { id: "marketing", label: "Product updates", description: "New features and announcements" },
    ],
  },
  {
    title: "Privacy",
    items: [
      { id: "profile-visible", label: "Public profile", description: "Visible to anyone with a link" },
      { id: "show-activity", label: "Show activity status", description: "Others see when you're online" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { id: "slack-sync", label: "Slack notifications", description: "Mirror alerts to your Slack channel" },
      { id: "calendar-sync", label: "Calendar sync", description: "Auto-block focus time from events" },
      { id: "github-link", label: "GitHub commits", description: "Link commits to tasks automatically" },
    ],
  },
]

export default function FormCheckboxGroup() {
  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-lg tracking-tight">
                Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to receive updates and manage your privacy
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {sections.map((section, sectionIdx) => (
              <motion.div key={section.title} variants={itemVariants}>
                {sectionIdx > 0 && <Separator className="mb-6" />}
                <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {section.title}
                </p>
                <div className="flex flex-col gap-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <Checkbox id={item.id} className="mt-0.5" />
                      <div className="flex flex-col gap-0.5">
                        <Label
                          htmlFor={item.id}
                          className="text-sm font-medium leading-snug"
                        >
                          {item.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="flex justify-end pt-2">
              <Button>Save preferences</Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
