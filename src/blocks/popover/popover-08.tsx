"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HelpCircleIcon, BookOpenIcon, ExternalLinkIcon } from "lucide-react"

export default function Popover08() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full"
            />
          }
        >
          <HelpCircleIcon />
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <PopoverHeader>
            <PopoverTitle>API Rate Limits</PopoverTitle>
            <PopoverDescription>
              Rate limits control how many requests your application can make
              within a given time window.
            </PopoverDescription>
          </PopoverHeader>

          <div
            className="rounded-lg border bg-muted/30 p-3"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Free</span>
                <span className="text-xs font-mono tabular-nums font-medium">
                  1,000 req/min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Pro</span>
                <span className="text-xs font-mono tabular-nums font-medium">
                  12,000 req/min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Enterprise
                </span>
                <span className="text-xs font-mono tabular-nums font-medium">
                  Custom
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            When a limit is exceeded, the API returns{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px] font-mono">
              429 Too Many Requests
            </code>{" "}
            with a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px] font-mono">
              Retry-After
            </code>{" "}
            header indicating when to retry.
          </p>

          <Separator />

          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted">
              <BookOpenIcon className="size-3.5 text-muted-foreground" />
              <span className="flex-1 text-left">Read documentation</span>
              <ExternalLinkIcon className="size-3 text-muted-foreground" />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
