"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
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
import { AlertTriangleIcon } from "lucide-react"

export default function DialogConfirm() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Archive project
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-amber-500/10 text-amber-600">
              <AlertTriangleIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Archive this project?</AlertDialogTitle>
            <AlertDialogDescription>
              Archiving &ldquo;Riviera Redesign&rdquo; will hide it from your active workspace. Team members will lose access to real-time collaboration. You can restore it anytime from Settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Archive project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
