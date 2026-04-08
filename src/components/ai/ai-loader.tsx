"use client"

import { cn } from "@/lib/utils"

const sizeMap = { sm: 16, md: 24, lg: 32 } as const

function AILoader({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const px = sizeMap[size]
  const opacities = [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125]
  const center = px / 2
  const spokeLength = px * 0.22
  const spokeStart = px * 0.16
  const spokeWidth = Math.max(1.5, px * 0.08)

  return (
    <svg
      data-slot="ai-loader"
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      className={cn("ai-loader-spin", className)}
      role="status"
      aria-label="Loading"
    >
      {opacities.map((opacity, i) => {
        const angle = i * 45
        const rad = (angle * Math.PI) / 180
        const x1 = center + Math.sin(rad) * spokeStart
        const y1 = center - Math.cos(rad) * spokeStart
        const x2 = center + Math.sin(rad) * (spokeStart + spokeLength)
        const y2 = center - Math.cos(rad) * (spokeStart + spokeLength)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={spokeWidth}
            strokeLinecap="round"
            opacity={opacity}
          />
        )
      })}
      <style>{`
        .ai-loader-spin {
          animation: ai-loader-rotate 0.8s steps(8) infinite;
        }
        @keyframes ai-loader-rotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  )
}

export { AILoader }
