"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Kbd } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import { ChevronRight, Mail, Bell, Settings, Star, Plus, ArrowRight, Search } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus /></Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">With Icons</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button><Mail data-icon="inline-start" /> Send email</Button>
          <Button variant="outline">Continue <ArrowRight data-icon="inline-end" /></Button>
          <Button variant="ghost" size="icon-sm"><Settings /></Button>
        </div>
      </div>
    </div>
  )
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}

export function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Revenue breakdown for March 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">$47,832</span>
          <span className="text-sm text-emerald-600 font-medium tabular-nums">+12.4%</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Compared to $42,561 last month</p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">Updated 3h ago</span>
        <Button variant="ghost" size="xs">View details</Button>
      </CardFooter>
    </Card>
  )
}

export function InputDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="email-demo">Email</Label>
        <Input id="email-demo" type="email" placeholder="robin@ropau.io" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="search-demo">Search</Label>
        <Input id="search-demo" type="search" placeholder="Search components..." />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="disabled-demo">Disabled</Label>
        <Input id="disabled-demo" placeholder="Cannot edit" disabled />
      </div>
    </div>
  )
}

export function TextareaDemo() {
  return (
    <div className="max-w-sm space-y-1.5">
      <Label htmlFor="bio-demo">Bio</Label>
      <Textarea id="bio-demo" placeholder="Tell us about your project..." rows={3} />
    </div>
  )
}

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="notifications-sw" defaultChecked />
        <Label htmlFor="notifications-sw">Push notifications</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="marketing-sw" />
        <Label htmlFor="marketing-sw">Marketing emails</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="disabled-sw" disabled />
        <Label htmlFor="disabled-sw" className="text-muted-foreground">Disabled</Label>
      </div>
    </div>
  )
}

export function SliderDemo() {
  const [value, setValue] = React.useState([35])
  return (
    <div className="max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <Label>Volume</Label>
        <span className="text-sm font-mono tabular-nums text-muted-foreground">{value[0]}%</span>
      </div>
      <Slider value={value} onValueChange={(v) => setValue(Array.isArray(v) ? [...v] : [v])} min={0} max={100} />
    </div>
  )
}

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      {["Design system review", "Component audit", "Documentation update"].map(
        (task, i) => (
          <div key={task} className="flex items-center gap-2.5">
            <Checkbox id={`task-${i}`} defaultChecked={i === 0} />
            <Label htmlFor={`task-${i}`} className={i === 0 ? "line-through text-muted-foreground" : ""}>
              {task}
            </Label>
          </div>
        )
      )}
    </div>
  )
}

export function ProgressDemo() {
  return (
    <div className="max-w-sm space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Upload progress</span>
          <span className="tabular-nums text-muted-foreground">68%</span>
        </div>
        <Progress value={68} />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Storage used</span>
          <span className="tabular-nums text-muted-foreground">23%</span>
        </div>
        <Progress value={23} />
      </div>
    </div>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card className="mt-3">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">Project health is excellent. 47 components shipped this quarter with 99.2% build pass rate.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card className="mt-3">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">2,847 weekly active users across 14 product teams. Adoption up 31% since launch.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card className="mt-3">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">3 audits pending review. Last accessibility scan passed on March 28th.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">RM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-accent/10 text-accent font-semibold">PD</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">JL</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">+4</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function TooltipDemo() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon"><Star /></Button>} />
        <TooltipContent>Add to favorites</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon"><Bell /></Button>} />
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon"><Search /></Button>} />
        <TooltipContent>Search (Cmd+K)</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function SeparatorDemo() {
  return (
    <div className="max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Ropau Design System</h4>
        <p className="text-sm text-muted-foreground">A premium component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Blocks</span>
        <Separator orientation="vertical" />
        <span>Themes</span>
      </div>
    </div>
  )
}

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  )
}

export function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="max-w-sm space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
        3 pinned repositories
        <ChevronRight className={`size-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-1.5 pl-1">
          {["ropau-ds", "orchestria-claude", "mashi-app"].map((repo) => (
            <div key={repo} className="rounded-md border border-border px-3 py-2 text-sm font-mono">
              {repo}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function KbdDemo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Kbd>Cmd</Kbd> + <Kbd>K</Kbd>
        <span className="ml-2">Search</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Kbd>Cmd</Kbd> + <Kbd>B</Kbd>
        <span className="ml-2">Sidebar</span>
      </div>
    </div>
  )
}

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
    </div>
  )
}

const uiDemoMap: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  badge: BadgeDemo,
  card: CardDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  checkbox: CheckboxDemo,
  progress: ProgressDemo,
  tabs: TabsDemo,
  avatar: AvatarDemo,
  tooltip: TooltipDemo,
  separator: SeparatorDemo,
  skeleton: SkeletonDemo,
  collapsible: CollapsibleDemo,
  kbd: KbdDemo,
  spinner: SpinnerDemo,
}

export function getUiDemo(slug: string): React.ComponentType | null {
  return uiDemoMap[slug] ?? null
}
