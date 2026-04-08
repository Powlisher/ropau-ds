"use client"

import * as React from "react"
import { Bot, ChevronRight } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

function AIAgent({
  name,
  model,
  instructions,
  tools,
  className,
}: {
  name: string
  model: string
  instructions?: string
  tools?: { name: string; description: string }[]
  className?: string
}) {
  return (
    <Card data-slot="ai-agent" className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-muted-foreground" />
          <CardTitle>{name}</CardTitle>
          <Badge variant="secondary" className="ml-auto font-mono text-[10px]">
            {model}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {instructions && (
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
              Instructions
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {instructions}
            </p>
          </div>
        )}

        {tools && tools.length > 0 && (
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
              Tools ({tools.length})
            </div>
            <div className="space-y-1">
              {tools.map((tool) => (
                <ToolItem key={tool.name} {...tool} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ToolItem({ name, description }: { name: string; description: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs",
          "cursor-pointer select-none transition-colors hover:bg-muted"
        )}
      >
        <ChevronRight
          className={cn(
            "size-3 text-muted-foreground transition-transform duration-200",
            open && "rotate-90"
          )}
        />
        <span className="font-mono font-medium">{name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="px-2 pb-1.5 pl-7 text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { AIAgent }
