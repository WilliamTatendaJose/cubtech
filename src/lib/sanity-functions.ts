import  client from "./sanity-client";

export async function getProjects() {
  const projects = await client.fetch(`*[_type == "project"]`);
  return projects;
}

export async function getProducts() {
  const products = await client.fetch(`*[_type == "product"]`);
  return products;
}

export async function getProjectById(id: string) {
  const project = await client.fetch(`*[_type == "project" && _id == "${id}"]`);
  return project;
}

export async function getProductById(id: string) {
  const product = await client.fetch(`*[_type == "product" && _id == "${id}"]`);
  return product;
}
export async function getProductsByCategory(category: string) {
  const products = await client.fetch(`*[_type == "product" && category == "${category}"]`);
  return products;
}

