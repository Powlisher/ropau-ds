"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { CheckIcon, RocketIcon } from "lucide-react"

const steps = [
  { label: "Basics", description: "Name and type" },
  { label: "Configuration", description: "Region and plan" },
  { label: "Review", description: "Confirm details" },
]

export default function Modal06() {
  const [step, setStep] = useState(0)

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog
        onOpenChange={(open) => {
          if (!open) setStep(0)
        }}
      >
        <DialogTrigger render={<Button />}>
          <RocketIcon data-icon="inline-start" />
          Deploy service
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deploy new service</DialogTitle>
            <DialogDescription>
              Step {step + 1} of {steps.length} &mdash; {steps[step].label}
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 pb-1">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 flex-col gap-1.5">
                <div
                  className={`h-1 rounded-full transition-colors ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
                <span
                  className={`text-xs transition-colors ${
                    i <= step
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="svc-name">Service name</Label>
                <Input
                  id="svc-name"
                  placeholder="e.g. api-gateway-prod"
                  defaultValue="meridian-api"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Runtime</Label>
                <Select defaultValue="node20">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select runtime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="node20">Node.js 20</SelectItem>
                    <SelectItem value="node18">Node.js 18</SelectItem>
                    <SelectItem value="python312">Python 3.12</SelectItem>
                    <SelectItem value="go122">Go 1.22</SelectItem>
                    <SelectItem value="rust">Rust (nightly)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Region</Label>
                <Select defaultValue="eu-west-1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">
                      US East (Virginia)
                    </SelectItem>
                    <SelectItem value="eu-west-1">
                      EU West (Ireland)
                    </SelectItem>
                    <SelectItem value="ap-southeast-1">
                      Asia Pacific (Singapore)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Instance size</Label>
                <Select defaultValue="standard">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="micro">
                      Micro &mdash; 256 MB / 0.25 vCPU
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard &mdash; 1 GB / 1 vCPU
                    </SelectItem>
                    <SelectItem value="performance">
                      Performance &mdash; 4 GB / 2 vCPU
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex flex-col gap-3">
                {[
                  { label: "Service", value: "meridian-api" },
                  { label: "Runtime", value: "Node.js 20" },
                  { label: "Region", value: "EU West (Ireland)" },
                  { label: "Instance", value: "Standard - 1 GB / 1 vCPU" },
                  { label: "Est. cost", value: "$23.40/mo" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            ) : (
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
            )}
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
            ) : (
              <Button>
                <CheckIcon data-icon="inline-start" />
                Deploy service
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
