import BlogCard from "./BlogCard";
import { getAllBlogPosts } from "@/lib/getAllBlogPosts";

export default async function BlogGrid() {
  const posts = await getAllBlogPosts();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="flex-col flex items-center justify-center mb-13">
        <p className="uppercase tracking-[4px] text-sm text-[#b58e6f] mb-6">
          INSIGHTS & INSPIRATION
        </p>

        <h1 className="text-6xl md:text-8xl font-serif text-[#231b1c] max-w-5xl mx-auto leading-[0.95]">
          Event Planning Trends, Ideas & Expert Insights
        </h1>

        <p className="mt-10 text-lg text-[#6d6666] max-w-3xl mx-auto leading-relaxed">
          Discover luxury event inspiration, planning strategies, and expert
          insights curated to help you create unforgettable celebrations.
        </p>
      </div>

      <div className="max-w-[1450px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}