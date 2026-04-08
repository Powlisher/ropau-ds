"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ShieldCheckIcon, CopyIcon } from "lucide-react"

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

const backupCodes = [
  "A7K9-M2X4",
  "B3P1-N8Q6",
  "C5R2-V7W9",
  "D4T8-Y1Z3",
  "E6U5-H2J7",
  "F8S3-L9K1",
]

export default function Account2FA() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <CardTitle className="tracking-tight">
                Two-Factor Authentication
              </CardTitle>
              {enabled && <Badge variant="secondary">Active</Badge>}
            </div>
            <CardDescription>
              Add an extra layer of security to your account with TOTP-based
              verification.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheckIcon className="size-4 text-primary" />
              </div>
              <Label className="cursor-pointer">Enable 2FA</Label>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </motion.div>

          {enabled && (
            <>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="flex size-40 items-center justify-center rounded-xl bg-muted/80"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="grid grid-cols-5 grid-rows-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`size-4 rounded-sm ${
                          [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 12, 18].includes(i)
                            ? "bg-foreground/80"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Scan with your authenticator app
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    Backup Codes
                  </span>
                  <Button variant="ghost" size="xs">
                    <CopyIcon className="size-3" />
                    Copy all
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code) => (
                    <div
                      key={code}
                      className="rounded-lg bg-muted/60 px-3 py-1.5 text-center font-mono text-sm tabular-nums tracking-wide text-foreground/80"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          <motion.div variants={itemVariants} className="flex justify-end">
            <Button variant={enabled ? "destructive" : "default"}>
              {enabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
