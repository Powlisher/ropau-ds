import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const features = [
  {
    title: "Real-time Collaboration",
    description:
      "Edit documents simultaneously with your team. Changes sync instantly across all connected devices without conflicts.",
  },
  {
    title: "Advanced Analytics",
    description:
      "Track engagement metrics, conversion funnels, and user retention with granular filtering by cohort and time range.",
  },
  {
    title: "Workflow Automation",
    description:
      "Build custom triggers that chain actions across integrations. Reduce manual tasks by an average of 14 hours per week.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built for teams that ship
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Everything you need to move from idea to production, without the
          overhead.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <div className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <div className="size-4 rounded-sm bg-primary/60" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
