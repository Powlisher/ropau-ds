"use client"

import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ShareIcon,
  LinkIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react"

const socialLinks = [
  { name: "X / Twitter", prefix: "x.com" },
  { name: "LinkedIn", prefix: "linkedin.com" },
  { name: "Bluesky", prefix: "bsky.app" },
]

export default function Popover05() {
  const [copied, setCopied] = useState(false)
  const shareUrl = "meridian.studio/p/q4-brand-refresh"

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <ShareIcon data-icon="inline-start" />
          Share
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <PopoverHeader>
            <PopoverTitle>Share project</PopoverTitle>
            <PopoverDescription>
              Share &ldquo;Q4 Brand Refresh&rdquo; with others.
            </PopoverDescription>
          </PopoverHeader>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                readOnly
                value={shareUrl}
                className="pl-7 text-xs font-mono"
              />
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckIcon className="text-emerald-600" />
              ) : (
                <CopyIcon />
              )}
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-0.5">
            {socialLinks.map((link) => (
              <button
                key={link.name}
                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                <span className="flex size-6 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">
                  {link.name.charAt(0)}
                </span>
                {link.name}
              </button>
            ))}
            <button className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted">
              <span className="flex size-6 items-center justify-center rounded bg-muted">
                <MailIcon className="size-3.5 text-muted-foreground" />
              </span>
              Send via email
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
