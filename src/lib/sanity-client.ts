import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
const client = createClient({
  // projectId: process.env.SANITY_PROJECT_ID,
  projectId:"nfo82o3i",
  // dataset: process.env.SANITY_DATASET,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
export default client;