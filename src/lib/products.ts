export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Automation Controller",
    description: "High-performance PLC for industrial automation",
    price: 599.99,
    image: "/automation.jpg?height=300&width=300",
    category: "Automation"
  },
  {
    id: 2,
    name: "CCTV Camera",
    description: "HD security camera with night vision",
    price: 199.99,
    image: "/cctv.jpg?height=300&width=300",
    category: "Security"
  },
  {
    id: 3,
    name: "Solar Panel",
    description: "High-efficiency monocrystalline solar panel",
    price: 299.99,
    image: "/panels.jpg?300&width=300",
    category: "Solar"
  },
  {
    id: 4,
    name: "HVAC System",
    description: "Energy-efficient air conditioning unit",
    price: 799.99,
    image: "/hvac.jpg",
    category: "HVAC"
  },
  {
    id: 5,
    name: "Industrial Sensor",
    description: "Precision sensor for industrial applications",
    price: 149.99,
    image: "/drive.jpg?height=300&width=300",
    category: "Automation"
  },
  {
    id: 6,
    name: "Access Control System",
    description: "Advanced access control for enhanced security",
    price: 399.99,
    image: "/cctv.jpg?height=300&width=300",
    category: "Security"
  },
]

