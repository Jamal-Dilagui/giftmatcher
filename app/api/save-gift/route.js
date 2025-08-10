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

    // Create fallback image based on category
    const getFallbackImage = (category) => {
      const categoryImages = {
        'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
        'Home & Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        'Books': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
        'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'Toys': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
        'General': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop'
      };
      return categoryImages[category] || categoryImages['General'];
    };

    // Create saved gift object
    const savedGift = {
      title,
      description: description || '',
      image: image || getFallbackImage(category),
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
