import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
]

export default function FooterCta() {
  return (
    <footer className="w-full">
      <div
        className="border-t border-border/60"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.478 0.227 3.6 / 0.04), oklch(0.519 0.292 25.1 / 0.03))",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Ready to get started?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Join 4,700+ teams already building with Ropau. Get started free and scale as you grow.
            </p>
            <div className="flex w-full max-w-sm gap-2">
              <Input
                placeholder="Enter your work email"
                className="h-9"
              />
              <Button>Get Started</Button>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Free for up to 5 team members. No credit card required.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Separator className="opacity-0" />
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <a href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary">
                <span className="font-heading text-[10px] font-bold tracking-tight text-primary-foreground">
                  R
                </span>
              </div>
              <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
                Ropau
              </span>
            </a>

            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="text-xs text-muted-foreground/60 tabular-nums">
              &copy; 2024 Ropau Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
