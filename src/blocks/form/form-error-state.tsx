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
import { AlertCircleIcon } from "lucide-react"

export default function FormErrorState() {
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
            Submit a request
          </CardTitle>
          <CardDescription>
            Fill in the details below and we&apos;ll get back to you
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div
            className="flex items-center gap-2 rounded-lg bg-destructive/5 px-3 py-2.5 ring-1 ring-destructive/20"
          >
            <AlertCircleIcon className="size-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">
              Please fix 3 errors below to continue
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fes-name">Full name</Label>
            <Input
              id="fes-name"
              aria-invalid="true"
              placeholder="Your name"
            />
            <p className="text-xs text-destructive">
              Name is required
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fes-email">Email</Label>
            <Input
              id="fes-email"
              type="email"
              defaultValue="naomi.chen@"
              aria-invalid="true"
            />
            <p className="text-xs text-destructive">
              Please enter a valid email address
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fes-phone">Phone (optional)</Label>
            <Input
              id="fes-phone"
              type="tel"
              defaultValue="+1 415 555 0132"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fes-message">Message</Label>
            <Textarea
              id="fes-message"
              aria-invalid="true"
              placeholder="Describe your request..."
              className="min-h-24"
            />
            <p className="text-xs text-destructive">
              Message must be at least 20 characters
            </p>
          </div>

          <div className="flex justify-end">
            <Button>Submit request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
