import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/model/user";
import { connectMongoDb } from "@/app/libs/mongodb";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { title, description, image, price, category, amazonUrl } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Gift title is required" },
        { status: 400 }
      );
    }

    await connectMongoDb();

    // Find user by email
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create saved gift object
    const savedGift = {
      title,
      description: description || '',
      image: image || '',
      price: price || '',
      category: category || 'General',
      amazonUrl: amazonUrl || '',
      savedAt: new Date()
    };
    
    console.log('Saving gift:', savedGift); // Debug log

    // Add to user's saved gifts (if array doesn't exist, create it)
    if (!user.savedGifts) {
      user.savedGifts = [];
    }

    // Check if gift is already saved
    const existingGift = user.savedGifts.find(gift => gift.title === title);
    if (existingGift) {
      return NextResponse.json(
        { error: "Gift already saved" },
        { status: 400 }
      );
    }

    user.savedGifts.push(savedGift);
    await user.save();

    return NextResponse.json(
      {
        message: "Gift saved successfully",
        savedGift
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Save gift error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectMongoDb();

    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log('Retrieved saved gifts for user:', user.savedGifts); // Debug log
    return NextResponse.json({
      savedGifts: user.savedGifts || []
    });

  } catch (error) {
    console.error("Get saved gifts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Gift title is required" },
        { status: 400 }
      );
    }

    await connectMongoDb();

    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Remove gift from saved gifts
    const initialLength = user.savedGifts.length;
    user.savedGifts = user.savedGifts.filter(gift => gift.title !== title);
    
    if (user.savedGifts.length === initialLength) {
      return NextResponse.json(
        { error: "Gift not found in saved gifts" },
        { status: 404 }
      );
    }

    await user.save();

    return NextResponse.json(
      { message: "Gift removed successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Remove gift error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
