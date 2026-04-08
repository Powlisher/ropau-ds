import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MessageCircleIcon, MailIcon } from "lucide-react"

export default function ContactLiveChat() {
  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-md"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            Need help?
          </CardTitle>
          <CardDescription>
            Choose how you&apos;d like to reach us
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <button className="group flex items-center gap-4 rounded-xl bg-emerald-50/80 p-4 ring-1 ring-emerald-200/60 transition-all hover:ring-emerald-300/80">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100">
              <MessageCircleIcon className="size-5 text-emerald-700" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-emerald-900">
                  Live chat
                </p>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
              </div>
              <p className="text-xs text-emerald-700/70">
                Typically replies in under 3 minutes
              </p>
            </div>
            <svg
              className="size-4 text-emerald-400 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
              or email us
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200/60">
            <MailIcon className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-foreground">
                Email support
              </p>
              <p className="text-xs text-muted-foreground">
                Responses within 12 hours on business days
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clc-email">Your email</Label>
            <Input
              id="clc-email"
              type="email"
              placeholder="ayanna.webb@coastline.co"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clc-message">Message</Label>
            <Textarea
              id="clc-message"
              placeholder="Describe your issue..."
              className="min-h-24"
            />
          </div>
          <Button variant="outline" className="w-full">
            Send email
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
