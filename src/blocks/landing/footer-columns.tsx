import { Separator } from "@/components/ui/separator"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
]

export function FooterColumns() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pt-16 pb-10 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary" />
            <span className="font-heading text-base font-semibold tracking-tight text-foreground">
              Acme
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Developer tools for teams that care about velocity and reliability.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {col.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
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

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs tabular-nums text-muted-foreground">
          2024 Acme, Inc. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
