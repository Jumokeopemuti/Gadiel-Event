"use client";

import { useState } from "react";

export default function CreateBlogPage() {
  const [post, setPost] = useState({
    title: "",
    image: "",
    category: "",
    author: "Gadiel Event",
    readTime: "",
    quote: "",
    tags: "",
    introduction: "",
  });

  const [sections, setSections] = useState([
    {
      heading: "",
      image: "",
      content: "",
    },
  ]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handlePostChange = (field, value) => {
    setPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: "",
        image: "",
        content: "",
      },
    ]);
  };

  const removeSection = (index) => {
    setSections(
      sections.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async () => {
    const blogData = {
      slug: generateSlug(post.title),

      title: post.title,
      image: post.image,

      date: new Date().toLocaleDateString(),

      category: post.category,

      author: post.author,

      readTime: post.readTime,

      tags: post.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      quote: post.quote,

      introduction: post.introduction
        .split("\n")
        .filter(Boolean),

      sections: sections.map((section) => ({
        heading: section.heading,

        image: section.image,

        content: section.content
          .split("\n")
          .filter(Boolean),
      })),
    };

    const res = await fetch(
      "/api/blogs",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          blogData
        ),
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to create blog"
      );
    }

    alert(
      "Blog published successfully"
    );


  };



  const handleImageUpload = (file, field, sectionIndex = null) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;

      if (sectionIndex !== null) {
        const updated = [...sections];
        updated[sectionIndex][field] = result;
        setSections(updated);
      } else {
        setPost((prev) => ({
          ...prev,
          [field]: result,
        }));
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow border p-8">

        <h1 className="text-3xl font-bold mb-8">
          Create Blog Post
        </h1>

        {/* TITLE */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Blog Title
          </label>

          <input
            type="text"
            value={post.title}
            onChange={(e) =>
              handlePostChange(
                "title",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* IMAGE */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Featured Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(e.target.files[0], "image")
            }
            className="w-full border rounded-lg p-3"
          />

          {post.image && (
            <img
              src={post.image}
              alt="preview"
              className="mt-4 w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>

        {/* CATEGORY */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Category
          </label>

          <input
            type="text"
            value={post.category}
            onChange={(e) =>
              handlePostChange(
                "category",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* AUTHOR */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Author
          </label>

          <input
            type="text"
            value={post.author}
            onChange={(e) =>
              handlePostChange(
                "author",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* READ TIME */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Read Time
          </label>

          <input
            type="text"
            placeholder="8 Min Read"
            value={post.readTime}
            onChange={(e) =>
              handlePostChange(
                "readTime",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* TAGS */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Tags
          </label>

          <input
            type="text"
            placeholder="Wedding, Luxury, Styling"
            value={post.tags}
            onChange={(e) =>
              handlePostChange(
                "tags",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* QUOTE */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Featured Quote
          </label>

          <textarea
            rows={4}
            value={post.quote}
            onChange={(e) =>
              handlePostChange(
                "quote",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* INTRODUCTION */}

        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Introduction
          </label>

          <textarea
            rows={6}
            placeholder="One paragraph per line"
            value={post.introduction}
            onChange={(e) =>
              handlePostChange(
                "introduction",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* SECTIONS */}

        <h2 className="text-2xl font-bold mb-6">
          Blog Sections
        </h2>

        {sections.map((section, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 mb-6"
          >
            <h3 className="font-semibold mb-4">
              Section {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Section Heading"
              value={section.heading}
              onChange={(e) =>
                updateSection(
                  index,
                  "heading",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(
                  e.target.files[0],
                  "image",
                  index
                )
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            {section.image && (
              <img
                src={section.image}
                alt="preview"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <textarea
              rows={6}
              placeholder="One paragraph per line"
              value={section.content}
              onChange={(e) =>
                updateSection(
                  index,
                  "content",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            {sections.length > 1 && (
              <button
                onClick={() =>
                  removeSection(index)
                }
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Section
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addSection}
          className="bg-gray-200 px-5 py-3 rounded-lg mb-8"
        >
          Add Section
        </button>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-[#572649] text-white px-8 py-4 rounded-lg"
          >
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
}