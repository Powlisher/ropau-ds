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

function FloatingInput({
  id,
  label,
  type = "text",
}: {
  id: string
  label: string
  type?: string
}) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer h-12 w-full rounded-lg border border-input bg-transparent px-3 pt-4 pb-1 text-sm outline-none transition-colors placeholder:text-transparent focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 text-muted-foreground transition-all duration-200"
        style={{
          top: isActive ? "4px" : "50%",
          transform: isActive ? "translateY(0)" : "translateY(-50%)",
          fontSize: isActive ? "10px" : "14px",
          fontWeight: isActive ? 500 : 400,
          letterSpacing: isActive ? "0.03em" : "0",
        }}
      >
        {label}
      </label>
    </div>
  )
}

export default function LoginFloatingLabels() {
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
              <CardTitle className="text-lg tracking-tight">
                Welcome back
              </CardTitle>
              <CardDescription>
                Sign in to pick up where you left off
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <motion.div variants={itemVariants}>
              <FloatingInput id="lfl-email" label="Email address" type="email" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FloatingInput id="lfl-password" label="Password" type="password" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
                Forgot password?
              </button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button className="w-full">Sign in</Button>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-center text-xs text-muted-foreground"
            >
              Need an account?{" "}
              <button className="font-medium text-primary hover:underline">
                Get started
              </button>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
