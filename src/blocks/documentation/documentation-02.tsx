"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"

const languages = [
  {
    label: "TypeScript",
    code: `import { createClient } from "@ropau/sdk"

const client = createClient({
  apiKey: process.env.ROPAU_API_KEY!,
  project: "prj_8kv2nX4mLq",
})

const analytics = await client.analytics.query({
  from: "2026-03-01",
  to: "2026-03-31",
  granularity: "day",
})

console.log(analytics.total_views)  // 48293
console.log(analytics.bounce_rate)  // 0.34`,
  },
  {
    label: "Python",
    code: `from ropau import Client

client = Client(
    api_key=os.environ["ROPAU_API_KEY"],
    project="prj_8kv2nX4mLq",
)

analytics = client.analytics.query(
    from_date="2026-03-01",
    to_date="2026-03-31",
    granularity="day",
)

print(analytics.total_views)   # 48293
print(analytics.bounce_rate)   # 0.34`,
  },
  {
    label: "cURL",
    code: `curl -X GET \\
  "https://api.ropau.dev/v2/projects/prj_8kv2nX4mLq/analytics?from=2026-03-01&to=2026-03-31&granularity=day" \\
  -H "Authorization: Bearer $ROPAU_API_KEY" \\
  -H "Content-Type: application/json"`,
  },
]

export default function Documentation02() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(languages[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="w-full max-w-2xl"
    >
      <div
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center justify-between border-b bg-slate-950 px-1 py-1">
          <div className="flex">
            {languages.map((lang, i) => (
              <button
                key={lang.label}
                onClick={() => setActiveTab(i)}
                className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === i
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="doc02-tab"
                    className="absolute inset-0 rounded-md bg-slate-800"
                    transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{lang.label}</span>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mr-1 h-7 gap-1.5 text-[11px] text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="bg-slate-950 p-5">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-300"
          >
            {languages[activeTab].code}
          </motion.pre>
        </div>
      </div>
    </motion.div>
  )
}
