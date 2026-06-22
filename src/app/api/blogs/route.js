import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

/* GET ALL BLOGS */

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      blogs,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/* CREATE BLOG */

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    if (
      !body.title ||
      !body.category
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title and Category are required",
        },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      ...body,
    });

    return NextResponse.json(
      {
        success: true,
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}