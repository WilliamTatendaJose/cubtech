import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import client from "@/lib/sanity-client";

type Project = {
  _id: string;
  title: string;
  description: string;
  details: string[];
  images: Array<{
    asset: {
      url: string;
    };
  }>;
};

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"]{ _id }`);
  return projects.map((project: { _id: string }) => ({
    id: project._id,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
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

  const project = await client.fetch<Project>(query, { id: params.id });

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
          {project.images.map((image, index) => (
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
          {project.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </main>
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

