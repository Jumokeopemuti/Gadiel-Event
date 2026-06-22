// /api/search/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";
import Gallery from "@/models/Gallery";
import Blog from "@/models/Blog";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");

  const regex = new RegExp(q, "i");

  const events = await Event.find({
    $or: [
      { title: regex },
      { location: regex },
    ],
  });

  const blogs = await Blog.find({
    $or: [
      { title: regex },
      { description: regex },
    ],
  });

  const gallery = await Gallery.find({
    title: regex,
  });

 return NextResponse.json({
  events: events.map((event) => ({
    ...event.toObject(),
    type: "event",
  })),

  blogs: blogs.map((blog) => ({
    ...blog,
    type: "service",
  })),

  gallery: gallery.map((item) => ({
    ...item.toObject(),
    type: "gallery",
  })),
});
}