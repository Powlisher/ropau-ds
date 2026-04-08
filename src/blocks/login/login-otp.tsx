"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { ShieldCheckIcon } from "lucide-react"
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

export default function LoginOtp() {
  const [value, setValue] = useState("")

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
                <ShieldCheckIcon className="size-5 text-primary" />
              </div>
              <CardTitle className="text-lg tracking-tight">
                Verify your identity
              </CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-foreground">
                  d****@cloudveil.io
                </span>
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <motion.div variants={itemVariants}>
              <InputOTP
                maxLength={6}
                value={value}
                onChange={setValue}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-11 text-base" />
                  <InputOTPSlot index={1} className="size-11 text-base" />
                  <InputOTPSlot index={2} className="size-11 text-base" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="size-11 text-base" />
                  <InputOTPSlot index={4} className="size-11 text-base" />
                  <InputOTPSlot index={5} className="size-11 text-base" />
                </InputOTPGroup>
              </InputOTP>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button className="w-full" disabled={value.length < 6}>
                Verify
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-xs text-muted-foreground"
            >
              Didn&apos;t receive a code?{" "}
              <button className="font-medium text-primary hover:underline">
                Resend
              </button>{" "}
              <span className="tabular-nums text-muted-foreground/70">
                (available in 0:47)
              </span>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
