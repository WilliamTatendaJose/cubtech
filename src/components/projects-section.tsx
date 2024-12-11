"use client"
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
import { useEffect, useState } from "react"

interface Project{
 
  _id: number;
  title: string;
  description: string;
  mainImage: string;
  image: string;
  details: string[];
}
export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/get-projects');
      const data = await response.json();
      setProjects(data);
    };

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
                {Array.isArray(projects) ? (
                  projects.map((project, index) => (
                    <CarouselItem key={index}>
                      <Link href={`/projects/${project._id}`}>
                        <Card>
                          <CardContent className="p-0">
                            <div className="relative aspect-[16/9]">
                              <Image
                                src={project?.image}
                                alt={project?.title}
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
                  ))
                ) : (
                  <div className="items-center">loading ..........</div>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
      </div>
    </section>
  )
}

