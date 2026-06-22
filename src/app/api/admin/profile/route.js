// app/api/admin/profile/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import cloudinary from "@/lib/cloudinary";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    let admin = await Admin.findOne();

    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      admin = await Admin.create({
        name: "DemoAdmin",
        email: "admin@gadiel.com",
        password: hashedPassword,
        phone: "",
        role: "Super Admin",
        bio: "",
        image: "",
      });
    }

    return NextResponse.json(admin);
  } catch (err) {
    console.error("PROFILE API ERROR:", err);

    return NextResponse.json(
      {
        message: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}

// UPDATE admin profile
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const role = formData.get("role");
    const bio = formData.get("bio");
    const imageFile = formData.get("image");

    let imageUrl = "";

    // upload image if provided
    if (imageFile && typeof imageFile !== "string") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "admin-profile" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = upload.secure_url;
    }

    const updateData = {
      name,
      email,
      phone,
      role,
      bio,
    };

    if (imageUrl) updateData.image = imageUrl;

    const admin = await Admin.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    return NextResponse.json(admin);
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}