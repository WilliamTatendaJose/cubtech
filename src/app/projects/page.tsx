import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl mb-8">Explore our recent engineering projects and installations</p>
        </div>
        <ProjectsSection />
        


      </main>
      <ContactSection/>
      <SiteFooter />
    </div>
  )
}

