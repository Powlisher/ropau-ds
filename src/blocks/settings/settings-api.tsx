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
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CopyIcon, ZapIcon, SendIcon } from "lucide-react"

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

export default function SettingsApi() {
  const [webhookTested, setWebhookTested] = useState(false)

  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">API Configuration</CardTitle>
            <CardDescription>
              Endpoint details, rate limits, and webhook management.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <Label>API Endpoint</Label>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-muted/70 px-3 py-2 font-mono text-sm tabular-nums tracking-wide text-foreground">
                https://api.cordoba.dev/v2
              </code>
              <Button variant="outline" size="icon">
                <CopyIcon className="size-3.5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border px-4 py-3.5"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <ZapIcon className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Rate Limits
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                  1,000
                </span>
                <span className="text-xs text-muted-foreground">
                  requests/min
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                  25,000
                </span>
                <span className="text-xs text-muted-foreground">
                  requests/day
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                  10 MB
                </span>
                <span className="text-xs text-muted-foreground">
                  max payload
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                defaultValue="https://hooks.cordoba.dev/events/ws_8k2m9"
                className="flex-1 font-mono text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWebhookTested(true)}
              >
                <SendIcon className="size-3" />
                Test
              </Button>
            </div>
            {webhookTested && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-1"
              >
                <Badge variant="secondary" className="text-[10px]">
                  200 OK
                </Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  Response in 142ms
                </span>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
