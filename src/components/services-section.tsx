import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const services = [
  {
    title: "Instrumentation and Automation",
    description: "Advanced automation solutions for industrial and commercial applications",
    image:'/automation.jpg',
  },
  {
    title: "Security Systems",
    description: "Comprehensive CCTV and alarm systems for maximum security",
    image: "/cctv.jpg",
  },
  {
    title: "Solar Solutions",
    description: "Custom solar system design and professional installation",
    image: "/panels.jpg",
  },
  {
    title: "Electrical Installations",
    description: "Electrical installations for industry, farms and homes",
    image: "/relay.jpg",
  },
  {
    title: "HVAC Systems",
    description: "Air conditioning and refrigeration installation services",
    image: "/aircon.jpg",
  },
    {
    title: "Hydraulics and pneumatics",
    description: "Installation, maintenance and rapair of all hydraulics and pneumatic systems",
    image: "/hydraulics.jpg",
  },
    {
    title: "Generators",
    description: "Installation and maintenance of generators to keep your tasks running without power intteruptions",
    image: "/generator.jpg",
  },
    {
    title: "Cranes and Hoists",
    description: "Installation and maintenance of all your lifting equipment",
    image: "/crane.jpg",
  },
  {
    title: "Networking and Data Centers",
    description: "Installation and maintenance for all your data centers and networkign equimanet to keep you connected",
    image: "/data_center.jpg",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive engineering solutions for all your needs
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

