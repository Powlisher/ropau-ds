import { Separator } from "@/components/ui/separator"

const recentPosts = [
  {
    title: "Designing for clarity: lessons from our rebrand",
    date: "Mar 28, 2024",
    href: "#post-1",
  },
  {
    title: "How we reduced bundle size by 43%",
    date: "Mar 14, 2024",
    href: "#post-2",
  },
  {
    title: "Component architecture at scale",
    date: "Feb 29, 2024",
    href: "#post-3",
  },
]

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
]

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
]

export default function FooterBlog() {
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
              Building tools that developers love to use.
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
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
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
              Recent Posts
            </h3>
            <ul className="mt-3 space-y-3">
              {recentPosts.map((post) => (
                <li key={post.title}>
                  <a href={post.href} className="group block">
                    <p className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
                      {post.date}
                    </p>
                  </a>
                </li>
              ))}
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
