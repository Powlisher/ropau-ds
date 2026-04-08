"use client"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  BellIcon,
  MessageSquareIcon,
  GitPullRequestIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ArchiveIcon,
} from "lucide-react"

const notifications = [
  {
    icon: MessageSquareIcon,
    iconBg: "bg-blue-500/10 text-blue-600",
    title: "New comment on PR #847",
    description: 'Theo V. replied: "The spacing feels right now, shipping this."',
    time: "4 min ago",
    unread: true,
  },
  {
    icon: GitPullRequestIcon,
    iconBg: "bg-emerald-500/10 text-emerald-600",
    title: "PR #843 merged",
    description: "Feature/dark-mode was merged into main by Anika P.",
    time: "38 min ago",
    unread: true,
  },
  {
    icon: AlertTriangleIcon,
    iconBg: "bg-amber-500/10 text-amber-600",
    title: "Build failed on staging",
    description:
      "meridian-api deployment failed: type error in auth middleware (line 247).",
    time: "1 hr ago",
    unread: true,
  },
  {
    icon: CheckCircle2Icon,
    iconBg: "bg-emerald-500/10 text-emerald-600",
    title: "Invoice #INV-2026-0034 paid",
    description: "Atelier Lumiere paid $4,720.00 via bank transfer.",
    time: "3 hrs ago",
    unread: false,
  },
  {
    icon: MessageSquareIcon,
    iconBg: "bg-blue-500/10 text-blue-600",
    title: "Camille mentioned you",
    description:
      '"@jonas can you review the token migration before EOD?"',
    time: "5 hrs ago",
    unread: false,
  },
  {
    icon: GitPullRequestIcon,
    iconBg: "bg-violet-500/10 text-violet-600",
    title: "Review requested",
    description:
      "Camille R. requested your review on PR #851: Refactor settings API.",
    time: "Yesterday",
    unread: false,
  },
]

export default function Drawer09() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative">
            <BellIcon data-icon="inline-start" />
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-mono tabular-nums font-bold text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-sm">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>
                  {unreadCount} unread
                </DrawerDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ArchiveIcon data-icon="inline-start" />
                Mark all read
              </Button>
            </div>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col overflow-y-auto">
            {notifications.map((notif, i) => {
              const Icon = notif.icon
              return (
                <button
                  key={i}
                  className={`flex gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted/50 ${
                    notif.unread ? "bg-primary/[0.02]" : ""
                  }`}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-md ${notif.iconBg}`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <p
                        className={`text-sm leading-tight ${
                          notif.unread ? "font-medium" : ""
                        }`}
                      >
                        {notif.title}
                      </p>
                      {notif.unread && (
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {notif.description}
                    </p>
                    <p className="mt-1 text-xs font-mono tabular-nums text-muted-foreground/60">
                      {notif.time}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
          <Separator />
          <div className="p-3">
            <DrawerClose asChild>
              <Button variant="ghost" className="w-full text-muted-foreground">
                View all notifications
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
