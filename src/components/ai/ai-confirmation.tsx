import { ShieldAlert } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function AIConfirmation({
  title,
  description,
  onApprove,
  onReject,
  className,
}: {
  title: string
  description: string
  onApprove: () => void
  onReject: () => void
  className?: string
}) {
  return (
    <Card
      data-slot="ai-confirmation"
      className={cn("border-primary/50 ring-primary/20 ring-1", className)}
    >
      <CardContent className="space-y-3 pt-1">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="size-4 shrink-0 text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-snug">{title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 pl-6.5">
          <Button size="sm" onClick={onApprove}>
            Approve
          </Button>
          <Button variant="outline" size="sm" onClick={onReject}>
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { AIConfirmation }
