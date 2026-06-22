import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Staff from "@/models/Staff";

// UPDATE STAFF
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    const updated = await Staff.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// DELETE STAFF
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Staff.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Staff deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}