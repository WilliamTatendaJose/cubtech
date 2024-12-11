import { NextResponse } from 'next/server';
import client from '@/lib/sanity-client'; 
interface Project {
  _id: string;
  title: string;
  description: string;
  details: string[];
  image: string; 
}

export async function GET(): Promise<NextResponse> {
  try {
    // Define the Sanity query to fetch projects
    const query = `*[_type == "project"] {
      _id,
      title,
      description,
      details,
      "image": mainImage.asset->url // Alias 'mainImage.asset->url' as 'image' for consistency
    }`;

    // Fetch data using the Sanity client
    const projects: Project[] = await client.fetch(query);

    // Respond with the fetched projects
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Respond with an error message and status code 500
    return NextResponse.json({ message: 'Error fetching projects' }, { status: 500 });
  }
}
