import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(
  req,
  { params }
) {
  try {
    await connectDB();

    const blog =
      await Blog.findById(
        params.id
      );

    if (!blog) {
      return NextResponse.json(
        {
          message:
            "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      blog
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req,
  { params }
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const blog =
      await Blog.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json(
      blog
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req,
  { params }
) {
  try {
    await connectDB();

    await Blog.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      message:
        "Blog deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}