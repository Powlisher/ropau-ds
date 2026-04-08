"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  XIcon,
  UserIcon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  SettingsIcon,
} from "lucide-react"

const sections = [
  {
    id: "profile",
    label: "Profile",
    icon: UserIcon,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: BellIcon,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldIcon,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: PaletteIcon,
  },
]

export default function Modal07() {
  const [active, setActive] = useState("profile")

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <SettingsIcon data-icon="inline-start" />
          Settings
        </DialogTrigger>
        <DialogContent
          className="overflow-hidden p-0 sm:max-w-2xl"
          showCloseButton={false}
        >
          <div className="flex h-[480px]">
            <nav className="flex w-48 shrink-0 flex-col border-r bg-muted/30 p-3">
              <div className="flex items-center justify-between px-2 pb-3">
                <span className="font-heading text-sm font-medium">
                  Settings
                </span>
                <DialogClose
                  render={<Button variant="ghost" size="icon-xs" />}
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
              <div className="flex flex-col gap-0.5">
                {sections.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                        active === s.id
                          ? "bg-background font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      style={
                        active === s.id
                          ? {
                              boxShadow:
                                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                            }
                          : undefined
                      }
                    >
                      <Icon className="size-4" />
                      {s.label}
                    </button>
                  )
                })}
              </div>
            </nav>

            <div className="flex flex-1 flex-col overflow-y-auto">
              {active === "profile" && (
                <div className="flex flex-col gap-5 p-5">
                  <div>
                    <h3 className="font-heading text-base font-medium">
                      Profile
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your public identity across Meridian workspaces.
                    </p>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="Camille" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="Renard" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email-pref">Email</Label>
                      <Input
                        id="email-pref"
                        type="email"
                        defaultValue="camille@meridian.studio"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="role-title">Role</Label>
                      <Input
                        id="role-title"
                        defaultValue="Lead Product Designer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save changes</Button>
                  </div>
                </div>
              )}

              {active === "notifications" && (
                <div className="flex flex-col gap-5 p-5">
                  <div>
                    <h3 className="font-heading text-base font-medium">
                      Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose how and when you get notified.
                    </p>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        title: "Project updates",
                        desc: "When a project you follow is updated",
                        defaultChecked: true,
                      },
                      {
                        title: "Comments and mentions",
                        desc: "When someone mentions you or replies to your thread",
                        defaultChecked: true,
                      },
                      {
                        title: "Deployment alerts",
                        desc: "When a deployment succeeds or fails",
                        defaultChecked: false,
                      },
                      {
                        title: "Weekly digest",
                        desc: "Summary of workspace activity every Monday",
                        defaultChecked: true,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active === "security" && (
                <div className="flex flex-col gap-5 p-5">
                  <div>
                    <h3 className="font-heading text-base font-medium">
                      Security
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your password and authentication methods.
                    </p>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">Password</p>
                        <p className="text-xs text-muted-foreground">
                          Last changed 47 days ago
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">
                          Two-factor authentication
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Authenticator app enabled
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {active === "appearance" && (
                <div className="flex flex-col gap-5 p-5">
                  <div>
                    <h3 className="font-heading text-base font-medium">
                      Appearance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Customize how Meridian looks on your device.
                    </p>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">Compact mode</p>
                        <p className="text-xs text-muted-foreground">
                          Reduce spacing and padding for denser layouts
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">
                          Reduce animations
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Minimize motion for accessibility
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
