"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlogTable({
  blogs = [],
  onDelete,
  onEdit,
}) {



const router = useRouter();

const editBlog = (blog) => {
  router.push(`/admin/blog/edit/${blog._id}`);
};



  if (blogs.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border">
        <p className="text-center text-gray-500">
          No blogs found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Blog Posts
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="relative w-20 h-16 rounded overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>

                <td className="p-4 font-medium">
                  {blog.title}
                </td>

                <td className="p-4">
                  {blog.category}
                </td>

                <td className="p-4">
                  {blog.author}
                </td>

                <td className="p-4">
                  {blog.date}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                     onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3 py-2
                        rounded-lg
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    

                    <button
                      onClick={() => onDelete(blog._id)}
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-3 py-2
                        rounded-lg
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}