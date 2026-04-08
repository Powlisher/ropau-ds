"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2Icon } from "lucide-react"

const WORKSPACE_NAME = "meridian-studio"

export default function DialogDelete() {
  const [confirmText, setConfirmText] = useState("")
  const isConfirmed = confirmText === WORKSPACE_NAME

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="destructive" />}>
          Delete workspace
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete workspace permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <span className="font-medium text-foreground">{WORKSPACE_NAME}</span>, including all projects, files, and team data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-1.5 px-0">
            <label className="text-sm text-muted-foreground">
              Type <span className="font-mono font-medium text-foreground">{WORKSPACE_NAME}</span> to confirm
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={WORKSPACE_NAME}
              className="font-mono text-sm"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={!isConfirmed}
              className={!isConfirmed ? "opacity-50" : ""}
            >
              Delete workspace
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
