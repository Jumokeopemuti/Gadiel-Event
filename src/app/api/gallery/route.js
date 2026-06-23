import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

// GET ALL EVENTS
export async function GET() {
  try {
    await connectDB();

    const data = await Gallery.find().sort({ createdAt: -1 });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST MULTIPLE IMAGES
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const files = formData.getAll("images");

    if (!files.length) {
      return NextResponse.json(
        { message: "No images provided" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "gallery" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const newEvent = await Gallery.create({
      title,
      category,
      images: uploadedImages,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE EVENT
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const event = await Gallery.findById(id);

    if (!event) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    for (const img of event.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}