import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/sanity-client';

type ProjectDetails = {
  _id: string;
  title: string;
  description: string;
  mainImage: string;
  category: string;
  publishedAt: string;
  images: string[];
  details: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Query to fetch a specific product by _id
      const query = `*[_type == "project" && _id == $id][0]{
        _id,
        title,
        description,
        "mainImageUrl": mainImage.asset->url,
        "images": images[].asset->url,
        category,
        details,
        publishedAt
      }`;

      const project: ProjectDetails = await client.fetch(query, { id });
      if (!project) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
