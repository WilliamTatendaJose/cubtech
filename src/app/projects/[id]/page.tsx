"use client"

import {useState, useEffect} from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/contact-section"

// This would typically come from a database or API
interface Project {
  _id: string;
  title: string;
  description: string;
  details: string[];
  mainImage: string
  images: string[]

}

export default async function ProjectPage({ params }: { params: Promise<{_id: string }> }) {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
       try {
        const response = await fetch('/api/get-projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      }
    }

    fetchProjects();
  }, []);
  const { _id } = await params;
  const project = projects.find(p => p._id === _id)
  if (!project) {
    return notFound()
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
      <ContactSection/>

      <SiteFooter />
    </div>
  )
}

