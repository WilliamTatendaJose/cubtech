import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import Head from "next/head"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Comprehensive engineering solutions including automation, security systems, solar solutions, electrical installations, HVAC systems, hydraulics, generators, cranes, and networking." />
        <meta name="keywords" content="Instrumentation, Automation, Security Systems, Solar Solutions, Electrical Installations, HVAC, Hydraulics, Generators, Cranes, Networking, Data Centers" />
      </Head>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
       
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}

