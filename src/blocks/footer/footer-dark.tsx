import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press Kit", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Licenses", href: "#" },
    ],
  },
]

export default function FooterDark() {
  return (
    <footer
      className="w-full"
      style={{ backgroundColor: "oklch(0.17 0.01 285)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.65 0 0)" }}
              >
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.7 0 0)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 border-t pt-8"
          style={{ borderColor: "oklch(0.28 0.01 285)" }}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(0.85 0 0)" }}
              >
                Stay up to date
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Get the latest product updates and announcements.
              </p>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Input
                placeholder="you@company.com"
                className="h-8 w-full sm:w-56"
                style={{
                  backgroundColor: "oklch(0.22 0.008 285)",
                  borderColor: "oklch(0.3 0.01 285)",
                  color: "oklch(0.9 0 0)",
                }}
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <div
          className="mt-8 border-t pt-6"
          style={{ borderColor: "oklch(0.25 0.01 285)" }}
        >
          <p
            className="text-center text-xs tabular-nums"
            style={{ color: "oklch(0.45 0 0)" }}
          >
            &copy; 2024 Ropau Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
