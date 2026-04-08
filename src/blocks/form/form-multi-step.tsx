"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  { label: "Personal", description: "Basic information" },
  { label: "Company", description: "Organization details" },
  { label: "Preferences", description: "Finalize settings" },
]

function StepIndicator({
  currentStep,
}: {
  currentStep: number
}) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {i < currentStep ? (
                <CheckIcon className="size-3.5" />
              ) : (
                i + 1
              )}
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-xs font-medium ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-6 sm:w-10 ${
                i < currentStep ? "bg-primary" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function FormMultiStep() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-lg"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="mb-2">
            <StepIndicator currentStep={currentStep} />
          </div>
          <CardTitle className="text-lg tracking-tight">
            {steps[currentStep].label}
          </CardTitle>
          <CardDescription>
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="fms-first">First name</Label>
                    <Input id="fms-first" placeholder="Linnea" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="fms-last">Last name</Label>
                    <Input id="fms-last" placeholder="Johansson" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fms-email">Email</Label>
                  <Input
                    id="fms-email"
                    type="email"
                    placeholder="linnea.j@verdant.se"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fms-phone">Phone</Label>
                  <Input
                    id="fms-phone"
                    type="tel"
                    placeholder="+46 70 123 4567"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fms-company">Company name</Label>
                  <Input id="fms-company" placeholder="Verdant Systems AB" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Company size</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                      <SelectItem value="1000+">1,000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Industry</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS / Software</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <Label>Primary use case</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="What will you use this for?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analytics">Product analytics</SelectItem>
                      <SelectItem value="monitoring">Infrastructure monitoring</SelectItem>
                      <SelectItem value="collaboration">Team collaboration</SelectItem>
                      <SelectItem value="automation">Workflow automation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fms-notes">Anything else we should know?</Label>
                  <Textarea
                    id="fms-notes"
                    placeholder="Optional notes or requirements..."
                    className="min-h-24"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
            >
              {currentStep === steps.length - 1 ? "Submit" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
