"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { CameraIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfileSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="w-full max-w-2xl"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-5">
            <div className="group relative">
              <Avatar className="size-20 ring-2 ring-foreground/5">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&crop=face"
                  alt="Profile photo"
                />
                <AvatarFallback className="text-xl font-semibold">TN</AvatarFallback>
              </Avatar>
              <button
                className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Change avatar"
              >
                <CameraIcon className="size-5 text-white" />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP. 1MB max.
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" defaultValue="Thomas" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" defaultValue="Nguyen" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="thomas.nguyen@ropau.io" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue="Full-stack engineer focused on developer tooling and infrastructure. I believe the best code is the code you don't have to write."
              className="min-h-24"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-sm font-medium">Social links</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-xs text-muted-foreground">
                  GitHub
                </Label>
                <Input id="github" defaultValue="github.com/tnguyen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-xs text-muted-foreground">
                  LinkedIn
                </Label>
                <Input id="linkedin" defaultValue="linkedin.com/in/thomasnguyen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-xs text-muted-foreground">
                  X / Twitter
                </Label>
                <Input id="twitter" defaultValue="@tnguyen_dev" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs text-muted-foreground">
                  Website
                </Label>
                <Input id="website" defaultValue="thomasnguyen.dev" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
