import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import {  NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    if (!userData) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: userData.email },
      {
        $set: {
          name:  userData.name,
          image: userData.image,
          email: userData.email
        }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "User data saved successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 }
    );
  }
}