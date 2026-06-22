import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

// GET all images
export async function GET() {
  try {
    await connectDB();

    const images = await Gallery.find().sort({ createdAt: -1 });

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// POST upload image
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image");
    const title = formData.get("title");
    const category = formData.get("category");

    if (!file) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "gallery" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    const newImage = await Gallery.create({
      title,
      category,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// DELETE image
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const image = await Gallery.findById(id);

    if (!image) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    // delete from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}