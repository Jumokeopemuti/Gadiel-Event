import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET() {
  try {
    await connectDB();

    const clients = await Client.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const client = await Client.create(body);

    return NextResponse.json(client, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}