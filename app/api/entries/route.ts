import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Entry from "@/models/Entry";

// GET all entries
export async function GET() {
  try {
    await connectDB();
    const entries = await Entry.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: entries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

// POST create new entry
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const entry = await Entry.create(body);
    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
