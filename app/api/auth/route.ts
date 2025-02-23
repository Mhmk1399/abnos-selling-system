import connect from "@/lib/data";
import { NextResponse } from "next/server";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { name, phoneNumber, password } = await request.json();
  try {
    await connect();
    if (!connect) {
      return NextResponse.json({ error: "connection failed" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phoneNumber,
      password: hashedPassword,
    });
    console.log(newUser);

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        pass: hashedPassword,
        role: newUser.role,
        phoneNumber: newUser.phone,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        userId: newUser._id,
        name: newUser.name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();

    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}
