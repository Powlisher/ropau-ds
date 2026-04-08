import { Separator } from "@/components/ui/separator"

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Integrations", href: "#integrations" },
  { label: "Changelog", href: "#changelog" },
]

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Press", href: "#press" },
]

export default function FooterAppDownload() {
  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
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
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ship faster with beautifully crafted components that work out of the box.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Product
            </h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
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

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
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

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Get the App
            </h3>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href="#app-store"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="#play-store"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 1.83c-.36.39-.56.93-.56 1.58v17.18c0 .65.2 1.19.56 1.58l.08.08L14.26 12l-.01-.01L3.26 1.75l-.08.08zM18.6 16.35L5.06 23.87l-.01-.01c.49-.27.86-.72.86-1.27V1.41c0-.55-.37-1-.86-1.27l.01-.01 13.54 7.52zM18.6 16.35L14.26 12l4.34-4.35 4.91 2.73c1.4.78 1.4 2.06 0 2.84l-4.91 2.73v.4z" />
                </svg>
                Google Play
              </a>
            </div>
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
