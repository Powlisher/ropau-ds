"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  BellIcon,
  MessageSquareIcon,
  GitPullRequestIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "lucide-react"

const notifications = [
  {
    icon: MessageSquareIcon,
    iconBg: "bg-blue-500/10 text-blue-600",
    title: "Theo replied to your comment",
    desc: "On PR #847: Brand token migration",
    time: "2 min ago",
    unread: true,
  },
  {
    icon: AlertTriangleIcon,
    iconBg: "bg-amber-500/10 text-amber-600",
    title: "Staging deployment failed",
    desc: "meridian-api: type error in line 247",
    time: "18 min ago",
    unread: true,
  },
  {
    icon: GitPullRequestIcon,
    iconBg: "bg-emerald-500/10 text-emerald-600",
    title: "PR #843 merged",
    desc: "Feature/dark-mode into main",
    time: "1 hr ago",
    unread: false,
  },
  {
    icon: CheckCircle2Icon,
    iconBg: "bg-emerald-500/10 text-emerald-600",
    title: "Invoice paid",
    desc: "Atelier Lumiere - $4,720.00",
    time: "3 hrs ago",
    unread: false,
  },
]

export default function Popover04() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" className="relative" />
          }
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-mono tabular-nums font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <PopoverHeader className="flex items-center justify-between p-3">
            <div>
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverDescription>{unreadCount} new</PopoverDescription>
            </div>
            <Button variant="ghost" size="xs" className="text-muted-foreground">
              Mark all read
            </Button>
          </PopoverHeader>
          <Separator />
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((notif, i) => {
              const Icon = notif.icon
              return (
                <button
                  key={i}
                  className={`flex w-full gap-3 border-b px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-muted/50 ${
                    notif.unread ? "bg-primary/[0.02]" : ""
                  }`}
                >
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-md ${notif.iconBg}`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-1.5">
                      <p
                        className={`text-sm leading-tight ${
                          notif.unread ? "font-medium" : ""
                        }`}
                      >
                        {notif.title}
                      </p>
                      {notif.unread && (
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {notif.desc}
                    </p>
                    <p className="mt-0.5 text-xs font-mono tabular-nums text-muted-foreground/60">
                      {notif.time}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
          <Separator />
          <div className="p-2">
            <Button variant="ghost" className="w-full text-xs text-muted-foreground">
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
