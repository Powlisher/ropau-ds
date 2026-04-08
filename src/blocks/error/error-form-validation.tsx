"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { AlertCircleIcon, ArrowUpIcon } from "lucide-react"

const errors = [
  { field: "Email", message: "Must be a valid email address", suggestion: "Check for typos like .con instead of .com" },
  { field: "Password", message: "Must be at least 8 characters", suggestion: "Add numbers or symbols to strengthen it" },
  { field: "Company name", message: "This field is required", suggestion: "Enter your organization or personal name" },
  { field: "Phone", message: "Invalid format for selected country", suggestion: "Use the format +33 6 12 34 56 78" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorFormValidation() {
  return (
    <div className="flex min-h-[480px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md ring-2 ring-destructive/20">
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircleIcon className="size-4 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-base">Fix {errors.length} errors to continue</CardTitle>
              <CardDescription>The form contains validation issues</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            {errors.map((err) => (
              <motion.div
                key={err.field}
                variants={itemVariants}
                className="rounded-lg bg-destructive/[0.04] p-3 ring-1 ring-destructive/10"
              >
                <div className="flex items-start gap-2">
                  <AlertCircleIcon className="mt-0.5 size-3.5 shrink-0 text-destructive" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-destructive">{err.field}</span>
                      <span className="mx-1.5 text-muted-foreground">--</span>
                      {err.message}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{err.suggestion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="w-full gap-1.5">
            <ArrowUpIcon data-icon="inline-start" className="size-4" />
            Back to form
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
