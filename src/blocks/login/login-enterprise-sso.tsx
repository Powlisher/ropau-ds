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
import { BuildingIcon } from "lucide-react"
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

export default function LoginEnterpriseSso() {
  const [showStandard, setShowStandard] = useState(false)

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
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <BuildingIcon className="size-5 text-primary" />
              </div>
              <CardTitle className="text-lg tracking-tight">
                Enterprise sign-in
              </CardTitle>
              <CardDescription>
                Sign in with your company&apos;s identity provider
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="less-company-email">Work email</Label>
              <Input
                id="less-company-email"
                type="email"
                placeholder="you@yourcompany.com"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button className="w-full">
                Continue with SSO
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or
              </span>
            </motion.div>

            {!showStandard ? (
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowStandard(true)}
                >
                  Sign in with email and password
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-5 overflow-hidden"
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="less-email">Email</Label>
                  <Input
                    id="less-email"
                    type="email"
                    placeholder="yuki.tanaka@northbeam.io"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="less-password">Password</Label>
                  <Input
                    id="less-password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200/60"
            >
              <p className="text-xs leading-relaxed text-muted-foreground">
                Your IT admin can configure SSO via SAML 2.0 or OIDC from the
                organization settings panel.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
