"use client"

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
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export default function Modal01() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <InfoIcon data-icon="inline-start" />
          View details
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API rate limits updated</DialogTitle>
            <DialogDescription>
              Starting March 15, your workspace &ldquo;Meridian Studio&rdquo;
              will have access to 12,000 requests per minute on the Pro plan.
              This is a 40% increase from your current allocation. No action is
              required on your end &mdash; the change applies automatically.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Got it
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
