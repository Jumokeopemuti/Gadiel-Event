import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LoginLog from "@/models/LoginLog";

export async function GET() {
  try {
    await connectDB();

    const logs =
      await LoginLog.find()
        .sort({
          createdAt: -1,
        });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}