"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Deploy in one command",
    description:
      "Push your code and the platform handles the rest. Atomic deployments, preview URLs, and instant rollbacks are automatic.",
    code: `$ acme deploy --branch main

Detected: Next.js 15 (App Router)
Building... done in 12.4s
Deploying to 312 edge nodes...

Preview:  https://main-a7f3.acme.app
Production: https://app.acme.com

Deploy complete. 0 errors, 0 warnings.`,
  },
  {
    title: "Query your traces programmatically",
    description:
      "Every trace is queryable via API. Filter by service, status, latency percentile, or any custom attribute.",
    code: `import { traces } from "@acme/sdk"

const slow = await traces.query({
  service: "api-gateway",
  duration: { gt: "500ms" },
  status: "error",
  timeRange: "24h",
  limit: 50,
})

// Returns typed trace objects with
// full span tree and metadata
console.log(slow[0].rootSpan.duration)
// => "823ms"`,
  },
  {
    title: "Define access policies as code",
    description:
      "RBAC policies live in your repo, versioned alongside your application code. Changes go through the same review process.",
    code: `# acme.rbac.yaml
roles:
  deployer:
    permissions:
      - deploy:staging
      - deploy:preview
      - logs:read
    conditions:
      - team: engineering

  release-manager:
    extends: deployer
    permissions:
      - deploy:production
      - rollback:*
    requires:
      - approval_from: lead`,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function FeaturesCodeExamples() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built for developers
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          APIs, CLIs, and config files designed by engineers who use them daily.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            variants={itemVariants}
            className={`grid items-start gap-8 lg:grid-cols-2 ${
              idx % 2 === 1 ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""
            }`}
          >
            <div className="flex flex-col justify-center">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
            <div
              className="overflow-hidden rounded-xl bg-[#0f0f10] p-5 ring-1 ring-[#1f1f22]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <pre className="overflow-x-auto font-mono text-[0.78rem] leading-relaxed text-[#e4e4e2]">
                <code>{f.code}</code>
              </pre>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
