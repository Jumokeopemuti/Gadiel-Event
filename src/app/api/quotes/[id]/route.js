import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quote from "@/models/Quote";

/* GET SINGLE QUOTE */

export async function GET(
  req,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          message: "Quote not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/* UPDATE QUOTE */

export async function PATCH(
  req,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    console.log("QUOTE ID:", id);
    console.log("BODY:", body);

    const quote =
      await Quote.findByIdAndUpdate(
        id,
        body,
        {
          returnDocument: "after",
        }
      );

    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          message: "Quote not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Quote updated successfully",
      quote,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/* DELETE QUOTE */

export async function DELETE(
  req,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const quote =
      await Quote.findByIdAndDelete(id);

    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          message: "Quote not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Quote deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}