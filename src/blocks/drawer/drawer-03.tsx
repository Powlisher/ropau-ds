"use client"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShareIcon, CopyIcon, MailIcon } from "lucide-react"

export default function Drawer03() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <ShareIcon data-icon="inline-start" />
            Share
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share project</DrawerTitle>
            <DrawerDescription>
              Share &ldquo;Q4 Brand Refresh&rdquo; with your team or external
              collaborators.
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <CopyIcon className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Copy link</p>
                <p className="truncate text-xs text-muted-foreground">
                  meridian.studio/p/q4-brand-refresh
                </p>
              </div>
              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <MailIcon className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Invite by email</p>
                <p className="text-xs text-muted-foreground">
                  Send a direct invitation link
                </p>
              </div>
              <Button variant="outline" size="sm">
                Invite
              </Button>
            </div>
            <Separator className="my-1" />
            <div>
              <p className="mb-2 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                People with access
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { name: "Camille Renard", role: "Owner", initials: "CR" },
                  { name: "Theo Vasquez", role: "Can edit", initials: "TV" },
                  { name: "Anika Patel", role: "Can view", initials: "AP" },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-3 rounded-md p-1.5"
                  >
                    <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {person.initials}
                    </div>
                    <span className="flex-1 text-sm">{person.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {person.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Done
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
