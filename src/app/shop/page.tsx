"use client"

import { useState,useEffect} from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { ShoppingCart,ShoppingBag, X, Plus, Minus } from 'lucide-react'
import { ShopHeader } from "@/components/shop-header"
import { SiteFooter } from "@/components/site-footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/toast-context"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { showToast } = useToast()
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [formData, setFormData] = useState({
    name: "",
    contact:"",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    number: "",
    paymentMethod: "card",
    cardNumber: "",
    cardHolderName: "",
    cvv: "",
    expiryDate: "",
    phoneNumber: "",
  })
type Payload = {
  name: string;
  contact: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  total: number;
  items: CartItem[];
  cardDetails?: {
    cardNumber: string;
    cardHolderName: string;
    cvv: string;
    expiryDate: string;
  };
  mobilePaymentDetails?: {
    paymentMethod: string;
    phoneNumber: string;
  };
};
  useEffect(() => {
    const fetchProducts = async () => {
       try {
        const response = await fetch('/api/get-products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    }

    fetchProducts();
  }, []);



  const categories = ["All", ...Array.from(new Set(products.map(product => product.category)))]

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product: typeof products[0]) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  

async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();

  const payload: Payload = {
    name: formData.name,
    contact: formData.contact,
    email: formData.email,
    address: formData.address,
    city: formData.city,
    country: formData.country,
    zip: formData.zip,
    total: total,
    items: cartItems,
  };

  try {
    if (formData.paymentMethod === 'card') {
      payload.cardDetails = {
        cardNumber: formData.cardNumber,
        cardHolderName: formData.cardHolderName,
        cvv: formData.cvv,
        expiryDate: formData.expiryDate,
      };

      const response = await fetch('/api/card-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      handleResponse(response, await response.json());
    } else if (['ecocash', 'onemoney'].includes(formData.paymentMethod)) {
      payload.mobilePaymentDetails = {
        paymentMethod: formData.paymentMethod,
        phoneNumber: formData.phoneNumber,
      };

      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      handleResponse(response, await response.json());
    }
  } catch (error) {
    console.error('Error during payment:', error);
    
    showToast(`An unexpected error occurred. Please try again.`)
  }
}
 const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleResponse(response: Response, result: any) {
 

  if (response.ok) {
    showToast('Payment successful! Your order has been placed.');
    clearCart();
    router.push('/success');
  } else {
    showToast(`Payment failed: ${result.error || 'Unknown error'}`);
  }
}



  return (
    <>
     <ShopHeader />
     <div className="container mx-auto px-4 py-8">
     
      
      <div className="flex justify-between items-center mb-8 ">
        <Sheet open={showCart} onOpenChange={setShowCart}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 " />
              {cartItems.length > 0 && (
               <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={() => setShowCheckout(true)} className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-[425px] w-full p-4 max-h-[90vh] overflow-y-auto overflow-x-auto">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete your order by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="contact">Conctact Number</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
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
                  <RadioGroupItem value="ecocash" id="ecocash" />
                  <Label htmlFor="Ecocash">EcoCash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onemoney" id="onemoney" />
                  <Label htmlFor="OneMoney">OneMoney</Label>
                </div>
              </RadioGroup>
            </div>
            {formData.paymentMethod === "card" && (
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <Label htmlFor="cardHolderName">Card Holder Name</Label>
                <Input
                  id="cardHolderName"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleInputChange}
                  required
                />
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  type="password"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="month"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            {["ecocash", "onemoney"].includes(formData.paymentMethod) && (
              <div>
                <Label htmlFor="phoneNumber">Paying Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)} X {item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
            <Button type="submit" className="w-full">
              Place Order (${total.toFixed(2)})
            </Button>
            <Image src="/paynow.svg" alt="Pay with Paynow" layout="responsive" width={500} height={300} />
          </form>
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <div>
            <Label htmlFor="search">Search Products</Label>
            <Input
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              {Array.isArray(categories)&&categories.length>0?(
                <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
              ):(
                <>
                </>
              )
              }
              
            </Select>
          </div>
        </div>
      </div>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product)} className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      ):(
        
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Products Not Found </h1>
        <p className="text-lg text-gray-700 mb-6">
          Not Products at the moment. Please check back in a few moments or make sure yo are connected to the internet.
        </p>
      </div>

      )
      
      
      }
     
           </div>
      <SiteFooter />
    </>
    
  )
}



