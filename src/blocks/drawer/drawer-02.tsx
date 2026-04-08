"use client"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MenuIcon,
  HomeIcon,
  FolderIcon,
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react"

const navSections = [
  {
    items: [
      { icon: HomeIcon, label: "Dashboard", active: true, badge: "" },
      { icon: FolderIcon, label: "Projects", active: false, badge: "12" },
      { icon: UsersIcon, label: "Team", active: false, badge: "" },
      { icon: BarChart3Icon, label: "Analytics", active: false, badge: "" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { icon: SparklesIcon, label: "AI Assistant", active: false, badge: "" },
      { icon: SettingsIcon, label: "Settings", active: false, badge: "" },
      { icon: HelpCircleIcon, label: "Help & Support", active: false, badge: "" },
    ],
  },
]

export default function Drawer02() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
            <span className="sr-only">Open navigation</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                M
              </div>
              Meridian
            </DrawerTitle>
          </DrawerHeader>
          <Separator />
          <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">
            {navSections.map((section, si) => (
              <div key={si}>
                {section.label && (
                  <p className="mb-1.5 px-2 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    {section.label}
                  </p>
                )}
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                          item.active
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-mono tabular-nums font-medium text-primary">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
          <Separator />
          <div className="p-3">
            <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                CR
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">Camille Renard</p>
                <p className="truncate text-xs text-muted-foreground">
                  camille@meridian.studio
                </p>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
                  <LogOutIcon />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
