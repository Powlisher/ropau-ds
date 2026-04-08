"use client"

import * as React from "react"
import { File, Code2, Image, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const typeIcons = {
  code: Code2,
  document: File,
  image: Image,
} as const

function AIArtifact({
  title,
  type,
  children,
  className,
}: {
  title: string
  type: "code" | "document" | "image"
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(true)
  const Icon = typeIcons[type]

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card
        data-slot="ai-artifact"
        className={cn("rounded-xl", className)}
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
        }}
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-2 px-4 py-2.5 text-sm",
            "cursor-pointer select-none transition-colors hover:bg-muted/50"
          )}
        >
          <Icon className="size-3.5 text-muted-foreground" />
          <span className="font-medium">{title}</span>
          <ChevronRight
            className={cn(
              "ml-auto size-3 text-muted-foreground transition-transform duration-200",
              open && "rotate-90"
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="border-t border-foreground/5 pt-3">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export { AIArtifact }
