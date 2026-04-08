"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function OnboardingWelcome() {
  const [name, setName] = useState("")

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-md flex-col items-center gap-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
          <Avatar size="lg" className="size-16">
            <AvatarFallback className="text-lg">
              {name ? name.charAt(0).toUpperCase() : <UserIcon className="size-6 text-muted-foreground" />}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Welcome to Ropau
          </h1>
          <p className="max-w-sm text-base text-muted-foreground">
            Set up your profile in a few seconds. You can always change these later.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              placeholder="Marie Lefebvre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar-upload">Avatar</Label>
            <div
              className="flex h-10 cursor-pointer items-center rounded-lg border border-dashed border-input px-3 text-sm text-muted-foreground transition-colors hover:border-ring hover:bg-muted/50"
            >
              Upload an image or drag and drop
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <Button className="h-10 w-full text-sm font-medium">
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
