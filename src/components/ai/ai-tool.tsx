"use client"

import * as React from "react"
import { Wrench, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { AILoader } from "@/components/ai/ai-loader"
import { cn } from "@/lib/utils"

const statusConfig = {
  running: { variant: "default" as const, label: "Running" },
  completed: { variant: "secondary" as const, label: "Completed" },
  error: { variant: "destructive" as const, label: "Error" },
}

function AITool({
  name,
  status,
  input,
  output,
  className,
}: {
  name: string
  status: "running" | "completed" | "error"
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const config = statusConfig[status]

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={className}>
      <div
        data-slot="ai-tool"
        className="rounded-lg ring-1 ring-foreground/10 bg-card"
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-sm",
            "cursor-pointer select-none transition-colors hover:bg-muted/50"
          )}
        >
          {status === "running" ? (
            <AILoader size="sm" className="text-muted-foreground" />
          ) : (
            <Wrench className="size-3.5 text-muted-foreground" />
          )}
          <span className="font-medium font-mono text-xs">{name}</span>
          <Badge variant={config.variant} className="ml-auto text-[10px]">
            {config.label}
          </Badge>
          <ChevronRight
            className={cn(
              "size-3 text-muted-foreground transition-transform duration-200",
              open && "rotate-90"
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-foreground/5 px-3 py-2 space-y-2">
            {input && (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  Input
                </div>
                <pre className="overflow-x-auto rounded-md bg-muted px-2.5 py-2 text-xs font-mono text-muted-foreground">
                  <code>{JSON.stringify(input, null, 2)}</code>
                </pre>
              </div>
            )}
            {output && (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  Output
                </div>
                <pre className="overflow-x-auto rounded-md bg-muted px-2.5 py-2 text-xs font-mono text-muted-foreground">
                  <code>{JSON.stringify(output, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export { AITool }
