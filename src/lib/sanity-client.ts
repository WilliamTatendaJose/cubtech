import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
export default client;