import BlogsPageClient from "@/components/blog/BlogsPageClient";
import { getBlogs } from "@/lib/contentRepository";

// Cached until an Admin save calls revalidateStorefront() (src/lib/storefrontRevalidation.ts).
export const revalidate = false;

export default async function BlogsPage() {
  return <BlogsPageClient initialItems={await getBlogs()} />;
}
