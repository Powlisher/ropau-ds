"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function AICodeBlock({
  code,
  language,
  className,
}: {
  code: string
  language?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  return (
    <div
      data-slot="ai-code-block"
      className={cn("overflow-hidden rounded-lg", className)}
    >
      <div className="flex items-center justify-between bg-zinc-800 px-3 py-1.5">
        {language ? (
          <span className="text-xs text-zinc-400 font-mono">{language}</span>
        ) : (
          <span />
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </Button>
      </div>
      <div className="overflow-x-auto bg-zinc-900 p-4">
        <pre className="text-sm font-mono leading-relaxed text-zinc-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export { AICodeBlock }
