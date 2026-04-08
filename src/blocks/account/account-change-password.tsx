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
import { Progress } from "@/components/ui/progress"
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

function getStrength(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

function strengthLabel(score: number) {
  if (score === 0) return { text: "Enter a password", color: "bg-muted" }
  if (score <= 2) return { text: "Weak", color: "bg-destructive" }
  if (score <= 3) return { text: "Fair", color: "bg-amber-500" }
  return { text: "Strong", color: "bg-emerald-500" }
}

export default function AccountChangePassword() {
  const [newPassword, setNewPassword] = useState("")
  const strength = getStrength(newPassword)
  const { text, color } = strengthLabel(strength)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Change Password</CardTitle>
            <CardDescription>
              Choose a strong password with at least 12 characters.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="pw-current">Current password</Label>
            <Input id="pw-current" type="password" placeholder="********" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="pw-new">New password</Label>
            <Input
              id="pw-new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 12 characters recommended"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Strength
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {text}
              </span>
            </div>
            <Progress value={strength * 20}>
              <div
                className={`h-full rounded-full transition-all ${color}`}
                style={{ width: `${strength * 20}%`, position: "absolute", top: 0, left: 0 }}
              />
            </Progress>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="pw-confirm">Confirm new password</Label>
            <Input id="pw-confirm" type="password" placeholder="Re-type new password" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end pt-1">
            <Button>Update password</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
