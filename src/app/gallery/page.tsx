import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import { getGalleries } from "@/lib/contentRepository";

// Cached until an Admin save calls revalidateStorefront() (src/lib/storefrontRevalidation.ts).
export const revalidate = false;

export default async function GalleryPage() {
  return <GalleryPageClient initialItems={await getGalleries()} />;
}
