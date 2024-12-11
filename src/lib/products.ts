import client from "@/lib/sanity-client";

// Define the Product type
export type Product = {
  _id: string; // Use string for IDs since Sanity uses string-based IDs
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

// Fetch products from Sanity
export const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] {
    _id,
    name,
    description,
    price,
    "image": image.asset->url,
    category
  }`;

  const sanityProducts = await client.fetch(query);
  // Map Sanity's `_id` to `id` for compatibility with the Product type
  return sanityProducts.map((product: {
    image: string;category:string; _id: string; name: string; description: string; price: number; 
}) => ({
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: `${product.image}?height=300&width=300`, // Append transformation parameters
    category: product.category,
  }));
};
