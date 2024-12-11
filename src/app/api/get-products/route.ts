// import type { NextApiRequest, NextApiResponse } from 'next';
// import client from '@/lib/sanity-client';

// type Project = {
//   _id: string;
//   title: string;
//   description: string;
//   mainImage: string;
//   category: string;
//   publishedAt: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'GET') {
//     try {
//       // Sanity query to fetch all products
//       const query = `*[_type == "project"]{
//         _id,
//         title,
//         description,
//         "mainImageUrl": mainImage.asset->url,
//         category,
//         publishedAt
//       }`;

//       const products: Project[] = await client.fetch(query);
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch products', error });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
