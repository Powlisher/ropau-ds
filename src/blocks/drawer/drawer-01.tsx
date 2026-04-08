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
import { PanelRightIcon, ExternalLinkIcon } from "lucide-react"

export default function Drawer01() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <PanelRightIcon data-icon="inline-start" />
            Open drawer
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Activity log</DrawerTitle>
            <DrawerDescription>
              Recent changes in your workspace over the last 7 days.
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-3">
            {[
              {
                action: "Deployed",
                target: "meridian-api v2.4.1",
                user: "Camille R.",
                time: "12 min ago",
              },
              {
                action: "Commented on",
                target: "Brand guidelines PR #847",
                user: "Theo V.",
                time: "1 hr ago",
              },
              {
                action: "Merged",
                target: "Feature/dark-mode",
                user: "Anika P.",
                time: "3 hrs ago",
              },
              {
                action: "Updated",
                target: "Q1 revenue forecast",
                user: "Jonas E.",
                time: "5 hrs ago",
              },
              {
                action: "Created",
                target: "Design system tokens v3",
                user: "Camille R.",
                time: "Yesterday",
              },
              {
                action: "Archived",
                target: "Legacy onboarding flow",
                user: "Theo V.",
                time: "2 days ago",
              },
              {
                action: "Invited",
                target: "sara.m@external.co",
                user: "Anika P.",
                time: "3 days ago",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="mt-0.5 size-1.5 shrink-0 rounded-full bg-foreground/20" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs font-mono tabular-nums text-muted-foreground">
                    {item.time}
                  </p>
                </div>
                <ExternalLinkIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
