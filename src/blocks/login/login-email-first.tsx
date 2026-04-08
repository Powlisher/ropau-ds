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
import { motion, AnimatePresence } from "framer-motion"

export default function LoginEmailFirst() {
  const [step, setStep] = useState<"email" | "password">("email")
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
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-5 text-primary"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <CardTitle className="text-lg tracking-tight">
              {step === "email" ? "Sign in" : "Enter your password"}
            </CardTitle>
            <CardDescription>
              {step === "email"
                ? "Start with your email address"
                : email}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              {step === "email" ? (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lef-email">Email address</Label>
                    <Input
                      id="lef-email"
                      type="email"
                      placeholder="rafael.costa@stratify.dev"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setStep("password")}
                  >
                    Continue
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="password-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lef-password">Password</Label>
                      <button className="text-xs font-medium text-primary hover:underline">
                        Forgot?
                      </button>
                    </div>
                    <Input
                      id="lef-password"
                      type="password"
                      placeholder="Enter your password"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep("email")}
                    >
                      Back
                    </Button>
                    <Button className="flex-[2]">Sign in</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-muted-foreground">
              No account yet?{" "}
              <button className="font-medium text-primary hover:underline">
                Sign up free
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
