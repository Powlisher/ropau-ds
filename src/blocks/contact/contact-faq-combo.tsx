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
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

const faqs = [
  {
    question: "What are your response times?",
    answer:
      "We respond to all inquiries within one business day. Priority support customers receive responses within 4 hours during business hours (9 AM - 6 PM CET).",
  },
  {
    question: "Do you offer free trials?",
    answer:
      "Yes, all plans include a 14-day free trial with full feature access. No credit card required to start.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time. Changes take effect at your next billing cycle. Prorated credits apply for upgrades.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Our REST API is available on Growth and Enterprise plans. Full documentation is at docs.example.com/api. We also offer SDKs for Python, Node.js, and Go.",
  },
]

export default function ContactFaqCombo() {
  return (
    <div className="bg-slate-50/80 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quick answers to common questions
          </p>
        </div>

        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Separator />

        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Still have questions?
            </CardTitle>
            <CardDescription>
              Can&apos;t find what you&apos;re looking for? Send us a message.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cfq-name">Name</Label>
                <Input id="cfq-name" placeholder="Omar Benali" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cfq-email">Email</Label>
                <Input
                  id="cfq-email"
                  type="email"
                  placeholder="omar@driftware.ma"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cfq-message">Message</Label>
              <Textarea
                id="cfq-message"
                placeholder="What would you like to know?"
                className="min-h-24"
              />
            </div>
            <Button className="w-full sm:w-auto sm:self-end">
              Send message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
