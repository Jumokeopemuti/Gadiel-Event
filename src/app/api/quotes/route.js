import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quote from "@/models/Quote";
import Notification from "@/models/Notification";

/* GET ALL QUOTES */

export async function GET() {
  try {
    await connectDB();

    const quotes = await Quote.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      quotes,
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET QUOTES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/* CREATE QUOTE */

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      location,
      budget,
      services,
      message,
      source,
    } = body;

    /* VALIDATION */

    if (!name || !eventType) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name and Event Type are required",
        },
        { status: 400 }
      );
    }

    /* CREATE QUOTE */

    const quote = await Quote.create({
      quoteId:
        "QT-" +
        Date.now()
          .toString()
          .slice(-6),

      name,
      email,
      phone,
      eventType,
      eventDate,
      location,
      budget,
      services:
        services || [],

      message,

      source:
        source || "website",

      status: "Pending",
    });

    await Notification.create({
  title: "New Quote Request",
  message: `${quote.fullName} requested a quote`,
  type: "quote",
});

    return NextResponse.json(
      {
        success: true,
        message:
          "Quote created successfully",
        quote,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE QUOTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}