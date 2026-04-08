import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from "lucide-react"

const contactInfo = [
  {
    icon: MapPinIcon,
    label: "Office",
    value: "2401 Burnside St, Portland, OR 97210",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+1 (503) 847-2913",
  },
  {
    icon: MailIcon,
    label: "Email",
    value: "hello@canopyanalytics.com",
  },
  {
    icon: ClockIcon,
    label: "Hours",
    value: "Mon-Fri, 8:00 AM - 6:00 PM PST",
  },
]

export default function ContactSplit() {
  return (
    <div className="bg-slate-50/80 px-4 py-16">
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Get in touch
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Have a question or want to work together? Drop us a line and
              we&apos;ll get back within one business day.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 ring-1 ring-primary/10">
                  <item.icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardContent className="flex flex-col gap-5 pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cs-name">Name</Label>
                <Input id="cs-name" placeholder="Rohan Desai" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cs-email">Email</Label>
                <Input
                  id="cs-email"
                  type="email"
                  placeholder="rohan@canopyanalytics.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cs-subject">Subject</Label>
              <Input
                id="cs-subject"
                placeholder="Partnership opportunity"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cs-message">Message</Label>
              <Textarea
                id="cs-message"
                placeholder="Tell us about your project..."
                className="min-h-28"
              />
            </div>
            <Button className="w-full sm:w-auto sm:self-end">
              Send message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
