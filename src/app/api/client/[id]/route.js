import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";

export async function DELETE(
  req,
  { params }
) {
  try {
    await connectDB();

    await Client.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      message: "Client deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}