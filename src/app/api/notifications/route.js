import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

// GET all notifications
export async function GET() {
  try {
    await connectDB();

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// CREATE notification (used internally by other APIs)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const notification = await Notification.create({
      title: body.title,
      message: body.message,
      type: body.type || "system",
    });

    return NextResponse.json(notification, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// MARK AS READ
export async function PATCH(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Notification.findByIdAndUpdate(id, {
      read: true,
    });

    return NextResponse.json({
      message: "Marked as read",
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}