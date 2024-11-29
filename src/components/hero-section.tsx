"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'


export function HeroSection() {
  return (
    <section id="home" className="relative">
      <div className="container flex flex-col items-center justify-center min-h-[600px] py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-[url('/automation.jpg')] bg-cover bg-center bg-no-repeat opacity-90" />
        <h1 className="text-4xl text-foreground font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Market Leaders in Innovation and Design
        </h1>
        <p className="mx-auto max-w-[700px] mt-6 text-lg text-foreground">
          Your trusted partner in electrical automation, security systems, solar solutions, and industrial maintenance
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={() => {
                const services = document.getElementById('services');
                services?.scrollIntoView({ behavior: 'smooth' });}}
          
          size="lg" className="bg-red-600 hover:bg-red-700">
            Our Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={() => {
                const project = document.getElementById('projects');
                project?.scrollIntoView({ behavior: 'smooth' });}}
          
          size="lg" variant="outline">
            View Projects
            
          </Button>
        </div>
      </div>
    </section>
  )
}

