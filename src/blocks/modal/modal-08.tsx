"use client"

import { useState, useRef, useCallback } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileTextIcon } from "lucide-react"

export default function Modal08() {
  const [scrolledToEnd, setScrolledToEnd] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const viewport = target.querySelector("[data-slot='scroll-area-viewport']")
    if (!viewport) return
    const isAtBottom =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 20
    if (isAtBottom) setScrolledToEnd(true)
  }, [])

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setScrolledToEnd(false)
            setAccepted(false)
          }
        }}
      >
        <DialogTrigger render={<Button variant="outline" />}>
          <FileTextIcon data-icon="inline-start" />
          Review terms
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              Last updated February 8, 2026. Please read carefully before
              accepting.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-64 rounded-lg border" onScrollCapture={handleScroll}>
            <div className="p-4 text-sm leading-relaxed text-muted-foreground">
              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                1. Acceptance of Terms
              </h4>
              <p className="mb-4">
                By accessing or using the Meridian platform
                (&ldquo;Service&rdquo;), you agree to be bound by these Terms of
                Service (&ldquo;Terms&rdquo;). If you are using the Service on
                behalf of an organization, you represent that you have the
                authority to bind that organization to these Terms.
              </p>

              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                2. Service Description
              </h4>
              <p className="mb-4">
                Meridian provides a collaborative workspace platform for design
                and engineering teams. The Service includes project management
                tools, real-time collaboration features, version control
                integration, and deployment pipelines. Features may vary by
                subscription tier.
              </p>

              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                3. User Accounts
              </h4>
              <p className="mb-4">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You agree to notify us immediately of any unauthorized
                access. We reserve the right to suspend accounts that violate
                these Terms or show signs of compromise.
              </p>

              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                4. Data Ownership
              </h4>
              <p className="mb-4">
                You retain all rights to content you upload to Meridian. We do
                not claim ownership of your files, designs, code, or other
                materials. We use your content solely to provide and improve the
                Service. You grant us a limited license to store, process, and
                display your content as necessary for Service operation.
              </p>

              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                5. Payment Terms
              </h4>
              <p className="mb-4">
                Paid plans are billed in advance on a monthly or annual basis.
                All fees are non-refundable except as required by law. We may
                change pricing with 30 days written notice. Usage-based charges
                (API calls, storage, bandwidth) are billed in arrears based on
                actual consumption.
              </p>

              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                6. Limitation of Liability
              </h4>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, Meridian
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly, or any loss
                of data, use, goodwill, or other intangible losses.
              </p>

              <h4 className="mb-2 font-heading text-sm font-medium text-foreground">
                7. Termination
              </h4>
              <p>
                Either party may terminate this agreement at any time. Upon
                termination, your right to use the Service will immediately
                cease. We will make your data available for export for 30 days
                after termination. After that period, we may delete your data in
                accordance with our data retention policy.
              </p>
              <div ref={endRef} />
            </div>
          </ScrollArea>

          {!scrolledToEnd && (
            <p className="text-center text-xs text-muted-foreground">
              Scroll to the bottom to enable acceptance
            </p>
          )}

          {scrolledToEnd && (
            <label className="flex items-start gap-2.5 cursor-pointer">
              <Checkbox
                checked={accepted}
                onCheckedChange={(v) => setAccepted(v === true)}
                className="mt-0.5"
              />
              <span className="text-sm">
                I have read and agree to the Terms of Service and the{" "}
                <span className="underline underline-offset-2">
                  Privacy Policy
                </span>
                .
              </span>
            </label>
          )}

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Decline
            </DialogClose>
            <Button disabled={!accepted}>Accept terms</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
