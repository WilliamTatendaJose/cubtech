import Image from "next/image"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/contact-section"

// This would typically come from a database or API
const projects = [
  {
    id: "industrial-automation",
    title: "Industrial Automation",
    description: "We implemented a state-of-the-art industrial automation system for a manufacturing plant, increasing efficiency by 40% and reducing downtime by 60%.",
    images: [
      "/automation.jpg",
      "/automation.jpg",
      "/automation.jpg",
    ],
    details: [
      "Implemented PLC-based control systems",
      "Integrated SCADA for real-time monitoring",
      "Developed custom HMI for operator interface",
      "Implemented predictive maintenance algorithms",
    ],
  },
  {
    id: "solar-installation",
    title: "Solar Installation",
    description: "Our team designed and installed a 500kW solar power system for a commercial complex, reducing their energy costs by 70% and carbon footprint by 500 tons annually.",
    images: [
      "/panels.jpg",
      "/panels.jpg",
      "/panels-stand.jpg",
    ],
    details: [
      "Conducted site survey and feasibility study",
      "Designed optimal panel layout for maximum efficiency",
      "Installed high-efficiency solar panels and inverters",
      "Implemented smart monitoring system for performance tracking",
    ],
  },
  {
    id: "hvac-systems",
    title: "HVAC Systems",
    description: "We upgraded the HVAC system for a large office building, improving energy efficiency by 50% and enhancing indoor air quality to meet the highest standards.",
    images: [
      "/drive.jpg",
      "/drive.jpg",
      "/drive.jpg",
    ],
    details: [
      "Conducted energy audit and system analysis",
      "Installed high-efficiency HVAC units",
      "Implemented smart zoning and thermostats",
      "Integrated air purification systems",
    ],
  },
  {
    id: "security-systems",
    title: "Security Systems",
    description: "Our team designed and implemented a comprehensive security system for a high-security facility, including advanced surveillance, access control, and intrusion detection.",
    images: [
      "/drive.jpg",
      "/drive.jpg",
      "/drive.jpg",
    ],
    details: [
      "Installed high-resolution IP cameras with night vision",
      "Implemented biometric access control systems",
      "Set up a centralized monitoring station",
      "Integrated AI-powered video analytics for threat detection",
    ],
  },
]

// Define the Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  details: string[];
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await new Promise<Project | undefined>((resolve) => {
    resolve(projects.find(p => p.id === params.id));
  });

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <p className="text-xl mb-8">{project.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {project.images.map((image, index) => (
            <div key={index} className="relative aspect-video">
              <Image
                src={image}
                alt={`${project.title} image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          {project.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </main>
      <ContactSection />
      <SiteFooter />
    </div>
  )
}

