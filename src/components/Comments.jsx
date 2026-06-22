"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // LOAD COMMENTS
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?slug=${slug}`);
      const data = await res.json();
      setComments(data || []);
    };

    fetchComments();
  }, [slug]);

  // SUBMIT COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        ...form,
        date: new Date().toLocaleDateString(),
      }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);

      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="mt-28">
      <h2 className="font-serif text-4xl mb-12">
        Comments ({comments.length})
      </h2>

      {/* COMMENTS LIST */}
      <div className="space-y-10">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-6 border-b pb-10">
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
              <Image src="/avatar1.png" alt="" fill />
            </div>

            <div>
              <div className="flex gap-3 items-center mb-2">
                <h4 className="font-semibold">{c.name}</h4>
                <span className="text-sm text-gray-500">{c.date}</span>
              </div>

              <p className="text-gray-600">{c.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-16 space-y-6">
        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
          className="w-full border p-4"
        />

        <input
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          placeholder="Email"
          className="w-full border p-4"
        />

        <textarea
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          placeholder="Comment..."
          className="w-full border p-4"
          rows={5}
        />

        <button className="bg-black text-white px-8 py-4">
          Post Comment
        </button>
      </form>
    </div>
  );
}