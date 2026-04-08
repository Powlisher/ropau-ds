const logos = [
  { name: "Vercel", width: "w-24" },
  { name: "Stripe", width: "w-20" },
  { name: "Linear", width: "w-20" },
  { name: "Notion", width: "w-22" },
  { name: "Figma", width: "w-18" },
  { name: "Resend", width: "w-22" },
]

export function LogoCloud() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by forward-thinking teams
      </p>
      <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="mx-auto flex h-9 items-center justify-center"
          >
            <div
              className={`${logo.width} h-6 rounded bg-muted-foreground/10`}
              aria-label={logo.name}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
