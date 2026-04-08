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
import { MailIcon, CheckCircle2Icon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginMagicLink() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className="flex min-h-[600px] items-center justify-center bg-slate-50/80 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="w-full max-w-sm"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <MailIcon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg tracking-tight">
                    Sign in with magic link
                  </CardTitle>
                  <CardDescription>
                    We&apos;ll send a secure link to your email. No password needed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lml-email">Email address</Label>
                    <Input
                      id="lml-email"
                      type="email"
                      placeholder="amara.okafor@signalpath.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={() => setSent(true)}>
                    Send magic link
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Prefer a password?{" "}
                    <button className="font-medium text-primary hover:underline">
                      Sign in with credentials
                    </button>
                  </p>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              >
                <CardHeader className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200/60"
                  >
                    <CheckCircle2Icon className="size-6 text-emerald-600" />
                  </motion.div>
                  <CardTitle className="text-lg tracking-tight">
                    Check your inbox
                  </CardTitle>
                  <CardDescription>
                    We sent a sign-in link to{" "}
                    <span className="font-medium text-foreground">
                      {email || "amara.okafor@signalpath.co"}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-center text-xs text-muted-foreground">
                    The link expires in 15 minutes. Check your spam folder if you
                    don&apos;t see it.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSent(false)}
                  >
                    Resend link
                  </Button>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}
