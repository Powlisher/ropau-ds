"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GitBranchIcon, ArrowRightIcon } from "lucide-react"

type BranchKey = "individual" | "team"

const branches: Record<BranchKey, { title: string; description: string }[]> = {
  individual: [
    { title: "Personal Info", description: "Name, email, and profile photo" },
    { title: "Preferences", description: "Theme, notifications, language" },
    { title: "Get Started", description: "Access your personal dashboard" },
  ],
  team: [
    { title: "Organization Info", description: "Company name, size, and domain" },
    { title: "Invite Members", description: "Add teammates by email" },
    { title: "Billing", description: "Choose a plan and payment method" },
    { title: "Launch", description: "Open your team workspace" },
  ],
}

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperBranching() {
  const [branch, setBranch] = useState<BranchKey | null>(null)
  const [step, setStep] = useState(0)

  const currentBranch = branch ? branches[branch] : null

  return (
    <div className="flex min-h-[440px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitBranchIcon className="size-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Conditional Flow</span>
          </div>
          <CardTitle className="text-lg">
            {!branch ? "How will you use Ropau?" : currentBranch![step].title}
          </CardTitle>
          <CardDescription>
            {!branch ? "This determines your setup path" : currentBranch![step].description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {!branch ? (
              <motion.div
                key="choice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-2"
              >
                {(["individual", "team"] as const).map((b) => (
                  <motion.button
                    key={b}
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={() => setBranch(b)}
                    className="flex items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {b === "individual" ? "Just me" : "My team"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {b === "individual" ? "Personal workspace, 3 steps" : "Team workspace, 4 steps"}
                      </p>
                    </div>
                    <ArrowRightIcon className="size-4 text-muted-foreground" />
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${branch}-${step}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={spring}
              >
                <div className="flex gap-1 mb-4">
                  {currentBranch!.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Step {step + 1} of {currentBranch!.length} on the{" "}
                    <span className="font-medium text-foreground">{branch}</span> path
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {branch && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (step === 0) { setBranch(null); setStep(0) }
                else setStep(step - 1)
              }}
            >
              {step === 0 ? "Change path" : "Back"}
            </Button>
            <Button onClick={() => setStep(Math.min(currentBranch!.length - 1, step + 1))}>
              {step === currentBranch!.length - 1 ? "Finish" : "Next"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
