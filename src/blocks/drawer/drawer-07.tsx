"use client"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  EyeIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ExternalLinkIcon,
} from "lucide-react"

export default function Drawer07() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <EyeIcon data-icon="inline-start" />
            Preview
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle>Q4 Brand Refresh</DrawerTitle>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-amber-100 via-rose-50 to-violet-100" />

            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Complete rebrand of the Meridian product suite, including
                updated color system, refined typography scale, new icon set,
                and refreshed marketing collateral. Target launch alongside the
                V3 platform release in late March.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    Timeline
                  </p>
                  <p className="text-sm font-mono tabular-nums">
                    Jan 8 &ndash; Mar 28, 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UserIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    Lead
                  </p>
                  <p className="text-sm">Camille Renard</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TagIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    Tags
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant="secondary">Design</Badge>
                    <Badge variant="secondary">Branding</Badge>
                    <Badge variant="secondary">V3 Launch</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Progress
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Color system", pct: 92 },
                  { label: "Typography scale", pct: 78 },
                  { label: "Icon set", pct: 45 },
                  { label: "Marketing assets", pct: 23 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">{item.label}</span>
                      <span className="text-xs font-mono tabular-nums text-muted-foreground">
                        {item.pct}%
                      </span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-muted">
                      <div
                        className="h-1 rounded-full bg-primary transition-all"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button className="w-full">
              <ExternalLinkIcon data-icon="inline-start" />
              Open project
            </Button>
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
