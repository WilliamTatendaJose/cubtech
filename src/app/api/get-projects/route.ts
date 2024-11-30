import { NextResponse } from 'next/server';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from "@/lib/sanity-client"

interface Project {
  _id: string;
  title: string;
  description: string;
  details: string[];
  mainImage: SanityImageSource|null
  images: SanityImageSource[] | null;

}

export async function GET(): Promise<NextResponse> {
  try {
    const query = `*[_type == "project"] {
      _id,
      title,
      description,
      details,
      images,
      image
    }`;

    const projects: Project[] = await client.fetch(query);
// Extract client config to use for image URL building
    const { projectId, dataset } = client.config();
    // Generate image URLs using the `urlFor` function
    const urlFor = (source: SanityImageSource) =>
     projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
    const projectsWithImageUrls = projects.map((project) => {
      const image = project.mainImage;
      const imageUrl = image
        ? urlFor(image)?.url()
        : null;
    
      const images = project.images;
      const imageUrls = images
        ? images.map((im) =>
            urlFor(im)?.url()
          )
        : [];

      return {
        ...project,
        image: imageUrl,
        images: imageUrls
      };
    });

    return NextResponse.json(projectsWithImageUrls, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}