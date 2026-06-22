import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Notification from "@/models/Notification";

// GET ALL MESSAGES
export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// CREATE MESSAGE
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const contact = await Contact.create(body);

    await Notification.create({
      title: "New Contact Message",
      message: `${contact.name} sent a message`,
      type: "message",
    });

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}