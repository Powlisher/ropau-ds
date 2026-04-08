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
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayersIcon, AlertTriangleIcon, Trash2Icon } from "lucide-react"

const members = [
  {
    name: "Camille Renard",
    email: "camille@meridian.studio",
    role: "Owner",
    initials: "CR",
  },
  {
    name: "Theo Vasquez",
    email: "theo.v@meridian.studio",
    role: "Editor",
    initials: "TV",
  },
  {
    name: "Anika Patel",
    email: "anika@meridian.studio",
    role: "Viewer",
    initials: "AP",
  },
  {
    name: "Jonas Eriksson",
    email: "jonas.e@meridian.studio",
    role: "Editor",
    initials: "JE",
  },
]

export default function Modal10() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [targetMember, setTargetMember] = useState<string | null>(null)

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <LayersIcon data-icon="inline-start" />
          Manage team
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Team members</DialogTitle>
            <DialogDescription>
              4 members in &ldquo;Meridian Studio&rdquo; workspace. Remove a
              member to revoke their access.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1">
            {members.map((member) => (
              <div
                key={member.email}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {member.role}
                </Badge>
                {member.role !== "Owner" && (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      setTargetMember(member.name)
                      setConfirmOpen(true)
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Done
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-amber-500/10 text-amber-600">
              <AlertTriangleIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Remove {targetMember}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately revoke their access to all projects and
              shared resources in the workspace. They will need to be re-invited
              to regain access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => setConfirmOpen(false)}
            >
              Remove member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
