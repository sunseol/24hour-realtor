import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'l0tlxkcn',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      "icon": icon.asset->url,
      colorClass
    }
  `);
}

export async function getListings() {
  return client.fetch(`
    *[_type == "listing"] | order(_createdAt desc) {
      _id,
      title,
      type,
      price,
      specs,
      tags,
      "image": mainImage.asset->url,
      gradientClass
    }
  `);
}

export async function getCompanyInfo() {
  return client.fetch(`
    *[_type == "companyInfo"][0] {
      companyName,
      companyNameEn,
      phone,
      email,
      address,
      businessHours
    }
  `);
}
