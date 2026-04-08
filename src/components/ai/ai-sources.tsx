"use client"

import * as React from "react"
import { BookOpen, ExternalLink, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

function AISources({
  sources,
  className,
}: {
  sources: { title: string; url: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  if (sources.length === 0) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={className}>
      <CollapsibleTrigger
        data-slot="ai-sources"
        className={cn(
          "flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground",
          "cursor-pointer select-none transition-colors hover:bg-muted hover:text-foreground"
        )}
      >
        <BookOpen className="size-3.5" />
        <span className="font-medium">
          Used {sources.length} source{sources.length !== 1 && "s"}
        </span>
        <ChevronRight
          className={cn(
            "size-3 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <ul className="mt-1 space-y-0.5 rounded-lg bg-muted/50 px-3 py-2">
          {sources.map((source, i) => (
            <li key={i}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                  "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                <ExternalLink className="size-3 shrink-0" />
                <span className="truncate">{source.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { AISources }
