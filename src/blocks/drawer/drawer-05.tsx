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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  InboxIcon,
  CheckCircle2Icon,
  ClockIcon,
  LayoutListIcon,
} from "lucide-react"

const tasks = {
  active: [
    {
      title: "Update brand color tokens",
      assignee: "Camille R.",
      due: "Mar 14",
      priority: "High",
    },
    {
      title: "Audit accessibility on checkout flow",
      assignee: "Theo V.",
      due: "Mar 18",
      priority: "Medium",
    },
    {
      title: "Implement dark mode for dashboard",
      assignee: "Anika P.",
      due: "Mar 21",
      priority: "High",
    },
  ],
  completed: [
    {
      title: "Migrate to Tailwind v4",
      assignee: "Jonas E.",
      completed: "Mar 9",
    },
    {
      title: "Fix responsive layout on settings page",
      assignee: "Camille R.",
      completed: "Mar 7",
    },
  ],
  pending: [
    {
      title: "Design system documentation",
      assignee: "Unassigned",
      created: "Mar 5",
    },
    {
      title: "Performance audit Q1 report",
      assignee: "Unassigned",
      created: "Feb 28",
    },
  ],
}

export default function Drawer05() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <LayoutListIcon data-icon="inline-start" />
            Tasks
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle>Project tasks</DrawerTitle>
            <DrawerDescription>
              Q4 Brand Refresh &mdash; 8 tasks total
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col overflow-hidden px-4 py-3">
            <Tabs defaultValue="active" className="flex flex-1 flex-col overflow-hidden">
              <TabsList>
                <TabsTrigger value="active">
                  <InboxIcon data-icon="inline-start" />
                  Active
                </TabsTrigger>
                <TabsTrigger value="completed">
                  <CheckCircle2Icon data-icon="inline-start" />
                  Done
                </TabsTrigger>
                <TabsTrigger value="pending">
                  <ClockIcon data-icon="inline-start" />
                  Pending
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-3 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {tasks.active.map((task) => (
                    <div
                      key={task.title}
                      className="rounded-lg border p-3"
                      style={{
                        boxShadow:
                          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                      }}
                    >
                      <p className="text-sm font-medium">{task.title}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {task.assignee}
                        </span>
                        <span className="text-xs text-muted-foreground/40">
                          /
                        </span>
                        <span className="text-xs font-mono tabular-nums text-muted-foreground">
                          Due {task.due}
                        </span>
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                          className="ml-auto"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-3 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {tasks.completed.map((task) => (
                    <div
                      key={task.title}
                      className="rounded-lg border p-3 opacity-70"
                    >
                      <p className="text-sm font-medium line-through decoration-muted-foreground/40">
                        {task.title}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {task.assignee}
                        </span>
                        <span className="text-xs text-muted-foreground/40">
                          /
                        </span>
                        <span className="text-xs font-mono tabular-nums text-muted-foreground">
                          Completed {task.completed}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-3 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {tasks.pending.map((task) => (
                    <div key={task.title} className="rounded-lg border border-dashed p-3">
                      <p className="text-sm font-medium">{task.title}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground italic">
                          {task.assignee}
                        </span>
                        <span className="text-xs text-muted-foreground/40">
                          /
                        </span>
                        <span className="text-xs font-mono tabular-nums text-muted-foreground">
                          Created {task.created}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <Separator />
          <div className="flex justify-end p-3">
            <DrawerClose asChild>
              <Button variant="outline" size="sm">
                Close
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
