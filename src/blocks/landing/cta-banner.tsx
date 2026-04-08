import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <Card
        className="bg-primary text-primary-foreground ring-0"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
        }}
      >
        <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center sm:px-16 sm:py-16">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Start building in under five minutes
          </h2>
          <p className="max-w-md text-base text-primary-foreground/80">
            No credit card required. Set up your workspace, invite your team,
            and deploy your first project today.
          </p>
          <Button variant="secondary" size="lg" className="mt-2">
            Get started for free
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
