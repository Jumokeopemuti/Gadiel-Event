"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`);

      const data = await res.json();

      setFormData({
        title: data.title || "",
        category: data.category || "",
        author: data.author || "",
        image: data.image || "",
        content: data.content || "",
      });
    } catch (error) {
      console.error("Fetch Blog Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/blogs/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update blog"
        );
      }

      alert(
        "Blog updated successfully"
      );

      router.push(
        "/admin/blog"
      );
    } catch (error) {
      console.error(
        "Update Blog Error:",
        error
      );

      alert(
        "Failed to update blog"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Edit Blog Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Featured Image
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {formData.image && (
          <img
            src={formData.image}
            alt={formData.title}
            className="w-48 h-32 object-cover rounded-lg"
          />
        )}

        <div>
          <label className="block mb-2 font-medium">
            Content
          </label>

          <textarea
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-[#572649] text-white px-6 py-3 rounded-lg"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}