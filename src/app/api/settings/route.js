// app/api/settings/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WebsiteSettings from "@/models/WebsiteSettings";

export async function GET() {
    await connectDB();

    let settings =
        await WebsiteSettings.findOne();

    if (!settings) {
        settings =
            await WebsiteSettings.create({});
    }

    return NextResponse.json(settings);
}



export async function PUT(req) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        // OWNER ONLY
        if (!session || session.user.role !== "owner") {
            return NextResponse.json(
                {
                    message:
                        "Only the website owner can update settings",
                },
                {
                    status: 403,
                }
            );
        }

        const body = await req.json();

        const settings =
            await WebsiteSettings.findOneAndUpdate(
                {},
                body,
                {
                    new: true,
                    upsert: true,
                }
            );

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}