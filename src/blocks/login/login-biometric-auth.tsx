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
import { Separator } from "@/components/ui/separator"
import { FingerprintIcon } from "lucide-react"
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

export default function LoginBiometricAuth() {
  const [scanning, setScanning] = useState(false)

  return (
    <div className="flex min-h-[600px] items-center justify-center bg-slate-50/80 px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader className="text-center">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-lg tracking-tight">Sign in</CardTitle>
              <CardDescription>
                Use biometrics or your password
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setScanning(!scanning)}
                className="group relative flex size-20 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <motion.div
                  animate={
                    scanning
                      ? { scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-2xl bg-primary/10"
                  style={{ display: scanning ? "block" : "none" }}
                />
                <FingerprintIcon
                  className={`size-8 transition-colors ${
                    scanning
                      ? "text-primary"
                      : "text-slate-400 group-hover:text-primary/70"
                  }`}
                />
              </motion.button>
              <p className="text-xs text-muted-foreground">
                {scanning ? "Scanning..." : "Tap to authenticate with fingerprint"}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or use password
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="lba-email">Email</Label>
              <Input
                id="lba-email"
                type="email"
                placeholder="kaspar.nielsen@wavefront.io"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="lba-password">Password</Label>
              <Input
                id="lba-password"
                type="password"
                placeholder="Enter your password"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button className="w-full">Sign in</Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
