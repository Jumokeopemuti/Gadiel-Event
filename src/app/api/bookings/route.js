import { NextResponse } from "next/server";

import Booking from "@/models/Booking";
import {connectDB} from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const bookings =
      await Booking.find()
        .sort({ createdAt: -1 });

    return NextResponse.json(
      bookings
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body =
      await req.json();

    const booking =
      await Booking.create({
        ...body,

        bookingId:
          "BK-" +
          Date.now()
            .toString()
            .slice(-6),
      });

    return NextResponse.json(
      booking,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}