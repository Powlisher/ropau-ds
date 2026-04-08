"use client"

import { Circle, CheckCircle2, XCircle } from "lucide-react"
import { AILoader } from "@/components/ai/ai-loader"
import { cn } from "@/lib/utils"

function AITask({
  tasks,
  className,
}: {
  tasks: {
    label: string
    status: "pending" | "running" | "completed" | "error"
    file?: string
  }[]
  className?: string
}) {
  if (tasks.length === 0) return null

  return (
    <div data-slot="ai-task" className={cn("space-y-1", className)}>
      {tasks.map((task, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
            task.status === "error" && "text-destructive"
          )}
        >
          <TaskStatusIcon status={task.status} />
          <span
            className={cn(
              "flex-1",
              task.status === "completed" && "text-muted-foreground",
              task.status === "pending" && "text-muted-foreground"
            )}
          >
            {task.label}
          </span>
          {task.file && (
            <span className="text-xs font-mono text-muted-foreground truncate max-w-48">
              {task.file}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function TaskStatusIcon({
  status,
}: {
  status: "pending" | "running" | "completed" | "error"
}) {
  switch (status) {
    case "pending":
      return <Circle className="size-4 text-muted-foreground/50" />
    case "running":
      return <AILoader size="sm" className="text-primary" />
    case "completed":
      return <CheckCircle2 className="size-4 text-emerald-500" />
    case "error":
      return <XCircle className="size-4 text-destructive" />
  }
}

export { AITask }
