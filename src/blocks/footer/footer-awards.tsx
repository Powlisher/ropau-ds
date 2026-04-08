import { Separator } from "@/components/ui/separator"

const awards = [
  { label: "SOC 2 Certified", year: "2024" },
  { label: "G2 Leader", year: "Spring 2024" },
  { label: "ISO 27001", year: "2023" },
  { label: "GDPR Compliant", year: "2024" },
]

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
]

export default function FooterAwards() {
  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border/40 bg-muted/30 px-6 py-5">
          {awards.map((award) => (
            <div key={award.label} className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {award.label}
                </p>
                <p className="text-[11px] tabular-nums text-muted-foreground">
                  {award.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
              Trusted by 12,000+ companies worldwide.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground/70 tabular-nums">
          &copy; 2024 Ropau Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
