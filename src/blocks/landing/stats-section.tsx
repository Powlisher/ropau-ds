import { Separator } from "@/components/ui/separator"

const stats = [
  { value: "12,847", label: "Active teams" },
  { value: "99.97%", label: "Uptime (12 months)" },
  { value: "2.4s", label: "Avg. deploy time" },
  { value: "186", label: "Integrations" },
]

export function StatsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <span className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <Separator
                orientation="vertical"
                className="hidden h-12 sm:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
