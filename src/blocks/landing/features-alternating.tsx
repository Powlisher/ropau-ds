const rows = [
  {
    title: "Ship features, not infrastructure",
    description:
      "Pre-built integrations with your favorite tools mean less boilerplate and more focus on what makes your product unique. Deploy in minutes, iterate in seconds.",
    link: { label: "Explore integrations", href: "#" },
  },
  {
    title: "Observe everything, miss nothing",
    description:
      "Unified logging, tracing, and alerting in a single pane. Set custom thresholds per service and get notified before your users notice degradation.",
    link: { label: "See monitoring in action", href: "#" },
  },
  {
    title: "Scale without rearchitecting",
    description:
      "From 100 to 100,000 concurrent users, the same codebase handles the load. Auto-scaling provisions resources in under 3 seconds during traffic spikes.",
    link: { label: "Read the architecture guide", href: "#" },
  },
]

export function FeaturesAlternating() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="flex flex-col gap-20 lg:gap-28">
        {rows.map((row, i) => {
          const reversed = i % 2 !== 0
          return (
            <div
              key={row.title}
              className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${reversed ? "lg:flex-row-reverse" : ""}`}
            >
              <div
                className="aspect-[4/3] w-full shrink-0 rounded-xl bg-muted lg:w-1/2"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              />

              <div className="w-full lg:w-1/2">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {row.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {row.description}
                </p>
                <a
                  href={row.link.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {row.link.label}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
