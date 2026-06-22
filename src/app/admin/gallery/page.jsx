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
    "Corporate",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      const newItem = await res.json();

      setGallery((prev) => [newItem, ...prev]);

      setFormData({
        title: "",
        category: "",
        image: null,
      });

      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/gallery?id=${id}`, {
      method: "DELETE",
    });

    setGallery((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };


  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();

      setGallery(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Gallery Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage portfolio images and categories.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-gray-500">
                  Total Images
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {gallery.length}
                </h2>

              </div>

              <Images className="text-blue-500" />

            </div>

          </div>

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-gray-500">
                  Categories
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {
                    [...new Set(
                      gallery.map(
                        (item) =>
                          item.category
                      )
                    )].length
                  }
                </h2>

              </div>

              <FolderOpen className="text-green-500" />

            </div>

          </div>

        </div>

        {/* Form */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <div className="mb-8">

            <h2 className="text-2xl font-semibold">
              Add New Gallery Image
            </h2>

            <p className="text-gray-500 mt-2">
              Upload and organize event images.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-2 gap-8"
          >

            <div className="space-y-5">

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Wedding Styling"
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="block mb-2 text-sm font-medium">
                  Upload Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                  className="w-full border rounded-xl p-3"
                />

              </div>

              <button
                type="submit"
                className="
                  flex items-center gap-2
                  bg-black
                  text-white
                  px-6 py-3
                  rounded-xl
                  hover:bg-gray-800
                  transition
                "
              >
                <ImagePlus size={18} />
                Add Image
              </button>

            </div>

            {/* Preview */}

            <div>

              <label className="block mb-3 text-sm font-medium">
                Preview
              </label>

              <div className="
                border-2
                border-dashed
                rounded-3xl
                h-[350px]
                flex
                items-center
                justify-center
                overflow-hidden
                bg-gray-50
              ">

                {preview ? (

                  <img
                    src={preview}
                    alt="preview"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                ) : (

                  <div className="text-center">

                    <Images
                      size={55}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-4 text-gray-500">
                      Image preview appears here
                    </p>

                  </div>

                )}

              </div>

            </div>

          </form>

        </div>

        {/* Gallery Grid */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Gallery Collection
          </h2>

          {gallery.length === 0 ? (

            <div className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              p-14
              text-center
            ">

              <Images
                size={65}
                className="
                  mx-auto
                  text-gray-300
                  mb-4
                "
              />

              <h3 className="text-xl font-semibold">
                No Images Added
              </h3>

              <p className="text-gray-500 mt-2">
                Start building your gallery.
              </p>

            </div>

          ) : (

            <div className="
              grid
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
            ">

              {gallery.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl overflow-hidden border shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-5">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">
                      {item.category}
                    </span>

                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="mt-5 flex items-center gap-2 text-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          )}

        </div>

      </div>

    </div>
  );
}