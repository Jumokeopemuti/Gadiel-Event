"use client";

import { useEffect, useState } from "react";
import {
  ImagePlus,
  Trash2,
  Images,
  FolderOpen,
} from "lucide-react";

export default function AdminGalleryPage() {
  const categories = [
    "Weddings",
    "Birthdays",
    "Corporate Events",
    "Decoration",
    "Outdoor Events",
    "Traditional Wedding",
  ];

  const [gallery, setGallery] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  // handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("image", formData.image);

    const res = await fetch("/api/gallery", {
      method: "POST",
      body: data,
    });

    const newItem = await res.json();

    setGallery((prev) => [newItem, ...prev]);

    setFormData({
      title: "",
      category: "",
      image: null,
    });

    setPreview("");
  };

  // delete
  const handleDelete = async (id) => {
    await fetch(`/api/gallery?id=${id}`, {
      method: "DELETE",
    });

    setGallery((prev) => prev.filter((item) => item._id !== id));
  };

  // fetch
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then(setGallery);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-500 mt-2">
            Upload and manage event images
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-2xl border">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Images</p>
                <h2 className="text-3xl font-bold">{gallery.length}</h2>
              </div>
              <Images />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <h2 className="text-3xl font-bold">
                  {[...new Set(gallery.map((i) => i.category))].length}
                </h2>
              </div>
              <FolderOpen />
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-3xl border">
          <h2 className="text-2xl font-semibold mb-6">
            Add New Image
          </h2>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">

            <div className="space-y-5">

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-xl"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-xl"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border p-3 rounded-xl"
                required
              />

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <ImagePlus size={18} />
                Upload
              </button>
            </div>

            {/* PREVIEW */}
            <div className="border rounded-3xl h-[300px] flex items-center justify-center bg-gray-50 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-400">Preview image</p>
              )}
            </div>
          </form>
        </div>

        {/* GALLERY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item._id} className="bg-white border rounded-2xl overflow-hidden">

              <img
                src={item.imageUrl}
                className="h-60 w-full object-cover"
              />

              <div className="p-4">
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {item.category}
                </span>

                <h3 className="font-semibold mt-2">{item.title}</h3>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 flex items-center gap-2 mt-4"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}