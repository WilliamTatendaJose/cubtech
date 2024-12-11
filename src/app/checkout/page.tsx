"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { ShopHeader } from "@/components/shop-header"
import { SiteFooter } from "@/components/site-footer"
import { CardPaymentForm } from "@/components/CardPaymentForm"
import { PayPalForm } from "@/components/PayPalForm"
import { PaynowForm } from "@/components/PaynowForm"
import paynowIcon from "./Paynow.svg"



export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    paymentMethod: "card", // Default payment method
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    // and integrate with the selected payment provider
    console.log("Order submitted:", { items, total, customer: formData })
    alert(`Thank you for your order! You selected ${formData.paymentMethod} as your payment method. (This is a demo)`)
    clearCart()
    // Redirect to a thank you page or back to the shop
  }

  const renderPaymentForm = () => {
    switch (formData.paymentMethod) {
      case "card":
        return <CardPaymentForm />
      case "paypal":
        return <PayPalForm />
      case "paynow":
        return <PaynowForm />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ShopHeader />
      <main className="flex-1 container py-12 ">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Payment Method</Label>
                <RadioGroup
                  defaultValue="card"
                  value={formData.paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  className="flex flex-col space-y-1 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paynow" id="paynow" />
                    <Label htmlFor="paynow">Paynow</Label>
                  </div>
                </RadioGroup>
              </div>
              {renderPaymentForm()}
              <Button type="submit" className="w-full">
                Place Order (${total.toFixed(2)})
              </Button>
               <Image
              src={paynowIcon}
              alt="paynow image"
              fill
              className="object-cover rounded-lg"
            />
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item._id} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

