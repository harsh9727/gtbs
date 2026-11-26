import { revalidatePath } from "next/cache";

export type StorefrontContentKind =
  | "blogs"
  | "categories"
  | "galleries"
  | "products"
  | "team"
  | "testimonials";

/**
 * Public routes that render each kind of admin-managed content.
 *
 * Storefront pages are statically cached with no time-based revalidation, so
 * this map is the only thing that refreshes them after an Admin save. Keep it
 * in sync with the repository readers used by each public page:
 * - `/` reads products, categories, testimonials, and the latest blogs.
 * - `/allproducts` reads products and categories.
 * - `/product/[id]` reads the product and related products.
 * - `/blogs`, `/blogs/[id]`, `/gallery`, `/gallery/[id]`, `/about` read their
 *   own content type.
 * - `/sitemap.xml` lists products, blogs, and galleries.
 * - The root layout reads categories for the header on every public page.
 */
const storefrontPaths: Record<
  StorefrontContentKind,
  ReadonlyArray<readonly [path: string, type?: "layout" | "page"]>
> = {
  // Categories feed the header in the root layout, so every page must refresh.
  categories: [["/", "layout"]],
  products: [
    ["/"],
    ["/allproducts"],
    ["/product/[id]", "page"],
    ["/sitemap.xml"],
  ],
  blogs: [["/"], ["/blogs"], ["/blogs/[id]", "page"], ["/sitemap.xml"]],
  galleries: [["/gallery"], ["/gallery/[id]", "page"], ["/sitemap.xml"]],
  testimonials: [["/"]],
  team: [["/about"]],
};

/**
 * Invalidate only the cached public pages that render the changed content
 * type, after a successful admin content mutation. The next visit to each
 * path renders fresh data.
 */
export function revalidateStorefront(kind: StorefrontContentKind) {
  for (const [path, type] of storefrontPaths[kind]) {
    if (type) revalidatePath(path, type);
    else revalidatePath(path);
  }
}
