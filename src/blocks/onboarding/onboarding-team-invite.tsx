"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { XIcon, PlusIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const preInvited = [
  { email: "camille.noir@ropau.io", initials: "CN" },
  { email: "julien.marchand@ropau.io", initials: "JM" },
]

export default function OnboardingTeamInvite() {
  const [email, setEmail] = useState("")
  const [invites, setInvites] = useState(preInvited)

  function addInvite() {
    if (!email.includes("@")) return
    const initials = email.slice(0, 2).toUpperCase()
    setInvites([...invites, { email, initials }])
    setEmail("")
  }

  function removeInvite(idx: number) {
    setInvites(invites.filter((_, i) => i !== idx))
  }

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Invite your team</CardTitle>
          <CardDescription>
            Workspaces work better with people. Add teammates by email.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="teammate@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addInvite()}
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={addInvite}>
              <PlusIcon className="size-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <AnimatePresence initial={false}>
              {invites.map((inv, i) => (
                <motion.div
                  key={inv.email}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={spring}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 transition-colors">
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px]">{inv.initials}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 truncate text-sm text-foreground">{inv.email}</span>
                    <button
                      onClick={() => removeInvite(i)}
                      className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {invites.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No invitations yet. Add an email above to get started.
              </p>
            )}
          </div>

          {invites.length > 0 && (
            <p className="text-xs text-muted-foreground tabular-nums">
              {invites.length} invitation{invites.length !== 1 ? "s" : ""} pending
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="ghost">Skip for now</Button>
          <Button>Send Invites</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
