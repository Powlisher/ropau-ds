import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, XIcon } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For side projects and early exploration.",
    highlighted: false,
    cta: "Get started free",
    features: [
      { text: "Up to 3 team members", included: true },
      { text: "5 GB storage", included: true },
      { text: "Community support", included: true },
      { text: "Basic analytics", included: true },
      { text: "Custom domains", included: false },
      { text: "SSO / SAML", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/seat/month",
    description: "For growing teams shipping daily.",
    highlighted: true,
    cta: "Start 14-day trial",
    features: [
      { text: "Unlimited team members", included: true },
      { text: "100 GB storage", included: true },
      { text: "Priority support (4h SLA)", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom domains", included: true },
      { text: "SSO / SAML", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with compliance needs.",
    highlighted: false,
    cta: "Contact sales",
    features: [
      { text: "Unlimited team members", included: true },
      { text: "Unlimited storage", included: true },
      { text: "Dedicated support engineer", included: true },
      { text: "Advanced analytics + audit log", included: true },
      { text: "Custom domains", included: true },
      { text: "SSO / SAML", included: true },
    ],
  },
]

export function PricingThreeTier() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
          No hidden fees. Upgrade, downgrade, or cancel at any time.
        </p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={
              tier.highlighted
                ? "ring-2 ring-primary"
                : ""
            }
            style={{
              boxShadow: tier.highlighted
                ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"
                : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{tier.name}</CardTitle>
                {tier.highlighted && <Badge>Popular</Badge>}
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="ml-1 text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-2.5">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    ) : (
                      <XIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-sm text-foreground"
                          : "text-sm text-muted-foreground/60"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={tier.highlighted ? "default" : "outline"}
                className="w-full"
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
