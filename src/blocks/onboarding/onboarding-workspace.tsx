"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { GlobeIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function OnboardingWorkspace() {
  const [name, setName] = useState("")
  const slug = slugify(name) || "your-workspace"

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Create your workspace</CardTitle>
          <CardDescription>
            A workspace is where your team collaborates on projects
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <Label htmlFor="ws-name">Workspace name</Label>
              <Input
                id="ws-name"
                placeholder="Ropau Studio"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <Label>URL</Label>
              <div className="flex items-center gap-0 rounded-lg border border-input bg-muted/40 text-sm">
                <span className="flex items-center gap-1.5 border-r border-input px-2.5 py-1.5 text-muted-foreground">
                  <GlobeIcon className="size-3.5" />
                  app.ropau.io/
                </span>
                <span className="px-2.5 py-1.5 font-mono text-xs text-foreground">{slug}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <Label>Plan</Label>
              <Select defaultValue="pro">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free -- up to 5 members</SelectItem>
                  <SelectItem value="pro">Pro -- unlimited members, 14-day trial</SelectItem>
                  <SelectItem value="enterprise">Enterprise -- SSO, audit logs, SLA</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" disabled={!name.trim()}>
            Create Workspace
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
