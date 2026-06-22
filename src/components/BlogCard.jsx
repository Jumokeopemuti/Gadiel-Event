"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
    return (
        <Link href={`/blog/${post.slug}`}>


            <article className="group cursor-pointer">




                <div className="relative h-[500px] overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                    />
                </div>

                <div className="pt-8">
                    <p className="uppercase tracking-[3px] text-xs text-[#b58e6f]">
                        {post.category}
                    </p>

                    <h2 className="text-3xl font-serif mt-4 text-[#231b1c] group-hover:text-[#b58e6f] transition">
                        {post.title}
                    </h2>

                    <p className="mt-4 text-[#6d6666] leading-relaxed">
                        {post.excerpt || post.introduction?.[0]}
                    </p>

                    <p className="mt-6 text-sm text-[#8a7d75]">{post.date}</p>
                </div>
            </article>
        </Link>
    );
}