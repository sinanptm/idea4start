import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { NextResponse, NextRequest } from "next/server";
import { NEXT_PUBLIC_API_URL, NODE_ENV } from "@/config";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    if (!userData) {
      return NextResponse.json(
        { error: "User Data is required" },
        { status: 401 }
      );
    }

    if (NODE_ENV === "development") {
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth`, userData);

      if (response.status === 201) {
        const { user, token } = response.data;
        return NextResponse.json(
          { message: "User data saved successfully: From API", user, token },
          { status: 200 }
        );
      }
    }



    await connectDB();
    let user = await User.findOneAndUpdate(
      { email: userData.email },
      {
        $set: {
          name: userData.name,
          image: userData.image,
          email: userData.email
        }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "User data saved successfully", user: user.toJSON() },
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