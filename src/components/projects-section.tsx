"use client"

import {useState, useEffect} from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"

interface Project {
  _id: string;
  title: string;
  description: string;
  details: number;
  mainImage: string
  images: string[]

}


export function ProjectsSection() {
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


  return (
    <section id="projects" className="py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Projects</h2>
          <p className="mt-4 text-muted-foreground">
            Explore our recent engineering projects and installations
          </p>
        </div>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                 <Link href={`/projects/${project._id}`}>
                  <Card>
                    <CardContent className="p-0">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={project.mainImage}
                          alt={project.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

