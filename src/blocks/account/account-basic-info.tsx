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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { CameraIcon } from "lucide-react"

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

export default function AccountBasicInfo() {
  const [avatarHover, setAvatarHover] = useState(false)

  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Basic Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="relative cursor-pointer"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            >
              <Avatar size="lg" className="size-16">
                <AvatarFallback className="text-lg">EV</AvatarFallback>
              </Avatar>
              <motion.div
                initial={false}
                animate={{ opacity: avatarHover ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40"
              >
                <CameraIcon className="size-5 text-white" />
              </motion.div>
            </motion.div>
            <div className="flex flex-col gap-1">
              <Button variant="outline" size="sm">
                Upload photo
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP. Max 2 MB.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="acct-name">Full name</Label>
              <Input id="acct-name" defaultValue="Elena Vasquez" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="acct-email">Email</Label>
              <Input
                id="acct-email"
                type="email"
                defaultValue="elena.vasquez@cordoba.dev"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="acct-phone">Phone number</Label>
            <Input
              id="acct-phone"
              type="tel"
              defaultValue="+34 612 847 293"
              className="max-w-xs"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <Button>Save changes</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
