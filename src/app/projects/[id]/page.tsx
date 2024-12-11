import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import client from "@/lib/sanity-client";

export default async function ProjectPage(context: { params: { id: string } }) {
  try {
    const { params } = context;
    const { id } = await Promise.resolve(params); // Resolve the params asynchronously

    // Fetch the project data from Sanity
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

    const project = await client.fetch(query, { id });

    // If no project is found, show the 404 page
    if (!project) {
      notFound();
      return; // Ensure no further rendering occurs after `notFound()`
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
  } catch (error) {
    console.error("Error loading project page:", error);
    notFound(); // Redirect to the 404 page if an error occurs
    return; // Ensure no further rendering occurs after `notFound()`
  }
}
