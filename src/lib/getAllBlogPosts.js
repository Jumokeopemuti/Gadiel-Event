import { blogPosts as staticPosts } from "@/data/blogPosts";

export async function getAllBlogPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/blogs", {
      cache: "no-store",
    });

    const adminPosts = res.ok ? await res.json() : [];

    return [
      ...staticPosts,
      ...adminPosts.map((post) => ({
        ...post,
        slug: post.slug || post._id?.toString(),
      })),
    ];
  } catch (err) {
    console.error("Blog fetch error:", err);
    return staticPosts;
  }
}