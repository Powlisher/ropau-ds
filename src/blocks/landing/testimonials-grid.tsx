import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "We cut our deployment pipeline from 45 minutes down to under 8. The team reclaimed almost a full day per sprint just on CI alone.",
    name: "Camille Bernstein",
    role: "Staff Engineer, Tidepool",
    initials: "CB",
  },
  {
    quote:
      "The analytics dashboard finally gives product and engineering a shared language. We stopped arguing about what 'active user' means.",
    name: "Mateo Alvarez",
    role: "Head of Product, Canopy Health",
    initials: "MA",
  },
  {
    quote:
      "I was skeptical about switching mid-project, but the migration tool handled our 230+ API routes without a single breaking change.",
    name: "Priya Khatri",
    role: "CTO, Luminary Finance",
    initials: "PK",
  },
]

export function TestimonialsGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Trusted by teams that care about craft
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card
            key={t.name}
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="pt-1">
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </CardContent>
            <CardFooter className="flex-col items-start gap-3">
              <Separator className="-mx-4 w-[calc(100%+2rem)]" />
              <div className="flex items-center gap-3 pt-1">
                <Avatar size="default">
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
