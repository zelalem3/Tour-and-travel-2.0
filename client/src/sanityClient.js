import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url"; // Change: Use curly braces here

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "wzojjue2";
const DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
const API_VERSION = "2023-01-01";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true, 
  apiVersion: API_VERSION,
});

export const writeClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false, 
  apiVersion: API_VERSION,
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true, 
});

// Use the builder with the named export
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}