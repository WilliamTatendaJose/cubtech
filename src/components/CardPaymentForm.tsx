
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardPaymentForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input id="expiryDate" placeholder="MM/YY" required />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" required />
        </div>
      </div>
      <div>
        <Label htmlFor="cardholderName">Cardholder Name</Label>
        <Input id="cardholderName" placeholder="John Doe" required />
      </div>
    </div>
  )
}

