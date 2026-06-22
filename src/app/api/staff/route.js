import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Staff from "@/models/Staff";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const staff = await Staff.create(body);
  await Notification.create({
  title: "New Staff Added",
  message: `${staff.fullName} was added`,
  type: "system",
});

  return NextResponse.json(staff);
}


export async function GET() {
  try {
    await connectDB();

    const staff = await Staff.find().sort({ createdAt: -1 });

    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}