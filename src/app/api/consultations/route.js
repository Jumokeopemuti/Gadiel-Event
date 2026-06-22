import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const consultation =
      await Consultation.create(body);

    return NextResponse.json({
      success: true,
      consultation,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}