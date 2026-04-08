import { Separator } from "@/components/ui/separator"
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react"

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Integrations", href: "#" },
]

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Status", href: "#" },
  { label: "API Docs", href: "#" },
]

export default function FooterContactInfo() {
  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-heading text-sm font-bold tracking-tight text-primary-foreground">
                  R
                </span>
              </div>
              <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
                Ropau
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enterprise-grade tools for modern teams.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Product
            </h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Support
            </h3>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Contact
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  42 rue de la Paix, 75002 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <a href="tel:+33142680912" className="text-sm tabular-nums text-muted-foreground transition-colors hover:text-foreground">
                  +33 1 42 68 09 12
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <a href="mailto:hello@ropau.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  hello@ropau.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground/70 tabular-nums">
          &copy; 2024 Ropau Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
