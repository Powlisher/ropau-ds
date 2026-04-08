"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SendIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function TeamInvite() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="w-full max-w-lg"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Invite a team member
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            They will receive an email with a link to join your workspace.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="invite-email">Email address</Label>
            <Input id="invite-email" type="email" placeholder="colleague@company.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invite-role">Role</Label>
            <div className="grid grid-cols-3 gap-2">
              {["Viewer", "Editor", "Admin"].map((role, i) => (
                <button
                  key={role}
                  className={`flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    i === 1
                      ? "bg-primary text-primary-foreground ring-1 ring-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invite-message">
              Personal message
              <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="invite-message"
              placeholder="Hey! We'd love to have you on the team..."
              className="min-h-20"
            />
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button className="gap-1.5">
              <SendIcon className="size-3.5" />
              Send Invite
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
