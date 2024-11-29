import { Button } from "@/components/ui/button"

export function PayPalForm() {
  return (
    <div className="space-y-4">
      <p>Click the button below to pay with PayPal:</p>
      <Button className="w-full bg-[#0070ba] hover:bg-[#003087]">
        Pay with PayPal
      </Button>
    </div>
  )
}

