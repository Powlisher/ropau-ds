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
import { MapPinIcon } from "lucide-react"

export default function ContactMap() {
  return (
    <div className="bg-slate-50/80 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Contact us
            </CardTitle>
            <CardDescription>
              Send us a message and we&apos;ll respond within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cm-name">Name</Label>
                <Input id="cm-name" placeholder="Lucia Marinescu" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cm-email">Email</Label>
                <Input
                  id="cm-email"
                  type="email"
                  placeholder="lucia@orbitalux.ro"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cm-message">Message</Label>
              <Textarea
                id="cm-message"
                placeholder="How can we help?"
                className="min-h-28"
              />
            </div>
            <Button className="w-full sm:w-auto sm:self-end">
              Send message
            </Button>
          </CardContent>
        </Card>

        <div
          className="relative overflow-hidden rounded-xl ring-1 ring-slate-200/60"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
          }}
        >
          <div className="relative aspect-video bg-slate-100">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(210 20% 94%) 0%, hsl(210 15% 90%) 50%, hsl(210 20% 86%) 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                <MapPinIcon className="size-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">
                  Bucharest, Romania
                </p>
                <p className="text-xs text-muted-foreground">
                  Str. Victoriei 128, Sector 1
                </p>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
