import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

/* GET comments by slug */
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const comments = await Comment.find({ slug }).sort({ createdAt: -1 });

  return NextResponse.json(comments);
}

/* POST new comment */
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const newComment = await Comment.create({
    slug: body.slug,
    name: body.name,
    email: body.email,
    message: body.message,
    date: body.date,
  });

  return NextResponse.json(newComment);
}