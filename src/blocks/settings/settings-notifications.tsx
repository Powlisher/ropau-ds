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

const categories = [
  {
    title: "Deployments",
    items: [
      { label: "Successful deploys", description: "Notify when a deployment completes", defaultChecked: true },
      { label: "Failed deploys", description: "Alert on deployment failures", defaultChecked: true },
      { label: "Deploy previews ready", description: "Notify when preview URLs are available", defaultChecked: false },
    ],
  },
  {
    title: "Team Activity",
    items: [
      { label: "New member joins", description: "When someone accepts an invite", defaultChecked: true },
      { label: "Role changes", description: "When member permissions are updated", defaultChecked: true },
    ],
  },
  {
    title: "Monitoring",
    items: [
      { label: "Uptime alerts", description: "When services go down or recover", defaultChecked: true },
      { label: "Performance degradation", description: "When response times exceed thresholds", defaultChecked: false },
      { label: "Error rate spikes", description: "When error rates exceed 1%", defaultChecked: true },
    ],
  },
]

export default function SettingsNotifications() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Notifications</CardTitle>
            <CardDescription>
              Configure which workspace events trigger notifications.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          {categories.map((category, catIndex) => (
            <motion.div key={category.title} variants={itemVariants}>
              {catIndex > 0 && <Separator className="my-3" />}
              <div className="py-2">
                <h3 className="mb-3 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground">
                          {item.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
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
