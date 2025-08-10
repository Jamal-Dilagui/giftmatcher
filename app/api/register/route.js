import { NextResponse } from "next/server";
import User from "@/app/model/user";
import { connectMongoDb } from "@/app/libs/mongodb";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDb();

    // Check if user already exists with email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Username already taken. Please choose a different username." },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password, // Will be hashed automatically
      isEmailVerified: false
    });

    await newUser.save();

    // Return success response (without password)
    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          id: newUser._id.toString(),
          username: newUser.username,
          email: newUser.email
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
