import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const items = [
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams are fully onboarded within a single afternoon. We provide a guided migration assistant that imports your existing data, maps your permissions, and validates everything before you go live.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. Custom domains are available on Pro and Enterprise plans. You point a CNAME record to our edge network and we handle TLS provisioning automatically within a few minutes.",
  },
  {
    question: "What happens if I exceed my storage limit?",
    answer:
      "We never delete your data. You will receive a notification at 80% and 95% usage. Once you reach the limit, uploads are paused until you upgrade or free up space.",
  },
  {
    question: "Is there a self-hosted option?",
    answer:
      "Enterprise customers can deploy on their own infrastructure using our Helm charts. We support AWS, GCP, and Azure out of the box, with dedicated support for air-gapped environments.",
  },
  {
    question: "How do you handle data residency?",
    answer:
      "We operate regions in the US (Virginia), EU (Frankfurt), and APAC (Sydney). You choose your primary region at signup and can request additional replicas for compliance needs.",
  },
  {
    question: "What is your uptime guarantee?",
    answer:
      "We maintain a 99.95% uptime SLA for Pro plans and 99.99% for Enterprise. Our status page publishes real-time metrics and we issue credits automatically for any violation.",
  },
]

export function FaqSection() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 lg:px-8">
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Can&apos;t find what you&apos;re looking for? Reach out to our support
          team.
        </p>
      </div>

      <Accordion>
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
