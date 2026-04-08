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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BuildingIcon, ShieldCheckIcon, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Enterprise SLA",
    description: "99.99% uptime guarantee with dedicated support",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated CSM",
    description: "Personal customer success manager assigned",
  },
  {
    icon: BuildingIcon,
    title: "Custom deployment",
    description: "On-premise or private cloud options available",
  },
]

export default function ContactEnterprise() {
  return (
    <div className="bg-slate-50/80 px-4 py-16">
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              Enterprise
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Built for scale
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Talk to our enterprise team about custom pricing, dedicated
              infrastructure, and advanced compliance needs.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 ring-1 ring-primary/10">
                  <feature.icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 rounded-lg bg-slate-100/80 p-4 ring-1 ring-slate-200/60">
            <div>
              <p className="text-xl font-bold tabular-nums tracking-tight text-foreground">
                2,300+
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Enterprise clients
              </p>
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums tracking-tight text-foreground">
                99.99%
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Uptime
              </p>
            </div>
          </div>
        </div>

        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Contact sales
            </CardTitle>
            <CardDescription>
              We&apos;ll get back to you within one business day
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ce-first">First name</Label>
                <Input id="ce-first" placeholder="Nikolaj" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ce-last">Last name</Label>
                <Input id="ce-last" placeholder="Lindgren" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ce-email">Work email</Label>
              <Input
                id="ce-email"
                type="email"
                placeholder="nikolaj@helioscorp.dk"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ce-company">Company name</Label>
              <Input id="ce-company" placeholder="Helios Corporation" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Company size</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-200">50-200</SelectItem>
                    <SelectItem value="200-1000">200-1,000</SelectItem>
                    <SelectItem value="1000-5000">1,000-5,000</SelectItem>
                    <SelectItem value="5000+">5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Annual budget</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25-50k">$25k - $50k</SelectItem>
                    <SelectItem value="50-100k">$50k - $100k</SelectItem>
                    <SelectItem value="100-250k">$100k - $250k</SelectItem>
                    <SelectItem value="250k+">$250k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ce-needs">What are you looking for?</Label>
              <Textarea
                id="ce-needs"
                placeholder="Describe your requirements, timeline, and any compliance needs..."
                className="min-h-28"
              />
            </div>

            <Button className="w-full">Request demo</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
