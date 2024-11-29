import Image from "next/image"
import { CheckCircle } from 'lucide-react'
import drive from "../components/images/drive.jpg"

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative aspect-square">
            <Image
              src={drive}
              alt="About CubTech Engineering"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About CubTech Engineering</h2>
            <p className="mt-4 text-muted-foreground">
              CubTech Engineering is a registered engineering company providing comprehensive solutions in electrical automation,
              security systems, solar installations, HVAC systems and industrial installations. With years of experience and a dedicated team of professionals, we deliver excellence in every project since our creation in September 2019.
            </p>
            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">24/7 Service</h3>
                  <p className="text-sm text-muted-foreground">Round-the-clock support for all your engineering needs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Certified Engineers</h3>
                  <p className="text-sm text-muted-foreground">Team of qualified and experienced professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Quality Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">Commitment to excellence in every project</p>
                </div>
              </div>
               <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Creative Solutions</h3>
                  <p className="text-sm text-muted-foreground">Unique and Creative solutions that exceed the expections of our clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

