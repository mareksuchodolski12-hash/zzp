import { createClient } from '@sanity/client';
import { resolveSanityProjectId } from './sanity-env';

export const sanityClient = createClient({
  projectId: resolveSanityProjectId(),
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getPage(slug: string) {
  return sanityClient.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug });
}

export async function getPages() {
  return sanityClient.fetch(`*[_type == "page"] | order(order asc)`);
}
