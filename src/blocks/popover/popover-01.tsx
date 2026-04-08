"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  SettingsIcon,
  LogOutIcon,
  CreditCardIcon,
} from "lucide-react"

export default function Popover01() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger
          render={
            <button className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-muted" />
          }
        >
          <Avatar size="sm">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Camille</span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-0">
          <div className="flex items-center gap-3 p-3">
            <Avatar>
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Camille Renard</p>
              <p className="truncate text-xs text-muted-foreground">
                camille@meridian.studio
              </p>
            </div>
          </div>
          <Separator />
          <div className="p-1.5">
            <div className="flex items-center justify-between rounded-md px-2 py-1.5">
              <span className="text-xs text-muted-foreground">Plan</span>
              <Badge variant="secondary">Pro</Badge>
            </div>
            <div className="flex items-center justify-between rounded-md px-2 py-1.5">
              <span className="text-xs text-muted-foreground">Usage</span>
              <span className="text-xs font-mono tabular-nums font-medium">
                8,247 / 12,000
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-0.5 p-1.5">
            <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted">
              <SettingsIcon className="size-4 text-muted-foreground" />
              Account settings
            </button>
            <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted">
              <CreditCardIcon className="size-4 text-muted-foreground" />
              Billing
            </button>
          </div>
          <Separator />
          <div className="p-1.5">
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <LogOutIcon className="size-4" />
              Sign out
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
