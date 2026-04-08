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
import { Checkbox } from "@/components/ui/checkbox"
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

export default function LoginCardCentered() {
  const [isLoading, setIsLoading] = useState(false)

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
                Welcome back
              </CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="lcc-email">Email</Label>
              <Input
                id="lcc-email"
                type="email"
                placeholder="elena.marchetti@company.io"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="lcc-password">Password</Label>
                <button className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <Input id="lcc-password" type="password" placeholder="Enter your password" />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <Checkbox id="lcc-remember" />
              <Label htmlFor="lcc-remember" className="text-sm font-normal text-muted-foreground">
                Remember me for 30 days
              </Label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                className="w-full"
                onClick={() => setIsLoading(!isLoading)}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or continue with
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                GitHub
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-xs text-muted-foreground"
            >
              Don&apos;t have an account?{" "}
              <button className="font-medium text-primary hover:underline">
                Create one
              </button>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
