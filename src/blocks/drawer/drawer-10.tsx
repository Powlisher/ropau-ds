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
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SettingsIcon } from "lucide-react"

const settingSections = [
  {
    label: "General",
    items: [
      {
        type: "select" as const,
        title: "Language",
        description: "Interface language for your account",
        options: [
          { value: "en", label: "English" },
          { value: "fr", label: "French" },
          { value: "de", label: "German" },
          { value: "ja", label: "Japanese" },
        ],
        defaultValue: "en",
      },
      {
        type: "select" as const,
        title: "Timezone",
        description: "Used for scheduling and timestamps",
        options: [
          { value: "utc", label: "UTC +0:00" },
          { value: "cet", label: "CET +1:00" },
          { value: "est", label: "EST -5:00" },
          { value: "pst", label: "PST -8:00" },
          { value: "jst", label: "JST +9:00" },
        ],
        defaultValue: "cet",
      },
    ],
  },
  {
    label: "Privacy",
    items: [
      {
        type: "toggle" as const,
        title: "Online status",
        description: "Show when you are active to team members",
        defaultChecked: true,
      },
      {
        type: "toggle" as const,
        title: "Read receipts",
        description: "Let others know when you have seen their messages",
        defaultChecked: false,
      },
      {
        type: "toggle" as const,
        title: "Activity tracking",
        description: "Contribute anonymous usage data to improve the product",
        defaultChecked: true,
      },
    ],
  },
  {
    label: "Editor",
    items: [
      {
        type: "toggle" as const,
        title: "Auto-save",
        description: "Automatically save changes every 30 seconds",
        defaultChecked: true,
      },
      {
        type: "toggle" as const,
        title: "Spell check",
        description: "Highlight spelling errors in text fields",
        defaultChecked: true,
      },
      {
        type: "select" as const,
        title: "Font size",
        description: "Base font size for the editor",
        options: [
          { value: "13", label: "13px" },
          { value: "14", label: "14px" },
          { value: "15", label: "15px" },
          { value: "16", label: "16px" },
        ],
        defaultValue: "14",
      },
    ],
  },
]

export default function Drawer10() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <SettingsIcon data-icon="inline-start" />
            Settings
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Quick settings</DrawerTitle>
            <DrawerDescription>
              Common preferences for your workspace.
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
            {settingSections.map((section) => (
              <div key={section.label}>
                <p className="mb-2.5 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  {section.label}
                </p>
                <div className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      {item.type === "toggle" && (
                        <Switch defaultChecked={item.defaultChecked} />
                      )}
                      {item.type === "select" && (
                        <Select defaultValue={item.defaultValue}>
                          <SelectTrigger className="w-auto shrink-0" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
