import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaynowForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" placeholder="+263 XX XXX XXXX" required />
      </div>
      <Button className="w-full bg-green-600 hover:bg-green-700">
        Pay with Paynow
      </Button>
    </div>
  )
}

