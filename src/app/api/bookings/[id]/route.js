import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";

export async function PATCH(
  req,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    console.log("ID:", id);
    console.log("BODY:", body);

    const booking =
      await Booking.findByIdAndUpdate(
        id,
        body,
        {
          returnDocument: "after",
        }
      );

    if (!booking) {
      return NextResponse.json(
        {
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      booking
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}