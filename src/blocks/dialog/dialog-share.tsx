"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CopyIcon, CheckIcon, Share2Icon, LinkIcon } from "lucide-react"
import { motion } from "framer-motion"

const sharedWith = [
  { name: "Camille Beaumont", initials: "CB", email: "camille@meridian.io", role: "Editor" },
  { name: "Raphael Giroud", initials: "RG", email: "raphael@meridian.io", role: "Viewer" },
  { name: "Ines Takahashi", initials: "IT", email: "ines@meridian.io", role: "Editor" },
]

export default function DialogShare() {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <Share2Icon data-icon="inline-start" />
          Share
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share project</DialogTitle>
            <DialogDescription>Invite team members or share a public link to &ldquo;Riviera Redesign&rdquo;.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Share link</label>
              <div className="flex gap-2">
                <Input
                  value="https://app.meridian.io/p/riviera-redesign"
                  readOnly
                  className="flex-1 font-mono text-xs"
                />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? <CheckIcon className="text-emerald-600" /> : <CopyIcon />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Link access</label>
              <Select defaultValue="restricted">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restricted">
                    <LinkIcon className="size-3.5" /> Restricted — only invited people
                  </SelectItem>
                  <SelectItem value="org">Organization — anyone at Meridian</SelectItem>
                  <SelectItem value="public">Public — anyone with the link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Invite by email</label>
              <div className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  type="email"
                  className="flex-1"
                />
                <Button variant="outline" disabled={!email.includes("@")}>Invite</Button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="mb-1 text-sm font-medium">People with access</label>
              {sharedWith.map((person) => (
                <motion.div
                  key={person.email}
                  whileHover={{ backgroundColor: "var(--muted)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-3 rounded-lg px-2 py-2"
                >
                  <Avatar size="sm">
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{person.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{person.email}</p>
                  </div>
                  <Badge variant="secondary">{person.role}</Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
