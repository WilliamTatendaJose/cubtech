import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import client from "@/lib/sanity-client";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const id = await params.id;

  const fetchProjectData = async (id: string) => {
    const query = `*[_type == "project" && _id == $id][0] {
      _id,
      title,
      description,
      details,
      images[] {
        asset->{
          url
        }
      }
    }`;
    return client.fetch(query, { id });
  };

  const project = await fetchProjectData(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <p className="text-xl mb-8">{project.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {project.images.map((image: { asset: { url: string } }, index: number) => (
            <div key={index} className="relative aspect-video">
              <Image
                src={image.asset.url}
                alt={`${project.title} image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          {project.details.map((detail: string, index: number) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </main>
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

